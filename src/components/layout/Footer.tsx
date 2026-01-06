import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  Heart
} from "lucide-react";
import tamvLogo from "@/assets/tamv-logo.png";

const footerLinks = {
  platform: [
    { name: "DreamSpaces", href: "/dreamspaces" },
    { name: "Isabella AI", href: "/isabella" },
    { name: "Comunidad", href: "/community" },
    { name: "Lives", href: "/lives" },
  ],
  developers: [
    { name: "Hub Devs", href: "/hub-devs" },
    { name: "API Docs", href: "/docs/api" },
    { name: "SDK", href: "/docs/sdk" },
    { name: "Blockchain MSR", href: "/blockchain" },
  ],
  company: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Carreras", href: "/careers" },
    { name: "Contacto", href: "/contact" },
  ],
  legal: [
    { name: "Privacidad", href: "/privacy" },
    { name: "Términos", href: "/terms" },
    { name: "BookPI", href: "/bookpi" },
    { name: "Compliance", href: "/compliance" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/tamv.online" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/tamvonline" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/tamvonline" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@tamvonline" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/tamvonline" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-cosmic border-t border-border/30">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={tamvLogo} alt="TAMV Online" className="h-12 w-12 rounded-lg" />
              <div>
                <span className="font-display text-2xl font-bold text-gradient-gold">TAMV</span>
                <span className="font-display text-2xl font-light text-foreground ml-1">Online</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Tecnología Avanzada Mexicana Versátil. Pioneros en innovación digital latinoamericana, 
              construyendo el futuro con orgullo mexicano.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:tamvonlinenetwork@outlook.es" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-sm">tamvonlinenetwork@outlook.es</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Pachuca, Hidalgo, México</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Plataforma</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Desarrolladores</h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Compañía</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2026 TAMV Online Network. Todos los derechos reservados.
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center md:justify-end gap-1">
                Hecho con <Heart className="h-3 w-3 text-primary" /> en México por Edwin O. Castillo Trejo
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
