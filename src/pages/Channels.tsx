import { MainLayout } from '@/components/layout/MainLayout';
import { Radio, Users, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Channels = () => {
  const channels = [
    { id: 1, name: 'TAMV Oficial', members: 12450, description: 'Canal oficial de anuncios', isOfficial: true },
    { id: 2, name: 'Desarrollo Web', members: 3200, description: 'Tutoriales y recursos de desarrollo' },
    { id: 3, name: 'Arte Digital', members: 2800, description: 'Comunidad de artistas digitales' },
    { id: 4, name: 'Blockchain & MSR', members: 1900, description: 'Todo sobre economía soberana' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Radio className="h-8 w-8 text-primary" />
                Canales de Difusión
              </h1>
              <p className="text-muted-foreground mt-1">Suscríbete a canales y recibe contenido exclusivo</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Crear Canal
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar canales..." className="pl-10" />
          </div>

          <div className="grid gap-4">
            {channels.map((channel) => (
              <div key={channel.id} className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Radio className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {channel.name}
                        {channel.isOfficial && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Oficial</span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Users className="h-3 w-3" />
                        {channel.members.toLocaleString()} suscriptores
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Suscribirse</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Channels;
