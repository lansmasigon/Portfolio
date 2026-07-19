import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import diatrackImg from '../assets/diatrack.svg';
import diasightImg from '../assets/diasight.png';
import attritionriskImg from '../assets/attritionrisk.png';
import hospitalImg from '../assets/hospital.png';
import aetherImg from '../assets/aether.png';
import logsyncImg from '../assets/logsync.png';
import openFolderImg from '../assets/open-folder.png';
import mysteryImg from '../assets/mystery.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "DiaTrack",
    subtitle: "Hybrid XAI-Enabled Diabetes Care Management System",
    description: "DiaTrack is a comprehensive diabetes care management system that combines cutting-edge AI technology with user-friendly interfaces. The system provides real-time monitoring, predictive analytics, and personalized recommendations for diabetes patients.",
    award: "🏆 Best Thesis",
    technologies: ["React", "Supabase", "Python", "CSS"],
    image: diatrackImg,
    link: "https://diatrack-cict.vercel.app/"
  },
  {
    title: "DiaSight",
    subtitle: "Non-Invasive Diabetic Retinopathy Risk Stratification",
    description: "DiaSight is an innovative application that uses advanced machine learning algorithms to assess diabetic retinopathy risk without invasive procedures. It provides early detection and risk stratification to help prevent vision loss in diabetic patients.",
    technologies: ["React", "Supabase", "Python", "CSS"],
    image: diasightImg,
    link: "https://diasight.ph"
  },
  {
    title: "RenalSight",
    subtitle: "Democratizing Nephrology.",
    description: "Transforming standard laboratory telemetry into high-fidelity prognostic insights. By utilizing routine biomarkers—eliminating the dependency on prohibitive diagnostic imaging—RenalSight deploys accessible, highly precise Chronic Kidney Disease (CKD) risk stratification to any clinical environment.",
    technologies: ["React", "Convex"],
    image: attritionriskImg,
    link: "https://renal-sight.vercel.app/"
  },
  {
    title: "Capiz Doctor's Hospital",
    subtitle: "Operational Intelligence Dashboard",
    description: "Built a Streamlit dashboard in Python to track hospital KPIs, staffing efficiency, readmission risk, and inventory performance. It provides interactive visuals to support operational decisions.",
    technologies: ["Python", "Streamlit"],
    image: hospitalImg,
    link: "https://github.com/LanceMasigon/hospital-dashboard"
  },
  {
    title: 'Employee Attrition Risk',
    subtitle: 'Analyzing employee attrition risk and identify key drivers using HR data',
    description: 'An advanced analytics solution that uses machine learning to predict employee attrition risk and identify key factors contributing to employee turnover. The system helps HR departments take proactive measures to retain valuable talent and improve workplace satisfaction.',
    technologies: ['Python', 'Pandas', 'Scikit-Learn'],
    image: attritionriskImg,
    link: '#'
  },
  {
    title: 'Aether',
    subtitle: 'A single-player browser RPG.',
    description: 'Aether is a single-player browser RPG, featuring town-based exploration, crafting, quests, and progression.',
    technologies: ['Phaser 3', 'Javascript'],
    image: aetherImg,
    link: '#'
  },
  {
    title: 'LogSync',
    subtitle: 'Creates internship journals by mapping GitHub activity',
    description: 'LogSync AI transforms your GitHub commits into professional daily work journals. Map your coding activity to a standard 9-to-5 schedule with AI-powered descriptions.',
    technologies: ['TypeScript', 'Tailwind', 'Convex'],
    image: logsyncImg,
    link: 'https://log-sync.vercel.app/'
  },
  {
    title: 'WVSU LF',
    subtitle: 'Replaces the messy "Freedom Walls"',
    description: 'WVSULF is a peer-to-peer lost and found for West Visayas State University. It replaces the messy "Freedom Walls" with a structured, gamified system that uses Tailwind for a modern, mobile-first interface.',
    technologies: ['TypeScript', 'Convex', 'Tailwind'],
    image: openFolderImg,
    link: '#'
  },
  {
    title: 'Budget Buddy',
    subtitle: 'A personal finance management application.',
    description: 'A personal finance management application that helps users track income and expenses, manage multiple wallets, create budgets, and monitor savings goals through an intuitive and data-driven platform.',
    technologies: ['Flutter', 'Convex'],
    image: mysteryImg,
    link: '#'
  }
];

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let ctx = gsap.context(() => {
      // Basic horizontal scroll logic
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile) {
        gsap.to(wrapper, {
          x: () => -(wrapper.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true
          }
        });
      }
    }, container);

    // Refresh ScrollTrigger to recalculate bounds when DOM updates
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, [showAllProjects]);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="md:h-screen w-full overflow-hidden relative"
    >
      <div 
        ref={wrapperRef}
        className="flex flex-col md:flex-row h-full md:w-max"
      >
        {displayedProjects.map((project, index) => (
          <div key={index} className="min-h-screen md:h-full w-full md:w-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8 shrink-0">
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center bg-white md:bg-transparent border border-gray-200 md:border-none rounded-3xl p-4 md:rounded-none md:p-0 md:border-r md:border-border">
              <div className="w-full md:w-1/2 p-3 md:p-8 order-2 md:order-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight text-[#1944F1]">{project.title}</h3>
              </div>
              <p className="text-lg md:text-2xl font-semibold uppercase tracking-widest text-gray-500 mb-4">{project.subtitle}</p>
              <p className="text-base md:text-lg text-text-secondary mb-4">{project.description}</p>
              
              {project.award && (
                <div className="mb-6 inline-block px-4 py-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full text-sm font-bold shadow-sm">
                  {project.award}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#1944F1] text-white rounded-full hover:bg-blue-800 transition-colors font-medium shadow-sm"
              >
                View Project
              </a>
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-8 flex justify-center items-center md:h-full overflow-visible order-1 md:order-2 min-h-[40vh]">
              <div className={`w-full h-full max-h-[80vh] flex items-center justify-center p-4 ${project.title === 'DiaTrack' ? 'overflow-visible' : ''}`}>
                <img 
                  src={project.image} 
                  alt={`${project.title} interface`} 
                  className={`max-w-full max-h-full object-contain rounded-2xl drop-shadow-2xl ${project.title === 'DiaTrack' ? 'scale-[2.5] md:scale-[5.5] translate-y-4' : ''}`}
                />
              </div>
            </div>
            </div>
          </div>
        ))}

        {/* Final Slide: See All Projects */}
        {!showAllProjects && (
          <div className="min-h-[50vh] md:h-full w-full md:w-[400px] flex flex-col items-center justify-center p-8 shrink-0">
            <button 
              onClick={() => setShowAllProjects(true)}
              className="group relative flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl hover:bg-white/80 hover:-translate-y-2 transition-all duration-300 w-full cursor-pointer outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="text-3xl md:text-4xl font-serif text-[#1944F1] mb-6 text-center font-bold">
                See All Projects
              </div>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1944F1] text-white group-hover:bg-blue-800 transition-colors duration-300 shadow-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
