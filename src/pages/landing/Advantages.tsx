import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Zap, Eye, Shield, Clock, Users, Award, Heart, Headphones 
} from 'lucide-react';

const Advantages = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Kenapa Pilih Kami": "Why Choose Us",
      "Keunggulan Darin": "Darin's",
      "Kami mengerti bahwa hewan peliharaan adalah anggota keluarga. Itulah mengapa kami menetapkan standar tinggi untuk setiap perjalanan.": "We understand that pets are family members. That's why we set high standards for every journey.",
      
      // Stats
      "Tahun Pengalaman": "Years of Experience",
      "Hewan Terkirim": "Pets Delivered",
      "Kota Tujuan": "Destinations",
      "Pelanggan Puas": "Happy Customers",

      // Advantage Titles
      "Terpercaya & Aman": "Trusted & Secure",
      "Pengiriman Cepat": "Fast Delivery",
      "Transparansi Penuh": "Full Transparency",
      "Layanan 24 Jam": "24/7 Service",
      "Tim Profesional": "Professional Team",
      "Standar Internasional": "International Standard",
      "Perawatan Kasih Sayang": "Loving Care",
      "Support Responsif": "Responsive Support",
      "Nilai Terbaik": "Best Value",
      "Klien Prioritas Utama": "Client First",

      // Descriptions
      "Pengalaman 8+ tahun membawa ribuan hewan peliharaan dengan tingkat keberhasilan 100%.": "8+ years experience transporting thousands of pets with a 100% success rate.",
      "Rute optimal dan manajemen waktu yang ketat memastikan anabul sampai tepat waktu.": "Optimal routes and strict time management ensure your pets arrive on time.",
      "Pembaruan secara langsung. Anda bisa memantau kondisi dan posisi hewan Anda secara berkala.": "Real-time updates. You can monitor your pet's condition and position regularly.",
      "Kebutuhan mendesak? Tim kami siaga 24/7 untuk melayani konsultasi dan pengiriman.": "Urgent needs? Our team is on standby 24/7 for consultation and shipping.",
      "Handler kami pecinta hewan yang terlatih menangani berbagai karakter hewan.": "Our handlers are animal lovers trained to handle various pet characters.",
      "Kepatuhan penuh pada regulasi IATA untuk keamanan transportasi udara & laut.": "Full compliance with IATA regulations for air & sea transport safety.",
      "Bukan sekadar kargo, kami memberi makan dan perhatian layaknya peliharaan sendiri.": "Not just cargo, we provide food and attention like our own pets.",
      "Admin yang ramah siap menjawab semua kekhawatiran Anda dengan cepat.": "Friendly admins ready to answer all your concerns quickly.",

      // Highlight Cards
      "Harga Bersahabat": "Affordable Pricing",
      "Kualitas premium tidak harus mahal. Kami menawarkan harga kompetitif dengan transparansi biaya tanpa tambahan tersembunyi.": "Premium quality doesn't have to be expensive. We offer competitive pricing with transparent costs and no hidden fees.",
      "Kepuasan Pelanggan": "Customer Satisfaction",
      "Ribuan pemilik hewan telah membuktikannya. Fokus kami adalah ketenangan pikiran Anda dan kenyamanan hewan kesayangan Anda.": "Thousands of pet owners have proven it. Our focus is your peace of mind and your pet's comfort."
    }, true, true);
  }, [i18n]);

  const stats = [
    { label: t('Tahun Pengalaman'), value: '8+' },
    { label: t('Hewan Terkirim'), value: '15k+' },
    { label: t('Kota Tujuan'), value: '150+' },
    { label: t('Pelanggan Puas'), value: '99%' },
  ];

  const advantages = [
    {
      icon: Shield,
      title: t('Terpercaya & Aman'),
      description: t('Pengalaman 8+ tahun membawa ribuan hewan peliharaan dengan tingkat keberhasilan 100%.'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Zap,
      title: t('Pengiriman Cepat'),
      description: t('Rute optimal dan manajemen waktu yang ketat memastikan anabul sampai tepat waktu.'),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Eye,
      title: t('Transparansi Penuh'),
      description: t('Pembaruan secara langsung. Anda bisa memantau kondisi dan posisi hewan Anda secara berkala.'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Clock,
      title: t('Layanan 24 Jam'),
      description: t('Kebutuhan mendesak? Tim kami siaga 24/7 untuk melayani konsultasi dan pengiriman.'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Users,
      title: t('Tim Profesional'),
      description: t('Handler kami pecinta hewan yang terlatih menangani berbagai karakter hewan.'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Award,
      title: t('Standar Internasional'),
      description: t('Kepatuhan penuh pada regulasi IATA untuk keamanan transportasi udara & laut.'),
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      icon: Heart,
      title: t('Perawatan Kasih Sayang'),
      description: t('Bukan sekadar kargo, kami memberi makan dan perhatian layaknya peliharaan sendiri.'),
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Headphones,
      title: t('Support Responsif'),
      description: t('Admin yang ramah siap menjawab semua kekhawatiran Anda dengan cepat.'),
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    }
  ];

  return (
    <section id="keunggulan" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#00365c] font-bold tracking-widest uppercase text-sm mb-4">{t("Kenapa Pilih Kami")}</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {t("Keunggulan Darin")} <span className="text-[#00365c]">Pet's Transport</span>
          </h3>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t("Kami mengerti bahwa hewan peliharaan adalah anggota keluarga. Itulah mengapa kami menetapkan standar tinggi untuk setiap perjalanan.")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 p-8 bg-[#00365c] rounded-[2rem] shadow-2xl shadow-blue-900/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center border-r border-white/10 last:border-none">
              <p className="text-4xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {advantages.map((adv, idx) => (
            <div 
              key={idx}
              className="group p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`h-14 w-14 rounded-2xl ${adv.bgColor} ${adv.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <adv.icon className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 aspect-[16/10] lg:aspect-auto">
            <img 
              src={`${import.meta.env.BASE_URL}assets/generated/harga-bersahabat-2.png`}
              alt="Harga" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="relative h-full p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="bg-white/20 backdrop-blur-md w-fit px-4 py-1 rounded-full text-white text-xs font-bold mb-4 uppercase tracking-widest border border-white/30">
                {t('Nilai Terbaik')}
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{t("Harga Bersahabat")}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("Kualitas premium tidak harus mahal. Kami menawarkan harga kompetitif dengan transparansi biaya tanpa tambahan tersembunyi.")}
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#00365c] aspect-[16/10] lg:aspect-auto">
            <img 
              src={`${import.meta.env.BASE_URL}assets/generated/happy-customer.dim_400x300.jpg`}
              alt="Kepuasan" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="relative h-full p-10 flex flex-col justify-end bg-gradient-to-t from-[#00365c]/90 via-transparent to-transparent">
              <div className="bg-white/20 backdrop-blur-md w-fit px-4 py-1 rounded-full text-white text-xs font-bold mb-4 uppercase tracking-widest border border-white/30">
                 {t('Klien Prioritas Utama')}
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{t("Kepuasan Pelanggan")}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("Ribuan pemilik hewan telah membuktikannya. Fokus kami adalah ketenangan pikiran Anda dan kenyamanan hewan kesayangan Anda.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;