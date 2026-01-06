import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Video, 
  Radio,
  Users,
  Heart,
  MessageCircle,
  Eye,
  Play
} from "lucide-react";
import liveCommunity from "@/assets/live-community.jpg";

const liveNow = [
  {
    id: 1,
    title: "Desarrollo con Isabella AI en Vivo",
    streamer: "TAMVOfficial",
    viewers: 1234,
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    category: "Tech"
  },
  {
    id: 2,
    title: "Creando DreamSpace desde cero",
    streamer: "MaríaCreates",
    viewers: 856,
    thumbnail: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    category: "Creatividad"
  },
];

const upcomingStreams = [
  { title: "Workshop: APIs TAMV", time: "Hoy 8:00 PM", streamer: "DevCommunity" },
  { title: "Q&A con el equipo TAMV", time: "Mañana 6:00 PM", streamer: "TAMVOfficial" },
  { title: "Música en vivo", time: "Viernes 9:00 PM", streamer: "SonidoMX" },
];

const categories = [
  { name: "Tech", count: 12 },
  { name: "Creatividad", count: 8 },
  { name: "Música", count: 5 },
  { name: "Gaming", count: 15 },
  { name: "Charlas", count: 7 },
];

export default function Lives() {
  return (
    <>
      <Helmet>
        <title>Lives | TAMV Online</title>
        <meta name="description" content="Transmisiones en vivo de la comunidad TAMV. Conecta en tiempo real con creadores y desarrolladores." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background">
          {/* Hero */}
          <section 
            className="relative py-16 overflow-hidden"
            style={{
              backgroundImage: `url(${liveCommunity})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="h-5 w-5 text-destructive animate-pulse" />
                    <span className="text-sm font-medium text-destructive">EN VIVO AHORA</span>
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Lives TAMV
                  </h1>
                  <p className="text-muted-foreground">
                    Transmisiones en tiempo real de la comunidad
                  </p>
                </div>
                <Button variant="hero" size="lg">
                  <Video className="h-5 w-5 mr-2" />
                  Iniciar Live
                </Button>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Live Now */}
                <section>
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Radio className="h-5 w-5 text-destructive animate-pulse" />
                    En Vivo Ahora
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {liveNow.map((stream) => (
                      <article 
                        key={stream.id}
                        className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-destructive/50 transition-colors cursor-pointer"
                      >
                        <div className="aspect-video relative">
                          <img 
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors" />
                          
                          {/* Live badge */}
                          <div className="absolute top-3 left-3 px-2 py-1 rounded bg-destructive text-destructive-foreground text-xs font-bold flex items-center gap-1">
                            <Radio className="h-3 w-3 animate-pulse" />
                            LIVE
                          </div>
                          
                          {/* Viewers */}
                          <div className="absolute top-3 right-3 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {stream.viewers.toLocaleString()}
                          </div>
                          
                          {/* Category */}
                          <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/90 text-primary-foreground text-xs font-medium">
                            {stream.category}
                          </div>

                          {/* Play button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-destructive/90 flex items-center justify-center">
                              <Play className="h-8 w-8 text-destructive-foreground ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border-2 border-destructive">
                              <AvatarImage src={stream.avatar} alt={stream.streamer} />
                              <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground truncate group-hover:text-destructive transition-colors">
                                {stream.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{stream.streamer}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                {/* No more lives message */}
                <div className="text-center py-12 rounded-2xl bg-card border border-border">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Más lives pronto
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Activa las notificaciones para no perderte ningún live
                  </p>
                  <Button variant="outline">Activar notificaciones</Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Categories */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button 
                        key={index}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <span className="text-sm text-foreground">{category.name}</span>
                        <span className="text-xs text-muted-foreground">{category.count} lives</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upcoming */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Próximamente
                  </h3>
                  <div className="space-y-4">
                    {upcomingStreams.map((stream, index) => (
                      <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
                        <p className="text-sm font-medium text-foreground mb-1">{stream.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{stream.streamer}</span>
                          <span className="text-xs text-primary">{stream.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
