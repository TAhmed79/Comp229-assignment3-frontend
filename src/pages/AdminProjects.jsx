import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProjects = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/api/projects`);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not load projects.");
            }

            setProjects(result.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const deleteProject = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(`${API_URL}/api/projects/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not delete project.");
            }

            setProjects((currentProjects) =>
                currentProjects.filter((project) => project.id !== id)
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="page adminPage">
            <div className="adminHeading">
                <div>
                    <h1>Manage Projects</h1>
                    <p>Add, edit, and delete portfolio projects.</p>
                </div>

                <Link to="/admin/projects/add" className="adminButton">
                    Add Project
                </Link>
            </div>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading projects...</p>
            ) : projects.length === 0 ? (
                <p>No projects were found.</p>
            ) : (
                <div className="tableContainer">
                    <table className="adminTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Completion</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.title}</td>

                                    <td>
                                        {project.completion
                                            ? new Date(
                                                  project.completion
                                              ).toLocaleDateString("en-CA")
                                            : "Not set"}
                                    </td>

                                    <td>{project.description}</td>

                                    <td>{project.image || "No image"}</td>

                                    <td className="actionButtons">
                                        <Link
                                            to={`/admin/projects/edit/${project.id}`}
                                            className="editButton"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="deleteButton"
                                            onClick={() =>
                                                deleteProject(project.id)
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

export default AdminProjects;