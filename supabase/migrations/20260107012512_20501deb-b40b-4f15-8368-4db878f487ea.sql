-- Fix security definer view issue by dropping and recreating as SECURITY INVOKER
DROP VIEW IF EXISTS public.conversations;

-- Recreate with SECURITY INVOKER (queries use caller's permissions)
CREATE VIEW public.conversations 
WITH (security_invoker = true) AS
SELECT DISTINCT ON (conversation_partner)
  CASE 
    WHEN sender_id = auth.uid() THEN receiver_id
    ELSE sender_id
  END as conversation_partner,
  content as last_message,
  created_at as last_message_at,
  is_read
FROM public.messages
WHERE sender_id = auth.uid() OR receiver_id = auth.uid()
ORDER BY conversation_partner, created_at DESC;

-- Fix the remaining permissive policy for notifications by making it more restrictive
DROP POLICY IF EXISTS "Authenticated users can create notifications for triggers" ON public.notifications;

-- Only allow creating notifications via database triggers/functions (service role)
-- or for specific allowed types by authenticated users
CREATE POLICY "Notifications created via triggers or system" 
ON public.notifications 
FOR INSERT 
TO authenticated
WITH CHECK (
  -- Users can only create notifications for follows, likes, comments they initiate
  (actor_id = auth.uid() AND type IN ('like', 'comment', 'follow', 'mention'))
);