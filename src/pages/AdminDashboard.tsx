function AdminDashboard() {
  return (
    <div className="admin_page">
      <div className="app_container">
        <h1 className="app_page_title">Admin Dashboard</h1>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="admin_card app_card">
              <h3><i className="fa-solid fa-box"></i> Products</h3>
              <p>Manage product listings and inventory.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="admin_card app_card">
              <h3><i className="fa-solid fa-receipt"></i> Orders</h3>
              <p>View and manage customer orders.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="admin_card app_card">
              <h3><i className="fa-solid fa-users"></i> Users</h3>
              <p>Manage users and permissions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;