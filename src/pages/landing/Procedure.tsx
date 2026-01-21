import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { 
  Phone, FileText, Calendar, Stethoscope, Package, 
  Truck, MapPin, CheckCircle, MessageSquare, Star, ArrowRight, ClipboardCheck 
} from 'lucide-react';

const Procedure = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Prosedur": "Our",
      "Aman": "Safety",
      "Kami": "Procedure",
      "Kami menerapkan SOP yang ketat melalui 10 tahapan sistematis untuk memastikan ketenangan pikiran Anda.": "We implement strict SOPs through 10 systematic stages to ensure your peace of mind.",
      "Penyampaian SOP Profesional": "Professional SOP Delivery",
      "Setiap langkah dalam prosedur ini dijalankan oleh": "Each step in this procedure is carried out by",
      "Petugas penanganan hewan bersertifikat": "certified pet handlers",
      "Kami memastikan transparansi total dengan memberikan update laporan setiap kali satu tahapan selesai dilaksanakan.": "We ensure total transparency by providing report updates every time a stage is completed.",
      
      // Step Titles
      "Konsultasi & Cek Kelayakan": "Consultation & Eligibility",
      "Konfirmasi & Pembayaran": "Confirmation & Payment",
      "Dokumen & Kesehatan": "Documents & Health",
      "Persiapan Kandang": "Crate Preparation",
      "Penjemputan / Pengantaran": "Pickup / Drop-off",
      "Check-in Cargo": "Cargo Check-in",
      "Pengiriman & Transit": "Shipping & Transit",
      "Kedatangan": "Arrival",
      "Serah Terima": "Handover",
      "Layanan Purna Kirim": "Post-Delivery Service",

      // Step Summaries
      "Analisa rute dan kelayakan pengiriman": "Route analysis and delivery feasibility",
      "Penawaran Harga & pemilihan paket layanan": "Quotation & service package selection",
      "Persiapan buku vaksin & microchip": "Vaccination book & microchip preparation",
      "Kandang Berstandar IATA & Pendampingan Anti-Stres untuk Hewan": "IATA crate & anti-stress briefing",
      "Penjemputan di rumah atau pengantaran ke titik layanan": "Home pickup or drop to service point",
      "Administrasi terminal & verifikasi": "Terminal administration & verification",
      "Monitoring real-time perjalanan": "Real-time journey monitoring",
      "Release & delivery ke alamat tujuan": "Release & delivery to destination address",
      "Pengecekan akhir & dokumentasi": "Final check & documentation",
      "After service & konsultasi": "After service & consultation", 
      "Penawaran Harga": "Quotation", "Persiapan Sesuai Standar IATA & Penjelasan Prosedur": "IATA & Briefing",
      "Pelacakan Perjalanan Langsung" :"Monitoring Real-Time", "Serah Terima & Pengiriman ke Alamat Tujuan": "Release & Delivery",
      "Pendampingan Setelah Pengiriman": "After Service", "Proses Check-in Kargo": "Check-in Cargo",
      "Petugas penanganan hewan" : "Pet Handler",
    }, true, true);
  }, [i18n]);

  const steps = [
    {
      icon: Phone,
      title: t('Konsultasi & Cek Kelayakan'),
      summary: t('Analisa rute dan kelayakan pengiriman'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileText,
      title: t('Konfirmasi & Pembayaran'),
      summary: t('Penawaran Harga & pemilihan paket layanan'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: Stethoscope,
      title: t('Dokumen & Kesehatan'),
      summary: t('Persiapan buku vaksin & microchip'),
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      icon: Package,
      title: t('Persiapan Kandang'),
      summary: t('Kandang Berstandar IATA & Pendampingan Anti-Stres untuk Hewan'),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Truck,
      title: t('Penjemputan / Pengantaran'),
      summary: t('Penjemputan di rumah atau pengantaran ke titik layanan'),
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      icon: MapPin,
      title: t('Proses Check-in Kargo'),
      summary: t('Administrasi terminal & verifikasi'),
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
    },
    {
      icon: Calendar,
      title: t('Pengiriman & Transit'),
      summary: t('Monitoring real-time perjalanan'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: MessageSquare,
      title: t('Kedatangan'),
      summary: t('Release & delivery ke alamat tujuan'),
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      icon: CheckCircle,
      title: t('Serah Terima'),
      summary: t('Pengecekan akhir & dokumentasi'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Star,
      title: t('Layanan Purna Kirim'),
      summary: t('After service & konsultasi'),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    }
  ];

  return (
    <section id="prosedur" className="py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#00365c] font-bold tracking-[0.2em] uppercase text-sm mb-4">Step by Step</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            {t("Prosedur")} <span className="text-[#00365c]">{t("Aman")}</span> {t("Kami")}
          </h3>
          <p className="text-slate-500 text-lg">
            {t("Kami menerapkan SOP yang ketat melalui 10 tahapan sistematis untuk memastikan ketenangan pikiran Anda.")}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Garis Alur (Hanya Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <Card className="border-none shadow-sm group-hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-slate-50/50 group-hover:bg-white h-full overflow-hidden">
                  <CardContent className="p-8">
                    {/* Number Badge */}
                    <div className="mb-6 flex justify-between items-start">
                      <div className={`h-14 w-14 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center transition-transform group-hover:rotate-12 duration-500`}>
                        <step.icon className="h-7 w-7" />
                      </div>
                      <span className="text-4xl font-black text-slate-200 group-hover:text-[#00365c]/10 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
                      {step.summary}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow (Desktop Only) */}
                {index !== steps.length - 1 && (index + 1) % 5 !== 0 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 text-slate-200">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Tambahan */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto p-1 bg-[#00365c] rounded-[2.5rem] shadow-2xl">
            <div className="bg-white rounded-[2.4rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shrink-0">
                <ClipboardCheck size={40} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-black text-slate-900 mb-2">{t("Penyampaian SOP Profesional")}</h4>
                <p className="text-slate-500 leading-relaxed">
                  {t("Setiap langkah dalam prosedur ini dijalankan oleh")} <span className="text-[#00365c] font-bold">{t("Petugas penanganan hewan bersertifikat")}</span>. {t("Kami memastikan transparansi total dengan memberikan update laporan setiap kali satu tahapan selesai dilaksanakan.")}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Procedure;