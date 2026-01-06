import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Video, 
  Send,
  TrendingUp,
  Users,
  Radio,
  Loader2,
  X,
  Trash2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts } from "@/hooks/usePosts";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { user, profile } = useAuth();
  const { posts, loading, likedPosts, createPost, toggleLike, deletePost } = usePosts();
  const { uploadMultiple, uploading } = useFileUpload();
  const [newPostContent, setNewPostContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Preview
    const previews = files.map(file => URL.createObjectURL(file));
    setMediaPreview(prev => [...prev, ...previews]);
    setMediaFiles(prev => [...prev, ...files]);
  };

  const removeMedia = (index: number) => {
    URL.revokeObjectURL(mediaPreview[index]);
    setMediaPreview(prev => prev.filter((_, i) => i !== index));
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!newPostContent.trim() && mediaFiles.length === 0) return;

    setIsPosting(true);

    try {
      let mediaUrls: string[] = [];
      
      if (mediaFiles.length > 0) {
        const uploads = await uploadMultiple(mediaFiles, 'posts');
        mediaUrls = uploads.map(u => u.url);
      }

      await createPost({
        content: newPostContent,
        post_type: mediaUrls.length > 0 ? 'image' : 'text',
        media_urls: mediaUrls,
      });

      setNewPostContent("");
      setMediaPreview([]);
      setMediaFiles([]);
    } finally {
      setIsPosting(false);
    }
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
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback>{profile?.display_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="¿Qué está pasando?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="bg-muted border-0 mb-4 min-h-[80px] resize-none"
                        disabled={isPosting}
                      />
                      
                      {/* Media Preview */}
                      {mediaPreview.length > 0 && (
                        <div className="flex gap-2 mb-4 flex-wrap">
                          {mediaPreview.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={preview} 
                                alt="Preview" 
                                className="h-20 w-20 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removeMedia(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*,video/*"
                            multiple
                            className="hidden"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isPosting}
                          >
                            <ImageIcon className="h-5 w-5 text-primary" />
                          </Button>
                          <Button variant="ghost" size="sm" disabled={isPosting}>
                            <Video className="h-5 w-5 text-secondary" />
                          </Button>
                        </div>
                        <Button 
                          variant="hero" 
                          size="sm" 
                          disabled={(!newPostContent.trim() && mediaFiles.length === 0) || isPosting}
                          onClick={handlePost}
                        >
                          {isPosting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Publicar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}

                {/* Empty State */}
                {!loading && posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No hay publicaciones aún. ¡Sé el primero en compartir!</p>
                  </div>
                )}

                {/* Posts */}
                {posts.map((post) => (
                  <article key={post.id} className="p-6 rounded-2xl bg-card border border-border hover:border-border/80 transition-colors">
                    {/* Author */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.profiles?.avatar_url || undefined} />
                          <AvatarFallback>{post.profiles?.display_name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {post.profiles?.display_name || post.profiles?.username || 'Usuario'}
                            </span>
                            {post.profiles?.is_verified && (
                              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-[10px] text-primary-foreground">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            @{post.profiles?.username || 'usuario'} · {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
                          </span>
                        </div>
                      </div>
                      {post.user_id === user?.id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => deletePost(post.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    {/* Content */}
                    {post.content && (
                      <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
                    )}

                    {/* Media */}
                    {post.media_urls && post.media_urls.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${post.media_urls.length > 1 ? 'grid-cols-2' : ''}`}>
                        {post.media_urls.map((url, i) => (
                          <div key={i} className="rounded-xl overflow-hidden">
                            <img 
                              src={url} 
                              alt="Post content" 
                              className="w-full h-auto object-cover max-h-96"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleLike(post.id)}
                        className={likedPosts.has(post.id) ? "text-destructive" : "text-muted-foreground"}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                        {post.like_count}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comment_count}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share2 className="h-4 w-4 mr-2" />
                        {post.share_count}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
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
                    {suggestedUsers.map((suggestedUser, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={suggestedUser.avatar} alt={suggestedUser.name} />
                            <AvatarFallback>{suggestedUser.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{suggestedUser.name}</p>
                            <p className="text-xs text-muted-foreground">{suggestedUser.username}</p>
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
                  <p className="text-sm text-foreground mb-3">Próximamente: Lives en TAMV</p>
                  <Button variant="hero" size="sm" className="w-full" disabled>
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
