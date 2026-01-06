import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Isabella from "./pages/Isabella";
import DreamSpaces from "./pages/DreamSpaces";
import HubDevs from "./pages/HubDevs";
import Blockchain from "./pages/Blockchain";
import Community from "./pages/Community";
import Lives from "./pages/Lives";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/feed" element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              } />
              <Route path="/isabella" element={
                <ProtectedRoute>
                  <Isabella />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="/chats" element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              } />
              <Route path="/lives" element={
                <ProtectedRoute>
                  <Lives />
                </ProtectedRoute>
              } />
              <Route path="/dreamspaces" element={
                <ProtectedRoute>
                  <DreamSpaces />
                </ProtectedRoute>
              } />
              <Route path="/hub-devs" element={
                <ProtectedRoute>
                  <HubDevs />
                </ProtectedRoute>
              } />
              <Route path="/bookpi" element={
                <ProtectedRoute>
                  <HubDevs />
                </ProtectedRoute>
              } />
              <Route path="/blockchain" element={
                <ProtectedRoute>
                  <Blockchain />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/profile/:username" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
