import { useEffect, useState } from "react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
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

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-header">
          <h1 className="hero-title">
            <span className="title-line">{typedText}</span>
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
            <span className="stat-number">2087</span>
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
          <button className="cta-button primary">
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
