import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    
    // Simulate transmission delay
    setTimeout(() => {
      setIsTransmitting(false);
      alert("Message transmitted successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-content">
        <div className="section-header">
          <h2 className="section-title">ESTABLISH CONNECTION</h2>
          <div className="title-accent"></div>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-header">
              <h3>TRANSMISSION PARAMETERS</h3>
            </div>
            
            <div className="info-items">
              <div className="info-item">
                <span className="info-label">FREQUENCY:</span>
                <span className="info-value">2087.42 MHz</span>
              </div>
              <div className="info-item">
                <span className="info-label">PROTOCOL:</span>
                <span className="info-value">QUANTUM_TCP/IP</span>
              </div>
              <div className="info-item">
                <span className="info-label">ENCRYPTION:</span>
                <span className="info-value">AES-2048</span>
              </div>
              <div className="info-item">
                <span className="info-label">LATENCY:</span>
                <span className="info-value">0.003ms</span>
              </div>
            </div>
            
            <div className="contact-channels">
              <h4>COMMUNICATION CHANNELS</h4>
              <div className="channel">
                <span className="channel-icon">📡</span>
                <span>NEURAL_LINK</span>
                <span className="channel-status online">ONLINE</span>
              </div>
              <div className="channel">
                <span className="channel-icon">💬</span>
                <span>QUANTUM_CHAT</span>
                <span className="channel-status online">ONLINE</span>
              </div>
              <div className="channel">
                <span className="channel-icon">📧</span>
                <span>HOLO_MAIL</span>
                <span className="channel-status maintenance">MAINTENANCE</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">IDENTIFICATION:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">COMM_ADDRESS:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">SUBJECT_CODE:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">DATA_PAYLOAD:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-textarea"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`form-submit ${isTransmitting ? 'transmitting' : ''}`}
                disabled={isTransmitting}
              >
                {isTransmitting ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                <div className="button-glow"></div>
              </button>
            </form>
            
            {isTransmitting && (
              <div className="transmission-status">
                <div className="status-bar">
                  <div className="status-progress"></div>
                </div>
                <span>ENCODING AND TRANSMITTING MESSAGE...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
