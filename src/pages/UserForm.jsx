import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editing = Boolean(id);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(editing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!editing) {
            return;
        }

        const loadUser = async () => {
            try {
                setError("");

                const response = await fetch(
                    `${API_URL}/api/users/${id}`
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load user."
                    );
                }

                setFormData({
                    firstname: result.data.firstname || "",
                    lastname: result.data.lastname || "",
                    email: result.data.email || "",
                    password: result.data.password || ""
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
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
                ? `${API_URL}/api/users/${id}`
                : `${API_URL}/api/users`;

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
                    result.message || "Could not save user."
                );
            }

            navigate("/admin/users");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <section className="page adminPage">
                <p>Loading user...</p>
            </section>
        );
    }

    return (
        <section className="page adminPage">
            <h1>{editing ? "Edit User" : "Add User"}</h1>

            <p>
                {editing
                    ? "Update the selected user."
                    : "Enter the information for the new user."}
            </p>

            {error && <p className="errorMessage">{error}</p>}

            <form className="adminForm" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name</label>

                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="lastname">Last Name</label>

                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
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
                              ? "Update User"
                              : "Add User"}
                    </button>

                    <Link
                        to="/admin/users"
                        className="cancelButton"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default UserForm;