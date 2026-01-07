import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles, Mic, Image as ImageIcon, Settings, Loader2 } from "lucide-react";
import { useIsabellaChat } from "@/hooks/useIsabellaChat";
import { useAuth } from "@/contexts/AuthContext";
import isabellaPortrait from "@/assets/isabella-portrait.jpg";

export default function IsabellaPage() {
  const { messages, isLoading, sendMessage } = useIsabellaChat();
  const { profile } = useAuth();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput("");
    await sendMessage(message);
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
                    <AvatarImage src={isabellaPortrait} alt="Isabella AI" />
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
              {messages.length === 0 && (
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 border-2 border-secondary">
                    <AvatarImage src={isabellaPortrait} alt="Isabella" />
                    <AvatarFallback>IA</AvatarFallback>
                  </Avatar>
                  <div className="max-w-[70%]">
                    <div className="inline-block p-4 rounded-2xl bg-muted text-foreground rounded-tl-none">
                      <p className="text-sm">
                        ¡Hola! Soy Isabella, tu compañera digital en el ecosistema TAMV. 
                        Estoy aquí para ayudarte a explorar, crear y conectar. ¿En qué puedo asistirte hoy? 💫
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-10 w-10 ${message.role === "assistant" ? "border-2 border-secondary" : ""}`}>
                    {message.role === "assistant" ? (
                      <AvatarImage src={isabellaPortrait} alt="Isabella" />
                    ) : (
                      <>
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>{profile?.display_name?.[0] || 'U'}</AvatarFallback>
                      </>
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
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 border-2 border-secondary">
                    <AvatarImage src={isabellaPortrait} alt="Isabella" />
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

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border bg-card">
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    placeholder="Escribe tu mensaje a Isabella..."
                    className="pr-24 py-6 bg-muted border-0"
                    disabled={isLoading}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSend} variant="hero" size="lg" disabled={!input.trim() || isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
