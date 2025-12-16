import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useAuth } from "../lib/stores/useAuth";
import LoadingScene from "../components/3d/LoadingScene";

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login, register, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [isLoginMode, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoginMode && password !== confirmPassword) {
      return;
    }

    if (isLoginMode) {
      await login(username, password);
    } else {
      await register(username, password);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-background">
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
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              {isLoginMode ? "ACCESS TERMINAL" : "CREATE IDENTITY"}
            </h1>
            <div className="login-subtitle">
              {isLoginMode ? "Enter your credentials" : "Register new user"}
            </div>
            <div className="login-decorative-line"></div>
          </div>

          {error && (
            <div className="login-error">
              <span className="error-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <div className="input-wrapper">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cyber-input"
                  placeholder="Enter username"
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cyber-input"
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                  autoComplete={isLoginMode ? "current-password" : "new-password"}
                />
                <div className="input-glow"></div>
              </div>
            </div>

            {!isLoginMode && (
              <div className="input-group">
                <label htmlFor="confirmPassword" className="input-label">
                  CONFIRM PASSWORD
                </label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="cyber-input"
                    placeholder="Confirm password"
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <div className="input-glow"></div>
                </div>
                {password !== confirmPassword && confirmPassword.length > 0 && (
                  <div className="password-mismatch">Passwords do not match</div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="cyber-button primary"
              disabled={isLoading || (!isLoginMode && password !== confirmPassword)}
            >
              <span className="button-content">
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    PROCESSING...
                  </>
                ) : isLoginMode ? (
                  "AUTHENTICATE"
                ) : (
                  "REGISTER"
                )}
              </span>
              <div className="button-glow"></div>
            </button>
          </form>

          <div className="login-footer">
            <button
              type="button"
              onClick={toggleMode}
              className="toggle-mode-button"
              disabled={isLoading}
            >
              {isLoginMode
                ? "Need an account? Create Identity"
                : "Already have an account? Login"}
            </button>
          </div>

          <div className="login-decoration">
            <div className="corner-decoration top-left"></div>
            <div className="corner-decoration top-right"></div>
            <div className="corner-decoration bottom-left"></div>
            <div className="corner-decoration bottom-right"></div>
          </div>
        </div>

        <div className="login-stats">
          <div className="stat-item">
            <span className="stat-label">SECURITY LEVEL:</span>
            <span className="stat-value">MAXIMUM</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ENCRYPTION:</span>
            <span className="stat-value">QUANTUM-256</span>
          </div>
        </div>
      </div>
    </div>
  );
}
