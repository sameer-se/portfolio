import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { AnimatedSection } from "@/components/animated-section"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <div className="relative">
          <Hero />
        </div>

        <AnimatedSection>
          <About />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Projects />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Contact />
        </AnimatedSection>

        <AnimatedSection delay={0.4} direction="up" distance={20}>
          <Footer />
        </AnimatedSection>

        <ScrollToTop />
      </Suspense>
    </main>
  )
}
