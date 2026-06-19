import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function NotFound() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="not_found_page">
      <div className="app_container">
        <div className="not_found_card app_card">
          <div className="not_found_icon">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>

          <h1>404</h1>

          <h2>Page Not Found</h2>

          <p>The page you are looking for does not exist or has been moved.</p>

          <button className="app_btn app_btn_primary" onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}>
            {isLoggedIn ? "Go to Dashboard" : "Go to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
