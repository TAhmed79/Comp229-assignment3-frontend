import profilePhoto from "../assets/profile.png";

function About() {
    return (
        <section className="page">
            <h1>About Me</h1>

            <div className="card aboutCard">
                <img
                    src={profilePhoto}
                    alt="Tahseen Ahmed"
                    className="profilePhoto"
                />

                <div>
                    <h2>Tahseen Ahmed</h2>
                    <p>
                        I am a Web Application Development student with an interest in
                        front-end development, software design, and practical business
                        websites. I enjoy learning new technologies and building projects
                        that are simple, useful, and easy to use.
                    </p>

                    <a className="btn" href="/resume.pdf" target="_blank">
                        View My Resume
                    </a>
                </div>
            </div>
        </section>
    );
}

export default About;