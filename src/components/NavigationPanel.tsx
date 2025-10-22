"use client";

interface NavigationPanelProps {
  message: string;
}

export default function NavigationPanel({ message }: NavigationPanelProps) {
  return (
    <section className="bg-blue-50 rounded-2xl p-3 border border-blue-200">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        </div>
        <p className="font-semibold text-blue-800">Instrucciones</p>
      </div>
      <p className="text-sm text-blue-700">{message}</p>
    </section>
  );
}
