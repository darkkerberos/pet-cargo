import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();

  // Daftarkan terjemahan lokal untuk Hero section
  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Perjalanan Aman untuk Hewan Kesayangan Anda": "Safe Journey for Your Beloved Pets",
      "Layanan transportasi hewan peliharaan terpercaya sejak 2016": "Trusted pet transportation service since 2016",
      "Kami mengantarkan hewan kesayangan Anda dengan aman, cepat, dan penuh perhatian ke seluruh Indonesia dan mancanegara.": "We deliver your beloved pets safely, quickly, and with full care throughout Indonesia and abroad.",
      "Hubungi Kami": "Contact Us",
      "Lihat Layanan": "Our Services"
    }, true, true);
  }, [i18n]);

  const scrollToContact = () => {
    const element = document.getElementById('kontak');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="beranda" className="relative min-h-screen flex items-center bg-gradient-hero pt-20">
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("Perjalanan Aman untuk Hewan Kesayangan Anda")}
            </h2>
            <p className="text-xl md:text-2xl text-white/90">
              {t("Layanan transportasi hewan peliharaan terpercaya sejak 2016")}
            </p>
            <p className="text-lg text-white/80">
              {t("Kami mengantarkan hewan kesayangan Anda dengan aman, cepat, dan penuh perhatian ke seluruh Indonesia dan mancanegara.")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 cursor-pointer"
              >
                <Phone className="mr-2 h-5 w-5" />
                {t("Hubungi Kami")}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('layanan');
                  if (element) {
                    const offset = 80;
                    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 cursor-pointer"
              >
                {t("Lihat Layanan")}
              </Button>
            </div>
          </div>
          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
<<<<<<< HEAD:src/pages/landing/Hero.tsx
                src={`${import.meta.env.BASE_URL}assets/generated/hero-pets.dim_800x600.jpg`}
=======
                src="assets/generated/hero-pets.dim_800x600.jpg" 
>>>>>>> master:src/Hero.tsx
                alt="Happy pets ready for transport" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;