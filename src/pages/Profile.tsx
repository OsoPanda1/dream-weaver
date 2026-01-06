import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Settings,
  LogOut,
  Edit,
  Check,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useFileUpload } from "@/hooks/useFileUpload";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Profile() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { uploadFile, uploading } = useFileUpload();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadFile(file, 'avatars');
    if (result) {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: result.url })
        .eq('id', user?.id);

      if (!error) {
        await refreshProfile();
        toast({
          title: "Avatar actualizado",
          description: "Tu foto de perfil ha sido actualizada.",
        });
      }
    }
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update(editData)
      .eq('id', user?.id);

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil.",
        variant: "destructive",
      });
    } else {
      await refreshProfile();
      setIsEditing(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Mi Perfil | TAMV Online</title>
        <meta name="description" content="Gestiona tu perfil en TAMV Online." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background pt-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Profile Header */}
            <div className="relative mb-8">
              {/* Cover */}
              <div className="h-48 rounded-2xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />
              
              {/* Avatar */}
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="text-3xl">
                      {profile?.display_name?.[0] || user?.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                    <Button variant="hero" size="sm" onClick={handleSaveProfile}>
                      <Check className="h-4 w-4 mr-1" />
                      Guardar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-1" />
                      Salir
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="pl-8 mt-20 mb-8">
              {isEditing ? (
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-sm text-muted-foreground">Nombre</label>
                    <Input 
                      value={editData.display_name}
                      onChange={(e) => setEditData(prev => ({ ...prev, display_name: e.target.value }))}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Bio</label>
                    <Textarea 
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Cuéntanos sobre ti"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Ubicación</label>
                    <Input 
                      value={editData.location}
                      onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Ciudad, País"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Sitio web</label>
                    <Input 
                      value={editData.website}
                      onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {profile?.display_name || 'Usuario TAMV'}
                  </h1>
                  <p className="text-muted-foreground">@{profile?.username}</p>
                  
                  {profile?.bio && (
                    <p className="text-foreground mt-4 max-w-xl">{profile.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                    {profile?.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </span>
                    )}
                    {profile?.website && (
                      <a 
                        href={profile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <LinkIcon className="h-4 w-4" />
                        {profile.website.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Se unió en {profile?.created_at ? format(new Date(profile.created_at), 'MMMM yyyy', { locale: es }) : 'Recientemente'}
                    </span>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <span className="text-foreground">
                      <strong>{profile?.following_count || 0}</strong>{' '}
                      <span className="text-muted-foreground">Siguiendo</span>
                    </span>
                    <span className="text-foreground">
                      <strong>{profile?.follower_count || 0}</strong>{' '}
                      <span className="text-muted-foreground">Seguidores</span>
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="posts" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Publicaciones
                </TabsTrigger>
                <TabsTrigger 
                  value="media" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Media
                </TabsTrigger>
                <TabsTrigger 
                  value="likes" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Me gusta
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="py-8">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Aún no tienes publicaciones.</p>
                  <Button variant="hero" className="mt-4" onClick={() => navigate('/feed')}>
                    Crear primera publicación
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="media" className="py-8">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No hay contenido multimedia.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="likes" className="py-8">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No has dado me gusta a ninguna publicación.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
