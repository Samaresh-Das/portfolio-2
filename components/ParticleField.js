import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual particle system
function Particles({ count = 500, isMobile = false }) {
  const mesh = useRef();
  const actualCount = isMobile ? 200 : count;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const colors = new Float32Array(actualCount * 3);

    // Orange palette matching brand
    const palette = [
      new THREE.Color("#ff8303"),
      new THREE.Color("#f0e3ca"),
      new THREE.Color("#c96a00"),
      new THREE.Color("#ffe0b2"),
    ];

    for (let i = 0; i < actualCount; i++) {
      // Spread across wide area
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return [positions, colors];
  }, [actualCount]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.018;
    mesh.current.rotation.x = Math.sin(t * 0.08) * 0.04;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={actualCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField({ isMobile = false }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
      >
        <Particles count={500} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
