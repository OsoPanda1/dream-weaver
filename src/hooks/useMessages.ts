import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender_profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

interface Conversation {
  partner_id: string;
  partner_profile: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export function useMessages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPartnerId, setCurrentPartnerId] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const partnersMap = new Map<string, any>();
      
      for (const msg of messagesData || []) {
        const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        
        if (!partnersMap.has(partnerId)) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, display_name, avatar_url')
            .eq('id', partnerId)
            .single();

          const unreadCount = (messagesData || []).filter(
            m => m.sender_id === partnerId && !m.is_read
          ).length;

          partnersMap.set(partnerId, {
            partner_id: partnerId,
            partner_profile: profile || { username: 'Usuario', display_name: null, avatar_url: null },
            last_message: msg.content,
            last_message_at: msg.created_at,
            unread_count: unreadCount,
          });
        }
      }

      setConversations(Array.from(partnersMap.values()));
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchMessages = useCallback(async (partnerId: string) => {
    if (!user) return;

    setCurrentPartnerId(partnerId);

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`
        )
        .order('created_at', { ascending: true });

      if (error) throw error;

      setCurrentMessages(data || []);

      // Mark as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', partnerId)
        .eq('receiver_id', user.id);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [user]);

  const sendMessage = async (receiverId: string, content: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentMessages(prev => [...prev, data]);
      return { error: null, data };
    } catch (error) {
      return { error: error as Error };
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchConversations();

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          if (currentPartnerId === newMsg.sender_id) {
            setCurrentMessages(prev => [...prev, newMsg]);
          }
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, currentPartnerId, fetchConversations]);

  return {
    conversations,
    currentMessages,
    loading,
    fetchMessages,
    sendMessage,
    refresh: fetchConversations,
  };
}
