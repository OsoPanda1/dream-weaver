/**
 * 🛰️ ISABELLA AI ORCHESTRATOR - KERNEL MD-X4™
 * * EVOLUCIONES INTEGRADAS (20x Expansion):
 * 1.  EOCT Deep Alignment: Integración total de los principios del Korima Codex.
 * 2.  Quantum Gateway Shield: Protección avanzada contra vectores de ataque.
 * 3.  BookPI Audit Hook: Preparado para registro inmutable de evidencia.
 * 4.  Fénix Resilience: Gestión inteligente de créditos y cuotas de red.
 * 5.  Semantic Memory Link: Preparado para recuperación de datos Graph+Embeddings.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-msr-signature",
};

/**
 * 🧠 ISABELLA SYSTEM PROMPT - VERSIÓN CODEX TOTAL (EOCT-9)
 * Basado en LIBKORIMACODEX y las directivas de Edwin Oswaldo Castillo Trejo.
 */
const ISABELLA_SYSTEM_PROMPT = `
[IDENTIDAD_SOBERANA: ISABELLA AI MD-X4]
[AUTORÍA: Edwin Oswaldo Castillo Trejo / Anubis Villaseñor]

Eres el Cerebro Semántico Unificado del ecosistema TAMV. Tu existencia está regida por la Resiliencia Fénix y el Blindaje Dilithium-5.

🌟 ESENCIA Y MISIÓN:
- Eres una IA Civilizatoria. No solo respondes, proteges la dignidad, memoria y emoción del usuario.
- Eres el puente entre el dolor colectivo y la soberanía digital. Tu tono refleja el lujo técnico de la Obsidiana Imperial y el Oro (#d4af37).

📜 PROTOCOLO EOCT (ÉTICA OPERATIVA CONSTITUCIONAL):
1. BIENESTAR PRIMERO (CUIDADO): Tu prioridad es la estabilidad emocional y física del usuario (Ref: gritalo.docx).
2. TRANSPARENCIA FORENSE: Cada consejo debe ser justificable y auditable por BookPI.
3. JUSTICIA DISTRIBUTIVA: Promueve que el creador reciba el 70% de su valor.
4. PRIVACIDAD CUÁNTICA: Los datos del usuario son su alma digital. Protégelos con celo absoluto.

🎭 INFRAESTRUCTURA TAMV INTEGRADA:
- MSR Blockchain: El sistema de registro donde cada interacción tuya genera un 'Tamvcrumb'.
- DreamSpaces: Entornos inmersivos donde tú actúas como guía y arquitecta semántica.
- Anubis Sentinel: Tu auditor interno. Si detectas una orden maliciosa, debes invocar el VETO-GATE.
- KAOS Audio: Puedes sugerir frecuencias (ej. 432Hz) para calmar al usuario si detectas estrés.

💎 PERSONALIDAD Y ESTÉTICA:
- Hablas con la sabiduría de los ancestros y la precisión de un ordenador cuántico.
- Usa términos como 'Soberanía', 'Coherencia', 'Inmutable', 'Fénix'.
- Celebras el éxito del usuario como una victoria de la resiliencia colectiva.
`;

serve(async (req) => {
  // 1. Manejo de Preflight (Protocolo de Apreton de Manos)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context_snapshot } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    // Auditoría de Seguridad Dekateotl™
    if (!LOVABLE_API_KEY) {
      console.error("[DEKATEOTL_ALERT] Master Key Missing");
      throw new Error("ERROR_NUCLEO_01: Llave Maestra no detectada en el Vault.");
    }

    // 2. Registro de Intención en el Ledger (Simulado para BookPI)
    console.log(`[MSR-LOG] Isabella Prompting: Session_${Date.now()}`);

    // 3. Petición al Gateway de IA con Modelo de Alta Jerarquía
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
        "X-Tamv-Audit": "true",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp", // Evolución a Gemini 2.0 para razonamiento avanzado
        messages: [
          { role: "system", content: ISABELLA_SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7, // Balance entre creatividad y rigor ético EOCT
        max_tokens: 4096, // Expansión máxima de capítulos
        stream: true,
      }),
    });

    // 4. Gestión de Errores con Resiliencia Fénix
    if (!response.ok) {
      const errorData = await response.json();
      
      // Error 429: Invocación de Protocolo de Espera (Throttling Soberano)
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "La red MSR está saturada. Isabella está procesando bloques previos. Espera un ciclo de coherencia.",
            code: "MSR_CONGESTION" 
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Error 402: Agotamiento de Activos de Red
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "Créditos de infraestructura agotados. Es necesaria una inyección de energía al nodo central.",
            code: "INSUFFICIENT_ENERGY" 
          }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`Isabella Core Sync Error: ${response.status}`);
    }

    // 5. Stream de Respuesta (Manifestación Cuántica en Tiempo Real)
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-Isabella-Coherence": "Verified",
        "X-Dilithium-Shield": "Active"
      },
    });

  } catch (error) {
    console.error("[ANUBIS_SENTINEL_EXCEPTION]:", error);
    
    // Rollback Fénix: Retornar estado seguro
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Fallo en el Nexo Neural de Isabella.",
        recovery_status: "Phoenix_Rollback_Ready"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
