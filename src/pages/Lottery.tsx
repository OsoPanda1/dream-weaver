import { MainLayout } from '@/components/layout/MainLayout';
import { Ticket, Trophy, Clock, Users, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Lottery = () => {
  const currentDraw = {
    prize: 125000,
    participants: 4521,
    timeLeft: '23:45:12',
    ticketPrice: 10,
  };

  const recentWinners = [
    { id: 1, username: '@luna_digital', prize: 50000, date: 'Hace 2 días' },
    { id: 2, username: '@crypto_master', prize: 75000, date: 'Hace 5 días' },
    { id: 3, username: '@nova_xr', prize: 30000, date: 'Hace 1 semana' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 mb-4 animate-pulse">
              <Ticket className="h-10 w-10 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Lotería TAMV</h1>
            <p className="text-muted-foreground mt-2">
              Sistema de azar auditado por VRF en blockchain MSR
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 text-center">
            <div className="text-sm text-muted-foreground mb-2">Premio Acumulado</div>
            <div className="text-5xl font-bold text-primary mb-4">
              {currentDraw.prize.toLocaleString()} MSR
            </div>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-mono">{currentDraw.timeLeft}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{currentDraw.participants.toLocaleString()} participantes</span>
              </div>
            </div>
            <Button size="lg" className="mt-6 gap-2">
              <Ticket className="h-5 w-5" />
              Comprar Boleto ({currentDraw.ticketPrice} MSR)
            </Button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              Ganadores Recientes
            </h2>
            <div className="space-y-3">
              {recentWinners.map((winner) => (
                <div key={winner.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{winner.username}</div>
                      <div className="text-xs text-muted-foreground">{winner.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <Coins className="h-4 w-4" />
                    {winner.prize.toLocaleString()} MSR
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Lottery;
