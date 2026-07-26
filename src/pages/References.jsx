function References() {
    const references = [
        {
            name: "Amanda Clare",
            company: "Centennial College",
            position: "Professor",
            testimonial:
                "Tahseen shows strong effort in improving communication, organization, and assignment quality."
        },
        {
            name: "Client Reference",
            company: "Local Business Client",
            position: "Customer",
            testimonial:
                "Tahseen is reliable, practical, and focused on getting the work completed properly."
        },
        {
            name: "Project Partner",
            company: "Student Team Project",
            position: "Team Member",
            testimonial:
                "Tahseen contributes ideas, communicates with the team, and helps complete project work on time."
        }
    ];

    return (
        <section className="page">
            <h1>References</h1>
            <div className="grid">
                {references.map((reference) => (
                    <div className="card" key={reference.name}>
                        <h2>{reference.name}</h2>
                        <p><strong>Company:</strong> {reference.company}</p>
                        <p><strong>Position:</strong> {reference.position}</p>
                        <p>"{reference.testimonial}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default References;