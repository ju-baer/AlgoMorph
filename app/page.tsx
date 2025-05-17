import AlgorithmVisualizer from "@/components/algorithm-visualizer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AlgoMorph</h1>
          <p className="text-xl text-white/90">Visualize algorithms and data structures, one step at a time</p>
        </header>
        <AlgorithmVisualizer />
      </div>
    </main>
  )
}
