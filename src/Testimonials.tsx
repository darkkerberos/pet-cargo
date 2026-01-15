import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, Eye, Heart } from 'lucide-react';

const Testimonials = () => {
  return (
    <section id="testimoni" className="relative py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Top Section: Gambar di Kiri, Teks di Kanan */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* 1. Image Section (Sekarang di urutan pertama / Kiri) */}
          <div className="relative animate-in fade-in slide-in-from-left duration-700">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img 
                src="assets/generated/about-team.png" 
                alt="Tim Darin Pets Transport" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Badge Pengalaman - Dipindah ke kanan bawah gambar agar tidak menutupi tengah */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold">8+</p>
              <p className="text-sm font-medium">Tahun Pengalaman</p>
            </div>
          </div>

          {/* 2. Content Section (Sekarang di urutan kedua / Kanan) */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
              Tentang Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Dedikasi Penuh untuk <span className="text-primary">Kesejahteraan</span> Hewan Anda
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              DARIN PET'S TRANSPORT bukan sekadar jasa pengiriman. Kami adalah partner terpercaya yang memahami bahwa hewan peliharaan adalah bagian tak terpisahkan dari keluarga Anda. Sejak 2016, kami telah mengukir senyum di wajah ribuan pemilik hewan melalui layanan yang aman dan penuh kasih sayang.
            </p>
            
            {/* Fitur Tambahan */}
            <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm border rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Heart className="h-6 w-6 text-primary fill-primary/20" />
              </div>
              <p className="font-medium text-foreground/80">Melayani dengan sepenuh hati selama 24 jam setiap hari.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Visi Misi */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Calendar, 
              title: "Berdiri Sejak", 
              desc: "2016", 
              sub: "Pelopor transportasi hewan terpercaya.",
              color: "bg-primary" 
            },
            { 
              icon: Eye, 
              title: "Visi Kami", 
              desc: "Standar Internasional", 
              sub: "Menjadi leader transportasi hewan di Indonesia.",
              color: "bg-accent" 
            },
            { 
              icon: Target, 
              title: "Misi Kami", 
              desc: "Aman & Nyaman", 
              sub: "Mengutamakan kesejahteraan hewan di atas segalanya.",
              color: "bg-secondary" 
            }
          ].map((item, idx) => (
            <Card key={idx} className="border-none bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom" 
                  style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className={`h-14 w-14 rounded-2xl ${item.color}/10 flex items-center justify-center mb-6`}>
                  <item.icon className={`h-7 w-7 ${item.color === 'bg-primary' ? 'text-primary' : 'text-foreground'}`} />
                </div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-2xl font-bold mb-3">{item.desc}</p>
                <p className="text-muted-foreground text-sm">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;