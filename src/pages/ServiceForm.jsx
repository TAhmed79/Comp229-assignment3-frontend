import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";

function ServiceForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editing = Boolean(id);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [loading, setLoading] = useState(editing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!editing) {
            return;
        }

        const loadService = async () => {
            try {
                setError("");

                const response = await fetch(
                    `${API_URL}/api/services/${id}`
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load service."
                    );
                }

                setFormData({
                    title: result.data.title || "",
                    description: result.data.description || ""
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadService();
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
                ? `${API_URL}/api/services/${id}`
                : `${API_URL}/api/services`;

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
                    result.message || "Could not save service."
                );
            }

            navigate("/admin/services");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <section className="page adminPage">
                <p>Loading service...</p>
            </section>
        );
    }

    return (
        <section className="page adminPage">
            <h1>{editing ? "Edit Service" : "Add Service"}</h1>

            <p>
                {editing
                    ? "Update the selected portfolio service."
                    : "Enter the information for the new service."}
            </p>

            {error && <p className="errorMessage">{error}</p>}

            <form className="adminForm" onSubmit={handleSubmit}>
                <label htmlFor="title">Service Title</label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">
                    Service Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
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
                              ? "Update Service"
                              : "Add Service"}
                    </button>

                    <Link
                        to="/admin/services"
                        className="cancelButton"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default ServiceForm;