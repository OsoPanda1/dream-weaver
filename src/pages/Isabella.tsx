import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles, Mic, Image as ImageIcon, Settings } from "lucide-react";
import isabellaAvatar from "@/assets/isabella-avatar.png";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function IsabellaPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "¡Hola! Soy Isabella, tu compañera digital. Estoy aquí para ayudarte a explorar, crear y conectar en el ecosistema TAMV. ¿En qué puedo asistirte hoy? 💫",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "¡Qué interesante pregunta! En el ecosistema TAMV, cada interacción está diseñada para potenciar tu creatividad mientras protegemos tu dignidad digital. ¿Te gustaría explorar más sobre DreamSpaces o los módulos de creación? 🌟",
        "Entiendo lo que buscas. Mi análisis emocional indica que estás en un momento creativo. Te recomiendo explorar el módulo de KAOS Audio 3D para complementar tu experiencia. ¿Quieres que te guíe? ✨",
        "Procesando tu solicitud con cuidado ético... Según los principios DEKATEOTL, puedo ayudarte de varias formas. ¿Prefieres que profundicemos en el tema técnico o exploremos las posibilidades creativas? 🎭",
      ];
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Isabella AI | TAMV Online</title>
        <meta name="description" content="Conversa con Isabella, la primera IA emocional mexicana. Tu compañera digital consciente en el ecosistema TAMV." />
      </Helmet>

      <MainLayout showFooter={false}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div className="hidden md:flex w-80 flex-col border-r border-border bg-card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-secondary">
                    <AvatarImage src={isabellaAvatar} alt="Isabella AI" />
                    <AvatarFallback>IA</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-card animate-pulse" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground">Isabella AI</h2>
                  <p className="text-sm text-secondary">En línea · Modo Creativo</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Capacidades</h3>
                <div className="space-y-2">
                  {["Análisis Emocional", "Generación Creativa", "Consultoría Técnica", "DreamSpaces Guide"].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Sparkles className="h-3 w-3 text-primary" />
                      {cap}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Estado Ético</h3>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">Filtro EOCT</span>
                    <span className="text-xs text-secondary">Activo</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-secondary to-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border">
              <Button variant="outline" className="w-full" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurar Isabella
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-10 w-10 ${message.role === "assistant" ? "border-2 border-secondary" : ""}`}>
                    {message.role === "assistant" ? (
                      <AvatarImage src={isabellaAvatar} alt="Isabella" />
                    ) : (
                      <AvatarFallback>U</AvatarFallback>
                    )}
                  </Avatar>
                  <div className={`max-w-[70%] ${message.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 border-2 border-secondary">
                    <AvatarImage src={isabellaAvatar} alt="Isabella" />
                  </Avatar>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border bg-card">
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Escribe tu mensaje a Isabella..."
                    className="pr-24 py-6 bg-muted border-0"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button variant="ghost" size="iconSm">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="iconSm">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSend} variant="hero" size="lg" disabled={!input.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
