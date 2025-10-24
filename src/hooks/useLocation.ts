"use client";

import { useState, useEffect, useCallback } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface LocationState {
  currentLocation: LocationData | null;
  isLocating: boolean;
  error: string | null;
  lastUpdate: number;
}

const UNIVERSITY_COORDINATES: [number, number] = [1.2098, -77.2765]; // Universidad Cooperativa de Colombia - Pandiaco, Pasto

export function useLocation() {
  const [locationState, setLocationState] = useState<LocationState>({
    currentLocation: null,
    isLocating: false,
    error: null,
    lastUpdate: 0,
  });

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationState(prev => ({
        ...prev,
        error: "Geolocalización no soportada en este navegador",
        isLocating: false,
      }));
      return;
    }

    setLocationState(prev => ({
      ...prev,
      isLocating: true,
      error: null,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
        };

        setLocationState({
          currentLocation: locationData,
          isLocating: false,
          error: null,
          lastUpdate: Date.now(),
        });
      },
      (error) => {
        let errorMessage = "Error al obtener la ubicación";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso de ubicación denegado. Activa la ubicación en tu dispositivo";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Ubicación no disponible. Verifica tu conexión GPS";
            break;
          case error.TIMEOUT:
            errorMessage = "Tiempo de espera agotado. Intenta de nuevo";
            break;
        }

        setLocationState(prev => ({
          ...prev,
          isLocating: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // 20 segundos para mejor precisión
        maximumAge: 0, // Siempre obtener ubicación nueva
      }
    );
  }, []);

  const setUniversityLocation = useCallback(() => {
    const universityLocation: LocationData = {
      latitude: UNIVERSITY_COORDINATES[0],
      longitude: UNIVERSITY_COORDINATES[1],
      accuracy: 0,
      timestamp: Date.now(),
    };

    setLocationState({
      currentLocation: universityLocation,
      isLocating: false,
      error: null,
      lastUpdate: Date.now(),
    });
  }, []);

  // Auto-detect location on mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const isNearUniversity = useCallback((location: LocationData | null) => {
    if (!location) return false;
    
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      UNIVERSITY_COORDINATES[0],
      UNIVERSITY_COORDINATES[1]
    );
    
    return distance < 2000; // Dentro de 2km de la universidad (más flexible)
  }, []);

  return {
    ...locationState,
    getCurrentLocation,
    setUniversityLocation,
    isNearUniversity: isNearUniversity(locationState.currentLocation),
    universityCoordinates: UNIVERSITY_COORDINATES,
  };
}

// Función para calcular distancia entre dos puntos (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distancia en metros
}
