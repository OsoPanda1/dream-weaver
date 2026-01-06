import { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Radio, Info, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const notificationIcons: Record<string, typeof Bell> = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  live: Radio,
  mention: MessageCircle,
  system: Info,
};

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Notificaciones</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-1" />
              Marcar todas
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tienes notificaciones</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => {
                const Icon = notificationIcons[notification.type] || Bell;
                return (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      'w-full p-4 text-left hover:bg-muted/50 transition-colors flex gap-3',
                      !notification.is_read && 'bg-primary/5'
                    )}
                  >
                    <div className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0',
                      notification.type === 'like' && 'bg-destructive/10 text-destructive',
                      notification.type === 'follow' && 'bg-secondary/10 text-secondary',
                      notification.type === 'comment' && 'bg-primary/10 text-primary',
                      notification.type === 'live' && 'bg-secondary/10 text-secondary',
                      (notification.type === 'mention' || notification.type === 'system') && 'bg-muted text-muted-foreground'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {notification.title}
                      </p>
                      {notification.message && (
                        <p className="text-xs text-muted-foreground truncate">
                          {notification.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>
                    {!notification.is_read && (
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
