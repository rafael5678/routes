"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { RouteData, MapState } from "@/types";
import { useLocation } from "@/hooks/useLocation";

// Default center - will be updated with user's real location
const defaultCenter: LatLngExpression = [4.7110, -74.0721]; // Bogotá, Colombia (default)
const UNIVERSITY_COORDINATES: [number, number] = [1.2098, -77.2765]; // Universidad Cooperativa en Pandiaco

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Component to auto-center map on user location
function MapCenterUpdater({ center, followUser }: { center: [number, number] | null; followUser: boolean }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && followUser) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, followUser, map]);
  
  return null;
}

// Component to set initial map center
function InitialMapCenter({ userLocation }: { userLocation: [number, number] | null }) {
  const map = useMap();
  const hasSetInitialCenter = useRef(false);
  
  useEffect(() => {
    if (userLocation && !hasSetInitialCenter.current) {
      map.setView(userLocation, 15, { animate: true });
      hasSetInitialCenter.current = true;
    }
  }, [userLocation, map]);
  
  return null;
}

interface MapViewProps {
  onRouteComplete: (distanceKm: number, durationMin: number) => void;
  onNavigationUpdate: (message: string) => void;
  onDestinationSelect?: (lat: number, lng: number, name: string) => void;
  livePositions?: [number, number][]; // For real-time tracking
  followUser?: boolean; // Whether to follow user location
}

export default function MapView({ onRouteComplete, onNavigationUpdate, onDestinationSelect, livePositions, followUser }: MapViewProps) {
  const [mapState, setMapState] = useState<MapState>({
    start: null,
    end: null,
    route: null,
    locating: false,
  });

  const { 
    currentLocation, 
    isLocating, 
    error, 
    getCurrentLocation, 
    setUniversityLocation,
    isNearUniversity,
    universityCoordinates 
  } = useLocation();
  
  const locationRef = useRef<L.Marker | null>(null);
  const polyline = useMemo(() => 
    (mapState.route ? mapState.route.geometry.map(([lng, lat]) => [lat, lng]) as [number, number][] : []), 
    [mapState.route]
  );

  // Auto-set university as start location when detected
  useEffect(() => {
    if (currentLocation && !mapState.start) {
      setMapState(prev => ({ ...prev, start: [currentLocation.latitude, currentLocation.longitude] }));
      onNavigationUpdate("Ubicación detectada. Selecciona tu destino tocando el mapa");
    }
  }, [currentLocation, mapState.start, onNavigationUpdate]);

  // Handle destination selection from quick destinations
  useEffect(() => {
    if (onDestinationSelect) {
      // This will be called from parent component
    }
  }, [onDestinationSelect]);

  const handleDestinationSelect = (lat: number, lng: number, name: string) => {
    if (mapState.start) {
      setMapState(prev => ({ ...prev, end: [lat, lng] }));
      onNavigationUpdate(`Calculando ruta hacia ${name}...`);
    }
  };

  const handleClick = (lat: number, lng: number) => {
    if (!mapState.start) {
      setMapState(prev => ({ ...prev, start: [lat, lng], route: null }));
      onNavigationUpdate("Ahora selecciona el destino tocando el mapa");
    } else if (!mapState.end) {
      setMapState(prev => ({ ...prev, end: [lat, lng] }));
      onNavigationUpdate("Calculando ruta...");
    } else {
      setMapState(prev => ({ ...prev, start: [lat, lng], end: null, route: null }));
      onNavigationUpdate("Selecciona el destino tocando el mapa");
    }
  };

  useEffect(() => {
    if (!mapState.start || !mapState.end) return;
    const controller = new AbortController();

    const query = `${mapState.start[1]},${mapState.start[0]};${mapState.end[1]},${mapState.end[0]}`;
    fetch(`https://router.project-osrm.org/route/v1/foot/${query}?overview=full&geometries=geojson`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const route0 = data.routes?.[0];
        if (!route0) return;
        const distanceKm = Math.round((route0.distance / 1000) * 100) / 100;
        const durationMin = Math.round(route0.duration / 60);
        const geometry = route0.geometry.coordinates as [number, number][];
        
        const routeData: RouteData = { distanceKm, durationMin, geometry };
        setMapState(prev => ({ ...prev, route: routeData }));
        
        // Update navigation message
        onNavigationUpdate(`Ruta calculada: ${distanceKm} km en ${durationMin} minutos. ¡Listo para correr!`);
        
        // Call parent callback to update progress
        onRouteComplete(distanceKm, durationMin);
      })
      .catch(() => {
        onNavigationUpdate("Error al calcular la ruta. Intenta de nuevo.");
      })
      .finally(() => {});

    return () => controller.abort();
  }, [mapState.start, mapState.end, onRouteComplete, onNavigationUpdate]);

  const locate = () => {
    if (isLocating) return;
    
    if (currentLocation) {
      setMapState(prev => ({ ...prev, start: [currentLocation.latitude, currentLocation.longitude] }));
      onNavigationUpdate("Ubicación actualizada. Selecciona tu destino");
    } else {
      getCurrentLocation();
    }
  };

  const setUniversityAsStart = () => {
    setUniversityLocation();
    setMapState(prev => ({ ...prev, start: universityCoordinates }));
    onNavigationUpdate("Ubicación de la universidad establecida. Selecciona tu destino");
  };

  // Calculate direct distance between two points
  const calculateDirectDistance = () => {
    if (!mapState.start || !mapState.end) return 0;
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (mapState.end[0] - mapState.start[0]) * Math.PI / 180;
    const dLon = (mapState.end[1] - mapState.start[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(mapState.start[0] * Math.PI / 180) * Math.cos(mapState.end[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  };

  const startIcon = useMemo(
    () =>
      new L.DivIcon({
        html: '<div class="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-white shadow-lg flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-white"></div></div>',
        className: "",
        iconSize: [16, 16],
      }),
    []
  );
  const endIcon = useMemo(
    () =>
      new L.DivIcon({
        html: '<div class="w-6 h-6 bg-yellow-400 rounded-full ring-2 ring-white shadow-lg flex items-center justify-center transform rotate-45"><div class="w-2 h-2 bg-white rounded-sm"></div></div>',
        className: "",
        iconSize: [24, 24],
      }),
    []
  );

  // Get current position for map centering
  const mapCenter = currentLocation ? [currentLocation.latitude, currentLocation.longitude] as [number, number] : null;
  const liveCenter = livePositions && livePositions.length > 0 ? livePositions[livePositions.length - 1] : null;

  return (
    <div className="relative h-full w-full">
      <MapContainer center={mapCenter || defaultCenter} zoom={15} className="h-full w-full" zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <ClickHandler onClick={handleClick} />
        
        {/* Auto-center on user location initially */}
        <InitialMapCenter userLocation={mapCenter} />
        
        {/* Follow user during active session */}
        <MapCenterUpdater center={liveCenter} followUser={followUser || false} />
        
        {mapState.start && <Marker position={mapState.start} icon={startIcon} ref={(ref) => { locationRef.current = ref as unknown as L.Marker; }} />}
        {mapState.end && <Marker position={mapState.end} icon={endIcon} />}
        {polyline.length > 0 && (
          <Polyline positions={polyline} pathOptions={{ color: "#f97316", weight: 6, opacity: 0.8 }} />
        )}
        {/* Live tracking polyline */}
        {livePositions && livePositions.length > 1 && (
          <Polyline 
            positions={livePositions} 
            pathOptions={{ color: "#22c55e", weight: 4, opacity: 0.9 }} 
          />
        )}
        
        {/* Current location marker */}
        {liveCenter && (
          <Marker 
            position={liveCenter} 
            icon={new L.DivIcon({
              html: '<div class="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-300 shadow-lg animate-pulse"></div>',
              className: "",
              iconSize: [16, 16],
            })}
          />
        )}
      </MapContainer>

      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button 
          onClick={() => {
            const map = document.querySelector('.leaflet-container') as any;
            if (map && map._leaflet_id) {
              const leafletMap = (window as any).L?.map?.getContainer?.(map) || map._leaflet;
              if (leafletMap) leafletMap.zoomIn();
            }
          }}
          className="w-10 h-10 bg-white rounded-full shadow-lg border flex items-center justify-center text-lg font-bold hover:bg-gray-50"
        >
          +
        </button>
        <button 
          onClick={() => {
            const map = document.querySelector('.leaflet-container') as any;
            if (map && map._leaflet_id) {
              const leafletMap = (window as any).L?.map?.getContainer?.(map) || map._leaflet;
              if (leafletMap) leafletMap.zoomOut();
            }
          }}
          className="w-10 h-10 bg-white rounded-full shadow-lg border flex items-center justify-center text-lg font-bold hover:bg-gray-50"
        >
          −
        </button>
      </div>

      {/* Orange Distance Pill - Show distance between points */}
      {(mapState.start && mapState.end) && (
        <div className="absolute left-4 bottom-20 z-10 animate-pulse">
          <div className="px-4 py-2 rounded-full bg-orange-500 text-black shadow-xl font-bold inline-flex items-center gap-1 border-2 border-orange-400 hover:scale-105 transition-transform duration-200">
            <span id="pill-distance" className="text-lg font-black">
              {mapState.route ? mapState.route.distanceKm : calculateDirectDistance()}
            </span>
            <span className="text-xs uppercase font-semibold tracking-wider">Km</span>
          </div>
        </div>
      )}

      <div className="absolute left-3 right-3 bottom-3 flex items-center gap-3 translate-y-16 md:translate-y-0">
        <div className="rounded-full bg-white/90 backdrop-blur px-4 py-2 shadow border flex-1 flex items-center justify-between">
          <span className="text-sm">
            {mapState.start ? (mapState.end ? "Ruta lista" : "Selecciona destino") : "Selecciona origen"}
          </span>
          <button 
            onClick={() => { 
              setMapState({ start: null, end: null, route: null, locating: false });
              onNavigationUpdate("Toca el mapa para seleccionar origen y destino");
            }} 
            className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50 transition-colors"
          >
            Limpiar
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={locate} 
            className="rounded-full bg-white shadow border px-3 py-2 text-sm min-w-24 hover:bg-gray-50 transition-colors"
          >
            {isLocating ? "Ubicando..." : "Mi ubicación"}
          </button>
          <button 
            onClick={setUniversityAsStart} 
            className="rounded-full bg-blue-500 text-white shadow border px-3 py-2 text-sm min-w-24 hover:bg-blue-600 transition-colors"
          >
            Universidad
          </button>
        </div>
      </div>
    </div>
  );
}


