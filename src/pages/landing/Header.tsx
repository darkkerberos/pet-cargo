import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import {ContactItem, ProfileData} from '@/types/profile'
// import "@/index.css"

const Header = ({ profile } : { profile: ProfileData | null}) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("beranda");
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (!i18n.hasResourceBundle("en", "translation")) {
      i18n.addResourceBundle(
        "en",
        "translation",
        {
          Beranda: "Home",
          Tentang: "About",
          Layanan: "Services",
          Prosedur: "Procedure",
          Keunggulan: "Features",
          Testimoni: "Testimonials",
          Kontak: "Contact",
          Galeri: "Gallery",
          "Pesan Sekarang": "Booking Now",
          "Safe Trip for Pets, Peace of Mind for You.":
            "Safe Trip for Pets, Peace of Mind for You.",
        },
        true,
        true
      );
    }
  }, [i18n]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section.id) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      // Pindah ke home dulu sambil membawa "state" target ID
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "beranda", label: t("Beranda") },
    { id: "tentang", label: t("Tentang") },
    { id: "layanan", label: t("Layanan") },
    { id: "prosedur", label: t("Prosedur") },
    { id: "keunggulan", label: t("Keunggulan") },
    { id: "testimoni", label: t("Testimoni") },
    { id: "kontak", label: t("Kontak") },
    { id: "galeri", label: t("Galeri") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 1. LOGO SECTION (Added cursor-pointer) */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => scrollToSection("beranda")}
          >
            <div
              className={`relative transition-transform duration-300 group-hover:scale-105 ${
                isScrolled ? "h-12 w-12" : "h-16"
              }`}
            >
              <img
                src={`${import.meta.env.BASE_URL}${profile?.logo_url}`}
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1
                className={`font-black tracking-tighter transition-colors duration-300 ${
                  isScrolled ? "text-[#00365c] text-xl" : "text-white text-sm"
                }`}
              >
                DARIN{" "}
                <span className={isScrolled ? "text-primary" : "text-white/90"}>
                  PET'S
                </span>{" "}
                TRANSPORT
              </h1>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
                  isScrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                {t("Safe Trip for Pets, Peace of Mind for You")}
              </span>
            </div>
          </div>

          {/* 2. DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "galeri") {
                    navigate("/gallery");
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                // Memastikan kursor pointer muncul (cursor-pointer adalah default untuk button, tapi kita pertegas)
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 group cursor-pointer ${
                  isScrolled
                    ? "text-foreground hover:text-[#00365c]"
                    : "text-white hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-1 left-3 right-3 h-0.5 transition-transform duration-300 ${
                    activeSection === item.id
                      ? "scale-x-100 bg-primary"
                      : "scale-x-0 bg-current group-hover:scale-x-50"
                  }`}
                />
              </button>
            ))}

            {/* LANGUAGE SWITCHER */}
            <div
              className={`ml-4 flex items-center gap-1 text-[10px] font-bold border rounded-full p-1 transition-colors duration-300 ${
                isScrolled
                  ? "border-slate-200 bg-slate-50"
                  : "border-white/20 bg-white/10 text-white"
              }`}
            >
              <button
                onClick={() => changeLanguage("id")}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i18n.language === "id"
                    ? isScrolled
                      ? "bg-[#00365c] text-white shadow-sm"
                      : "bg-white text-[#00365c] shadow-md"
                    : "hover:opacity-70"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i18n.language === "en"
                    ? isScrolled
                      ? "bg-[#00365c] text-white shadow-sm"
                      : "bg-white text-[#00365c] shadow-md"
                    : "hover:opacity-70"
                }`}
              >
                EN
              </button>
            </div>

            <Button
              size="sm"
              onClick={() => scrollToSection("kontak")}
              className={`ml-4 rounded-full px-6 shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                isScrolled
                  ? "bg-[#00365c] text-white hover:bg-[#00365c]/90"
                  : "bg-white text-[#00365c] hover:bg-white/90"
              }`}
            >
              <Phone className="mr-2 h-4 w-4" />
              {t("Pesan Sekarang")}
            </Button>
          </nav>

          {/* 3. MOBILE MENU BUTTON */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Lang Switch */}
            <button
              onClick={() =>
                changeLanguage(i18n.language === "id" ? "en" : "id")
              }
              className={`p-2 rounded-full border cursor-pointer transition-colors ${
                isScrolled
                  ? "text-slate-900 border-slate-200 hover:bg-slate-100"
                  : "text-white border-white/20 hover:bg-white/10"
              }`}
            >
              <Globe size={20} />
            </button>

            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full cursor-pointer ${
                isScrolled
                  ? "text-[#00365c] hover:bg-black/5"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>

        {/* 4. MOBILE NAV DRAWER */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[500px] border-b shadow-2xl" : "max-h-0"
          } ${isScrolled ? "bg-white" : "bg-[#00365c]"}`}
        >
          <div className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`justify-start text-base font-medium h-12 rounded-xl cursor-pointer ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : isScrolled
                    ? "text-foreground"
                    : "text-white/90"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
