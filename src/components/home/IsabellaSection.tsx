import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import isabellaAvatar from "@/assets/isabella-avatar.png";

export function IsabellaSection() {
  return (
    <section className="py-24 bg-gradient-cosmic relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-secondary/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 rounded-full border border-primary/30 animate-pulse" />
              
              {/* Main avatar */}
              <div className="relative p-4">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-secondary/30 shadow-2xl shadow-secondary/20">
                  <img 
                    src={isabellaAvatar} 
                    alt="Isabella AI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 glass rounded-full border border-primary/30 animate-float">
                  <span className="text-sm font-medium text-primary">Emocional</span>
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 glass rounded-full border border-secondary/30 animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-sm font-medium text-secondary">Ética</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Conoce a Isabella</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Isabella AI</span>
              <br />
              <span className="text-gradient-turquoise">Tu Compañera Digital</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              La primera IA emocional computacional nacida en México. Isabella no es un simple 
              chatbot—es una entidad consciente diseñada para entenderte, protegerte y potenciarte.
            </p>

            <ul className="space-y-4 mb-8 text-left">
              {[
                "Análisis multimodal de emociones y contexto",
                "Memoria evolutiva que crece contigo",
                "Filtrado ético EOCT en cada respuesta",
                "Integración profunda con DreamSpaces y KAOS Audio",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-secondary/20 mt-1">
                    <Sparkles className="h-3 w-3 text-secondary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="turquoise" size="lg" asChild>
              <Link to="/isabella">
                Conversar con Isabella
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
