export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8">
      <div className="w-full max-w-3xl rounded-2xl border border-black/10 dark:border-white/15 p-8 grid gap-6">
        <h1 className="text-2xl font-semibold">Proyecto de Mapa</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Ve al mapa funcional con selección de ubicación, ruta y controles.
        </p>
        <div className="flex gap-3">
          <a className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black" href="/mapa">
            Abrir mapa
          </a>
          <a className="px-4 py-2 rounded-lg border" href="https://leafletjs.com/" target="_blank" rel="noreferrer">
            Docs Leaflet
          </a>
        </div>
      </div>
    </div>
  );
}
