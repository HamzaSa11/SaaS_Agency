export default function AboutSection() {
  const features = [
    {
      title: "QUANTUM PROCESSING",
      description: "Advanced algorithms powered by quantum computing principles",
      icon: "⚛",
    },
    {
      title: "NEURAL INTERFACE",
      description: "Intuitive interactions through advanced pattern recognition",
      icon: "🧠",
    },
    {
      title: "HOLOGRAPHIC DISPLAY",
      description: "Three-dimensional visualization beyond traditional boundaries",
      icon: "🔮",
    },
    {
      title: "TEMPORAL SYNC",
      description: "Real-time synchronization across multiple dimensions",
      icon: "⏰",
    },
  ];

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="section-header">
          <h2 className="section-title">SYSTEM SPECIFICATIONS</h2>
          <div className="title-accent"></div>
        </div>
        
        <p className="about-description">
          Our quantum-enhanced platform represents the convergence of advanced technologies,
          creating an immersive digital experience that transcends conventional web interfaces.
          Built on next-generation frameworks and powered by cutting-edge algorithms.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-border"></div>
            </div>
          ))}
        </div>
        
        <div className="about-metrics">
          <div className="metrics-header">
            <span>PERFORMANCE METRICS</span>
          </div>
          <div className="metrics-list">
            <div className="metric">
              <span className="metric-label">RENDER_SPEED:</span>
              <span className="metric-value">120 FPS</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="metric">
              <span className="metric-label">EFFICIENCY:</span>
              <span className="metric-value">97.3%</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '97%' }}></div>
              </div>
            </div>
            <div className="metric">
              <span className="metric-label">STABILITY:</span>
              <span className="metric-value">99.9%</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '99%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
