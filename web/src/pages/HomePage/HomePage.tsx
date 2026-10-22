import { Metadata } from '@redwoodjs/web'

import About from 'src/components/sections/About/About'
import Approach from 'src/components/sections/Approach/Approach'
import Capabilities from 'src/components/sections/Capabilities/Capabilities'
import Contact from 'src/components/sections/Contact/Contact'
import Direction from 'src/components/sections/Direction/Direction'
import Hero from 'src/components/sections/Hero/Hero'
import Infrastructure from 'src/components/sections/Infrastructure/Infrastructure'
import Lab from 'src/components/sections/Lab/Lab'
import Overview from 'src/components/sections/Overview/Overview'
import Principles from 'src/components/sections/Principles/Principles'
import Questions from 'src/components/sections/Questions/Questions'
import Signal from 'src/components/sections/Signal/Signal'
import SystemCheck from 'src/components/sections/SystemCheck/SystemCheck'
import SystemMap from 'src/components/sections/SystemMap/SystemMap'
import Vision from 'src/components/sections/Vision/Vision'
import { COMPANY_SENTENCE } from 'src/content/site'

// Sections in the design's order (00 INDEX … 13 CONTACT, with the dark system-check band after 04).
const HomePage = () => (
  <>
    <Metadata
      title="PrivexLabs — Software, automation, and practical AI for growing businesses"
      description={COMPANY_SENTENCE}
    />
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
