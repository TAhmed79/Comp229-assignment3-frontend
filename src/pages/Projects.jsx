import { useEffect, useState } from "react";
import { API_URL } from "../api";
import portfolioImage from "../assets/project-portfolio.png";
import restaurantImage from "../assets/project-restaurant.png";
import businessImage from "../assets/project-business.png";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const projectImages = {
        "project-portfolio.png": portfolioImage,
        "project-restaurant.png": restaurantImage,
        "project-business.png": businessImage
    };

    const getProjectImage = (image) => {
        if (!image) {
            return null;
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("data:")
        ) {
            return image;
        }

        return projectImages[image] || null;
    };

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setError("");

                const response = await fetch(`${API_URL}/api/projects`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load projects."
                    );
                }

                setProjects(result.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return (
        <section className="page">
            <h1>Projects</h1>

            <p className="pageIntro">
                Here are some projects that show my experience with React,
                front-end development, layout design, and practical websites.
            </p>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading projects...</p>
            ) : projects.length === 0 ? (
                <p>No projects are currently available.</p>
            ) : (
                <div className="projectGrid">
                    {projects.map((project) => {
                        const imageSource = getProjectImage(project.image);

                        return (
                            <div className="projectCard" key={project.id}>
                                {imageSource && (
                                    <img
                                        src={imageSource}
                                        alt={project.title}
                                        className="projectPhoto"
                                    />
                                )}

                                <div className="projectContent">
                                    <h2>{project.title}</h2>

                                    <p>
                                        <strong>Completion Date:</strong>{" "}
                                        {project.completion
                                            ? new Date(
                                                  project.completion
                                              ).toLocaleDateString("en-CA")
                                            : "Not specified"}
                                    </p>

                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Projects;