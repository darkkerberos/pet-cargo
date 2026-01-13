import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, Eye } from 'lucide-react';

const About = () => {
  return (
    <section id="tentang" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            DARIN PET'S TRANSPORT adalah perusahaan transportasi hewan peliharaan yang berpengalaman dan terpercaya
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '100ms' }}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Berdiri Sejak</h3>
                <p className="text-4xl font-bold text-primary">2016</p>
                <p className="text-muted-foreground">
                  Lebih dari 8 tahun pengalaman dalam transportasi hewan peliharaan
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">Visi Kami</h3>
                <p className="text-muted-foreground">
                  Menjadi perusahaan transportasi hewan peliharaan terdepan di Indonesia yang memberikan layanan berkualitas tinggi dengan standar internasional
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '300ms' }}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Misi Kami</h3>
                <p className="text-muted-foreground">
                  Memberikan layanan transportasi hewan yang aman, nyaman, dan terpercaya dengan mengutamakan kesejahteraan hewan dan kepuasan pelanggan
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '400ms' }}>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">Komitmen Kami</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kami memahami bahwa hewan peliharaan adalah bagian dari keluarga Anda. Oleh karena itu, kami berkomitmen untuk memberikan perawatan terbaik selama perjalanan, memastikan setiap hewan sampai di tujuan dengan selamat dan dalam kondisi prima. Tim profesional kami siap melayani Anda 24 jam setiap hari.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
