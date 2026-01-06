import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Coins, 
  TrendingUp, 
  ArrowRight,
  Lock,
  Users,
  Zap,
  CheckCircle2
} from "lucide-react";
import blockchainPreview from "@/assets/blockchain-preview.jpg";

const features = [
  {
    icon: Lock,
    title: "Inmutable y Seguro",
    description: "Cada transacción es verificada y almacenada de forma permanente en la cadena."
  },
  {
    icon: Coins,
    title: "Quantum Split",
    description: "70% creador, 20% resiliencia social, 10% infraestructura. Justicia distributiva."
  },
  {
    icon: Users,
    title: "Gobernanza Descentralizada",
    description: "La comunidad decide el futuro del ecosistema a través de votaciones on-chain."
  },
  {
    icon: Zap,
    title: "Ultra Rápido",
    description: "Transacciones confirmadas en segundos con costos mínimos."
  },
];

const transactions = [
  { id: "MSR_7f8a9b...c3d4", type: "Creación", amount: "+150 MSR", time: "hace 2 min" },
  { id: "MSR_3e4f5g...h6i7", type: "Transferencia", amount: "-50 MSR", time: "hace 5 min" },
  { id: "MSR_9a8b7c...6d5e", type: "Quantum Split", amount: "+30 MSR", time: "hace 8 min" },
  { id: "MSR_1k2l3m...n4o5", type: "Staking", amount: "+12 MSR", time: "hace 15 min" },
];

export default function Blockchain() {
  return (
    <>
      <Helmet>
        <title>Blockchain MSR | TAMV Online</title>
        <meta name="description" content="Blockchain MSR - Sistema monetario soberano mexicano. Transacciones seguras, Quantum Split y economía justa para creadores." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background">
          {/* Hero */}
          <section 
            className="relative py-24 overflow-hidden"
            style={{
              backgroundImage: `url(${blockchainPreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Blockchain Soberano</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  <span className="text-gradient-gold">MSR</span> Blockchain
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Moneda Social de Resiliencia. Sistema monetario ético diseñado para 
                  proteger a creadores y distribuir valor de forma justa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="xl">
                    <Coins className="h-5 w-5 mr-2" />
                    Ver Mi Wallet
                  </Button>
                  <Button variant="heroOutline" size="xl">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Explorar Mercado
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Transacciones", value: "1.2M+" },
                  { label: "Usuarios Activos", value: "45K" },
                  { label: "MSR en Circulación", value: "500M" },
                  { label: "Valor Distribuido", value: "$2.3M" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Tecnología MSR
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Una blockchain diseñada desde cero para la economía creativa del futuro
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quantum Split Explanation */}
          <section className="py-16 bg-gradient-cosmic">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Quantum Split
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Cada transacción en el ecosistema TAMV se distribuye automáticamente 
                    según el modelo de justicia distributiva Quantum Split.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "70% para Creadores", desc: "El valor va directamente a quien lo genera" },
                      { label: "20% Resiliencia Social", desc: "Fondo comunitario para apoyo y emergencias" },
                      { label: "10% Infraestructura", desc: "Mantenimiento y desarrollo del ecosistema" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl" />
                  <div className="relative p-8">
                    <svg viewBox="0 0 200 200" className="w-full max-w-sm mx-auto">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
                      <circle 
                        cx="100" cy="100" r="90" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="8"
                        strokeDasharray="396 565"
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                      />
                      <circle 
                        cx="100" cy="100" r="90" 
                        fill="none" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth="8"
                        strokeDasharray="113 565"
                        strokeDashoffset="-396"
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                      />
                      <circle 
                        cx="100" cy="100" r="90" 
                        fill="none" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth="8"
                        strokeDasharray="56 565"
                        strokeDashoffset="-509"
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                      />
                      <text x="100" y="95" textAnchor="middle" className="font-display text-3xl font-bold fill-foreground">MSR</text>
                      <text x="100" y="115" textAnchor="middle" className="text-sm fill-muted-foreground">Quantum Split</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Transactions */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Transacciones Recientes
                  </h2>
                  <p className="text-muted-foreground">
                    Actividad en tiempo real en la blockchain MSR
                  </p>
                </div>
                <Button variant="outline">
                  Ver explorador
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                {transactions.map((tx, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <code className="text-sm font-mono text-foreground">{tx.id}</code>
                        <p className="text-sm text-muted-foreground">{tx.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${tx.amount.startsWith('+') ? 'text-secondary' : 'text-muted-foreground'}`}>
                        {tx.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
}
