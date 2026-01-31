import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3 className="footer-title">Let's Connect</h3>
            <p className="footer-description">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-nav">
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#awards">Awards</a></li>
              <li><a href="#techstack">Tech Stack</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 className="footer-subtitle">Contact</h4>
            <ul className="contact-list">
              <li>📧 lancemasigon@gmail.com</li>
              <li>📱 09283412021</li>
              <li>📍 Kalibo, Aklan</li>
            </ul>
          </div>
          
        </div>
        
        <div className="footer-bottom">
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
