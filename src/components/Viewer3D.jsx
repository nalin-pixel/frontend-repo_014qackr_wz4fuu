import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Html } from '@react-three/drei'
import { useMemo } from 'react'

function RoomMesh({ room, color = '#60a5fa' }) {
  const { x, y, z, width, depth, height, name } = room
  const position = useMemo(() => [x + width / 2, z + height / 2, y + depth / 2], [x, y, z, width, depth, height])
  const size = useMemo(() => [width, height, depth], [width, height, depth])
  return (
    <group>
      <mesh position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <Html position={[x + width/2, z + height + 0.1, y + depth/2]} center>
        <div style={{
          background:'rgba(15,23,42,0.8)', color:'white', padding:'2px 6px', borderRadius:6, fontSize:12,
          border:'1px solid rgba(59,130,246,0.4)'
        }}>{name}</div>
      </Html>
    </group>
  )
}

export default function Viewer3D({ data }) {
  const rooms = data?.rooms || []
  const fp = data?.footprint
  const box = useMemo(() => ({ w: fp?.width || 10, d: fp?.depth || 8, h: fp?.height || 3 }), [fp])

  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-900">
      <Canvas camera={{ position: [box.w*1.2, box.h*2.2, box.d*1.6], fov: 50 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.1} castShadow />
        <Grid position={[box.w/2, 0, box.d/2]} infiniteGrid cellSize={1} sectionColor={'#334155'} />

        {/* Footprint outline */}
        <mesh position={[box.w/2, 0.05, box.d/2]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[box.w, box.d]} />
          <meshStandardMaterial color="#0ea5e9" transparent opacity={0.15} />
        </mesh>

        {rooms.map((r, i) => (
          <RoomMesh key={i} room={r} color={i % 2 ? '#34d399' : '#60a5fa'} />
        ))}

        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}
