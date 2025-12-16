import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate point lights
    if (pointLight1Ref.current) {
      pointLight1Ref.current.position.x = Math.sin(time) * 5;
      pointLight1Ref.current.position.z = Math.cos(time) * 5;
      pointLight1Ref.current.intensity = 0.5 + Math.sin(time * 2) * 0.2;
    }
    
    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = Math.sin(time + Math.PI) * 3;
      pointLight2Ref.current.position.z = Math.cos(time + Math.PI) * 3;
      pointLight2Ref.current.intensity = 0.4 + Math.cos(time * 1.5) * 0.2;
    }
  });

  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.1} color="#000022" />
      
      {/* Main directional light */}
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Animated point lights for futuristic effect */}
      <pointLight
        ref={pointLight1Ref}
        position={[5, 3, 0]}
        intensity={0.5}
        color="#00ffff"
        distance={20}
      />
      
      <pointLight
        ref={pointLight2Ref}
        position={[-3, 4, 2]}
        intensity={0.4}
        color="#ff00ff"
        distance={15}
      />
      
      {/* Spotlight for dramatic effect */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.6}
        color="#0066ff"
        castShadow
      />
      
      {/* Hemisphere light for soft ambient lighting */}
      <hemisphereLight
        args={["#001155", "#000011", 0.3]}
      />
    </>
  );
}
