/**
 * 🛰️ TAMV CIVILIZATION ORCHESTRATOR - KERNEL MD-X4™
 * VERSION: 15.0.0 (The Total Integration)
 * * Autor: Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SovereignShieldGate } from "@/components/security/SovereignShieldGate";

// --- 🌐 INFRAESTRUCTURA DE COMUNICACIÓN ---
import Feed from "./pages/Feed";           // Publicaciones / Muro
import Channels from "./pages/Channels";   // Canales de Difusión
import Groups from "./pages/Groups";       // Grupos de Interés
import PrivateChats from "./pages/Chats";  // Chats Cifrados Dilithium-5
import Community from "./pages/Community"; // Comunidades Soberanas

// --- 🧠 DIMENSIÓN DE CONCIENCIA Y APRENDIZAJE ---
import Isabella from "./pages/Isabella";   // Oráculo AI NextGen
import University from "./pages/University"; // Universidad TAMV (Knowledge Bridges)
import KnowledgeBridges from "./pages/Bridges"; // Puentes de Conocimiento

// --- 🌌 DIMENSIÓN DE REALIDAD Y ENTRETENIMIENTO ---
import DreamSpaces from "./pages/DreamSpaces"; // Mundos Virtuales
import DigitalPets from "./pages/Pets";        // Mascotas Digitales (MSR-NFT)
import Lives from "./pages/Lives";             // Streaming 70/20/10

// --- 💰 DIMENSIÓN ECONÓMICA Y RECOMPENSAS ---
import Marketplace from "./pages/Marketplace"; // Mercado Soberano
import Lottery from "./pages/Lottery";         // Lotería Transparente MSR
import VirtualGifts from "./pages/Gifts";      // Sistema de Regalos

// --- 👤 IDENTIDAD Y NÚCLEO ---
import Profile from "./pages/Profile";
import Blockchain from "./pages/Blockchain";
import Auth from "./pages/Auth";
import Index from "./pages/Index";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <SovereignShieldGate>
        <Routes>
          {/* 🌑 ACCESO Y GÉNESIS */}
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />

          {/* 🛡️ EL ECOSISTEMA PROTEGIDO (DEKATEOTL™ GATE) */}
          <Route element={<ProtectedRoute />}>
            
            {/* 🟦 SOCIAL & COMUNICACIÓN (The Social Fabric) */}
            <Route path="/feed" element={<Feed />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chats" element={<PrivateChats />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile/:username" element={<Profile />} />

            {/* 🟨 ECONOMÍA & VALOR (MSR Economy) */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/lottery" element={<Lottery />} />
            <Route path="/gifts" element={<VirtualGifts />} />
            <Route path="/blockchain" element={<Blockchain />} />

            {/* 🟪 CONOCIMIENTO & IA (The Neural Layer) */}
            <Route path="/isabella" element={<Isabella />} />
            <Route path="/university" element={<University />} />
            <Route path="/bridges" element={<KnowledgeBridges />} />

            {/* 🟩 REALIDAD VIRTUAL & MULTIMEDIA (Dream Phase) */}
            <Route path="/dreamspaces" element={<DreamSpaces />} />
            <Route path="/pets" element={<DigitalPets />} />
            <Route path="/lives" element={<Lives />} />

          </Route>
        </Routes>
      </SovereignShieldGate>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
