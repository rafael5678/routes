"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/mapa");
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <div className="w-full max-w-3xl rounded-2xl border border-black/10 dark:border-white/15 p-8 grid gap-6">
        <h1 className="text-2xl font-semibold">Cargando...</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Redirigiendo al mapa...
        </p>
      </div>
    </div>
  );
}
