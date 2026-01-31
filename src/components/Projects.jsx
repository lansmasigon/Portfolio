import './Projects.css';
import diatrack from '../assets/diatrack.svg';
import hospital from '../assets/hospital.png';
import attrition from '../assets/attritionrisk.png';
import diasight from '../assets/diasight.png';
import { useState, useEffect, useRef } from 'react';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe section title
    const titleElement = sectionRef.current?.querySelector('.section-title');
    if (titleElement) observer.observe(titleElement);

    // Observe all project cards
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      number: "01",
      title: "DiaTrack",
      description: "Hybrid XAI-Enabled Diabetes Care Management System",
      technologies: ["React", "Supabase", "Python", "CSS"],
      image: diatrack,
      link: "#",
      customClass: "diatrack-card",
      details: "DiaTrack is a comprehensive diabetes care management system that combines cutting-edge AI technology with user-friendly interfaces. The system provides real-time monitoring, predictive analytics, and personalized recommendations for diabetes patients."
    },
    {
      id: 2,
      number: "02",
      title: "DiaSight",
      description: "Non-Invasive Diabetic Retinopathy Risk Stratification",
      technologies: ["React", "Supabase", "Python", "CSS"],
      image: diasight,
      link: "#",
      customClass: "diasight-card",
      details: "DiaSight is an innovative application that uses advanced machine learning algorithms to assess diabetic retinopathy risk without invasive procedures. It provides early detection and risk stratification to help prevent vision loss in diabetic patients."
    },
    {
      id: 3,
      number: "03",
      title: "Capiz Doctor’s Hospital",
      description: "Operational Intelligence Dashboard",
      technologies: ["Python", "Streamlit"],
      image: hospital,
      link: "#",
      details: "Built a Streamlit dashboard in Python to track hospital KPIs, staffing efficiency, readmission risk, and inventory performance. It provides interactive visuals to support operational decisions.",
    },
    {
      id: 4,
      number: "04",
      title: "Employee Attrition Risk",
      description: "Analyzing employee attrition risk and identify key drivers using HR data",
      technologies: ["Python", "Pandas", "Scikit-Learn"],
      image:  attrition,
      link: "#",
      details: "An advanced analytics solution that uses machine learning to predict employee attrition risk and identify key factors contributing to employee turnover. The system helps HR departments take proactive measures to retain valuable talent and improve workplace satisfaction."
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title scroll-animate">My Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card scroll-animate ${project.customClass || ''}`}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => openModal(project)}
            >
              <div className="project-card-header">
                <div className="project-number">{project.number}</div>
                <div className="project-title-header">{project.title}</div>
              </div>
              
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
              
              <div className="project-card-footer">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies-inline">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal-content ${selectedProject.customClass || ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-details">
                <h4>About this Project</h4>
                <p>{selectedProject.details}</p>
              </div>
              <div className="modal-technologies">
                <h4>Technologies Used</h4>
                <div className="modal-tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              {selectedProject.link && selectedProject.link !== "#" && (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="modal-link">
                  View Project →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
