import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import References from "./pages/References";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import ProjectForm from "./pages/ProjectForm";
import AdminServices from "./pages/AdminServices";
import ServiceForm from "./pages/ServiceForm";
import AdminReferences from "./pages/AdminReferences";
import ReferenceForm from "./pages/ReferenceForm";
import AdminUsers from "./pages/AdminUsers";
import UserForm from "./pages/UserForm";
import "./App.css";

const protect = (component) => (
    <ProtectedRoute>{component}</ProtectedRoute>
);

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/references" element={<References />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route path="/admin" element={protect(<AdminDashboard />)} />
                    <Route path="/admin/projects" element={protect(<AdminProjects />)} />
                    <Route path="/admin/projects/add" element={protect(<ProjectForm />)} />
                    <Route path="/admin/projects/edit/:id" element={protect(<ProjectForm />)} />

                    <Route path="/admin/services" element={protect(<AdminServices />)} />
                    <Route path="/admin/services/add" element={protect(<ServiceForm />)} />
                    <Route path="/admin/services/edit/:id" element={protect(<ServiceForm />)} />

                    <Route path="/admin/references" element={protect(<AdminReferences />)} />
                    <Route path="/admin/references/add" element={protect(<ReferenceForm />)} />
                    <Route path="/admin/references/edit/:id" element={protect(<ReferenceForm />)} />

                    <Route path="/admin/users" element={protect(<AdminUsers />)} />
                    <Route path="/admin/users/add" element={protect(<UserForm />)} />
                    <Route path="/admin/users/edit/:id" element={protect(<UserForm />)} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
