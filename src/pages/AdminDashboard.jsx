import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <section className="page">
            <h1>Admin Dashboard</h1>
            <p>Manage all portfolio information from this dashboard.</p>

            <div className="adminDashboard">
                <Link to="/admin/projects">Manage Projects</Link>
                <Link to="/admin/services">Manage Services</Link>
                <Link to="/admin/references">Manage References</Link>
                <Link to="/admin/users">Manage Users</Link>
            </div>
        </section>
    );
}

export default AdminDashboard;