import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, Eye, Heart, ShieldCheck, PawPrint } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      // Badge & Header
      "Siapa Kami": "Who We Are",
      "Lebih Dari Sekadar": "More Than Just",
      "Pengiriman": "Pet",
      "Hewan.": "Transport.",
      // Paragraphs
      "Darin Pet’s Transport lahir dari rasa cinta yang mendalam terhadap hewan. Kami memahami bahwa memindahkan \"anabul\" kesayangan bukan hanya soal logistik, tapi soal memastikan anggota keluarga Anda tetap merasa nyaman dan aman.": "Darin Pet's Transport was born from a deep love for animals. We understand that moving your beloved pets is not just about logistics, but about ensuring your family members stay comfortable and safe.",
      "Sejak 2016, kami telah mengukir standar baru dalam transportasi hewan di Indonesia—baik domestik maupun internasional.": "Since 2016, we have carved a new standard in pet transportation in Indonesia—both domestically and internationally.",
      // Features
      "Legalitas Lengkap": "Full Legality",
      "Pecinta Hewan": "Animal Lovers",
      "Keselamatan hewan peliharaan Anda adalah prioritas mutlak kami. Kami menjaga mereka layaknya menjaga keluarga sendiri.": "The safety of your pets is our absolute priority. We care for them like our own family.",
      // Stats/Cards
      "Berdiri Sejak": "Established Since",
      "Hampir satu dekade melayani negeri.": "Nearly a decade of serving the nation.",
      "Visi Kami": "Our Vision",
      "Standar Global": "Global Standard",
      "Menjadi barometer transportasi hewan di Indonesia.": "To become the barometer of pet transportation in Indonesia.",
      "Misi Kami": "Our Mission",
      "Nol Insiden Kecelakaan": "Zero Accident",
      "Keamanan tanpa kompromi untuk setiap nyawa.": "Uncompromising security for every life.",
      "Tahun Pengalaman Perawatan": "Years of Care"
    }, true, true);
  }, [i18n]);

  const stats = [
    { 
      icon: Calendar, 
      title: t("Berdiri Sejak"), 
      desc: "2016", 
      sub: t("Hampir satu dekade melayani negeri."),
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      icon: Eye, 
      title: t("Visi Kami"), 
      desc: t("Standard Global"), 
      sub: t("Menjadi barometer transportasi hewan di Indonesia."),
      color: "text-[#00365c]", 
      bg: "bg-slate-100"
    },
    { 
      icon: Target, 
      title: t("Misi Kami"), 
      desc: t("Nol Insiden Kecelakaan"), 
      sub: t("Keamanan tanpa kompromi untuk setiap nyawa."),
      color: "text-emerald-600",
      bg: "bg-emerald-50" 
    }
  ];

  return (
    <section id="tentang" className="relative py-28 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[#00365c]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
              <img 
                src="assets/generated/about-team.png" 
                alt="Tim Darin Pets Transport" 
                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00365c]/60 to-transparent" />
            </div>
            
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-[#00365c]/10 rounded-[2.5rem] -z-10 hidden lg:block" />

            <div className="absolute -bottom-8 -right-8 bg-[#00365c] text-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-4 border-white">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black mb-1">8+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">{t("Tahun Pengalaman Perawatan")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00365c]/5 text-[#00365c] rounded-full text-xs font-bold tracking-[0.2em] uppercase">
              <PawPrint className="w-4 h-4" />
              {t("Siapa Kami")}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
              {t("Lebih Dari Sekadar")} <span className="text-[#00365c]">{t("Pengiriman")}</span> {t("Hewan.")}
            </h2>
            
            <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
              <p>
                {t("Darin Pet’s Transport lahir dari rasa cinta yang mendalam terhadap hewan. Kami memahami bahwa memindahkan \"anabul\" kesayangan bukan hanya soal logistik, tapi soal memastikan anggota keluarga Anda tetap merasa nyaman dan aman.")}
              </p>
              <p className="font-medium text-slate-800">
                {t("Sejak 2016, kami telah mengukir standar baru dalam transportasi hewan di Indonesia—baik domestik maupun internasional.")}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span className="font-bold text-slate-700">{t("Legalitas Lengkap")}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Heart className="w-6 h-6 text-red-500 fill-red-500/10" />
                <span className="font-bold text-slate-700">{t("Pecinta Hewan")}</span>
              </div>
            </div>

            <div className="p-6 bg-[#00365c] rounded-3xl text-white flex items-center gap-5 shadow-xl shadow-blue-900/20">
               <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                 <PawPrint className="w-8 h-8 text-primary-foreground" />
               </div>
               <p className="text-sm font-medium leading-relaxed italic text-white/90">
                 "{t("Keselamatan hewan peliharaan Anda adalah prioritas mutlak kami. Kami menjaga mereka layaknya menjaga keluarga sendiri.")}"
               </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {stats.map((item, idx) => (
            <Card key={idx} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-slate-50/50">
              <CardContent className="p-10 flex flex-col items-center text-center">
                <div className={`h-16 w-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{item.title}</h3>
                <p className="text-2xl font-black text-[#00365c] mb-4">{item.desc}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;