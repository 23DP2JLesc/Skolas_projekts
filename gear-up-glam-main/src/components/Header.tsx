import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems, setIsOpen } = useCart();

  const handleNavigation = (href: string) => {
    if (href.startsWith("/")) {
      // Route navigation
      navigate(href);
      setIsMenuOpen(false);
    } else {
      // Hash link - scroll to section
      if (location.pathname !== "/") {
        // If not on home page, navigate to home first
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Shop", href: "/products" },
    { label: "Categories", href: "#categories" },
    { 
      label: "Services", 
      href: "#services",
      submenu: [
        { label: "Installation", href: "#installation" },
        { label: "Custom Builds", href: "#custom-builds" },
        { label: "Track Day Support", href: "#track-support" },
        { label: "Maintenance", href: "#maintenance" },
      ]
    },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <span className="font-display text-2xl text-primary-foreground">M</span>
            </div>
            <span className="font-display text-2xl tracking-wider">MOTOPARTS</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              'submenu' in link && link.submenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.href);
                    }}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider"
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
                      {link.submenu.map((sublink) => (
                        <button
                          key={sublink.label}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(sublink.href);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                        >
                          {sublink.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-wider"
                >
                  {link.label}
                </button>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {getTotalItems() > 99 ? "99+" : getTotalItems()}
                </span>
              )}
            </Button>
            
            {/* Mobile Hamburger Menu */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className="block w-full text-left py-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
