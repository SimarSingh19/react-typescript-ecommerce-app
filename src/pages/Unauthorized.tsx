import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized_page">
      <div className="app_container">
        <div className="unauthorized_card app_card">
          <div className="unauthorized_icon">
            <i className="fa-solid fa-lock"></i>
          </div>

          <h1>Unauthorized Access</h1>

          <p>
            You do not have permission to access this page.
          </p>

          <button
            className="app_btn app_btn_primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;