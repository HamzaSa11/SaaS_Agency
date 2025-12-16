import { useState } from "react";
import { useCart } from "../../lib/stores/useCart";
import { useAuth } from "../../lib/stores/useAuth";

export default function CheckoutModal() {
  const { items, isCheckoutOpen, closeCheckout, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const binanceId = "1185068316";
  const total = getTotal();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please log in to place an order");
      return;
    }
    
    setIsSubmitting(true);
    try {
      let allSuccessful = true;
      for (const item of items) {
        const response = await fetch("/api/purchases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            username: user.username,
            projectName: item.title,
            projectId: item.id,
            amount: Math.round(item.price * 100),
            currency: "USD",
          }),
        });
        
        if (!response.ok) {
          allSuccessful = false;
          console.error("Failed to save purchase:", await response.text());
        }
      }
      
      if (allSuccessful) {
        setOrderPlaced(true);
      } else {
        alert("Some items could not be saved. Please try again.");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (orderPlaced) {
      clearCart();
      setOrderPlaced(false);
    }
    closeCheckout();
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2 className="checkout-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            {orderPlaced ? "ORDER CONFIRMED" : "CHECKOUT"}
          </h2>
          <button className="checkout-close" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {orderPlaced ? (
          <div className="checkout-success">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Order Placed Successfully!</h3>
            <p>Please complete your payment using the details below:</p>
            
            <div className="payment-details">
              <div className="payment-field">
                <span className="field-label">BINANCE ID:</span>
                <span className="field-value binance-id">{binanceId}</span>
              </div>
              <div className="payment-field">
                <span className="field-label">AMOUNT:</span>
                <span className="field-value amount">{total.toFixed(2)} USDT</span>
              </div>
              <div className="payment-field">
                <span className="field-label">PAYMENT TYPE:</span>
                <span className="field-value">Monthly Subscription</span>
              </div>
            </div>

            <div className="payment-instructions">
              <h4>HOW TO PAY:</h4>
              <ol>
                <li>Open your Binance app</li>
                <li>Go to Pay {">"} Send</li>
                <li>Enter Binance ID: <strong>{binanceId}</strong></li>
                <li>Send exactly <strong>{total.toFixed(2)} USDT</strong></li>
                <li>Add your username in the note: <strong>{user?.username}</strong></li>
              </ol>
            </div>

            <div className="payment-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>Your subscription will be activated within 24 hours after payment confirmation.</span>
            </div>

            <button className="checkout-done-btn" onClick={handleClose}>
              DONE
            </button>
          </div>
        ) : (
          <>
            <div className="checkout-content">
              <h3>ORDER SUMMARY</h3>
              <div className="checkout-items">
                {items.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <span className="item-name">{item.title}</span>
                    <span className="item-price">{item.price.toFixed(2)} USDT/mo</span>
                  </div>
                ))}
              </div>
              <div className="checkout-total">
                <span>TOTAL (Monthly):</span>
                <span className="total-value">{total.toFixed(2)} USDT</span>
              </div>
            </div>

            <div className="checkout-payment-preview">
              <h4>PAYMENT METHOD</h4>
              <div className="binance-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L6.5 7.5L8.62 9.62L12 6.24L15.38 9.62L17.5 7.5L12 2Z"/>
                  <path d="M2 12L4.12 9.88L6.24 12L4.12 14.12L2 12Z"/>
                  <path d="M6.5 16.5L12 22L17.5 16.5L15.38 14.38L12 17.76L8.62 14.38L6.5 16.5Z"/>
                  <path d="M17.76 12L19.88 9.88L22 12L19.88 14.12L17.76 12Z"/>
                  <path d="M12 9.88L14.12 12L12 14.12L9.88 12L12 9.88Z"/>
                </svg>
                <span>Binance Pay</span>
              </div>
              <p className="payment-note-preview">You'll receive payment instructions after placing order</p>
            </div>

            <div className="checkout-footer">
              <button className="checkout-back-btn" onClick={closeCheckout}>
                BACK TO CART
              </button>
              <button 
                className="checkout-confirm-btn" 
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
