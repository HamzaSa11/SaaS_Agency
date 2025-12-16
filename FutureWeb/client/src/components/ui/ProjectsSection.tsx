import { useCart } from "../../lib/stores/useCart";

export default function ProjectsSection() {
  const { addItem, removeItem, isInCart } = useCart();
  const projects = [
    {
      id: "quantum-01",
      title: "NEXUS PROTOCOL",
      status: "ACTIVE",
      description: "Advanced networking protocol for quantum communication systems",
      progress: 87,
      category: "PROTOCOL",
      githubUrl: "https://github.com/microsoft/QNEAT",
    },
    {
      id: "neural-02", 
      title: "CORTEX ENGINE",
      status: "BETA",
      description: "AI-powered rendering engine with neural enhancement capabilities",
      progress: 65,
      category: "ENGINE",
      githubUrl: "https://github.com/tensorflow/tensorflow",
    },
    {
      id: "holo-03",
      title: "MATRIX DISPLAY",
      status: "DEVELOPMENT",
      description: "Holographic display system for immersive user experiences",
      progress: 43,
      category: "DISPLAY",
      githubUrl: "https://github.com/mrdoob/three.js",
    },
    {
      id: "sync-04",
      title: "TEMPORAL CORE",
      status: "RESEARCH",
      description: "Time synchronization framework for distributed systems",
      progress: 21,
      category: "FRAMEWORK",
      githubUrl: "https://github.com/cockroachdb/cockroach",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#00ff00';
      case 'BETA': return '#ffaa00';
      case 'DEVELOPMENT': return '#0088ff';
      case 'RESEARCH': return '#ff0088';
      default: return '#ffffff';
    }
  };

  return (
    <section className="projects-section">
      <div className="projects-content">
        <div className="section-header">
          <h2 className="section-title">ACTIVE PROJECTS</h2>
          <div className="title-accent"></div>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-id">{project.id}</div>
                <div 
                  className="project-status"
                  style={{ color: getStatusColor(project.status) }}
                >
                  {project.status}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <span className="project-category">{project.category}</span>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-progress">
                <div className="progress-header">
                  <span>COMPLETION</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: getStatusColor(project.status)
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="project-price">
                <span className="price-amount">29.99</span>
                <span className="price-currency">USDT/mo</span>
              </div>

              <div className="project-actions">
                <button 
                  className={`project-button cart-btn ${isInCart(project.id) ? 'in-cart' : ''}`}
                  onClick={() => {
                    if (isInCart(project.id)) {
                      removeItem(project.id);
                    } else {
                      addItem({
                        id: project.id,
                        title: project.title,
                        category: project.category,
                        price: 29.99,
                        currency: "USDT",
                      });
                    }
                  }}
                >
                  {isInCart(project.id) ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      IN CART
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                      ADD TO CART
                    </>
                  )}
                </button>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-button secondary"
                >
                  MONITOR
                </a>
              </div>
              
              <div className="project-border"></div>
            </div>
          ))}
        </div>
        
        <div className="projects-footer">
          <div className="footer-stats">
            <span>TOTAL PROJECTS: 4</span>
            <span>•</span>
            <span>AVG COMPLETION: 54%</span>
            <span>•</span>
            <span>STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
