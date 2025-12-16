import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import "./styles/futuristic.css";

// Import components
import Scene from "./components/3d/Scene";
import LoadingScene from "./components/3d/LoadingScene";
import Navigation from "./components/ui/Navigation";
import HeroSection from "./components/ui/HeroSection";
import AboutSection from "./components/ui/AboutSection";
import ProjectsSection from "./components/ui/ProjectsSection";
import ContactSection from "./components/ui/ContactSection";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./components/ui/AdminPanel";
import { useNavigation } from "./lib/stores/useNavigation";
import { useAudio } from "./lib/stores/useAudio";
import { useAuth } from "./lib/stores/useAuth";

// Define control keys
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "interact", keys: ["KeyE"] },
  { name: "reset", keys: ["KeyR"] },
];

// Enhanced 3D Loading Screen
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <LoadingScene />
      </Canvas>
      
      <div className="loading-ui">
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="loading-text">
            <span className="text-primary">INITIALIZING NEURAL INTERFACE</span>
            <span className="text-secondary">Establishing quantum connection...</span>
          </div>
        </div>
        
        <div className="loading-stats">
          <div className="stat">
            <span className="stat-label">STATUS:</span>
            <span className="stat-value">ONLINE</span>
          </div>
          <div className="stat">
            <span className="stat-label">PROTOCOL:</span>
            <span className="stat-value">TCP-QUANTUM</span>
          </div>
          <div className="stat">
            <span className="stat-label">ENCRYPTION:</span>
            <span className="stat-value">AES-4096</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentSection } = useNavigation();
  const { toggleMute } = useAudio();
  const { isAuthenticated } = useAuth();

  // Initialize the app
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4000); // Extended loading time for 3D scene

    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'm' || event.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [toggleMute]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="app-container">
      <KeyboardControls map={controls}>
        {/* 3D Scene Background */}
        <div className="scene-container">
          <Canvas
            shadows
            camera={{
              position: [0, 5, 10],
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance"
            }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Content Sections */}
        <div className="content-container">
          {currentSection === 'home' && <HeroSection />}
          {currentSection === 'about' && <AboutSection />}
          {currentSection === 'projects' && <ProjectsSection />}
          {currentSection === 'contact' && <ContactSection />}
        </div>

        {/* Instructions */}
        <div className="instructions">
          <p>WASD to navigate • E to interact • M to toggle audio • R to reset</p>
        </div>

        {/* Admin Panel */}
        <AdminPanel />
      </KeyboardControls>
    </div>
  );
}

export default App;
