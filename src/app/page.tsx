import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";
import { SiteExperience } from "@/components/site-experience";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="conteudo">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
      </main>
      <SiteFooter />
      <SiteExperience />
    </>
  );
}
