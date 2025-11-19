import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Generator({ onResult }) {
  const [prompt, setPrompt] = useState('3 bedroom modern house with open plan living and an office')
  const [width, setWidth] = useState(12)
  const [depth, setDepth] = useState(10)
  const [floors, setFloors] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, width: Number(width), depth: Number(depth), floors: Number(floors) })
      })
      if (!res.ok) throw new Error(`Generation failed: ${res.status}`)
      const data = await res.json()
      onResult?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Describe your house</label>
          <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={3}
            className="w-full bg-slate-900/60 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Width (m)</label>
            <input type="number" step="0.1" value={width} onChange={(e)=>setWidth(e.target.value)}
              className="w-full bg-slate-900/60 text-white p-2 rounded-lg border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Depth (m)</label>
            <input type="number" step="0.1" value={depth} onChange={(e)=>setDepth(e.target.value)}
              className="w-full bg-slate-900/60 text-white p-2 rounded-lg border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Floors</label>
            <input type="number" min={1} max={3} value={floors} onChange={(e)=>setFloors(e.target.value)}
              className="w-full bg-slate-900/60 text-white p-2 rounded-lg border border-slate-700" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button disabled={loading} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-lg">
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
          {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>
      </form>
    </div>
  )
}
