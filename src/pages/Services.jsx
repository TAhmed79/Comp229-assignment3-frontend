import webImage from "../assets/service-web.png";
import designImage from "../assets/service-design.png";
import supportImage from "../assets/service-support.png";

function Services() {
    const services = [
        {
            title: "Web Development",
            image: webImage,
            description:
                "I build clean and responsive websites using HTML, CSS, JavaScript, React, and modern web development tools."
        },
        {
            title: "Front-End Design",
            image: designImage,
            description:
                "I create organized layouts, navigation menus, forms, and user-friendly pages that look professional and are easy to use."
        },
        {
            title: "Website Updates & Support",
            image: supportImage,
            description:
                "I help improve existing websites by updating content, fixing layout issues, improving usability, and making pages more polished."
        }
    ];

    return (
        <section className="page">
            <h1>Services</h1>
            <p className="pageIntro">
                These are some of the services I can offer as I continue developing my
                skills in web application development.
            </p>

            <div className="serviceGrid">
                {services.map((service) => (
                    <div className="serviceCard" key={service.title}>
                        <img
                            src={service.image}
                            alt={service.title}
                            className="servicePhoto"
                        />

                        <div className="serviceContent">
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;