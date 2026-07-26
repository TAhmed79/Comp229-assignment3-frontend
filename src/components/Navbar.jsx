import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
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
                <Link to="/admin">Admin</Link>
            </div>
        </nav>
    );
}

export default Navbar;