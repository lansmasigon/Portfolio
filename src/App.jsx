import './App.css'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Awards from './components/Awards'
import TechStack from './components/TechStack'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Home />
      <About />
      <Projects />
      <Awards />
      <Footer />
    </div>
  )
}

export default App
