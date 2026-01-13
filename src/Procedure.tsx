import { Card, CardContent } from '@/components/ui/card';
import { 
  Phone, 
  FileText, 
  Calendar, 
  Stethoscope, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle, 
  MessageSquare, 
  Star 
} from 'lucide-react';

const Procedure = () => {
  const steps = [
    {
      icon: Phone,
      title: 'Konsultasi Awal',
      description: 'Hubungi kami untuk konsultasi gratis mengenai kebutuhan transportasi hewan Anda',
      color: 'bg-blue-500'
    },
    {
      icon: FileText,
      title: 'Persiapan Dokumen',
      description: 'Kami bantu persiapan dokumen yang diperlukan seperti surat kesehatan dan vaksinasi',
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      title: 'Jadwal Pengiriman',
      description: 'Tentukan jadwal pengiriman yang sesuai dengan kebutuhan Anda',
      color: 'bg-purple-500'
    },
    {
      icon: Stethoscope,
      title: 'Pemeriksaan Kesehatan',
      description: 'Pemeriksaan kondisi hewan sebelum perjalanan untuk memastikan kesiapan',
      color: 'bg-pink-500'
    },
    {
      icon: Package,
      title: 'Persiapan Kandang',
      description: 'Penyediaan kandang transportasi yang aman dan nyaman sesuai standar',
      color: 'bg-orange-500'
    },
    {
      icon: Truck,
      title: 'Penjemputan',
      description: 'Tim kami akan menjemput hewan peliharaan Anda di lokasi yang ditentukan',
      color: 'bg-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Proses Pengiriman',
      description: 'Pengiriman dilakukan dengan penanganan khusus dan monitoring berkala',
      color: 'bg-indigo-500'
    },
    {
      icon: MessageSquare,
      title: 'Update Perjalanan',
      description: 'Anda akan mendapat update berkala mengenai status perjalanan hewan Anda',
      color: 'bg-teal-500'
    },
    {
      icon: CheckCircle,
      title: 'Tiba di Tujuan',
      description: 'Hewan peliharaan Anda tiba dengan selamat di lokasi tujuan',
      color: 'bg-emerald-500'
    },
    {
      icon: Star,
      title: 'Konfirmasi & Feedback',
      description: 'Konfirmasi penerimaan dan kami tunggu feedback Anda untuk peningkatan layanan',
      color: 'bg-amber-500'
    }
  ];

  return (
    <section id="prosedur" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prosedur Pengiriman</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            10 langkah mudah untuk memastikan hewan kesayangan Anda sampai dengan aman
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
              style={{ animationDuration: '700ms', animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className={`h-16 w-16 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '500ms' }}>
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-2">
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground">
                <span className="font-bold text-foreground">Catatan Penting:</span> Setiap langkah dilakukan dengan penuh perhatian dan profesionalisme untuk memastikan keselamatan dan kenyamanan hewan peliharaan Anda selama perjalanan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Procedure;
