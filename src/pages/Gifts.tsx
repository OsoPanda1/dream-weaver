import { MainLayout } from '@/components/layout/MainLayout';
import { Gift, Heart, Sparkles, Send, Star, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gifts = () => {
  const gifts = [
    { id: 1, name: 'Rosa Digital', price: 5, emoji: '🌹', popularity: 'Popular' },
    { id: 2, name: 'Corazón Neón', price: 10, emoji: '💜', popularity: 'Trending' },
    { id: 3, name: 'Cohete Espacial', price: 25, emoji: '🚀', popularity: null },
    { id: 4, name: 'Diamante MSR', price: 100, emoji: '💎', popularity: 'Premium' },
    { id: 5, name: 'Corona Soberana', price: 250, emoji: '👑', popularity: 'Exclusivo' },
    { id: 6, name: 'Fénix Legendario', price: 500, emoji: '🔥', popularity: 'Legendario' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-500/20 mb-4">
              <Gift className="h-8 w-8 text-pink-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Regalos Virtuales</h1>
            <p className="text-muted-foreground mt-2">
              Envía regalos a tus creadores favoritos y muestra tu apoyo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gifts.map((gift) => (
              <div key={gift.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105 text-center relative">
                {gift.popularity && (
                  <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                    {gift.popularity}
                  </span>
                )}
                <div className="text-5xl mb-3">{gift.emoji}</div>
                <h3 className="font-semibold text-foreground">{gift.name}</h3>
                <div className="flex items-center justify-center gap-1 mt-2 text-primary">
                  <Coins className="h-4 w-4" />
                  <span className="font-bold">{gift.price} MSR</span>
                </div>
                <Button variant="outline" size="sm" className="mt-3 gap-1">
                  <Send className="h-3 w-3" />
                  Enviar
                </Button>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">¿Sabías que?</h3>
                <p className="text-sm text-muted-foreground">
                  El 70% del valor de cada regalo va directamente al creador gracias al sistema Quantum-Split
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Gifts;
