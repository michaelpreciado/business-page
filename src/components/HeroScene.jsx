import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function Orb({ position, color, scale = 1, speed = 1 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed
    mesh.current.rotation.x = t * 0.18
    mesh.current.rotation.y = t * 0.26
  })

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.45} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.12}
          metalness={0.5}
          distort={0.32}
          speed={1.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

function Ring() {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.z = state.clock.elapsedTime * 0.14
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18
  })

  return (
    <mesh ref={mesh} rotation={[Math.PI / 2.6, 0, 0]}>
      <torusGeometry args={[2.45, 0.035, 32, 220]} />
      <meshStandardMaterial color="#8fbdff" emissive="#234a7d" emissiveIntensity={0.7} transparent opacity={0.72} />
    </mesh>
  )
}

function ParticleField() {
  const points = useRef()
  const positions = useMemo(() => {
    const count = 120
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const radius = 2.4 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 3.2
      arr[i * 3] = Math.cos(theta) * radius
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = Math.sin(theta) * radius
    }

    return arr
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#9fcbff" size={0.03} sizeAttenuation transparent opacity={0.85} />
    </points>
  )
}

function SceneContent() {
  return (
    <>
      <fog attach="fog" args={["#05070c", 7, 16]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} color="#d7e8ff" />
      <pointLight position={[-4, -2, 2]} intensity={1.4} color="#4fd6ff" />
      <pointLight position={[3, 2, -2]} intensity={0.9} color="#6d7dff" />
      <Orb position={[0, 0.1, 0]} color="#6ea8ff" scale={1.1} speed={0.9} />
      <Ring />
      <ParticleField />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="hero-scene-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 1.6]}>
        <SceneContent />
      </Canvas>
      <div className="hero-scene-glow" />
    </div>
  )
}
