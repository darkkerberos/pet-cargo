import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // rootMargin "-20% 0px -70% 0px" artinya:
      // Section dianggap aktif jika berada di area 20% dari atas layar
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Kita hanya update jika entry benar-benar masuk ke viewport (isIntersecting)
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      // Pastikan section punya ID, jika tidak, observer tidak akan berguna
      if (section.id) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "layanan", label: "Layanan" },
    { id: "prosedur", label: "Prosedur" },
    { id: "keunggulan", label: "Keunggulan" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo_pet_cargo.png"
              alt="Darin Pet's Transport"
              className="h-20 object-contain"
            />
            <div className="leading-tight">
              <h1
                className={`text-base md:text-lg font-bold transition-colors ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                DARIN PET’S TRANSPORT
              </h1>
              <p
                className={`hidden text-xs sm:block transition-colors ${
                  isScrolled ? "text-foreground" : "text-white/80"
                }`}
              >
                Safe Trip for Pets, Peace of Mind for You
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav
            className={`hidden lg:flex items-center gap-1 transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300
                hover:bg-[rgb(116_222_255_/_80%)] 
                ${
                  activeSection === item.id
                    ? "bg-[rgb(116_222_255_/_80%)]"
                    : isScrolled
                    ? "text-foreground"
                    : "text-white/80"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              isScrolled ? "text-foreground" : "text-white"
            } hover:bg-white/15`}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* MOBILE NAV */}
        {isMobileMenuOpen && (
          <nav className={`lg:hidden pb-4 shadow-lg animate-in slide-in-from-top ${
                    isScrolled ? "bg-background" : "bg-slate-700"
                  }`}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className={`justify-start hover:bg-white/15 ${
                    isScrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
