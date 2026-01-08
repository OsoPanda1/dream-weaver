import { MainLayout } from '@/components/layout/MainLayout';
import { Heart, Sparkles, Dna, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pets = () => {
  const pets = [
    { id: 1, name: 'Luna', species: 'Dragón Neón', rarity: 'Legendario', level: 42, happiness: 95 },
    { id: 2, name: 'Pixel', species: 'Gato Digital', rarity: 'Épico', level: 28, happiness: 88 },
    { id: 3, name: 'Nova', species: 'Fénix Cuántico', rarity: 'Mítico', level: 67, happiness: 100 },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendario': return 'text-yellow-400 bg-yellow-500/20';
      case 'Épico': return 'text-purple-400 bg-purple-500/20';
      case 'Mítico': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-500/20 mb-4">
              <Heart className="h-8 w-8 text-pink-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Mascotas Digitales</h1>
            <p className="text-muted-foreground mt-2">
              Cuida, entrena y evoluciona a tus compañeros MSR-NFT
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105">
                <div className="text-center">
                  <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-4">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground">{pet.species}</p>
                  <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${getRarityColor(pet.rarity)}`}>
                    {pet.rarity}
                  </span>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      Nv. {pet.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      {pet.happiness}%
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">Interactuar</Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="gap-2">
              <Dna className="h-5 w-5" />
              Adoptar Nueva Mascota
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pets;
