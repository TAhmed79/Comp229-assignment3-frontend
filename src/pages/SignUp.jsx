import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
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

            const response = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not create account.");
            }

            navigate("/signin");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="page adminPage">
            <h1>Sign Up</h1>
            <p>Create an account for the portfolio application.</p>

            {error && <p className="errorMessage">{error}</p>}

            <form className="adminForm" onSubmit={handleSubmit}>
                <label htmlFor="signup-firstname">First Name</label>
                <input
                    id="signup-firstname"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="signup-lastname">Last Name</label>
                <input
                    id="signup-lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="signup-email">Email</label>
                <input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="signup-password">Password</label>
                <input
                    id="signup-password"
                    name="password"
                    type="password"
                    minLength="6"
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
                        {saving ? "Creating..." : "Sign Up"}
                    </button>

                    <Link to="/signin" className="cancelButton">
                        Sign In
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default SignUp;
