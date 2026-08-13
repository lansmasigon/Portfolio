import { useState, useEffect } from 'react';
import diatrackImg from '../assets/diatrack.svg';
import diasightImg from '../assets/diasight.png';
import hospitalImg from '../assets/hospital.png';
import attritionriskImg from '../assets/attritionrisk.png';
import aetherImg from '../assets/aether.png';
import logsyncImg from '../assets/logsync.png';
// Using mystery for RenalSight and other placeholders for now as no explicit renal-sight.png is in assets
import mysteryImg from '../assets/mystery.png';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "DiaTrack",
      subtitle: "Hybrid XAI-Enabled Diabetes Care Management System",
      description: "DiaTrack is a comprehensive diabetes care management system that combines cutting-edge AI technology with user-friendly interfaces. The system provides real-time monitoring, predictive analytics, and personalized recommendations for diabetes patients.",
      award: "🏆 Best Thesis",
      technologies: ["React", "Supabase", "Python", "CSS"],
      link: "https://diatrack-cict.vercel.app/",
      image: diatrackImg
    },
    {
      title: "DiaSight",
      subtitle: "Non-Invasive Diabetic Retinopathy Risk Stratification",
      description: "DiaSight is an innovative application that uses advanced machine learning algorithms to assess diabetic retinopathy risk without invasive procedures. It provides early detection and risk stratification to help prevent vision loss in diabetic patients.",
      technologies: ["React", "Supabase", "Python", "CSS"],
      link: "https://diasight.ph",
      image: diasightImg
    },
    {
      title: "RenalSight",
      subtitle: "Democratizing Nephrology.",
      description: "Transforming standard laboratory telemetry into high-fidelity prognostic insights. By utilizing routine biomarkers—eliminating the dependency on prohibitive diagnostic imaging—RenalSight deploys accessible, highly precise Chronic Kidney Disease (CKD) risk stratification to any clinical environment.",
      technologies: ["React", "Convex"],
      link: "https://renal-sight.vercel.app/",
      image: mysteryImg
    },
    {
      title: "Capiz Doctor's Hospital",
      subtitle: "Operational Intelligence Dashboard",
      description: "Built a Streamlit dashboard in Python to track hospital KPIs, staffing efficiency, readmission risk, and inventory performance. It provides interactive visuals to support operational decisions.",
      technologies: ["Python", "Streamlit"],
      link: "https://github.com/LanceMasigon/hospital-dashboard",
      image: hospitalImg
    },
    {
      title: 'Employee Attrition Risk',
      subtitle: 'Analyzing employee attrition risk and identify key drivers using HR data',
      description: 'An advanced analytics solution that uses machine learning to predict employee attrition risk and identify key factors contributing to employee turnover. The system helps HR departments take proactive measures to retain valuable talent and improve workplace satisfaction.',
      technologies: ['Python', 'Pandas', 'Scikit-Learn'],
      link: '#',
      image: attritionriskImg
    },
    {
      title: 'Aether',
      subtitle: 'A single-player browser RPG.',
      description: 'Aether is a single-player browser RPG, featuring town-based exploration, crafting, quests, and progression.',
      technologies: ['Phaser 3', 'Javascript'],
      link: '#',
      image: aetherImg
    },
    {
      title: 'LogSync',
      subtitle: 'Creates internship journals by mapping GitHub activity',
      description: 'LogSync AI transforms your GitHub commits into professional daily work journals. Map your coding activity to a standard 9-to-5 schedule with AI-powered descriptions.',
      technologies: ['TypeScript', 'Tailwind', 'Convex'],
      link: 'https://log-sync.vercel.app/',
      image: logsyncImg
    },
    {
      title: 'WVSU LF',
      subtitle: 'Replaces the messy "Freedom Walls"',
      description: 'WVSULF is a peer-to-peer lost and found for West Visayas State University. It replaces the messy "Freedom Walls" with a structured, gamified system that uses Tailwind for a modern, mobile-first interface.',
      technologies: ['TypeScript', 'Convex', 'Tailwind'],
      link: '#',
      image: mysteryImg
    },
    {
      title: 'Budget Buddy',
      subtitle: 'A personal finance management application.',
      description: 'A personal finance management application that helps users track income and expenses, manage multiple wallets, create budgets, and monitor savings goals through an intuitive and data-driven platform.',
      technologies: ['Flutter', 'Convex'],
      link: '#',
      image: mysteryImg
    }
  ];

  const displayed = showAll ? projects : projects.slice(0, 4);

  // Re-trigger scroll animations when the list expands
  useEffect(() => {
    const revealEls = document.querySelectorAll('#projects .reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }, [showAll]);

  return (
    <section id="projects">
      <div className="eyebrow mono reveal">Projects</div>
      <h2 className="section-title reveal">Selected Work</h2>
      <div className="proj-grid">
        {displayed.map((p, i) => (
          <div 
            className={`proj-card reveal ${showAll && i >= 4 ? 'in' : ''}`} 
            key={i}
            onClick={() => setSelectedProject(p)}
            style={{ cursor: 'pointer', overflow: 'hidden' }}
          >
            <div style={{ 
              width: '100%', 
              height: '140px', 
              backgroundImage: `url(${p.image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderBottom: '1px solid var(--line)',
              marginBottom: '16px',
              backgroundColor: 'transparent'
            }}></div>
            <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 156px)' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{p.title}</h3>
              {p.award && (
                <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(234,179,8,.1)', color: '#ca8a04', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  {p.award}
                </div>
              )}
              <div style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '16px' }}>
                {p.subtitle}
              </div>
              <div className="stack" style={{ marginTop: 'auto' }}>
                {p.technologies.map(s => <span className="swatch" key={s}>{s}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.length > 4 && (
        <div className="reveal" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <button className="btn primary" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show less' : 'View all projects →'}
          </button>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ✕
            </button>
            <div className="modal-image" style={{ backgroundImage: `url(${selectedProject.image})` }}></div>
            <h2 style={{ margin: '0 0 8px 0', color: 'var(--ink)' }}>{selectedProject.title}</h2>
            {selectedProject.award && (
              <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(234,179,8,.1)', color: '#ca8a04', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '12px' }}>
                {selectedProject.award}
              </div>
            )}
            <div style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: '20px' }}>
              {selectedProject.subtitle}
            </div>
            
            <p style={{ color: 'var(--muted)', margin: '0 0 24px 0', lineHeight: 1.7, fontSize: '1.05rem' }}>
              {selectedProject.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: 'var(--ink)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tech Stack</h4>
              <div className="stack" style={{ gap: '8px' }}>
                {selectedProject.technologies.map(s => <span className="swatch" key={s} style={{ fontSize: '0.9rem', padding: '6px 12px' }}>{s}</span>)}
              </div>
            </div>

            {selectedProject.link !== '#' && (
              <a className="btn primary" href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Open Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}