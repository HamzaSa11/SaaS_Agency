import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

interface FuturisticCubeProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  color?: string;
}

export default function FuturisticCube({ 
  position = [0, 0, 0], 
  scale = 1,
  rotationSpeed = 0.01,
  color = "#0066ff"
}: FuturisticCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Create holographic material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      emissive: color,
      emissiveIntensity: hovered ? 0.5 : 0.2,
      wireframe: false,
      metalness: 0.8,
      roughness: 0.2,
    });
  }, [color, hovered]);

  // Create wireframe material for edges
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: hovered ? 1.0 : 0.6,
    });
  }, [color, hovered]);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.5;
      
      // Floating animation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
      
      // Scale animation on hover/click
      const targetScale = clicked ? scale * 1.3 : hovered ? scale * 1.1 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Update material emissive intensity
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = THREE.MathUtils.lerp(
          material.emissiveIntensity,
          hovered ? 0.5 : 0.2,
          0.1
        );
      }
    }
  });

  const handleClick = () => {
    setClicked(!clicked);
    console.log("Futuristic cube clicked!");
  };

  return (
    <group position={position}>
      {/* Main cube */}
      <mesh
        ref={meshRef}
        material={material}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh
        position={[0, 0, 0]}
        material={wireframeMaterial}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.01, 1.01, 1.01]} />
      </mesh>
      
      {/* Glow effect */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}
