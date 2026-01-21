import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petType: '',
    message: ''
  });

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Hubungi Kami": "Contact Us",
      "Siap Memberikan Perjalanan": "Ready to Provide the",
      "Terbaik": "Best",
      "Untuk Hewan Anda": "Journey for Your Pets",
      "Konsultasikan kebutuhan relokasi hewan peliharaan Anda secara gratis. Tim kami siaga 24 jam untuk membantu Anda.": "Consult your pet relocation needs for free. Our team is on standby 24/7 to help you.",
      "Telepon Kantor": "Office Phone",
      "Lokasi Kantor": "Office Location",
      "Formulir Relokasi": "Relocation Form",
      "Lengkapi data berikut untuk mendapatkan estimasi biaya langsung via WhatsApp.": "Complete the following data to get a cost estimate directly via WhatsApp.",
      "Nama Lengkap": "Full Name",
      "Masukkan nama Anda": "Enter your name",
      "Alamat email aktif": "Active email address",
      "Jenis Hewan (Kucing/Anjing/Lainnya)": "Pet Type (Cat/Dog/Others)",
      "Contoh: 2 Kucing Persi": "Example: 2 Persian Cats",
      "Detail Kebutuhan / Alamat Jemput & Tujuan": "Requirement Details / Pickup & Destination Address",
      "Ceritakan detail rencana pengiriman hewan Anda...": "Tell us the details of your pet shipment plan...",
      "Konsultasi via WhatsApp": "Consult via WhatsApp",
      "*Dengan menekan tombol, Anda akan diarahkan langsung ke chat WhatsApp resmi kami.": "*By clicking the button, you will be directed directly to our official WhatsApp chat.",
      "WA_MESSAGE": "Hello Darin Pet's Transport,\n\nI would like to ask about pet relocation:\n\n*Name:* {{name}}\n*Email:* {{email}}\n*Pet Type:* {{petType}}\n*Message:* {{message}}"
    }, true, true);
  }, [i18n]);

  const handleSendWhatsApp = () => {
    // Pesan WhatsApp otomatis menyesuaikan bahasa yang dipilih
    const baseMessage = i18n.language === 'id' 
      ? `Halo Darin Pet's Transport,\n\nSaya ingin bertanya tentang relokasi hewan:\n\n*Nama:* ${formData.name}\n*Email:* ${formData.email}\n*Jenis Hewan:* ${formData.petType}\n*Pesan:* ${formData.message}`
      : `Hello Darin Pet's Transport,\n\nI want to ask about pet relocation:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Pet Type:* ${formData.petType}\n*Message:* ${formData.message}`;
    
    const url = `https://wa.me/6281280826143?text=${encodeURIComponent(baseMessage)}`;
    window.open(url, '_blank');
  };

  const contactDetails = [
    {
      icon: <SiWhatsapp className="w-5 h-5" />,
      title: "WhatsApp",
      value: "0812-8082-6143",
      link: "https://wa.me/6281280826143",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: t("Telepon Kantor"),
      value: "(021) 55722971",
      link: "tel:+622155722971",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      value: "Dpu.ekspres@gmail.com",
      link: "mailto:Dpu.ekspres@gmail.com",
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

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
          
          {/* SISI KIRI: Info Kontak & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {contactDetails.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`${item.bg} ${item.color} p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.title}</p>
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
                      Komplek Taman Adhiloka Blok A No. 9, Tangerang
                    </p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="h-[250px] w-full bg-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.671!2d106.634!3d-6.175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMzAuMCJTIDEwNiwzOCcwMi40IkU!5e0!3m2!1sen!2sid!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SISI KANAN: Form Pesan */}
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