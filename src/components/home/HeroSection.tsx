import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, Sparkles, Shield, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import isabellaAvatar from "@/assets/isabella-avatar.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Ecosistema Digital Mexicano</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">TAMV</span>
              <span className="text-foreground"> Online</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-muted-foreground">
                El Futuro Digital de Latinoamérica
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Tecnología Avanzada Mexicana Versátil. Un ecosistema soberano que fusiona 
              IA emocional, blockchain ético y experiencias inmersivas 4D para proteger 
              la dignidad digital humana.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=register">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/about">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-gradient-gold">35+</div>
                <div className="text-sm text-muted-foreground">Módulos</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-gradient-turquoise">4D</div>
                <div className="text-sm text-muted-foreground">Experiencia</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Soberano</div>
              </div>
            </div>
          </div>

          {/* Right Content - Isabella AI Preview */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-30 blur-xl" 
                   style={{ animationDuration: '10s' }} />
              
              {/* Avatar container */}
              <div className="relative glass rounded-3xl p-8 border border-primary/20 animate-float">
                <img 
                  src={isabellaAvatar} 
                  alt="Isabella AI" 
                  className="w-64 h-64 rounded-2xl object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 glass rounded-full border border-primary/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="font-display text-sm font-medium text-foreground">Isabella AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
