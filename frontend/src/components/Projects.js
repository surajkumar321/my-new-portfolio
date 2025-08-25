import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchProjects = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
    console.log("API Response:", data);
    setProjects(data.projects || []);
  } catch (error) {
    console.error("Error fetching projects:", error);
    setProjects([]);
  } finally {
    setLoading(false);
  }
};

    fetchProjects();
  }, []);

  if (loading) return <section id="projects"><h2>My Projects</h2><p>Loading projects...</p></section>;

  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project._id}>
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No projects to display yet. The admin can add some!</p>
        )}
      </div>
    </section>
  );
};

export default Projects;