import { useState, useEffect } from "react";
import { useAuth } from "../../lib/stores/useAuth";

interface LoginEvent {
  id: number;
  userId: number;
  username: string;
  loginTime: string;
  ipAddress: string | null;
  userAgent: string | null;
}

interface Purchase {
  id: number;
  userId: number;
  username: string;
  projectName: string;
  projectId: string;
  amount: number;
  currency: string;
  purchaseTime: string;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loginEvents, setLoginEvents] = useState<LoginEvent[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [activeTab, setActiveTab] = useState<"logins" | "projects">("logins");
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = user?.username === "admin";

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchData();
    }
  }, [isOpen, isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [loginsRes, purchasesRes] = await Promise.all([
        fetch("/api/login-events"),
        fetch("/api/purchases"),
      ]);
      
      if (loginsRes.ok) {
        const loginsData = await loginsRes.json();
        setLoginEvents(loginsData);
      }
      
      if (purchasesRes.ok) {
        const purchasesData = await purchasesRes.json();
        setPurchases(purchasesData);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <button
        className="admin-icon"
        onClick={() => setIsOpen(!isOpen)}
        title="Admin Panel"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 2.32.64 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0 1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>

      {isOpen && (
        <div className="admin-overlay" onClick={() => setIsOpen(false)}>
          <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
            <div className="admin-header">
              <h2 className="admin-title">ADMIN CONTROL CENTER</h2>
              <button className="admin-close" onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="admin-tabs">
              <button
                className={`admin-tab ${activeTab === "logins" ? "active" : ""}`}
                onClick={() => setActiveTab("logins")}
              >
                LOGIN EVENTS
              </button>
              <button
                className={`admin-tab ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                PROJECT SELECTIONS
              </button>
            </div>

            <div className="admin-content">
              {isLoading ? (
                <div className="admin-loading">
                  <div className="loading-spinner"></div>
                  <span>LOADING DATA...</span>
                </div>
              ) : activeTab === "logins" ? (
                <div className="admin-list">
                  {loginEvents.length === 0 ? (
                    <div className="admin-empty">No login events recorded</div>
                  ) : (
                    loginEvents.map((event) => (
                      <div key={event.id} className="admin-card">
                        <div className="admin-card-header">
                          <span className="admin-username">{event.username}</span>
                          <span className="admin-badge">USER ID: {event.userId}</span>
                        </div>
                        <div className="admin-card-body">
                          <div className="admin-field">
                            <span className="field-label">TIME:</span>
                            <span className="field-value">{formatDate(event.loginTime)}</span>
                          </div>
                          {event.ipAddress && (
                            <div className="admin-field">
                              <span className="field-label">IP:</span>
                              <span className="field-value">{event.ipAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="admin-list">
                  {purchases.length === 0 ? (
                    <div className="admin-empty">No project selections recorded</div>
                  ) : (
                    purchases.map((purchase) => (
                      <div key={purchase.id} className="admin-card">
                        <div className="admin-card-header">
                          <span className="admin-username">{purchase.username}</span>
                          <span className="admin-badge project">{purchase.projectName}</span>
                        </div>
                        <div className="admin-card-body">
                          <div className="admin-field">
                            <span className="field-label">PROJECT ID:</span>
                            <span className="field-value">{purchase.projectId}</span>
                          </div>
                          <div className="admin-field">
                            <span className="field-label">SELECTED:</span>
                            <span className="field-value">{formatDate(purchase.purchaseTime)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="admin-footer">
              <button className="admin-refresh" onClick={fetchData}>
                REFRESH DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
