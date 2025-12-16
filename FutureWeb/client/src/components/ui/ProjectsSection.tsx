export default function ProjectsSection() {
  const projects = [
    {
      id: "quantum-01",
      title: "NEXUS PROTOCOL",
      status: "ACTIVE",
      description: "Advanced networking protocol for quantum communication systems",
      progress: 87,
      category: "PROTOCOL",
    },
    {
      id: "neural-02", 
      title: "CORTEX ENGINE",
      status: "BETA",
      description: "AI-powered rendering engine with neural enhancement capabilities",
      progress: 65,
      category: "ENGINE",
    },
    {
      id: "holo-03",
      title: "MATRIX DISPLAY",
      status: "DEVELOPMENT",
      description: "Holographic display system for immersive user experiences",
      progress: 43,
      category: "DISPLAY",
    },
    {
      id: "sync-04",
      title: "TEMPORAL CORE",
      status: "RESEARCH",
      description: "Time synchronization framework for distributed systems",
      progress: 21,
      category: "FRAMEWORK",
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
              
              <div className="project-actions">
                <button className="project-button">VIEW DETAILS</button>
                <button className="project-button secondary">MONITOR</button>
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
