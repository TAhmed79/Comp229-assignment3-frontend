import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="page hero">
            <div>
                <p className="tagline">Personal Portfolio</p>
                <h1>Hi, I’m Tahseen Ahmed</h1>
                <p>
                    I am a web application development student focused on building clean,
                    useful, and user-friendly websites and applications.
                </p>
                <p className="mission">
                    My mission is to keep improving as a developer and create digital
                    projects that solve real problems for people and businesses.
                </p>
                <div className="buttons">
                    <Link to="/about" className="btn">About Me</Link>
                    <Link to="/projects" className="btn secondary">View Projects</Link>
                </div>
            </div>
        </section>
    );
}

export default Home;