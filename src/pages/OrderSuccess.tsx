import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const orderSuccess = sessionStorage.getItem("orderSuccess");

    if (!orderSuccess) {
      navigate("/products", { replace: true });
    }
  }, [navigate]);

  const handleContinueShopping = () => {
    sessionStorage.removeItem("orderSuccess");
    navigate("/products", { replace: true });
  };

  return (
    <>
      <div className="success_page">
        <div className="app_container">
          <div className="success_card app_card">
            <div className="success_icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h1>Order Placed Successfully</h1>
            <p>Thank you for shopping with us. Your order has been placed.</p>
            <button className="app_btn app_btn_primary" onClick={handleContinueShopping}>Continue Shopping </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccess;