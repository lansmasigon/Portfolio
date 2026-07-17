import './App.css'
import { Analytics } from "@vercel/analytics/react"
import Layout from './components/layout/Layout'

// New Sections
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import JourneySection from './components/JourneySection'
import TechStackSection from './components/TechStackSection'
import ProjectsSection from './components/ProjectsSection'
import AwardsSection from './components/AwardsSection'
import FooterSection from './components/FooterSection'

function App() {
  return (
    <Layout>
      <div className="app bg-background text-text-primary">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <TechStackSection />
        <ProjectsSection />
        <AwardsSection />
        <FooterSection />
        <Analytics />
      </div>
    </Layout>
  )
}

export default App
