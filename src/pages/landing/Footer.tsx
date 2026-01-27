import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, ChevronRight, Heart, PawPrint } from 'lucide-react';
import { SiWhatsapp, SiInstagram, SiFacebook } from 'react-icons/si';
import {ContactItem, ProfileData, formatWhatsapp} from '@/types/profile'
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';

const Footer = ({ profile } : { profile: ProfileData | null}) => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Partner terpercaya untuk perjalanan aman hewan kesayangan Anda sejak 2016. Kami mengutamakan kenyamanan dan keselamatan di setiap kilometer.": "Trusted partner for your beloved pet's safe journey since 2016. We prioritize comfort and safety at every kilometer.",
      "Navigasi": "Navigation",
      "Layanan Kami": "Our Services",
      "Beranda": "Home",
      "Tentang Kami": "About Us",
      "Layanan": "Services",
      "Prosedur": "Procedure",
      "Kontak": "Contact",
      "24 Jam Setiap Hari": "24 Hours Every Day",
      "Cargo Domestik": "Domestic Cargo",
      "Cargo Internasional": "International Cargo",
      "Pengurusan Dokumen": "Document Handling",
      "Relokasi Hewan": "Pet Relocation",
      "Made with": "Made with",
      "by": "by"
    }, true, true);
  }, [i18n]);

  const navigate = useNavigate();

  const handleQuickLink = (targetId: string) => {
    navigate('/', { state: { scrollTo: targetId } });
    
    // Jika user sudah di Home, navigate di atas tidak trigger re-render
    // maka kita bantu scroll manual jika ID tersedia
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: t('Beranda'), id: 'beranda' },
    { name: t('Tentang Kami'), id: 'tentang' },
    { name: t('Layanan'), id: 'layanan' },
    { name: t('Prosedur'), id: 'prosedur' },
    { name: t('Kontak'), id: 'kontak' },
  ];

  const services = [
    t('Cargo Domestik'),
    t('Cargo Internasional'),
    'Custom Clearance',
    t('Relokasi Hewan'),
    t('Pengurusan Dokumen'),
  ];

  const waContacts = profile?.contacts.filter(c => c.type === 'whatsapp') || [];
  const phoneContacts = profile?.contacts.filter(c => c.type === 'telephone') || [];
  const emailContacts = profile?.contacts.filter(c => c.type === 'email') || [];
  const facebooks = profile?.contacts.filter(c => c.type === 'facebook') || [];
  const instagrams = profile?.contacts.filter(c => c.type === 'instagram') || [];
  const tiktoks = profile?.contacts.filter(c => c.type === 'tiktok') || [];
  const wa = profile?.contacts?.find(c => c.type === 'whatsapp') ?.value;
  const waNumber = formatWhatsapp(wa);

  return (
    <footer className="relative text-white/80 pt-20 pb-10 overflow-hidden" style={{ backgroundColor: '#00365c' }}>
      
      {/* Dekorasi Cahaya Halus */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl shadow-lg">
                <img 
                  src={`${import.meta.env.BASE_URL}${profile?.logo_url}`}
                  alt="Logo" loading='lazy'
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight uppercase">
                { profile?.name}
                {/* Darin Pet's Transport */}
              </span>
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              {t("Partner terpercaya untuk perjalanan aman hewan kesayangan Anda sejak 2016. Kami mengutamakan kenyamanan dan keselamatan di setiap kilometer.")}
            </p>
            <div className="flex gap-4">
              {instagrams.map((item, idx) => (
              <a key={`ig-${idx}`} href={`${item.value}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#00365c] transition-all duration-300">
                <SiInstagram className="h-5 w-5" />
              </a>
              ))}
              {facebooks.map((item, idx) => (
              <a key={`ig-${idx}`} href={`${item.value}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#00365c] transition-all duration-300">
                <SiFacebook className="h-5 w-5" />
              </a>
              ))}
              {waContacts.map((item, idx) => (
              <a key={`ig-${idx}`} href={`https://wa.me/${formatWhatsapp(item.value)}`} aria-label="Hubungi kami melalui WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300">
                <SiWhatsapp className="h-5 w-5" />
              </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">{t("Navigasi")}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleQuickLink(link.id)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
                <li>
                  <Link to="/gallery" className="text-slate-400 hover:text-white transition-colors text-sm">Galeri</Link>
                </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">{t("Layanan Kami")}</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-default">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Info Kontak */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">{t("Hubungi Kami")}</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                  <MapPin className="h-4 w-4 text-white shrink-0" />
                </div>
                <span className="text-sm">{`${profile?.address}`}</span>
              </li>
              <li className="flex flex-col gap-3"> {/* Gunakan flex-col jika IG-nya ada banyak */}
                {phoneContacts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Phone className="h-4 w-4 text-white shrink-0" />
                    </div>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </li>
              <li className="flex items-center gap-3 group">
                {emailContacts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Mail className="h-4 w-4 text-white shrink-0" />
                    </div>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
                
              </li>
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <Clock className="h-4 w-4 text-green-400 shrink-0" />
                <span className="text-sm font-semibold text-green-400">{t("24 Jam Setiap Hari")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/50 text-center md:text-left">
            © {currentYear} <span className="text-white font-medium uppercase">Darin Pet's Transport</span>.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span>{t("Made with")}</span>
            <PawPrint className="h-3.5 w-3.5 text-red-400 fill-red-400" />
            <span>{t("by")}</span>
            <span className="text-white/80 font-medium tracking-wide">dark.kerberos05</span>
          </div>
        </div>
      </div>

      {/* Floating WA Button */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        aria-label="Hubungi kami melalui WhatsApp"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95">
          <SiWhatsapp className="w-7 h-7 text-white" />
        </div>
      </a>
    </footer>
  );
};

export default Footer;