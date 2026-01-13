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
    title: 'Konsultasi & Cek Kelayakan',
    summary: 'Analisa kebutuhan, rute, dan kelayakan pengiriman',
    color: 'bg-blue-500',
    details: [
      'Data hewan: jenis, ras, ukuran/berat, usia',
      'Rute asal–tujuan & tanggal kirim',
      'Metode: cargo / door-to-door',
      'Cek aturan maskapai/negara',
      'Output: rekomendasi rute, dokumen & estimasi biaya'
    ]
  },
  {
    icon: FileText,
    title: 'Penawaran Harga & Konfirmasi',
    summary: 'Quotation & pemilihan paket layanan',
    color: 'bg-green-500',
    details: [
      'Rincian biaya: handling, kandang, dokumen, karantina',
      'Pilihan paket: Basic / Plus / Premium',
      'Pengisian form order',
      'Pembayaran DP / Full sesuai kesepakatan'
    ]
  },
  {
    icon: Stethoscope,
    title: 'Persiapan Dokumen & Kesehatan',
    summary: 'Checklist dokumen domestik & internasional',
    color: 'bg-pink-500',
    details: [
      'Domestik: Buku vaksin & usia > 4 bulan',
      'Internasional: Microchip (jika wajib)',
      'Vaksin rabies & sesuai negara tujuan',
      'Health certificate & legalisasi',
      'Uji Titer Lab Pemerintah',
      'Foto hewan'
    ]
  },
  {
    icon: Package,
    title: 'Persiapan Kandang & Keamanan',
    summary: 'Kandang sesuai standar & briefing anti-stres',
    color: 'bg-orange-500',
    details: [
      'Ukuran kandang sesuai standar',
      'Ventilasi, pengunci & wadah minum',
      'Label Live Animal + kontak pemilik',
      'Briefing jadwal makan & tips perjalanan'
    ]
  },
  {
    icon: Truck,
    title: 'Penjemputan / Drop-off',
    summary: 'Pickup atau drop ke titik layanan',
    color: 'bg-cyan-500',
    details: [
      'Pickup ke rumah atau drop-off mandiri',
      'Cek kondisi hewan',
      'Foto/video sebelum berangkat',
      'Final packing & administrasi'
    ]
  },
  {
    icon: MapPin,
    title: 'Check-in Cargo / Karantina',
    summary: 'Proses administrasi & verifikasi',
    color: 'bg-indigo-500',
    details: [
      'Check-in terminal cargo / pelabuhan',
      'Verifikasi dokumen',
      'Timbang & ukur kandang',
      'Karantina (jika diwajibkan)'
    ]
  },
  {
    icon: Calendar,
    title: 'Pengiriman & Transit',
    summary: 'Monitoring selama perjalanan',
    color: 'bg-purple-500',
    details: [
      'Hewan berangkat sesuai jadwal',
      'Monitoring saat transit',
      'Update status: check-in, departed, arrived'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Kedatangan & Pengambilan',
    summary: 'Release & delivery tujuan',
    color: 'bg-teal-500',
    details: [
      'Release cargo / karantina',
      'Self pick-up atau delivery rumah',
      'Koordinasi waktu pengambilan'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Serah Terima & Konfirmasi',
    summary: 'Pengecekan & dokumentasi',
    color: 'bg-emerald-500',
    details: [
      'Serah terima hewan',
      'Cek kondisi',
      'Foto/video dokumentasi',
      'Konfirmasi selesai'
    ]
  },
  {
    icon: Star,
    title: 'Layanan Purna Kirim',
    summary: 'After service & garansi',
    color: 'bg-amber-500',
    details: [
      'Garansi layanan sesuai paket',
      'Bantuan komplain jadwal/dokumen',
      'Reminder perawatan pasca perjalanan'
    ]
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <p className="text-sm text-muted-foreground">
                    {step.summary}
                  </p>

                  <ul className="text-sm text-left text-muted-foreground space-y-1 mt-2 list-disc list-inside">
                    {step.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
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
