import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Navbar() {
  const navigate = useNavigate();

  const {cartCount} = useCart();

  const { logoutUser, isAdmin } = useAuth();
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="app_navbar">
      <div className="app_navbar_inner">
        <Link to="/dashboard" className="app_navbar_logo">
          <i className="fa-solid fa-bag-shopping"></i> E-Shop
        </Link>
        <div className="app_navbar_links">
          <Link to="/dashboard">
            <i className="fa-solid fa-house"></i> Dashboard
          </Link>
          <Link to="/products">
            <i className="fa-solid fa-box"></i> Products
          </Link>
          <Link to="/cart" className="app_cart_link">
            <i className="fa-solid fa-cart-shopping"></i> Cart
            <span className="app_cart_badge">{cartCount}</span>
          </Link>
          <button className="app_btn app_btn_danger" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
          {isAdmin && (
            <Link to="/admin">
              <i className="fa-solid fa-user-shield"></i> Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
