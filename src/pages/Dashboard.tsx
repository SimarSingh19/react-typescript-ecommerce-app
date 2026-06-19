import {useNavigate} from "react-router-dom";

import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const navigate = useNavigate();

  const { user, loading, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="dashboard_page">
        <div className="app_container">
          <div className="dashboard_welcome_card app_card">
            <div>
              <h1>Welcome, {user.firstName} 👋</h1>
              <p>You are logged in as <strong>{user.email}</strong></p>
            </div>
            <button className="app_btn app_btn_danger" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="dashboard_action_card app_card">
                <h3><i className="fa-solid fa-box"></i> Products</h3>
                <p>Browse products and add your favourites to cart.</p>
                <button className="app_btn app_btn_primary" onClick={() => navigate("/products")}>View Products</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dashboard_action_card app_card">
                <h3><i className="fa-solid fa-cart-shopping"></i> Cart</h3>
                <p>Review cart items and proceed to checkout.</p>
                <button className="app_btn app_btn_dark" onClick={() => navigate("/cart")} > Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;