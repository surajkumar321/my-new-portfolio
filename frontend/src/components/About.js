import React from 'react';

const About = () => {
  return (
    <section id="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Hello! I'm a dedicated and results-driven web developer with a strong foundation in front-end technologies, particularly React.js. I thrive on building intuitive, high-performance, and visually appealing user interfaces.
          </p>
          <p>
            With a background in computer science and a keen eye for design, I enjoy turning complex problems into simple, beautiful, and functional code. I'm always eager to learn new technologies and improve my craft.
          </p>
          <p>
            When I'm not coding, you can find me exploring new hiking trails, experimenting with photography, or enjoying a good book.
          </p>

          {/* --- Download CV Button --- */}
          <a 
            href="/images/suraj resume.pdf" 
            download 
            className="cv-button"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* --- Skills Section --- */}
      <div className="skills-section">
        <h3>Skills</h3>
        <ul className="skills-list">
          <li>HTML5 / CSS3 / JavaScript</li>
          <li>React.js / Redux</li>
          <li>Node.js / Express.js</li>
          <li>MongoDB</li>
          <li>Git & GitHub</li>
          <li>Responsive Web Design</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
