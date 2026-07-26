import portfolioImage from "../assets/project-portfolio.png";
import restaurantImage from "../assets/project-restaurant.png";
import businessImage from "../assets/project-business.png";

function Projects() {
    const projects = [
        {
            title: "React Portfolio Website",
            date: "2026",
            image: portfolioImage,
            description:
                "A personal portfolio website built with React and React Router. The site includes multiple pages, reusable components, a contact form, and a clean responsive layout.",
            role:
                "My role was to design the layout, build the React components, set up routing, and organize the website content.",
            outcome:
                "The final result is a professional portfolio website that can be used to showcase my skills, projects, services, resume, and contact information."
        },
        {
            title: "Restaurant Website",
            date: "2026",
            image: restaurantImage,
            description:
                "A multi-page restaurant website created for a school project. It included a home page, menu page, gallery, order page, location page, and interactive features.",
            role:
                "My role was to create the page structure, design the navigation, add images and content, and build form-based features using JavaScript.",
            outcome:
                "The project improved my understanding of front-end development, page organization, user interaction, and responsive website design."
        },
        {
            title: "Business Website",
            date: "2026",
            image: businessImage,
            description:
                "A service-based business website focused on presenting services clearly and helping customers contact the business easily.",
            role:
                "My role was to plan the website sections, write the content, improve the layout, and make the site simple for customers to understand.",
            outcome:
                "The final website helped create a more professional online presence and made the business look more trustworthy to potential customers."
        }
    ];

    return (
        <section className="page">
            <h1>Projects</h1>
            <p className="pageIntro">
                Here are three projects that show my experience with React, front-end
                development, layout design, and building practical websites.
            </p>

            <div className="projectGrid">
                {projects.map((project) => (
                    <div className="projectCard" key={project.title}>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="projectPhoto"
                        />

                        <div className="projectContent">
                            <h2>{project.title}</h2>
                            <p>
                                <strong>Completion Date:</strong> {project.date}
                            </p>
                            <p>
                                <strong>Description:</strong> {project.description}
                            </p>
                            <p>
                                <strong>My Role:</strong> {project.role}
                            </p>
                            <p>
                                <strong>Outcome:</strong> {project.outcome}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;