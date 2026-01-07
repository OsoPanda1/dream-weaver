-- Fix overly permissive RLS policies
-- Drop and recreate with proper security

-- Fix audit_logs INSERT policy (system only via service role, not public)
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "Service role can insert audit logs" 
ON public.audit_logs 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Fix notifications INSERT policy  
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
CREATE POLICY "Authenticated users can create notifications for triggers" 
ON public.notifications 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add delete policy for notifications
CREATE POLICY "Users can delete own notifications" 
ON public.notifications 
FOR DELETE 
USING (user_id = auth.uid());

-- Enable realtime for messages and notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Create conversation view for easier messaging queries
CREATE OR REPLACE VIEW public.conversations AS
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