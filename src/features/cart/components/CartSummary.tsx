
type CartSummaryProps = {
  cartCount: number;
  cartTotal: number;
  onClearCart: () => void;
  onCheckout: () => void;
};

function CartSummary({
  cartCount,
  cartTotal,
  onClearCart,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="cart_summary app_card">
      <h2>Order Summary</h2>

      <div className="cart_summary_row">
        <span>Total Items</span>
        <strong>{cartCount}</strong>
      </div>

      <div className="cart_summary_row">
        <span>Total Price</span>
        <strong>₹{cartTotal.toFixed(2)}</strong>
      </div>

      <button
        className="app_btn app_btn_primary cart_summary_btn"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>

      <button
        className="app_btn app_btn_light cart_summary_btn"
        onClick={onClearCart}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default CartSummary;