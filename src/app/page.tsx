import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import ChatComponent from '@/components/Chatarea'
export default function Home() {
  return (
    <>
     <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <ChatComponent />
      </main>
    <Footer />
    </>
  )
}
