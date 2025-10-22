"use client";

interface QuickDestination {
  name: string;
  coordinates: [number, number]; // [lat, lng]
  category: string;
  estimatedTime: number; // in minutes
}

interface QuickDestinationsProps {
  onDestinationSelect: (lat: number, lng: number, name: string) => void;
  currentLocation: [number, number] | null;
}

const POPULAR_DESTINATIONS: QuickDestination[] = [
  {
    name: "Universidad de Nariño",
    coordinates: [1.2105, -77.2778],
    category: "Educación",
    estimatedTime: 3
  },
  {
    name: "Centro de Pasto",
    coordinates: [1.2086, -77.2789],
    category: "Centro",
    estimatedTime: 12
  },
  {
    name: "Terminal de Transporte",
    coordinates: [1.2056, -77.2756],
    category: "Transporte",
    estimatedTime: 8
  },
  {
    name: "Hospital Universitario",
    coordinates: [1.2167, -77.2834],
    category: "Salud",
    estimatedTime: 10
  },
  {
    name: "Mall de los Andes",
    coordinates: [1.2198, -77.2901],
    category: "Comercial",
    estimatedTime: 15
  },
  {
    name: "Parque de la Salud",
    coordinates: [1.2189, -77.2856],
    category: "Parque",
    estimatedTime: 6
  },
  {
    name: "Aeropuerto Antonio Nariño",
    coordinates: [1.1967, -77.2911],
    category: "Transporte",
    estimatedTime: 25
  },
  {
    name: "Plaza de Nariño",
    coordinates: [1.2078, -77.2798],
    category: "Centro",
    estimatedTime: 10
  }
];

export default function QuickDestinations({ onDestinationSelect, currentLocation }: QuickDestinationsProps) {
  const handleDestinationClick = (destination: QuickDestination) => {
    onDestinationSelect(destination.coordinates[0], destination.coordinates[1], destination.name);
  };

  if (!currentLocation) return null;

  return (
    <section className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        </div>
        <p className="font-semibold text-blue-800">Destinos desde la Universidad</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {POPULAR_DESTINATIONS.map((destination, index) => (
          <button
            key={index}
            onClick={() => handleDestinationClick(destination)}
            className="p-3 rounded-xl bg-white border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-800 truncate">{destination.name}</p>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {destination.estimatedTime}min
              </span>
            </div>
            <p className="text-xs text-gray-600">{destination.category}</p>
          </button>
        ))}
      </div>
      
      <p className="text-xs text-blue-600 mt-2 text-center">
        Toca un destino para calcular la ruta automáticamente
      </p>
    </section>
  );
}
