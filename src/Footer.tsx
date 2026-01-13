import { Heart } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-header text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/generated/company-logo-transparent.dim_200x200.png" 
                alt="DARIN PET'S TRANSPORT Logo" 
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl font-bold">DARIN PET'S TRANSPORT</h3>
            </div>
            <p className="text-white/80 mb-4">
              Layanan transportasi hewan peliharaan terpercaya sejak 2016
            </p>
            <p className="text-sm text-white/70">
              Safe Trip for Pets, Peace of Mind for You
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Kontak Cepat</h4>
            <div className="space-y-2 text-white/80">
              <p>WhatsApp: 081280826143</p>
              <p>Telepon: (021) 55722971</p>
              <p>Email: Dpu.ekspres@gmail.com</p>
              <p>Layanan: 24 Jam</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Layanan</h4>
            <ul className="space-y-2 text-white/80">
              <li>Ekspedisi Darat</li>
              <li>Cargo Domestik</li>
              <li>Cargo Internasional</li>
              <li>Custom Clearance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm text-center md:text-left">
              © {currentYear} DARIN PET'S TRANSPORT. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-400 fill-red-400 animate-pulse" />
              <span>using</span>
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors font-medium underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://wa.me/6281280826143"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors font-medium"
          >
            <SiWhatsapp className="h-5 w-5" />
            Hubungi Kami di WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
