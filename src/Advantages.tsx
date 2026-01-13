import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Eye, 
  Shield, 
  Clock, 
  Users, 
  Award,
  Heart,
  Headphones
} from 'lucide-react';


const Advantages = () => {
  const advantages = [
    {
      icon: Zap,
      title: 'Pengiriman Cepat',
      description: 'Kami menjamin pengiriman yang cepat dan tepat waktu dengan berbagai pilihan layanan ekspres',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Eye,
      title: 'Transparansi Penuh',
      description: 'Update real-time dan tracking perjalanan hewan Anda dari awal hingga tiba di tujuan',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: 'Terpercaya & Aman',
      description: 'Lebih dari 8 tahun pengalaman dengan ribuan hewan yang telah kami antarkan dengan selamat',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Clock,
      title: 'Layanan 24 Jam',
      description: 'Tim kami siap melayani Anda kapan saja, 24 jam sehari, 7 hari seminggu',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Users,
      title: 'Tim Profesional',
      description: 'Handler berpengalaman dan terlatih khusus dalam menangani berbagai jenis hewan',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Award,
      title: 'Standar Internasional',
      description: 'Mengikuti standar IATA dan regulasi internasional untuk transportasi hewan',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      icon: Heart,
      title: 'Perawatan Penuh Kasih',
      description: 'Kami memperlakukan setiap hewan seperti keluarga sendiri dengan penuh perhatian',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Headphones,
      title: 'Customer Support Responsif',
      description: 'Tim customer service yang ramah dan responsif siap membantu setiap pertanyaan Anda',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    }
  ];

  return (
    <section id="keunggulan" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Keunggulan Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mengapa ribuan pelanggan mempercayai kami untuk transportasi hewan kesayangan mereka
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((advantage, index) => (
            <Card 
              key={advantage.title}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
              style={{ animationDuration: '700ms', animationDelay: `${index * 75}ms` }}
            >
              <CardHeader>
                <div className={`h-14 w-14 rounded-lg ${advantage.bgColor} flex items-center justify-center mb-4`}>
                  <advantage.icon className={`h-7 w-7 ${advantage.color}`} />
                </div>
                <CardTitle className="text-xl">{advantage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '500ms' }}>
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <img 
                  src="assets/generated/harga-bersahabat-2.png" 
                  alt="Transport Vehicle" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Harga Bersahabat</h3>
                <p className="text-muted-foreground">
                  Penawaran harga yang transparan dan kompetitif, disesuaikan dengan kebutuhan perjalanan tanpa mengurangi standar keselamatan dan kenyamanan hewan peliharaan Anda.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <img 
                  src="assets/generated/happy-customer.dim_400x300.jpg" 
                  alt="Happy Customer" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Kepuasan Pelanggan</h3>
                <p className="text-muted-foreground">
                  Ribuan pelanggan puas dengan layanan kami. Testimoni positif dan repeat customer adalah bukti komitmen kami
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
