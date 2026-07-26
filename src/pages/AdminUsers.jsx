import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/api/users`);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not load users."
                );
            }

            setUsers(result.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const deleteUser = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(
                `${API_URL}/api/users/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not delete user."
                );
            }

            setUsers((currentUsers) =>
                currentUsers.filter((user) => user.id !== id)
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="page adminPage">
            <div className="adminHeading">
                <div>
                    <h1>Manage Users</h1>
                    <p>Add, edit, and delete users.</p>
                </div>

                <Link to="/admin/users/add" className="adminButton">
                    Add User
                </Link>
            </div>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No users were found.</p>
            ) : (
                <div className="tableContainer">
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>

                                    <td className="actionButtons">
                                        <Link
                                            to={`/admin/users/edit/${user.id}`}
                                            className="editButton"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="deleteButton"
                                            onClick={() =>
                                                deleteUser(user.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Link to="/admin" className="backLink">
                Back to Dashboard
            </Link>
        </section>
    );
}

export default AdminUsers;