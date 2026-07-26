import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";

function ProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editing = Boolean(id);

    const [formData, setFormData] = useState({
        title: "",
        completion: "",
        description: "",
        image: ""
    });

    const [loading, setLoading] = useState(editing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!editing) {
            return;
        }

        const loadProject = async () => {
            try {
                setError("");

                const response = await fetch(
                    `${API_URL}/api/projects/${id}`
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load project."
                    );
                }

                const project = result.data;

                setFormData({
                    title: project.title || "",
                    completion: project.completion
                        ? project.completion.substring(0, 10)
                        : "",
                    description: project.description || "",
                    image: project.image || ""
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [editing, id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const url = editing
                ? `${API_URL}/api/projects/${id}`
                : `${API_URL}/api/projects`;

            const response = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Could not save project."
                );
            }

            navigate("/admin/projects");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <section className="page adminPage">
                <p>Loading project...</p>
            </section>
        );
    }

    return (
        <section className="page adminPage">
            <h1>{editing ? "Edit Project" : "Add Project"}</h1>

            <p>
                {editing
                    ? "Update the selected portfolio project."
                    : "Enter the information for the new project."}
            </p>

            {error && <p className="errorMessage">{error}</p>}

            <form className="adminForm" onSubmit={handleSubmit}>
                <label htmlFor="title">Project Title</label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="completion">Completion Date</label>

                <input
                    type="date"
                    id="completion"
                    name="completion"
                    value={formData.completion}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description</label>

                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Image Name or URL</label>

                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="project-example.png"
                />

                <div className="formButtons">
                    <button
                        type="submit"
                        className="adminButton"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : editing
                              ? "Update Project"
                              : "Add Project"}
                    </button>

                    <Link
                        to="/admin/projects"
                        className="cancelButton"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default ProjectForm;