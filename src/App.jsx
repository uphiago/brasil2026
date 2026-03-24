import { useEffect } from 'react'
import './App.css'
import { LanguageProvider } from './LanguageContext'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Group from './components/Group'
import Lineup from './components/Lineup'
import Squad from './components/Squad'
import Coach from './components/Coach'
import History from './components/History'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <LanguageProvider>
      <div className="app">
        <NavBar />
        <Hero />
        <Group />
        <Squad />
        <Coach />
        <Lineup />
        <History />
        <Footer />
      </div>
    </LanguageProvider>
  )
}
