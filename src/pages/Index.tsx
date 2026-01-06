import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { 
  HeroSection, 
  FeaturesSection, 
  PrinciplesSection, 
  IsabellaSection, 
  CTASection 
} from "@/components/home";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TAMV Online | Tecnología Avanzada Mexicana Versátil</title>
        <meta name="description" content="Ecosistema digital soberano de México. IA emocional, blockchain ético, experiencias inmersivas 4D. Protegemos tu dignidad digital." />
        <meta property="og:title" content="TAMV Online | El Futuro Digital de Latinoamérica" />
        <meta property="og:description" content="Tecnología Avanzada Mexicana Versátil. Ecosistema de IA soberana con Isabella AI, DreamSpaces y Blockchain MSR." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://tamv.online" />
      </Helmet>
      
      <MainLayout>
        <HeroSection />
        <FeaturesSection />
        <IsabellaSection />
        <PrinciplesSection />
        <CTASection />
      </MainLayout>
    </>
  );
};

export default Index;
