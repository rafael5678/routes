"use client";

import { useEffect, useState } from "react";

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("✅ Service Worker registrado:", registration.scope);
          })
          .catch((error) => {
            console.log("❌ Error al registrar Service Worker:", error);
          });
      });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("✅ Usuario aceptó instalar la PWA");
    } else {
      console.log("❌ Usuario rechazó instalar la PWA");
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-2xl p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <span className="text-3xl">📱</span>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Instalar RunTracker</h3>
            <p className="text-xs opacity-90 mb-3">
              Instala la app para usarla sin conexión y acceder más rápido
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors"
              >
                Instalar
              </button>
              <button
                onClick={() => setShowInstallButton(false)}
                className="bg-orange-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-800 transition-colors"
              >
                Ahora no
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowInstallButton(false)}
            className="text-white hover:text-orange-200 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

