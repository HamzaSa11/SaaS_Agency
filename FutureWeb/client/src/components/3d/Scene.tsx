import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Import 3D components
import FuturisticCube from "./FuturisticCube";
import ParticleField from "./ParticleField";
import NeonGrid from "./NeonGrid";
import FloatingPlatform from "./FloatingPlatform";
import Lights from "../effects/Lights";
import PostProcessing from "../effects/PostProcessing";

// Import hooks
import { useNavigation } from "../../lib/stores/useNavigation";

export default function Scene() {
  const sceneRef = useRef<THREE.Group>(null);
  const { currentSection } = useNavigation();

  // Animate the scene based on current section
  useFrame((state) => {
    if (sceneRef.current) {
      // Subtle rotation animation
      sceneRef.current.rotation.y += 0.001;
      
      // Dynamic camera movement based on section
      const time = state.clock.elapsedTime;
      
      switch (currentSection) {
        case 'home':
          state.camera.position.x = Math.sin(time * 0.1) * 2;
          state.camera.position.y = 5 + Math.cos(time * 0.1) * 1;
          break;
        case 'about':
          state.camera.position.x = Math.sin(time * 0.2) * 5;
          state.camera.position.z = 10 + Math.sin(time * 0.1) * 2;
          break;
        case 'projects':
          state.camera.position.y = 8 + Math.sin(time * 0.15) * 2;
          state.camera.position.z = 15;
          break;
        case 'contact':
          state.camera.position.x = Math.cos(time * 0.1) * 3;
          state.camera.position.y = 6;
          break;
      }
      
      // Always look at center
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Background */}
      <color attach="background" args={["#000008"]} />
      
      {/* Lighting */}
      <Lights />
      
      {/* 3D Objects */}
      <FuturisticCube position={[0, 2, 0]} />
      <FloatingPlatform position={[0, -1, 0]} />
      <NeonGrid position={[0, -2, 0]} />
      
      {/* Particle Effects */}
      <ParticleField count={1000} />
      
      {/* Additional cubes for visual interest */}
      <FuturisticCube 
        position={[-5, 1, -3]} 
        scale={0.5}
        rotationSpeed={0.02}
        color="#00ffff"
      />
      <FuturisticCube 
        position={[5, 3, -2]} 
        scale={0.7}
        rotationSpeed={-0.015}
        color="#ff00ff"
      />
      
      {/* Additional cyberpunk cubes */}
      <FuturisticCube 
        position={[0, 4, -5]} 
        scale={0.3}
        rotationSpeed={0.025}
        color="#ffff00"
      />
      <FuturisticCube 
        position={[-3, -1, 2]} 
        scale={0.4}
        rotationSpeed={-0.018}
        color="#00ffff"
      />
      <FuturisticCube 
        position={[4, 1, 3]} 
        scale={0.6}
        rotationSpeed={0.012}
        color="#ff00ff"
      />
      
      {/* Post Processing Effects */}
      <PostProcessing />
    </group>
  );
}
