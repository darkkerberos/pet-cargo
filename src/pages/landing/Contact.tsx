import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import {ContactItem, ProfileData, formatWhatsapp } from '@/types/profile'

const Contact = ({ profile } : { profile: ProfileData | null}) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petType: '',
    message: ''
  });

  

  useEffect(() => {
    // i18n Resources (Tetap seperti aslimu)
    i18n.addResourceBundle('en', 'translation', {
      "Hubungi Kami": "Contact Us",
      "Siap Memberikan Perjalanan": "Ready to Provide the",
      "Terbaik": "Best",
      "Untuk Hewan Anda": "Journey for Your Pets",
      "Telepon Kantor": "Office Phone",
      "Lokasi Kantor": "Office Location",
      "Formulir Relokasi": "Relocation Form",
      "Nama Lengkap": "Full Name",
      "Masukkan nama Anda": "Enter your name",
      "Alamat email aktif": "Active email address",
      "Jenis Hewan (Kucing/Anjing/Lainnya)": "Pet Type (Cat/Dog/Others)",
      "Detail Kebutuhan / Alamat Jemput & Tujuan": "Requirement Details",
      "Konsultasi via WhatsApp": "Consult via WhatsApp",
    }, true, true);
  }, [i18n]);

  // --- LOGIKA FILTERING ---
  // Kita filter array contacts berdasarkan type
  const waContacts = profile?.contacts.filter(c => c.type === 'whatsapp') || [];
  const phoneContacts = profile?.contacts.filter(c => c.type === 'telephone') || [];
  const emailContacts = profile?.contacts.filter(c => c.type === 'email') || [];

  const handleSendWhatsApp = () => {
    const baseMessage = `Halo Darin Pet's Transport,\n\nSaya ingin bertanya tentang relokasi hewan:\n\n*Nama:* ${formData.name}\n*Email:* ${formData.email}\n*Jenis Hewan:* ${formData.petType}\n*Pesan:* ${formData.message}`;
    
    // Ambil nomor WA pertama dari list, kalau tidak ada pakai fallback dari field whatsapp utama
    const targetWa = waContacts.length > 0 ? waContacts[0].value : profile?.whatsapp;
    const cleanNumber = formatWhatsapp(targetWa?.replace(/\D/g, ''));

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(baseMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="kontak" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00365c] to-transparent opacity-20" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm font-bold text-[#00365c] tracking-[0.2em] uppercase mb-3">{t("Hubungi Kami")}</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            {t("Siap Memberikan Perjalanan")} <span className="text-[#00365c]">{t("Terbaik")}</span> {t("Untuk Hewan Anda")}
          </h3>
          <p className="text-slate-600 text-lg">
            {t("Konsultasikan kebutuhan relokasi hewan peliharaan Anda secara gratis. Tim kami siaga 24 jam untuk membantu Anda.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* SISI KIRI: Info Kontak (Dinamis Berdasarkan Filter) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              
              {/* Render Semua WhatsApp */}
              {waContacts.map((item, idx) => (
                <a key={`wa-${idx}`} href={`https://wa.me/${formatWhatsapp(item.value.replace(/\D/g, ''))}`} aria-label="Hubungi kami melalui WhatsApp" target="_blank" rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="bg-green-50 text-green-600 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                    <SiWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label || "WhatsApp"}</p>
                    <p className="text-slate-900 font-semibold">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Render Semua Telepon */}
              {phoneContacts.map((item, idx) => (
                <a key={`phone-${idx}`} href={`tel:${item.value}`}
                  aria-label="Hubungi kami melalui Telepon"
                  className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="bg-blue-50 text-blue-600 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label || t("Telepon Kantor")}</p>
                    <p className="text-slate-900 font-semibold">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Render Semua Email */}
              {emailContacts.map((item, idx) => (
                <a key={`email-${idx}`} href={`mailto:${item.value}`}
                  className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label || "Email Support"}</p>
                    <p className="text-slate-900 font-semibold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <Card className="border-none shadow-xl overflow-hidden rounded-3xl">
              <CardContent className="p-0">
                <div className="bg-[#00365c] p-6 text-white flex items-center justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-white/80 text-sm mb-1">
                      <MapPin className="w-4 h-4" /> {t("Lokasi Kantor")}
                    </p>
                    <p className="font-medium text-sm leading-relaxed">
                      {profile?.address || "Komplek Taman Adhiloka, Tangerang"}
                    </p>
                  </div>
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <div className="h-[250px] w-full bg-slate-200">
                  <iframe title="Peta Kantor Darin Pet Transport"
                    src={`https://maps.google.com/maps?q=${profile?.address_latlong}&z=15&output=embed`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SISI KANAN: Form Pesan (Tetap Sesuai Desain Kamu) */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
              <div className="bg-[#00365c] py-8 px-10 text-white">
                <h4 className="text-2xl font-bold flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-[#ffd700]" />
                  {t("Formulir Relokasi")}
                </h4>
                <p className="text-white/70 text-sm mt-2">{t("Lengkapi data berikut untuk mendapatkan estimasi biaya langsung via WhatsApp.")}</p>
              </div>
              <CardContent className="p-10 bg-white">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">{t("Nama Lengkap")}</label>
                    <Input 
                      placeholder={t("Masukkan nama Anda")} 
                      className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-2 focus-visible:ring-[#00365c]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <Input 
                      type="email" 
                      placeholder={t("Alamat email aktif")} 
                      className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-2 focus-visible:ring-[#00365c]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t("Jenis Hewan (Kucing/Anjing/Lainnya)")}</label>
                  <Input 
                    placeholder={t("Contoh: 2 Kucing Persi")} 
                    className="bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-2 focus-visible:ring-[#00365c]"
                    value={formData.petType}
                    onChange={(e) => setFormData({...formData, petType: e.target.value})}
                  />
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t("Detail Kebutuhan / Alamat Jemput & Tujuan")}</label>
                  <Textarea 
                    placeholder={t("Ceritakan detail rencana pengiriman hewan Anda...")} 
                    className="bg-slate-50 border-none min-h-[150px] rounded-2xl resize-none focus-visible:ring-2 focus-visible:ring-[#00365c]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleSendWhatsApp}
                  aria-label="Hubungi kami melalui WhatsApp"
                  className="w-full h-14 bg-[#00365c] hover:bg-[#002845] text-white rounded-2xl text-lg font-bold shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 active:scale-95 flex gap-3"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  {t("Konsultasi via WhatsApp")}
                  <Send className="w-4 h-4 opacity-50" />
                </Button>
                
                <p className="text-center text-slate-400 text-xs mt-6 italic">
                  {t("*Dengan menekan tombol, Anda akan diarahkan langsung ke chat WhatsApp resmi kami.")}
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;