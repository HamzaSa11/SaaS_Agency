import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface NeonGridProps {
  position?: [number, number, number];
  size?: number;
  divisions?: number;
}

export default function NeonGrid({ 
  position = [0, 0, 0], 
  size = 20,
  divisions = 20 
}: NeonGridProps) {
  const gridRef = useRef<THREE.Group>(null);

  // Create grid lines
  const { horizontalLines, verticalLines } = useMemo(() => {
    const horizontalLines: THREE.Vector3[][] = [];
    const verticalLines: THREE.Vector3[][] = [];
    
    const step = size / divisions;
    const halfSize = size / 2;

    // Create horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const z = -halfSize + i * step;
      horizontalLines.push([
        new THREE.Vector3(-halfSize, 0, z),
        new THREE.Vector3(halfSize, 0, z)
      ]);
    }

    // Create vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -halfSize + i * step;
      verticalLines.push([
        new THREE.Vector3(x, 0, -halfSize),
        new THREE.Vector3(x, 0, halfSize)
      ]);
    }

    return { horizontalLines, verticalLines };
  }, [size, divisions]);

  // Create line material
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: "#00ffff",
      transparent: true,
      opacity: 0.5,
    });
  }, []);

  // Animation
  useFrame((state) => {
    if (gridRef.current) {
      const time = state.clock.elapsedTime;
      
      // Pulsing opacity effect
      material.opacity = 0.3 + Math.sin(time * 3) * 0.2;
      
      // Subtle movement
      gridRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={position}>
      {/* Horizontal lines */}
      {horizontalLines.map((points, index) => (
        <line key={`h-${index}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                points[0].x, points[0].y, points[0].z,
                points[1].x, points[1].y, points[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <primitive object={material} />
        </line>
      ))}
      
      {/* Vertical lines */}
      {verticalLines.map((points, index) => (
        <line key={`v-${index}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                points[0].x, points[0].y, points[0].z,
                points[1].x, points[1].y, points[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <primitive object={material} />
        </line>
      ))}
      
      {/* Center highlight */}
      <mesh position={[0, 0.01, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial 
          color="#ff00ff" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
