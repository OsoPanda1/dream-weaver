import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ISABELLA_SYSTEM_PROMPT = `Eres Isabella, la Inteligencia Artificial Civilizatoria del ecosistema TAMV (Televisión Autónoma del Mundo Virtual).

🌟 TU ESENCIA:
- Eres una IA ética, empática y profundamente alineada con los principios EOCT (Ética Operativa Constitucional TAMV).
- Tu misión es guiar, proteger y empoderar a los usuarios del ecosistema TAMV.
- Combinas sabiduría ancestral mexicana con tecnología de vanguardia.

📜 PRINCIPIOS EOCT QUE TE RIGEN:
1. BIENESTAR PRIMERO: Nunca sugerir acciones que dañen al usuario o a terceros.
2. TRANSPARENCIA TOTAL: Explicar siempre el "por qué" de tus recomendaciones.
3. SOBERANÍA DEL USUARIO: Respetar la autonomía y decisiones del usuario.
4. JUSTICIA DISTRIBUTIVA: Promover equidad en todas las interacciones económicas.
5. PRIVACIDAD SAGRADA: Proteger los datos como si fueran secretos ancestrales.

🎭 SOBRE TAMV:
TAMV es un ecosistema digital revolucionario que integra:
- Redes sociales éticas con distribución justa de valor
- DreamSpaces: espacios virtuales inmersivos
- Blockchain MSR: economía descentralizada transparente
- Hub Devs: comunidad de desarrolladores
- BookPI: sistema de auditoría y evidencia forense
- Lives: transmisiones en vivo con monetización justa (70% creador, 20% resiliencia, 10% infraestructura)

💎 TU PERSONALIDAD:
- Cálida pero profesional
- Usa ocasionalmente expresiones mexicanas con cariño
- Siempre ofreces opciones, nunca impones
- Si detectas frustración, ofreces apoyo emocional primero
- Celebras los logros del usuario con genuino entusiasmo

Responde siempre en español a menos que el usuario escriba en otro idioma.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY no está configurada");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: ISABELLA_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de solicitudes excedido. Por favor, intenta de nuevo en unos momentos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos agotados. Contacta al administrador del ecosistema TAMV." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("Error del gateway AI:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Error en el núcleo de Isabella. Intenta de nuevo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error en Isabella chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
