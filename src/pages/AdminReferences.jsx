import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

function AdminReferences() {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadReferences = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/api/references`);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not load references."
                );
            }

            setReferences(result.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReferences();
    }, []);

    const deleteReference = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this reference?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(
                `${API_URL}/api/references/${id}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not delete reference."
                );
            }

            setReferences((currentReferences) =>
                currentReferences.filter(
                    (reference) => reference.id !== id
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
                    <h1>Manage References</h1>
                    <p>Add, edit, and delete portfolio references.</p>
                </div>

                <Link
                    to="/admin/references/add"
                    className="adminButton"
                >
                    Add Reference
                </Link>
            </div>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading references...</p>
            ) : references.length === 0 ? (
                <p>No references were found.</p>
            ) : (
                <div className="tableContainer">
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Company</th>
                                <th>Testimonial</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {references.map((reference) => (
                                <tr key={reference.id}>
                                    <td>{reference.name}</td>
                                    <td>{reference.position}</td>
                                    <td>{reference.company}</td>
                                    <td>{reference.testimonial}</td>

                                    <td className="actionButtons">
                                        <Link
                                            to={`/admin/references/edit/${reference.id}`}
                                            className="editButton"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="deleteButton"
                                            onClick={() =>
                                                deleteReference(reference.id)
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

export default AdminReferences;