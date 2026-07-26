import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";

function ReferenceForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editing = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        position: "",
        company: "",
        testimonial: ""
    });

    const [loading, setLoading] = useState(editing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!editing) {
            return;
        }

        const loadReference = async () => {
            try {
                setError("");

                const response = await fetch(
                    `${API_URL}/api/references/${id}`
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load reference."
                    );
                }

                setFormData({
                    name: result.data.name || "",
                    position: result.data.position || "",
                    company: result.data.company || "",
                    testimonial: result.data.testimonial || ""
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadReference();
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
                ? `${API_URL}/api/references/${id}`
                : `${API_URL}/api/references`;

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
                    result.message || "Could not save reference."
                );
            }

            navigate("/admin/references");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <section className="page adminPage">
                <p>Loading reference...</p>
            </section>
        );
    }

    return (
        <section className="page adminPage">
            <h1>{editing ? "Edit Reference" : "Add Reference"}</h1>

            <p>
                {editing
                    ? "Update the selected portfolio reference."
                    : "Enter the information for the new reference."}
            </p>

            {error && <p className="errorMessage">{error}</p>}

            <form className="adminForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="position">Position</label>

                <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="company">Company</label>

                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="testimonial">Testimonial</label>

                <textarea
                    id="testimonial"
                    name="testimonial"
                    rows="5"
                    value={formData.testimonial}
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
                              ? "Update Reference"
                              : "Add Reference"}
                    </button>

                    <Link
                        to="/admin/references"
                        className="cancelButton"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default ReferenceForm;