import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import { BrandStorySection } from "@/components/BrandStorySection";
import ShopSection from "@/components/ShopSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { StoresSection } from "@/components/StoresSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        
        <section className="bg-background">
          <FeaturedSection />
        </section>
        
        <BrandStorySection />
        
        <section id="shop-section" className="bg-muted/30">
          <ShopSection />
        </section>
        
        <TestimonialsSection />
        
        <StoresSection />
      </main>
      
      <Footer />
    </div>
  );
}