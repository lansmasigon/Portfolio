import './TechStack.css';

function TechStack() {
  const technologies = [
    // Programming Languages
    { name: "Python", icon: "🐍" },
    { name: "PHP", icon: "🐘" },
    { name: "JavaScript", icon: "📜" },
    { name: "R", icon: "�" },
    // Web Development
    { name: "React.js", icon: "⚛️" },
    { name: "Vite", icon: "⚡" },
    { name: "HTML5", icon: "📄" },
    { name: "CSS3", icon: "🎨" },
    { name: "jQuery", icon: "�" },
    // Data Mining
    { name: "Orange", icon: "🍊" },
    // Mobile Development
    { name: "Flutter", icon: "�" },
    // Database Systems
    { name: "MySQL", icon: "🗄️" },
    { name: "Supabase", icon: "🔥" }
  ];

  return (
    <section id="techstack" className="techstack-section">
      <div className="container">
        <h2 className="section-title">Tech Stack</h2>
        
        <div className="carousel-wrapper">
          <div className="carousel-track">
            {/* First set of technologies */}
            {technologies.map((tech, index) => (
              <div key={`tech-1-${index}`} className="tech-item">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {technologies.map((tech, index) => (
              <div key={`tech-2-${index}`} className="tech-item">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
