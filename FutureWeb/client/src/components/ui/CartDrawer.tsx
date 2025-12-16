import { useCart } from "../../lib/stores/useCart";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, getTotal, openCheckout } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            SHOPPING CART
          </h2>
          <button className="cart-close" onClick={closeCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>Your cart is empty</p>
              <span>Add projects to get started</span>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-title">{item.title}</span>
                    <span className="cart-item-category">{item.category}</span>
                  </div>
                  <div className="cart-item-price">
                    <span>{item.price.toFixed(2)} {item.currency}/mo</span>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>MONTHLY TOTAL:</span>
              <span className="total-amount">{getTotal().toFixed(2)} USDT</span>
            </div>
            <button className="cart-checkout-btn" onClick={openCheckout}>
              PROCEED TO PAYMENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
