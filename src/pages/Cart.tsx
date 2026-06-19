import { useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";

import CartItem from "../features/cart/components/CartItem";
import CartSummary from "../features/cart/components/CartSummary";

function Cart() {
  const navigate = useNavigate();

   const { items, cartCount, cartTotal, isCartEmpty, increaseItem, decreaseItem, removeItem, clearAllItems } = useCart();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart_page">
        <div className="app_container">
          <h1 className="app_page_title">Shopping Cart</h1>
          {/* {items.length === 0 ? ( */}
          {isCartEmpty ? (
            <div className="empty_cart app_card">
              <h2>Your cart is empty</h2>
              <p>Add some products to continue shopping.</p>
              <button className="app_btn app_btn_primary" onClick={() => navigate("/products")} >Go to Products</button>
            </div>
          ) : (
            <div className="cart_layout">
              <div className="cart_items">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={increaseItem}
                    onDecrease={decreaseItem}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              <CartSummary
                cartCount={cartCount}
                cartTotal={cartTotal}
                onClearCart={clearAllItems}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;