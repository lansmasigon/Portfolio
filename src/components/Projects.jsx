import './Projects.css';
import diatrack from '../assets/diatrack.svg';
import hospital from '../assets/hospital.png';
import attrition from '../assets/attritionrisk.png';
import diasight from '../assets/diasight.png';
import aether from '../assets/aether.png';
import logsync from '../assets/logsync.png';
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stageRef = useRef(null);

  const cardLayouts = useMemo(() => [
    { y: '6px',  r: '4deg',   z: 7 },
    { y: '20px', r: '13deg',  z: 5 },
    { y: '14px', r: '-8deg',  z: 6 },
    { y: '18px', r: '9deg',   z: 5 },
  ], []);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const stage = stageRef.current;
    if (!section || !titleEl || !stage) return;

    const cards = Array.from(stage.querySelectorAll('.project-showcase-card'));
    const total = cards.length;
    const cardW = 240;
    const overlap = 28; // final overlap between cards

    // Compute each card's final X position relative to center
    // Cards spread from center outward
    const finalX = cards.map((_, i) => {
      const offset = i * (cardW - overlap);
      const totalW = (total - 1) * (cardW - overlap) + cardW;
      return offset - totalW / 2 + cardW / 2;
    });

    const finalLayouts = cards.map((_, i) => cardLayouts[i % cardLayouts.length]);

    // Set all cards to start: stacked at center, scaled down
    cards.forEach((card) => {
      gsap.set(card, { x: 0, scale: 0.72, rotate: 0, autoAlpha: 1 });
    });
    gsap.set(titleEl, { autoAlpha: 0, y: 24 });

    // Build scrubbed timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(titleEl, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'none' }, 0);

    cards.forEach((card, i) => {
      tl.to(card, {
        x: finalX[i],
        scale: 1,
        rotate: finalLayouts[i].r,
        duration: 1,
        ease: 'none',
      }, 0); // all start at same time so scrub drives them together
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'top 10%',
      scrub: 0.8,
      animation: tl,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      },
      {
        id: 5,
        number: '05',
        title: 'Aether',
        description: 'A modern productivity and collaboration platform',
        technologies: ['React', 'Node.js', 'Tailwind'],
        image: aether,
        link: '#',
        customClass: 'aether-card',
        details:
          'Aether is a modern productivity and collaboration platform designed to streamline team workflows and project management. It features real-time collaboration tools, task tracking, and smart notifications to keep teams in sync.'
      },
      {
        id: 6,
        number: '06',
        title: 'LogSync',
        description: 'Automated log management and synchronization system',
        technologies: ['Python', 'FastAPI', 'PostgreSQL'],
        image: logsync,
        link: '#',
        customClass: 'logsync-card',
        details:
          'LogSync is an automated log management and synchronization system that aggregates logs from multiple services into a unified, searchable interface. It provides real-time alerts, anomaly detection, and detailed reporting for DevOps teams.'
      }
    ],
    []
  );

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    // animate in after render
    requestAnimationFrame(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { autoAlpha: 0, y: 40, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        autoAlpha: 0, y: 30, scale: 0.97, duration: 0.3, ease: 'power2.in',
        onComplete: () => { setSelectedProject(null); document.body.style.overflow = 'auto'; },
      });
    } else {
      setSelectedProject(null);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-shell">
        {/* Header row: title left, number right */}
        <div className="projects-header">
          <h2 className="section-title" ref={titleRef}>My Projects</h2>
          <div className="projects-section-num" aria-hidden="true">
            <span className="section-index-num">03</span>
          </div>
        </div>

        <div className="projects-cards-stage" ref={stageRef} aria-label="Project cards showcase">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-showcase-card ${project.customClass || ''}`}
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
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            ref={modalRef}
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
