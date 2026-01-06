import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Únete al Movimiento</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            <span className="text-foreground">El Futuro Digital </span>
            <span className="text-gradient-gold">Comienza Hoy</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sé parte de la revolución tecnológica latinoamericana. Crea, conecta y 
            construye en un ecosistema que respeta tu dignidad digital.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth?mode=register">
                Crear Cuenta Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/hub-devs">
                Documentación API
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-4">Cumplimiento y certificaciones</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/60">
              <span className="font-mono text-sm">ISO 27001</span>
              <span className="text-border">•</span>
              <span className="font-mono text-sm">GDPR</span>
              <span className="text-border">•</span>
              <span className="font-mono text-sm">LFPDPPP</span>
              <span className="text-border">•</span>
              <span className="font-mono text-sm">SOC 2</span>
              <span className="text-border">•</span>
              <span className="font-mono text-sm">INDAUTOR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
