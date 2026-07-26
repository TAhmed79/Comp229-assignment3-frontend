import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadServices = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/api/services`);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not load services."
                );
            }

            setServices(result.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const deleteService = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(
                `${API_URL}/api/services/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not delete service."
                );
            }

            setServices((currentServices) =>
                currentServices.filter(
                    (service) => service.id !== id
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="page adminPage">
            <div className="adminHeading">
                <div>
                    <h1>Manage Services</h1>
                    <p>Add, edit, and delete portfolio services.</p>
                </div>

                <Link
                    to="/admin/services/add"
                    className="adminButton"
                >
                    Add Service
                </Link>
            </div>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p>No services were found.</p>
            ) : (
                <div className="tableContainer">
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.title}</td>
                                    <td>{service.description}</td>

                                    <td className="actionButtons">
                                        <Link
                                            to={`/admin/services/edit/${service.id}`}
                                            className="editButton"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="deleteButton"
                                            onClick={() =>
                                                deleteService(service.id)
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

export default AdminServices;