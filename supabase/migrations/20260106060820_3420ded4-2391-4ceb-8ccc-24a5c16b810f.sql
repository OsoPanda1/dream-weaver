-- ============================================
-- TAMV ONLINE - COMPLETE DATABASE SCHEMA
-- Grado militar de seguridad y privacidad
-- ============================================

-- 1. ENUM TYPES
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'creator', 'user');
CREATE TYPE public.post_type AS ENUM ('text', 'image', 'video', 'audio', 'live');
CREATE TYPE public.notification_type AS ENUM ('like', 'comment', 'follow', 'mention', 'system', 'live');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived', 'flagged');

-- 2. PROFILES TABLE (public user info)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_creator BOOLEAN DEFAULT FALSE,
  follower_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER ROLES TABLE (secure role management)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- 4. POSTS TABLE
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  post_type post_type DEFAULT 'text',
  media_urls TEXT[],
  status content_status DEFAULT 'published',
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  parent_post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COMMENTS TABLE
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  like_count INTEGER DEFAULT 0,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LIKES TABLE
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, post_id),
  UNIQUE (user_id, comment_id),
  CHECK (post_id IS NOT NULL OR comment_id IS NOT NULL)
);

-- 7. FOLLOWS TABLE
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- 8. NOTIFICATIONS TABLE
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  actor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. LIVE STREAMS TABLE
CREATE TABLE public.live_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  stream_key TEXT UNIQUE,
  is_live BOOLEAN DEFAULT FALSE,
  viewer_count INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DREAMSPACES TABLE
CREATE TABLE public.dreamspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  scene_data JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT TRUE,
  visitor_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. MESSAGES TABLE (Private messaging)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AUDIT LOGS (Security tracking)
CREATE TABLE public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECURITY: Enable RLS on ALL tables
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dreamspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SECURITY DEFINER FUNCTION FOR ROLE CHECK
-- ============================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ============================================
-- RLS POLICIES - PROFILES
-- ============================================
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- ============================================
-- RLS POLICIES - USER ROLES
-- ============================================
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- RLS POLICIES - POSTS
-- ============================================
CREATE POLICY "Published posts are viewable by authenticated users"
ON public.posts FOR SELECT
TO authenticated
USING (status = 'published' OR user_id = auth.uid());

CREATE POLICY "Users can create own posts"
ON public.posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
ON public.posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
ON public.posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - COMMENTS
-- ============================================
CREATE POLICY "Comments are viewable by authenticated users"
ON public.comments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create comments"
ON public.comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
ON public.comments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
ON public.comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - LIKES
-- ============================================
CREATE POLICY "Likes are viewable by authenticated users"
ON public.likes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create own likes"
ON public.likes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
ON public.likes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - FOLLOWS
-- ============================================
CREATE POLICY "Follows are viewable by authenticated users"
ON public.follows FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can follow others"
ON public.follows FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
ON public.follows FOR DELETE
TO authenticated
USING (auth.uid() = follower_id);

-- ============================================
-- RLS POLICIES - NOTIFICATIONS
-- ============================================
CREATE POLICY "Users can view own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
ON public.notifications FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- ============================================
-- RLS POLICIES - LIVE STREAMS
-- ============================================
CREATE POLICY "Live streams are viewable by authenticated users"
ON public.live_streams FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create own streams"
ON public.live_streams FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streams"
ON public.live_streams FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - DREAMSPACES
-- ============================================
CREATE POLICY "Public dreamspaces are viewable"
ON public.dreamspaces FOR SELECT
TO authenticated
USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "Users can create dreamspaces"
ON public.dreamspaces FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own dreamspaces"
ON public.dreamspaces FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own dreamspaces"
ON public.dreamspaces FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- ============================================
-- RLS POLICIES - MESSAGES
-- ============================================
CREATE POLICY "Users can view own messages"
ON public.messages FOR SELECT
TO authenticated
USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = sender_id);

-- ============================================
-- RLS POLICIES - AUDIT LOGS
-- ============================================
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || LEFT(NEW.id::TEXT, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'username', 'Usuario TAMV'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- TRIGGER: Update timestamps
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_dreamspaces_updated_at
  BEFORE UPDATE ON public.dreamspaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_likes_post_id ON public.likes(post_id);
CREATE INDEX idx_likes_user_id ON public.likes(user_id);
CREATE INDEX idx_follows_follower ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id, is_read);
CREATE INDEX idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('posts', 'posts', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav']),
  ('dreamspaces', 'dreamspaces', true, 104857600, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'model/gltf-binary', 'model/gltf+json']);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for posts
CREATE POLICY "Post media is publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'posts');

CREATE POLICY "Users can upload post media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their post media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for dreamspaces
CREATE POLICY "Dreamspace assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'dreamspaces');

CREATE POLICY "Users can upload dreamspace assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'dreamspaces' AND auth.uid()::text = (storage.foldername(name))[1]);