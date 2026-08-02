import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const response = await fetch(`${API_URL}/api/users/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not sign in.");
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.data));
            window.dispatchEvent(new Event("authChanged"));
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="page adminPage">
            <h1>Sign In</h1>
            <p>Sign in to access the Admin Dashboard.</p>

            {error && <p className="errorMessage">{error}</p>}

            <form className="adminForm" onSubmit={handleSubmit}>
                <label htmlFor="signin-email">Email</label>
                <input
                    id="signin-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="signin-password">Password</label>
                <input
                    id="signin-password"
                    name="password"
                    type="password"
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
                        {saving ? "Signing In..." : "Sign In"}
                    </button>

                    <Link to="/signup" className="cancelButton">
                        Sign Up
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default SignIn;
