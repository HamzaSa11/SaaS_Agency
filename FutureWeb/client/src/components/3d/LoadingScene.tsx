import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export default function LoadingScene() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle system for the loading scene
  const particleSystem = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a sphere of particles
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Cyberpunk colors
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Magenta
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0; // Yellow
      }
    }
    
    return { positions, colors, count };
  }, []);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.5;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }
    
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 1.5;
      outerRingRef.current.rotation.x = time * 0.8;
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 2;
      innerRingRef.current.rotation.y = time * 1.2;
    }
    
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 3;
      coreRef.current.rotation.y = time * 2;
      const scale = 1 + Math.sin(time * 4) * 0.1;
      coreRef.current.scale.setScalar(scale);
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.2;
      particlesRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background fog */}
      <color attach="background" args={["#000008"]} />
      
      {/* Lighting for the loading scene */}
      <ambientLight intensity={0.1} color="#001122" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" distance={10} />
      <pointLight position={[5, 0, 0]} intensity={1} color="#ff00ff" distance={8} />
      <pointLight position={[-5, 0, 0]} intensity={1} color="#ffff00" distance={8} />
      
      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleSystem.count}
            array={particleSystem.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleSystem.count}
            array={particleSystem.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          transparent
          opacity={0.8}
          vertexColors
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      
      {/* Outer rotating ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.5, 0.1, 8, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
      
      {/* Inner rotating ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.8, 0.05, 6, 32]} />
        <meshBasicMaterial
          color="#ff00ff"
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>
      
      {/* Central core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.5]} />
        <meshBasicMaterial
          color="#ffff00"
          transparent
          opacity={0.9}
          wireframe
        />
      </mesh>
      
      {/* Additional geometric elements */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
      
      {/* Pulsing energy rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <ringGeometry args={[1.5 + i * 0.3, 1.6 + i * 0.3, 32]} />
          <meshBasicMaterial
            color={i === 0 ? "#00ffff" : i === 1 ? "#ff00ff" : "#ffff00"}
            transparent
            opacity={0.3 - i * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}