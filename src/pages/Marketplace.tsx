import { MainLayout } from '@/components/layout/MainLayout';
import { Store, Search, Filter, TrendingUp, Tag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Marketplace = () => {
  const items = [
    { id: 1, name: 'Avatar Premium Neo-Tokio', price: 450, currency: 'MSR', category: 'Avatares', sales: 128 },
    { id: 2, name: 'Pack de Efectos Kaos FX', price: 120, currency: 'MSR', category: 'Audio', sales: 342 },
    { id: 3, name: 'Terreno DreamSpace #4521', price: 2500, currency: 'MSR', category: 'Terrenos', sales: 12 },
    { id: 4, name: 'Skin Legendaria Isabella', price: 890, currency: 'MSR', category: 'Skins', sales: 67 },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Store className="h-8 w-8 text-primary" />
                Mercado Soberano
              </h1>
              <p className="text-muted-foreground mt-1">Compra y vende activos digitales con MSR</p>
            </div>
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Carrito (0)
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar en el mercado..." className="pl-10" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Tag className="h-12 w-12 text-primary/50" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                  <h3 className="font-semibold text-foreground mt-1 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-primary">{item.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">{item.currency}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {item.sales} ventas
                    </span>
                  </div>
                  <Button className="w-full mt-3" size="sm">Comprar</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
