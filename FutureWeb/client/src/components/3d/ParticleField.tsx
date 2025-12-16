import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 1000 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and colors
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorOptions = [
      new THREE.Color("#00ffff"), // Cyan
      new THREE.Color("#ff00ff"), // Magenta  
      new THREE.Color("#ffff00"), // Yellow
      new THREE.Color("#ffffff"), // White
      new THREE.Color("#00ff00"), // Green
    ];

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 50 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random colors
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);

  // Create particle material
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, []);

  // Animation
  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate the entire particle field
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
      
      // Pulsing effect
      const time = state.clock.elapsedTime;
      material.opacity = 0.5 + Math.sin(time * 2) * 0.3;
    }
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}
