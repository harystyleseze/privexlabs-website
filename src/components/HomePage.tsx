import About from '@/components/sections/About/About'
import Approach from '@/components/sections/Approach/Approach'
import Capabilities from '@/components/sections/Capabilities/Capabilities'
import Contact from '@/components/sections/Contact/Contact'
import Direction from '@/components/sections/Direction/Direction'
import Hero from '@/components/sections/Hero/Hero'
import Infrastructure from '@/components/sections/Infrastructure/Infrastructure'
import Lab from '@/components/sections/Lab/Lab'
import Overview from '@/components/sections/Overview/Overview'
import Principles from '@/components/sections/Principles/Principles'
import Questions from '@/components/sections/Questions/Questions'
import Signal from '@/components/sections/Signal/Signal'
import SystemCheck from '@/components/sections/SystemCheck/SystemCheck'
import SystemMap from '@/components/sections/SystemMap/SystemMap'
import Vision from '@/components/sections/Vision/Vision'

// Sections in the design's order (00 INDEX … 13 CONTACT, with the dark system-check band after 04).
const HomePage = () => (
  <>
    <Hero />
    <Overview />
    <Signal />
    <Vision />
    <Capabilities />
    <SystemCheck />
    <Approach />
    <Infrastructure />
    <Questions />
    <SystemMap />
    <Lab />
    <Principles />
    <About />
    <Direction />
    <Contact />
  </>
)

export default HomePage
