import { useEffect, useState } from "react";
import { API_URL } from "../api";

function References() {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadReferences = async () => {
            try {
                setError("");

                const response = await fetch(
                    `${API_URL}/api/references`
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Could not load references."
                    );
                }

                setReferences(result.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadReferences();
    }, []);

    return (
        <section className="page">
            <h1>References</h1>

            {error && <p className="errorMessage">{error}</p>}

            {loading ? (
                <p>Loading references...</p>
            ) : references.length === 0 ? (
                <p>No references are currently available.</p>
            ) : (
                <div className="grid">
                    {references.map((reference) => (
                        <div className="card" key={reference.id}>
                            <h2>{reference.name}</h2>

                            <p>
                                <strong>Company:</strong>{" "}
                                {reference.company}
                            </p>

                            <p>
                                <strong>Position:</strong>{" "}
                                {reference.position}
                            </p>

                            <p>"{reference.testimonial}"</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default References;