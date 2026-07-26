import { useEffect, useState } from "react";
import { API_URL } from "../api";
import webImage from "../assets/service-web.png";
import designImage from "../assets/service-design.png";
import supportImage from "../assets/service-support.png";

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const serviceImages = [webImage, designImage, supportImage];

    useEffect(() => {
        const loadServices = async () => {
            try {
                setError("");

                const response = await fetch(`${API_URL}/api/services`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load services."
                    );
                }

                setServices(result.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    return (
        <section className="page">
            <h1>Services</h1>

            <p className="pageIntro">
                These are some of the services I can offer as I continue
                developing my skills in web application development.
            </p>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p>No services are currently available.</p>
            ) : (
                <div className="serviceGrid">
                    {services.map((service, index) => (
                        <div className="serviceCard" key={service.id}>
                            <img
                                src={
                                    serviceImages[
                                        index % serviceImages.length
                                    ]
                                }
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
            )}
        </section>
    );
}

export default Services;