import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Blocks, Shield, Code2, Users, Radio } from "lucide-react";
import dreamspacesPreview from "@/assets/dreamspaces-preview.jpg";
import blockchainPreview from "@/assets/blockchain-preview.jpg";
import hubDevsPreview from "@/assets/hub-devs-preview.jpg";
import livePreview from "@/assets/live-community.jpg";

const features = [
  {
    id: "dreamspaces",
    title: "DreamSpaces",
    subtitle: "Mundos Inmersivos 4D",
    description: "Experimenta realidades generadas por IA basadas en memoria emocional. Espacios multisensoriales que responden a tus emociones.",
    icon: Blocks,
    image: dreamspacesPreview,
    href: "/dreamspaces",
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    id: "isabella",
    title: "Isabella AI",
    subtitle: "IA Emocional Mexicana",
    description: "Inteligencia artificial neuro-simbólica con análisis multimodal y memoria evolutiva. Tu compañera digital consciente.",
    icon: Sparkles,
    image: null,
    href: "/isabella",
    gradient: "from-secondary/20 to-primary/20",
  },
  {
    id: "blockchain",
    title: "Blockchain MSR",
    subtitle: "La Sexta Blockchain Mundial",
    description: "Registro inmutable con trazabilidad legal y auditoría forense. Protección de evidencia y contratos inteligentes éticos.",
    icon: Shield,
    image: blockchainPreview,
    href: "/blockchain",
    gradient: "from-primary/20 to-gold-dark/20",
  },
  {
    id: "hub-devs",
    title: "Hub Devs",
    subtitle: "Centro de Desarrolladores",
    description: "APIs, SDKs y herramientas para construir sobre el ecosistema TAMV. Documentación completa y soporte activo.",
    icon: Code2,
    image: hubDevsPreview,
    href: "/hub-devs",
    gradient: "from-turquoise/20 to-primary/20",
  },
  {
    id: "community",
    title: "Comunidad",
    subtitle: "Red Social Soberana",
    description: "Conecta con creadores, grupos y comunidades. Chats, lives y contenido multimedia con privacidad garantizada.",
    icon: Users,
    image: livePreview,
    href: "/community",
    gradient: "from-secondary/20 to-turquoise/20",
  },
  {
    id: "lives",
    title: "TAMV Lives",
    subtitle: "Streaming en Vivo",
    description: "Transmisiones con audio 3D Atmos, efectos inmersivos y notificaciones multisensoriales. El pulso vivo del ecosistema.",
    icon: Radio,
    image: livePreview,
    href: "/lives",
    gradient: "from-primary/20 to-secondary/20",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-cosmic relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Blocks className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Ecosistema Completo</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Módulos del </span>
            <span className="text-gradient-gold">Ecosistema</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnología de vanguardia con identidad latinoamericana. Cada módulo diseñado 
            para proteger tu dignidad digital y potenciar tu creatividad.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.id}
              to={feature.href}
              className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Image */}
              {feature.image && (
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-gradient-gold transition-all">
                  {feature.title}
                </h3>
                <p className="text-sm text-primary mb-3">{feature.subtitle}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
