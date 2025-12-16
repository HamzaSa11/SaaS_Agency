import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface FloatingPlatformProps {
  position?: [number, number, number];
  size?: [number, number, number];
}

export default function FloatingPlatform({ 
  position = [0, 0, 0],
  size = [8, 0.2, 8]
}: FloatingPlatformProps) {
  const platformRef = useRef<THREE.Group>(null);

  // Create holographic platform material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#001166",
      transparent: true,
      opacity: 0.7,
      emissive: "#0033aa",
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
    });
  }, []);

  // Create edge glow material
  const edgeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#00aaff",
      transparent: true,
      opacity: 0.8,
    });
  }, []);

  // Animation
  useFrame((state) => {
    if (platformRef.current) {
      const time = state.clock.elapsedTime;
      
      // Floating animation
      platformRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
      
      // Subtle rotation
      platformRef.current.rotation.y += 0.002;
      
      // Pulsing emissive intensity
      material.emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group ref={platformRef} position={position}>
      {/* Main platform */}
      <mesh material={material}>
        <boxGeometry args={size} />
      </mesh>
      
      {/* Edge highlights */}
      <mesh position={[0, size[1]/2 + 0.01, 0]}>
        <boxGeometry args={[size[0] * 1.05, 0.02, size[2] * 1.05]} />
        <primitive object={edgeMaterial} />
      </mesh>
      
      {/* Corner markers */}
      {[
        [-size[0]/2, size[1]/2, -size[2]/2],
        [size[0]/2, size[1]/2, -size[2]/2],
        [-size[0]/2, size[1]/2, size[2]/2],
        [size[0]/2, size[1]/2, size[2]/2],
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
