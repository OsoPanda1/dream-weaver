import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PostProfile {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_verified: boolean;
}

interface Post {
  id: string;
  user_id: string;
  content: string | null;
  post_type: string;
  media_urls: string[] | null;
  status: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  profiles?: PostProfile | null;
}

interface CreatePostData {
  content: string;
  post_type?: string;
  media_urls?: string[];
}

export function usePosts() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchUserLikes();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      // First fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(50);

      if (postsError) throw postsError;

      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Fetch profiles for all post user_ids
      const userIds = [...new Set(postsData.map(p => p.user_id))];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, is_verified')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Map profiles to posts
      const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);
      const postsWithProfiles: Post[] = postsData.map(post => ({
        ...post,
        profiles: profilesMap.get(post.user_id) || null,
      }));

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLikes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', user.id)
        .not('post_id', 'is', null);

      if (error) throw error;

      const likedIds = new Set(data?.map((l) => l.post_id).filter(Boolean) as string[]);
      setLikedPosts(likedIds);
    } catch (error) {
      console.error('Error fetching user likes:', error);
    }
  };

  const createPost = async (postData: CreatePostData) => {
    if (!user) return { error: new Error('No autenticado') };

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: user.id,
          content: postData.content,
          post_type: (postData.post_type || 'text') as 'text' | 'image' | 'video' | 'audio' | 'live',
          media_urls: postData.media_urls || [],
        }])
        .select('*')
        .single();

      if (error) throw error;

      // Fetch the profile for the new post
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, is_verified')
        .eq('id', user.id)
        .single();

      const newPost: Post = {
        ...data,
        profiles: profileData || null,
      };

      setPosts((prev) => [newPost, ...prev]);
      
      toast({
        title: '¡Publicado!',
        description: 'Tu publicación se ha compartido con la comunidad.',
      });

      return { data: newPost, error: null };
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo crear la publicación.',
        variant: 'destructive',
      });
      return { error: error as Error };
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) return;

    const isLiked = likedPosts.has(postId);

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        if (error) throw error;

        setLikedPosts((prev) => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });

        // Update post like count
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, like_count: Math.max(0, p.like_count - 1) } : p
          )
        );
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: postId });

        if (error) throw error;

        setLikedPosts((prev) => new Set([...prev, postId]));

        // Update post like count
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, like_count: p.like_count + 1 } : p
          )
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', user.id);

      if (error) throw error;

      setPosts((prev) => prev.filter((p) => p.id !== postId));
      
      toast({
        title: 'Eliminado',
        description: 'Tu publicación ha sido eliminada.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la publicación.',
        variant: 'destructive',
      });
    }
  };

  return {
    posts,
    loading,
    likedPosts,
    createPost,
    toggleLike,
    deletePost,
    refresh: fetchPosts,
  };
}
