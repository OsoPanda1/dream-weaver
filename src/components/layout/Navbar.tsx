import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  MessageCircle, 
  Video, 
  Sparkles, 
  Blocks, 
  Code2, 
  BookOpen, 
  Shield, 
  Menu,
  X,
  Radio,
  User,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import tamvLogo from "@/assets/tamv-logo.png";

// Import auth context conditionally to avoid errors on public pages
let useAuth: () => { user: any; profile: any; signOut: () => Promise<void> };
try {
  useAuth = require("@/contexts/AuthContext").useAuth;
} catch {
  useAuth = () => ({ user: null, profile: null, signOut: async () => {} });
}

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Feed", href: "/feed", icon: Radio },
  { name: "Comunidad", href: "/community", icon: Users },
  { name: "Lives", href: "/lives", icon: Video },
  { name: "Isabella AI", href: "/isabella", icon: Sparkles },
  { name: "DreamSpaces", href: "/dreamspaces", icon: Blocks },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  let user = null;
  let profile = null;
  let signOut = async () => {};
  
  try {
    const auth = useAuth();
    user = auth.user;
    profile = auth.profile;
    signOut = auth.signOut;
  } catch {
    // Auth context not available
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={tamvLogo} 
              alt="TAMV Online" 
              className="h-10 w-10 rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-gradient-gold">TAMV</span>
              <span className="font-display text-xl font-light text-foreground ml-1">Online</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <NotificationDropdown />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback>{profile?.display_name?.[0] || user.email?.[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{profile?.display_name || 'Usuario'}</p>
                      <p className="text-xs text-muted-foreground">@{profile?.username}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/auth?mode=register" 
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Registrarse
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in-down">
            <div className="grid grid-cols-2 gap-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
              <Link 
                to="/auth" 
                className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/auth?mode=register" 
                className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
