import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = useState(Boolean(localStorage.getItem("token")));

    useEffect(() => {
        const updateAuth = () => {
            setSignedIn(Boolean(localStorage.getItem("token")));
        };

        window.addEventListener("authChanged", updateAuth);
        window.addEventListener("storage", updateAuth);

        return () => {
            window.removeEventListener("authChanged", updateAuth);
            window.removeEventListener("storage", updateAuth);
        };
    }, []);

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChanged"));
        navigate("/signin");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="Tahseen Ahmed Logo" className="logoImage" />
                <span>Tahseen Ahmed</span>
            </Link>

            <div className="navLinks">
                <Link to="/">Home</Link>
                <Link to="/about">About Me</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/services">Services</Link>
                <Link to="/references">References</Link>
                <Link to="/contact">Contact Me</Link>

                {signedIn ? (
                    <>
                        <Link to="/admin">Admin</Link>
                        <button
                            type="button"
                            onClick={signOut}
                            style={{
                                background: "none",
                                border: "none",
                                color: "inherit",
                                cursor: "pointer",
                                font: "inherit",
                                padding: 0
                            }}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signin">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
