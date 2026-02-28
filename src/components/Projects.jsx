import './Projects.css';
import diatrack from '../assets/diatrack.svg';
import hospital from '../assets/hospital.png';
import attrition from '../assets/attritionrisk.png';
import diasight from '../assets/diasight.png';
import { useEffect, useMemo, useRef, useState } from 'react';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

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

    const titleElement = sectionRef.current?.querySelector('.section-title');
    if (titleElement) observer.observe(titleElement);

    return () => observer.disconnect();
  }, []);

  const projects = useMemo(
    () => [
      {
        id: 1,
        number: '01',
        title: 'DiaTrack',
        description: 'Hybrid XAI-Enabled Diabetes Care Management System',
        technologies: ['React', 'Supabase', 'Python', 'CSS'],
        image: diatrack,
        link: '#',
        customClass: 'diatrack-card',
        details:
          'DiaTrack is a comprehensive diabetes care management system that combines cutting-edge AI technology with user-friendly interfaces. The system provides real-time monitoring, predictive analytics, and personalized recommendations for diabetes patients.'
      },
      {
        id: 2,
        number: '02',
        title: 'DiaSight',
        description: 'Non-Invasive Diabetic Retinopathy Risk Stratification',
        technologies: ['React', 'Supabase', 'Python', 'CSS'],
        image: diasight,
        link: '#',
        customClass: 'diasight-card',
        details:
          'DiaSight is an innovative application that uses advanced machine learning algorithms to assess diabetic retinopathy risk without invasive procedures. It provides early detection and risk stratification to help prevent vision loss in diabetic patients.'
      },
      {
        id: 3,
        number: '03',
        title: "Capiz Doctor's Hospital",
        description: 'Operational Intelligence Dashboard',
        technologies: ['Python', 'Streamlit'],
        image: hospital,
        link: '#',
        details:
          'Built a Streamlit dashboard in Python to track hospital KPIs, staffing efficiency, readmission risk, and inventory performance. It provides interactive visuals to support operational decisions.'
      },
      {
        id: 4,
        number: '04',
        title: 'Employee Attrition Risk',
        description: 'Analyzing employee attrition risk and identify key drivers using HR data',
        technologies: ['Python', 'Pandas', 'Scikit-Learn'],
        image: attrition,
        link: '#',
        details:
          'An advanced analytics solution that uses machine learning to predict employee attrition risk and identify key factors contributing to employee turnover. The system helps HR departments take proactive measures to retain valuable talent and improve workplace satisfaction.'
      }
    ],
    []
  );

  const cardLayouts = [
    { y: '22px', r: '-14deg', z: 4 },
    { y: '8px', r: '-5deg', z: 6 },
    { y: '6px', r: '4deg', z: 7 },
    { y: '20px', r: '13deg', z: 5 }
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
      <div className="projects-shell">
        <h2 className="section-title scroll-animate">My Projects</h2>

        <div className="projects-cards-stage" aria-label="Project cards showcase">
          {projects.map((project, index) => {
            const layout = cardLayouts[index % cardLayouts.length];
            return (
              <article
                key={project.id}
                className={`project-showcase-card ${project.customClass || ''}`}
                style={
                  {
                    '--card-y': layout.y,
                    '--card-r': layout.r,
                    '--card-z': layout.z
                  }
                }
                onClick={() => openModal(project)}
              >
                <div className="project-showcase-image-wrap">
                  <img src={project.image} alt={project.title} className="project-showcase-image" />
                </div>
                <div className="project-showcase-meta">
                  <span className="project-pill">{project.number}</span>
                  <p className="project-showcase-title">{project.title}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-content ${selectedProject.customClass || ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              x
            </button>
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
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {selectedProject.link && selectedProject.link !== '#' && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  View Project &rarr;
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
