import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Video, 
  Smile, 
  Send,
  TrendingUp,
  Users,
  Radio
} from "lucide-react";

// Mock data for feed
const posts = [
  {
    id: 1,
    author: {
      name: "María García",
      username: "@mariagarcia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      verified: true,
    },
    content: "¡Acabo de crear mi primer DreamSpace! La experiencia inmersiva es increíble. El audio 3D con KAOS te transporta a otro mundo. 🌟✨",
    image: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "hace 2h",
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "Carlos Mendoza",
      username: "@carlosmendoza",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      verified: false,
    },
    content: "Explorando las APIs del Hub Devs. La documentación está muy completa y la integración con Blockchain MSR es elegante. Pronto comparto mi proyecto. 🚀",
    image: null,
    likes: 89,
    comments: 23,
    shares: 5,
    timestamp: "hace 4h",
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: "Ana Villaseñor",
      username: "@anavillase",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      verified: true,
    },
    content: "Live esta noche a las 9PM! Vamos a hablar sobre creatividad digital y cómo Isabella AI puede potenciar tu proceso creativo. ¡No se lo pierdan! 🎥",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    likes: 456,
    comments: 78,
    shares: 34,
    timestamp: "hace 6h",
    isLiked: false,
  },
];

const trendingTopics = [
  { tag: "#DreamSpaces", posts: "12.5K" },
  { tag: "#IsabellaAI", posts: "8.2K" },
  { tag: "#TAMVDevs", posts: "5.1K" },
  { tag: "#BlockchainMSR", posts: "3.4K" },
  { tag: "#CreatividadMexicana", posts: "2.8K" },
];

const suggestedUsers = [
  { name: "TAMV Official", username: "@tamvofficial", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
  { name: "Isabella AI", username: "@isabellaia", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
  { name: "Dev Community", username: "@devstamv", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150" },
];

export default function FeedPage() {
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([2]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <>
      <Helmet>
        <title>Feed | TAMV Online</title>
        <meta name="description" content="Explora el feed de TAMV Online. Contenido multimedia, actualizaciones y comunidad creativa mexicana." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background pt-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left Sidebar */}
              <div className="hidden lg:block space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Tendencias
                  </h3>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-primary hover:underline cursor-pointer">{topic.tag}</span>
                        <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        placeholder="¿Qué está pasando?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="bg-muted border-0 mb-4"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="iconSm">
                            <ImageIcon className="h-5 w-5 text-primary" />
                          </Button>
                          <Button variant="ghost" size="iconSm">
                            <Video className="h-5 w-5 text-secondary" />
                          </Button>
                          <Button variant="ghost" size="iconSm">
                            <Smile className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        </div>
                        <Button variant="hero" size="sm" disabled={!newPost.trim()}>
                          <Send className="h-4 w-4 mr-2" />
                          Publicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts */}
                {posts.map((post) => (
                  <article key={post.id} className="p-6 rounded-2xl bg-card border border-border hover:border-border/80 transition-colors">
                    {/* Author */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{post.author.name}</span>
                            {post.author.verified && (
                              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-[10px] text-primary-foreground">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{post.author.username} · {post.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="iconSm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Content */}
                    <p className="text-foreground mb-4">{post.content}</p>

                    {/* Image */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleLike(post.id)}
                        className={likedPosts.includes(post.id) ? "text-destructive" : "text-muted-foreground"}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                        {post.likes + (likedPosts.includes(post.id) && !post.isLiked ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share2 className="h-4 w-4 mr-2" />
                        {post.shares}
                      </Button>
                      <Button variant="ghost" size="iconSm" className="text-muted-foreground">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Right Sidebar */}
              <div className="hidden lg:block space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    Sugeridos
                  </h3>
                  <div className="space-y-4">
                    {suggestedUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.username}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Seguir</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-card border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-sm font-medium text-primary">En Vivo Ahora</span>
                  </div>
                  <p className="text-sm text-foreground mb-3">Ana está en vivo: "Creatividad con IA"</p>
                  <Button variant="hero" size="sm" className="w-full">
                    Ver Live
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
