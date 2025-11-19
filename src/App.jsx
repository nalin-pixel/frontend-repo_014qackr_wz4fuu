import { useState } from 'react'
import Generator from './components/Generator'
import Viewer3D from './components/Viewer3D'

function App() {
  const [data, setData] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              AI House Plan & 3D Preview
            </h1>
            <p className="text-blue-200">
              Type a description, generate a floor plan, and explore the layout in 3D.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-2">
              <Generator onResult={setData} />
              {data && (
                <div className="mt-4 text-sm text-blue-200/80 bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
                  <div className="font-semibold text-white mb-2">Program</div>
                  <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data.meta.program, null, 2)}</pre>
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              <Viewer3D data={data} />
              {!data && (
                <p className="text-center text-blue-200/70 mt-3">Your 3D layout will appear here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
