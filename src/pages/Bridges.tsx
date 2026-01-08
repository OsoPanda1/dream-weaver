import { MainLayout } from '@/components/layout/MainLayout';
import { Network, ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Bridges = () => {
  const bridges = [
    { id: 1, name: 'Puente Ethereum', status: 'Activo', volume: '2.4M MSR', icon: '⟠' },
    { id: 2, name: 'Puente Polygon', status: 'Activo', volume: '890K MSR', icon: '⬡' },
    { id: 3, name: 'Puente Solana', status: 'Próximamente', volume: '-', icon: '◎' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
              <Network className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Puentes de Conocimiento</h1>
            <p className="text-muted-foreground mt-2">
              Conecta el ecosistema TAMV con otras blockchains de forma segura
            </p>
          </div>

          <div className="grid gap-4">
            {bridges.map((bridge) => (
              <div key={bridge.id} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                      {bridge.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{bridge.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          bridge.status === 'Activo' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {bridge.status}
                        </span>
                        {bridge.volume !== '-' && (
                          <span className="text-sm text-muted-foreground">Vol: {bridge.volume}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant={bridge.status === 'Activo' ? 'default' : 'outline'} disabled={bridge.status !== 'Activo'}>
                    {bridge.status === 'Activo' ? (
                      <>Usar Puente <ArrowRight className="h-4 w-4 ml-2" /></>
                    ) : 'Próximamente'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="font-semibold text-foreground">Ultra Rápido</div>
              <p className="text-xs text-muted-foreground">Transferencias en segundos</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="font-semibold text-foreground">Seguro</div>
              <p className="text-xs text-muted-foreground">Auditoría DEKATEOTL</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="font-semibold text-foreground">Multi-Chain</div>
              <p className="text-xs text-muted-foreground">Conectividad global</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Bridges;
