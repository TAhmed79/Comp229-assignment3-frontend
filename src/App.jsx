import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import ProjectForm from "./pages/ProjectForm";
import AdminServices from "./pages/AdminServices";
import ServiceForm from "./pages/ServiceForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminReferences from "./pages/AdminReferences";
import ReferenceForm from "./pages/ReferenceForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import References from "./pages/References";
import Contact from "./pages/Contact";
import "./App.css";

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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/add" element={<ProjectForm />}/>
          <Route path="/admin/projects/edit/:id" element={<ProjectForm />}/>
          <Route path="/admin/services" element={<AdminServices />}/>
          <Route path="/admin/services/add" element={<ServiceForm />}/>
          <Route path="/admin/services/edit/:id" element={<ServiceForm />}/>
          <Route path="/admin/references" element={<AdminReferences />} />
          <Route path="/admin/references/add" element={<ReferenceForm />} />
          <Route path="/admin/references/edit/:id" element={<ReferenceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;