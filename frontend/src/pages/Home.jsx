import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import NasaIntelligence from '../components/landing/NasaIntelligence'
import HowItWorks from '../components/landing/HowItWorks'
import WhyAgroOrbit from '../components/landing/WhyAgroOrbit'
import KeyFeatures from '../components/landing/KeyFeatures'
import NasaDataSources from '../components/landing/NasaDataSources'
import CallToAction from '../components/landing/CallToAction'
import Footer from '../components/landing/Footer'

export default function Home() {
  return (
    <div className="bg-void text-space-100">
      <Navbar />
      <main>
        <Hero />
        <NasaIntelligence />
        <HowItWorks />
        <WhyAgroOrbit />
        <KeyFeatures />
        <NasaDataSources />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
