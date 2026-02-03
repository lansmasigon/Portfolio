import './App.css'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Awards from './components/Awards'
import TechStack from './components/TechStack'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="app">
      <Home />
      <About />
      <Projects />
      <Awards />
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
