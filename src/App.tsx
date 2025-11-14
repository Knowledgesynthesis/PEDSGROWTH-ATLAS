import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './stores/themeStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import GrowthChartExplorer from './pages/GrowthChartExplorer'
import VelocityCalculator from './pages/VelocityCalculator'
import BoneAgeSimulator from './pages/BoneAgeSimulator'
import EndocrinePathway from './pages/EndocrinePathway'
import NutritionModule from './pages/NutritionModule'
import GeneticsExplorer from './pages/GeneticsExplorer'
import CaseEngine from './pages/CaseEngine'
import AssessmentHub from './pages/AssessmentHub'
import Glossary from './pages/Glossary'

function App() {
  const { theme, initializeTheme } = useThemeStore()

  useEffect(() => {
    initializeTheme()
  }, [initializeTheme])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="growth-charts" element={<GrowthChartExplorer />} />
          <Route path="velocity" element={<VelocityCalculator />} />
          <Route path="bone-age" element={<BoneAgeSimulator />} />
          <Route path="endocrine" element={<EndocrinePathway />} />
          <Route path="nutrition" element={<NutritionModule />} />
          <Route path="genetics" element={<GeneticsExplorer />} />
          <Route path="cases" element={<CaseEngine />} />
          <Route path="assessment" element={<AssessmentHub />} />
          <Route path="glossary" element={<Glossary />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
