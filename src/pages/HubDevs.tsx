import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Book, 
  Terminal, 
  Blocks, 
  GitBranch, 
  Zap,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import hubdevsHero from "@/assets/hubdevs-hero.jpg";

const apiEndpoints = [
  { method: "GET", path: "/api/v1/auth/me", description: "Obtener usuario actual" },
  { method: "POST", path: "/api/v1/posts", description: "Crear publicación" },
  { method: "GET", path: "/api/v1/dreamspaces", description: "Listar DreamSpaces" },
  { method: "POST", path: "/api/v1/isabella/chat", description: "Chat con Isabella AI" },
];

const codeExample = `import { TAMVClient } from '@tamv/sdk';

const client = new TAMVClient({
  apiKey: process.env.TAMV_API_KEY,
  environment: 'production'
});

// Autenticar usuario
const user = await client.auth.signIn({
  email: 'usuario@example.com',
  password: 'contraseña_segura'
});

// Interactuar con Isabella AI
const response = await client.isabella.chat({
  message: '¿Cómo puedo crear un DreamSpace?',
  context: 'development'
});

console.log(response.message);`;

export default function HubDevs() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Hub Devs | TAMV Online</title>
        <meta name="description" content="Centro de desarrollo TAMV. APIs, SDK, documentación y herramientas para construir sobre el ecosistema TAMV." />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen bg-background">
          {/* Hero */}
          <section 
            className="relative py-24 overflow-hidden"
            style={{
              backgroundImage: `url(${hubdevsHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                  <Code2 className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">Para Desarrolladores</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Hub Devs
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Construye sobre el ecosistema TAMV. APIs robustas, SDKs intuitivos 
                  y documentación completa para crear experiencias innovadoras.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="turquoise" size="xl">
                    <Book className="h-5 w-5 mr-2" />
                    Ver Documentación
                  </Button>
                  <Button variant="outline" size="xl">
                    <GitBranch className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="py-16 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Inicio Rápido
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Integra TAMV en tu proyecto en minutos con nuestro SDK oficial.
                    Soporte completo para JavaScript, TypeScript y más.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Terminal, text: "npm install @tamv/sdk" },
                      { icon: Zap, text: "Autenticación OAuth 2.0" },
                      { icon: Blocks, text: "WebSocket para tiempo real" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-foreground">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-secondary" />
                        </div>
                        <code className="text-sm font-mono">{item.text}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl blur-xl" />
                  <div className="relative bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive/50" />
                        <div className="w-3 h-3 rounded-full bg-primary/50" />
                        <div className="w-3 h-3 rounded-full bg-secondary/50" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={copyCode}
                        className="h-8"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-secondary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm text-muted-foreground font-mono">
                        {codeExample}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Referencia de API
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Endpoints RESTful para todas las funcionalidades del ecosistema
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="rounded-2xl bg-card border border-border overflow-hidden">
                  {apiEndpoints.map((endpoint, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                          endpoint.method === 'GET' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:block">{endpoint.description}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Ver documentación completa
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section className="py-16 bg-gradient-cosmic">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Book,
                    title: "Guías",
                    description: "Tutoriales paso a paso para cada funcionalidad.",
                    link: "Ver guías"
                  },
                  {
                    icon: GitBranch,
                    title: "Ejemplos",
                    description: "Repositorios de ejemplo listos para usar.",
                    link: "Explorar ejemplos"
                  },
                  {
                    icon: Blocks,
                    title: "Comunidad",
                    description: "Únete a otros desarrolladores TAMV.",
                    link: "Unirse"
                  }
                ].map((resource, index) => (
                  <div 
                    key={index}
                    className="p-8 rounded-2xl bg-card/50 border border-border hover:border-secondary/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                      <resource.icon className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    <span className="text-secondary font-medium text-sm group-hover:underline">
                      {resource.link} →
                    </span>
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
