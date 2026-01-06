import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import tamvLogo from "@/assets/tamv-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const registerSchema = z.object({
  username: z.string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(20, "El nombre de usuario no puede exceder 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),
  displayName: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const isRegister = searchParams.get("mode") === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/feed';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const validateForm = () => {
    try {
      if (isRegister) {
        registerSchema.parse(formData);
      } else {
        loginSchema.parse({ email: formData.email, password: formData.password });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isRegister) {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.username,
          formData.displayName
        );
        
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: "Email ya registrado",
              description: "Este email ya tiene una cuenta. Intenta iniciar sesión.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
        } else {
          toast({
            title: "¡Cuenta creada!",
            description: "Tu cuenta ha sido creada exitosamente. Ya puedes explorar TAMV Online.",
          });
          navigate('/feed');
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Credenciales inválidas",
              description: "El email o la contraseña son incorrectos.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
        } else {
          toast({
            title: "¡Bienvenido de vuelta!",
            description: "Has iniciado sesión correctamente.",
          });
          const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/feed';
          navigate(from);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{isRegister ? "Registrarse" : "Iniciar Sesión"} | TAMV Online</title>
        <meta name="description" content={isRegister 
          ? "Crea tu cuenta en TAMV Online y únete al ecosistema digital mexicano."
          : "Inicia sesión en TAMV Online para acceder a tu cuenta."
        } />
      </Helmet>

      <MainLayout showFooter={false}>
        <div className="min-h-[calc(100vh-4rem)] flex">
          {/* Left side - Form */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 mb-8">
                <img src={tamvLogo} alt="TAMV" className="h-12 w-12 rounded-lg" />
                <div>
                  <span className="font-display text-2xl font-bold text-gradient-gold">TAMV</span>
                  <span className="font-display text-2xl font-light text-foreground ml-1">Online</span>
                </div>
              </Link>

              {/* Header */}
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  {isRegister ? "Crear Cuenta" : "Bienvenido"}
                </h1>
                <p className="text-muted-foreground">
                  {isRegister 
                    ? "Únete al ecosistema digital mexicano más innovador."
                    : "Ingresa a tu cuenta para continuar."
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="usuario123"
                          className="pl-10"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-sm text-destructive">{errors.username}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="displayName"
                          name="displayName"
                          type="text"
                          placeholder="Edwin Castillo"
                          className="pl-10"
                          value={formData.displayName}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.displayName && (
                        <p className="text-sm text-destructive">{errors.displayName}</p>
                      )}
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {isRegister && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Toggle */}
              <p className="mt-8 text-center text-sm text-muted-foreground">
                {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                <Link 
                  to={isRegister ? "/auth" : "/auth?mode=register"} 
                  className="text-primary hover:underline font-medium"
                >
                  {isRegister ? "Inicia sesión" : "Regístrate"}
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="hidden lg:flex flex-1 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-transparent" />
            </div>
            
            <div className="relative z-10 flex items-center justify-center p-12">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">Ecosistema TAMV</span>
                </div>
                <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                  El futuro digital está aquí
                </h2>
                <p className="text-muted-foreground text-lg">
                  Únete a miles de creadores, desarrolladores y visionarios que están 
                  construyendo el futuro de la tecnología latinoamericana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
