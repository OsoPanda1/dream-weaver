import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  UserPlus,
  MessageCircle,
  TrendingUp,
  Crown
} from "lucide-react";

const communities = [
  {
    id: 1,
    name: "Creadores TAMV",
    members: 12500,
    description: "Comunidad oficial de creadores de contenido TAMV.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
    isJoined: true,
  },
  {
    id: 2,
    name: "Desarrolladores MX",
    members: 8200,
    description: "Hub de desarrolladores mexicanos construyendo el futuro.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    isJoined: false,
  },
  {
    id: 3,
    name: "DreamSpacers",
    members: 5600,
    description: "Exploradores de realidades virtuales y espacios inmersivos.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400",
    isJoined: true,
  },
  {
    id: 4,
    name: "Isabella Fans",
    members: 15000,
    description: "Todo sobre Isabella AI y sus capacidades.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    isJoined: false,
  },
];

const topMembers = [
  { name: "Edwin Castillo", username: "@anubis", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", posts: 342 },
  { name: "María García", username: "@mariagarcia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", posts: 289 },
  { name: "Carlos Mendoza", username: "@carlosmendoza", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", posts: 245 },
];

export default function Community() {
  return (
    <>
      <Helmet>
        <title>Comunidad | TAMV Online</title>
        <meta name="description" content="Únete a la comunidad TAMV. Conecta con creadores, desarrolladores y visionarios de Latinoamérica." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background pt-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Comunidad
              </h1>
              <p className="text-muted-foreground">
                Conecta con miles de creadores y desarrolladores TAMV
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar comunidades..."
                    className="pl-10"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Crown className="h-4 w-4 text-primary" />
                    Top Miembros
                  </h3>
                  <div className="space-y-4">
                    {topMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary w-4">{index + 1}</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.posts} posts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Comunidades", value: "45", icon: Users },
                    { label: "Miembros Activos", value: "12.5K", icon: TrendingUp },
                    { label: "Mensajes/día", value: "8.2K", icon: MessageCircle },
                  ].map((stat, index) => (
                    <div key={index} className="p-4 rounded-xl bg-card border border-border text-center">
                      <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Communities Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {communities.map((community) => (
                    <article 
                      key={community.id}
                      className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors"
                    >
                      <div className="aspect-video relative">
                        <img 
                          src={community.image}
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="font-display font-bold text-foreground text-lg">
                            {community.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {community.members.toLocaleString()} miembros
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          {community.description}
                        </p>
                        <Button 
                          variant={community.isJoined ? "outline" : "hero"} 
                          size="sm" 
                          className="w-full"
                        >
                          {community.isJoined ? (
                            "Unido"
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Unirse
                            </>
                          )}
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
