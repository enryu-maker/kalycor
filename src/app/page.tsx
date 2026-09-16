import { ScrollProgress } from "@/components/interactive/scroll-progress";
import { CustomCursor } from "@/components/interactive/custom-cursor";
import { Navbar } from "@/components/interactive/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { WhoWeAreSection } from "@/components/sections/who-we-are-section";
import { ServicesSection } from "@/components/sections/services-section";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function HomePage() {
  return (
    <main className="site-shell min-h-screen">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <EnquirySection />
      <FooterSection />
    </main>
  );
}