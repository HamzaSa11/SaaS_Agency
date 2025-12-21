import { useEffect, useState } from "react";
import { useNavigation } from "../../lib/stores/useNavigation";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { navigateTo } = useNavigation();
  const fullText = "WELCOME TO THE FUTURE";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchClickCount = async () => {
      try {
        const res = await fetch("/api/clicks/count");
        if (res.ok) {
          const data = await res.json();
          setClickCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch click count:", error);
      }
    };
    fetchClickCount();
  }, []);

  const handleHeaderClick = () => {
    const container = document.querySelector('.content-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInitializeClick = async () => {
    try {
      await fetch("/api/clicks", { method: "POST" });
    } catch (error) {
      console.error("Failed to log click:", error);
    }
    navigateTo('projects');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-header" onClick={handleHeaderClick}>
          <h1 className="hero-title" style={{ cursor: 'pointer' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <span className={`title-line ${isHovered ? 'hover' : ''}`}>{typedText}</span>
            <span className="cursor">|</span>
          </h1>
          <div className="title-underline"></div>
        </div>
        
        <p className="hero-subtitle">
          Experience the next generation of web technology with immersive 3D interfaces
          and quantum-powered interactions.
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{clickCount}</span>
            <span className="stat-label">CONNECTIONS</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">UPTIME</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">POSSIBILITIES</span>
          </div>
        </div>
        
        <div className="hero-actions">
          <button className="cta-button primary" onClick={handleInitializeClick}>
            <span>INITIALIZE</span>
            <div className="button-glow"></div>
          </button>
          <button className="cta-button secondary">
            <span>LEARN MORE</span>
          </button>
        </div>
      </div>
      
      <div className="hero-scanner">
        <div className="scanner-line"></div>
        <div className="scanner-grid">
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i} className="grid-dot"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
