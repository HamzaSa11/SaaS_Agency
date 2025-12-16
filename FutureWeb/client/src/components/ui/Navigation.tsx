import { useNavigation } from "../../lib/stores/useNavigation";
import { useAuth } from "../../lib/stores/useAuth";

export default function Navigation() {
  const { currentSection, setCurrentSection } = useNavigation();
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'home', label: 'HOME', icon: '◆' },
    { id: 'about', label: 'ABOUT', icon: '◇' },
    { id: 'projects', label: 'PROJECTS', icon: '◈' },
    { id: 'contact', label: 'CONTACT', icon: '◉' },
  ] as const;

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="brand-text">QUANTUM_UI</span>
        <div className="brand-indicator"></div>
      </div>
      
      <ul className="nav-menu">
        {navigationItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => setCurrentSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
              <div className="nav-glow"></div>
            </button>
          </li>
        ))}
      </ul>
      
      <div className="nav-status">
        {user ? (
          <>
            <button className="user-button">
              <span className="user-icon">◉</span>
              <span>{user.username.toUpperCase()}</span>
            </button>
            <button className="logout-button" onClick={logout}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <span className="status-indicator"></span>
            <span className="status-text">ONLINE</span>
          </>
        )}
      </div>
    </nav>
  );
}
