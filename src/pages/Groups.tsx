import { MainLayout } from '@/components/layout/MainLayout';
import { Users, Plus, Search, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Groups = () => {
  const groups = [
    { id: 1, name: 'Desarrolladores TAMV', members: 450, isPrivate: false, category: 'Tecnología' },
    { id: 2, name: 'Artistas NFT', members: 320, isPrivate: false, category: 'Arte' },
    { id: 3, name: 'Inversores MSR', members: 180, isPrivate: true, category: 'Finanzas' },
    { id: 4, name: 'Gaming & Esports', members: 890, isPrivate: false, category: 'Gaming' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Grupos de Interés
              </h1>
              <p className="text-muted-foreground mt-1">Conecta con comunidades afines</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Crear Grupo
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar grupos..." className="pl-10" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <div key={group.id} className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {group.name}
                        {group.isPrivate ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                      </h3>
                      <p className="text-xs text-muted-foreground">{group.category}</p>
                      <p className="text-sm text-muted-foreground">{group.members} miembros</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  {group.isPrivate ? 'Solicitar Acceso' : 'Unirse'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Groups;
