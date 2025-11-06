import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SearchPreview } from "@/components/search-preview"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <SearchPreview />
        <StatsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
