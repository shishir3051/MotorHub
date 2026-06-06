import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Ring,
  Torus,
  Box,
  Sphere,
  Cylinder,
} from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

function OrbitalRings() {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) ring1.current.rotation.x = t * 0.35;
    if (ring2.current) ring2.current.rotation.y = t * 0.25;
  });

  return (
    <group>
      <Ring ref={ring1} args={[3.2, 3.35, 48]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#FF6B35" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
      <Ring ref={ring2} args={[4, 4.1, 48]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#F7931E" transparent opacity={0.18} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

function EnergyCore() {
  const core = useRef();

  useFrame((state) => {
    if (core.current) core.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={[0, 0.3, 0]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={core} args={[0.75, 32, 32]}>
          <MeshDistortMaterial
            color="#F7931E"
            emissive="#FF6B35"
            emissiveIntensity={0.5}
            distort={0.4}
            speed={2}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function DetailedMotorcycle() {
  const bike = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bike.current) bike.current.rotation.y = Math.sin(t * 0.35) * 0.12;
    if (wheel1.current) wheel1.current.rotation.x = t * 1.5;
    if (wheel2.current) wheel2.current.rotation.x = t * 1.5;
  });

  const metal = useMemo(() => ({ color: '#FF6B35', metalness: 0.95, roughness: 0.15 }), []);
  const dark = useMemo(() => ({ color: '#1A1A1B', metalness: 0.7, roughness: 0.35 }), []);
  const chrome = useMemo(() => ({ color: '#F7931E', metalness: 1, roughness: 0.05 }), []);

  return (
    <group ref={bike} position={[0, -1.2, 0]} scale={0.85}>
      <group ref={wheel1} position={[-1.8, 0, 0]}>
        <Torus args={[0.55, 0.12, 12, 36]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial {...metal} />
        </Torus>
      </group>
      <group ref={wheel2} position={[1.8, 0, 0]}>
        <Torus args={[0.55, 0.12, 12, 36]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial {...metal} />
        </Torus>
      </group>
      <Box args={[3.2, 0.18, 0.45]} position={[0, 0.35, 0]} rotation={[0, 0, -0.08]}>
        <meshStandardMaterial {...dark} />
      </Box>
      <Box args={[0.9, 0.65, 0.55]} position={[0, 0.05, 0]}>
        <meshStandardMaterial {...dark} />
      </Box>
      <Sphere args={[0.45, 24, 24]} position={[-0.4, 0.65, 0]} scale={[1.6, 0.9, 0.85]}>
        <meshStandardMaterial {...chrome} />
      </Sphere>
      <Box args={[1, 0.18, 0.4]} position={[0.9, 0.55, 0]} rotation={[0, 0, -0.12]}>
        <meshStandardMaterial {...dark} />
      </Box>
    </group>
  );
}

function SceneContent({ immersive = false, active = true }) {
  const root = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    if (!active || !root.current) return;
    const t = state.clock.elapsedTime;
    root.current.rotation.y = t * (immersive ? 0.06 : 0.1);
    root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, mouse.x * 0.35, 0.03);
    root.current.position.y = THREE.MathUtils.lerp(
      root.current.position.y,
      mouse.y * 0.2 + Math.sin(t * 0.4) * 0.08,
      0.03
    );
  });

  const starCount = immersive ? 2000 : 1200;
  const sparkleCount = immersive ? 50 : 30;

  return (
    <>
      <color attach="background" args={['#0A0A0B']} />
      <fog attach="fog" args={['#0A0A0B', 8, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 8, 5]} intensity={1.4} color="#FF6B35" />
      <pointLight position={[0, 2, 3]} intensity={1} color="#FF6B35" distance={15} />

      <Stars radius={60} depth={40} count={starCount} factor={3} saturation={0} fade speed={0.4} />
      <Sparkles count={sparkleCount} scale={immersive ? 12 : 8} size={2.5} speed={0.3} color="#FF6B35" />

      <group ref={root}>
        <OrbitalRings />
        <EnergyCore />
        <DetailedMotorcycle />
      </group>
    </>
  );
}

export default function MotorcycleScene({ immersive = false, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.05, rootMargin: '100px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={ref} className={`w-full h-full ${className}`}>
      {mounted && (
        <Canvas
          camera={{ position: [0, 1.5, immersive ? 9 : 8], fov: immersive ? 50 : 45 }}
          dpr={[1, 1.5]}
          frameloop={inView ? 'always' : 'demand'}
          gl={{ antialias: true, alpha: !immersive, powerPreference: 'high-performance' }}
          style={{ background: immersive ? '#0A0A0B' : 'transparent' }}
        >
          <SceneContent immersive={immersive} active={inView} />
        </Canvas>
      )}
    </div>
  );
}
