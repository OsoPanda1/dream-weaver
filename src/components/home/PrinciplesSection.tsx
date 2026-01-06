import { Shield, Lock, Eye, FileCheck, Globe, Zap } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Soberanía Digital",
    description: "Tus datos te pertenecen. Control total sobre tu identidad y contenido digital.",
  },
  {
    icon: Lock,
    title: "Privacidad por Diseño",
    description: "Encriptación end-to-end y consentimientos granulares. GDPR, LFPDPPP compliant.",
  },
  {
    icon: Eye,
    title: "Transparencia Total",
    description: "Código auditable, decisiones trazables y logs inmutables con BookPI.",
  },
  {
    icon: FileCheck,
    title: "Ética Operacional",
    description: "11 guardianes DEKATEOTL filtran cada decisión de IA por principios éticos.",
  },
  {
    icon: Globe,
    title: "Federación Triple",
    description: "Constitucional, Plataforma y Dominio. Gobernanza descentralizada y resiliente.",
  },
  {
    icon: Zap,
    title: "Rendimiento Extremo",
    description: "Arquitectura cloud-native con Kubernetes, escalado dinámico y latencia mínima.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a015' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Fundamentos Éticos</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Principios </span>
            <span className="text-gradient-turquoise">Fundamentales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada línea de código está guiada por valores que protegen la dignidad humana 
            y promueven un futuro digital más justo.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="group p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 w-fit mb-6 group-hover:bg-secondary/20 transition-colors">
                <principle.icon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {principle.title}
              </h3>
              <p className="text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
