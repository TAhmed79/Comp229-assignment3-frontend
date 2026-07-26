import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handles the form submission, captures the entered data, and redirects the user home.
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Contact form submitted:", formData);
        alert("Thank you for your message!");
        navigate("/");
    }

    return (
        <section className="page">
            <h1>Contact Me</h1>

            <div className="contactLayout">
                <div className="card">
                    <h2>Contact Information</h2>
                    <p><strong>Name:</strong> Tahseen Ahmed</p>
                    <p><strong>Email:</strong> tahseen21savage@gmail.com</p>
                    <p><strong>Location:</strong> Toronto, Ontario</p>
                </div>

                <form className="card form" onSubmit={handleSubmit}>
                    <input name="firstName" placeholder="First Name" onChange={handleChange} required />
                    <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
                    <input name="phone" placeholder="Contact Number" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                    <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
                    <button className="btn" type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;