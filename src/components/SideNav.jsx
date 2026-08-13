export default function SideNav() {
  return (
    <nav className="side-nav" id="sideNav">
      <button data-target="profile"><span className="tip">Profile</span></button>
      <button data-target="about"><span className="tip">About</span></button>
      <button data-target="experience"><span className="tip">Experience</span></button>
      <button data-target="tech-stack"><span className="tip">Tech Stack</span></button>
      <button data-target="projects"><span className="tip">Projects</span></button>
      <button data-target="awards"><span className="tip">Awards</span></button>
      <button data-target="github"><span className="tip">GitHub</span></button>
      <button data-target="contact"><span className="tip">Contact</span></button>
    </nav>
  );
}