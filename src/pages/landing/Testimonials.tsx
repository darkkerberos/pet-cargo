import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Star, Quote, User } from 'lucide-react';

const Testimonials = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Testimoni": "Testimonials",
      "Cerita dari Para": "Stories from",
      "Kepuasan pelanggan dan kesehatan hewan peliharaan adalah prioritas utama kami. Berikut adalah pengalaman mereka menggunakan jasa kami.": "Customer satisfaction and pet health are our top priorities. Here are their experiences using our services.",
      "Berdasarkan 2,500+ ulasan pelanggan puas di Google & WhatsApp.": "Based on 2,500+ satisfied customer reviews on Google & WhatsApp.",
      
      // Testimonial Contents
      "Sangat puas dengan layanan Darin Pet's. Max sampai di Bali dengan kondisi segar dan tidak stres. Update foto selama perjalanan sangat menenangkan hati.": "Very satisfied with Darin Pet's service. Max arrived in Bali fresh and stress-free. Photo updates during the journey were very heartening.",
      "Awalnya ragu kirim kucing via cargo, tapi tim Darin menjelaskan prosedurnya dengan sangat detail. Penjemputannya tepat waktu dan stafnya sangat penyayang hewan.": "Initially hesitant to send my cat via cargo, but the Darin team explained the procedure in great detail. The pickup was on time and the staff really loves animals.",
      "Layanan profesional! Dokumen diurus semua oleh tim. Saya tinggal terima beres di kota tujuan. Harga sangat sebanding dengan kualitas pelayanannya.": "Professional service! All documents were handled by the team. I just received everything ready at the destination. The price is well worth the quality of service.",
      "Membantu banget untuk urusan relokasi internasional. Bruno selamat sampai Singapore tanpa kendala dokumen. Terima kasih banyak tim!": "Very helpful for international relocation. Bruno arrived safely in Singapore without any document issues. Thank you so much team!",

      // Pets & Species
      "Kucing Persi": "Persian Cat",
      "Burung Kakaktua": "Cockatoo Bird"
    }, true, true);
  }, [i18n]);

  const testimonials = [
    {
      name: "Andi Wijaya",
      pet: `Golden Retriever (Max)`,
      route: "Jakarta - Bali",
      content: t("Sangat puas dengan layanan Darin Pet's. Max sampai di Bali dengan kondisi segar dan tidak stres. Update foto selama perjalanan sangat menenangkan hati."),
      rating: 5,
      avatar: "bg-blue-100"
    },
    {
      name: "Siska Putri",
      pet: `${t("Kucing Persi")} (Mochi)`,
      route: "Surabaya - Jakarta",
      content: t("Awalnya ragu kirim kucing via cargo, tapi tim Darin menjelaskan prosedurnya dengan sangat detail. Penjemputannya tepat waktu dan stafnya sangat penyayang hewan."),
      rating: 5,
      avatar: "bg-purple-100"
    },
    {
      name: "Budi Santoso",
      pet: t("Burung Kakaktua"),
      route: "Tangerang - Medan",
      content: t("Layanan profesional! Dokumen diurus semua oleh tim. Saya tinggal terima beres di kota tujuan. Harga sangat sebanding dengan kualitas pelayanannya."),
      rating: 5,
      avatar: "bg-orange-100"
    },
    {
      name: "Diana Lestari",
      pet: "Frenchie (Bruno)",
      route: "Jakarta - Singapore",
      content: t("Membantu banget untuk urusan relokasi internasional. Bruno selamat sampai Singapore tanpa kendala dokumen. Terima kasih banyak tim!"),
      rating: 5,
      avatar: "bg-green-100"
    }
  ];

  return (
    <section id="testimoni" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
            {t("Testimoni")}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("Cerita dari Para")} <span className="text-primary">Pawrents</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Kepuasan pelanggan dan kesehatan hewan peliharaan adalah prioritas utama kami. Berikut adalah pengalaman mereka menggunakan jasa kami.")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, idx) => (
            <Card 
              key={idx} 
              className="border-none bg-white/50 dark:bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 group animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <CardContent className="p-8 relative">
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-lg italic text-foreground/80 mb-6 relative z-10">
                  "{item.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full ${item.avatar} flex items-center justify-center shrink-0 border-2 border-white shadow-sm`}>
                    <User className="h-6 w-6 text-foreground/60" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-none mb-1">{item.name}</h4>
                    <p className="text-sm text-primary font-medium">{item.pet}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{item.route}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-16 text-center animate-in fade-in slide-in-from-top duration-700 delay-500">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-muted/50 border border-border">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-primary border-2 border-background flex items-center justify-center text-white text-xs font-bold">
                  <User className="h-5 w-5" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-bold text-xl leading-tight">4.9 / 5.0 Rating</p>
              <p className="text-sm text-muted-foreground">{t("Berdasarkan 2,500+ ulasan pelanggan puas di Google & WhatsApp.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;