import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Blocks, 
  Plus, 
  Users, 
  Eye,
  Search,
  Sparkles,
  Gamepad2,
  Music,
  Palette,
  Building2
} from "lucide-react";
import dreamspacesPreview from "@/assets/dreamspaces-preview.jpg";

const featuredSpaces = [
  {
    id: 1,
    name: "Galería Digital CDMX",
    creator: "ArteTAMV",
    visitors: 1234,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    category: "Arte",
  },
  {
    id: 2,
    name: "Estudio Musical 3D",
    creator: "SonidoMX",
    visitors: 856,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    category: "Música",
  },
  {
    id: 3,
    name: "Arena Gaming VR",
    creator: "GamersUnidos",
    visitors: 2341,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    category: "Gaming",
  },
  {
    id: 4,
    name: "Oficina Virtual TAMV",
    creator: "TAMVOfficial",
    visitors: 567,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    category: "Trabajo",
  },
];

const categories = [
  { name: "Arte", icon: Palette, count: 234 },
  { name: "Música", icon: Music, count: 189 },
  { name: "Gaming", icon: Gamepad2, count: 456 },
  { name: "Trabajo", icon: Building2, count: 123 },
];

export default function DreamSpaces() {
  return (
    <>
      <Helmet>
        <title>DreamSpaces | TAMV Online</title>
        <meta name="description" content="Explora y crea espacios virtuales inmersivos en DreamSpaces. Experiencias 4D con audio KAOS y realidad extendida." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section 
            className="relative py-24 overflow-hidden"
            style={{
              backgroundImage: `url(${dreamspacesPreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Blocks className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Realidad Extendida</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  DreamSpaces
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Crea, explora y comparte espacios virtuales inmersivos. 
                  Experiencias 4D con audio espacial KAOS y colaboración en tiempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="xl">
                    <Plus className="h-5 w-5 mr-2" />
                    Crear DreamSpace
                  </Button>
                  <Button variant="heroOutline" size="xl">
                    <Search className="h-5 w-5 mr-2" />
                    Explorar Espacios
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Categories */}
          <section className="py-12 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar DreamSpaces..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  {categories.map((category) => (
                    <Button 
                      key={category.name}
                      variant="outline"
                      className="gap-2"
                    >
                      <category.icon className="h-4 w-4" />
                      {category.name}
                      <span className="text-xs text-muted-foreground">({category.count})</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Spaces */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Espacios Destacados
                  </h2>
                  <p className="text-muted-foreground">
                    Los DreamSpaces más populares de la comunidad
                  </p>
                </div>
                <Button variant="outline">Ver todos</Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredSpaces.map((space) => (
                  <article 
                    key={space.id}
                    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {space.visitors}
                      </div>
                      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        {space.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {space.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {space.creator}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-gradient-cosmic">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Características Inmersivas
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Tecnología de vanguardia para experiencias que desafían los límites
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Sparkles,
                    title: "Audio KAOS 3D",
                    description: "Sistema de audio espacial que te envuelve completamente en la experiencia."
                  },
                  {
                    icon: Blocks,
                    title: "Física Realista",
                    description: "Motor de física que simula interacciones naturales con objetos virtuales."
                  },
                  {
                    icon: Users,
                    title: "Colaboración Real",
                    description: "Invita amigos y colabora en tiempo real dentro de cualquier espacio."
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="p-8 rounded-2xl bg-card/50 border border-border text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
}
