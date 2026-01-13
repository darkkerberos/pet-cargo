import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Plane, Globe, FileCheck, Dog, Cat, Bird, Bug } from 'lucide-react';

const Services = () => {
  const serviceTypes = [
    // {
    //   icon: Truck,
    //   title: 'Ekspedisi',
    //   description: 'Layanan pengiriman hewan peliharaan via darat dengan armada khusus yang nyaman dan aman',
    //   color: 'text-blue-600'
    // },
    {
      icon: Plane,
      title: 'Cargo Domestik',
      description: 'Pengiriman hewan ke seluruh wilayah Indonesia melalui jalur udara dengan penanganan profesional',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'Cargo Internasional',
      description: 'Layanan pengiriman hewan ke luar negeri dengan dokumentasi lengkap dan sesuai regulasi internasional',
      color: 'text-purple-600'
    },
    {
      icon: FileCheck,
      title: 'Custom Clearance',
      description: 'Pengurusan dokumen dan izin kepabeanan untuk pengiriman internasional',
      color: 'text-orange-600'
    }
  ];

  const animalTypes = [
    { icon: Dog, name: 'Anjing', color: 'bg-blue-100 text-blue-700' },
    { icon: Cat, name: 'Kucing', color: 'bg-purple-100 text-purple-700' },
    { icon: Bird, name: 'Burung', color: 'bg-green-100 text-green-700' },
    { icon: Bug, name: 'Reptil', color: 'bg-orange-100 text-orange-700' }
  ];

  const deliveryAreas = [
    'Jakarta', 'Tangerang', 'Bekasi', 'Depok', 'Bogor',
    'Bandung', 'Surabaya', 'Medan', 'Bali', 'Makassar',
    'Semarang', 'Yogyakarta', 'Palembang', 'Batam', 'Seluruh Indonesia'
  ];

  return (
    <section id="layanan" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berbagai pilihan layanan transportasi hewan peliharaan untuk memenuhi kebutuhan Anda
          </p>
        </div>

        {/* Service Types */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 mb-16">
          {serviceTypes.map((service, index) => (
            <Card 
              key={service.title}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
              style={{ animationDuration: '700ms', animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`h-14 w-14 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Animal Types */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '400ms' }}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Jenis Hewan yang Kami Layani</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {animalTypes.map((animal) => (
              <Card key={animal.name} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`h-16 w-16 rounded-full ${animal.color} flex items-center justify-center`}>
                      <animal.icon className="h-8 w-8" />
                    </div>
                    <p className="font-semibold text-lg">{animal.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="animate-in fade-in slide-in-from-bottom" style={{ animationDuration: '700ms', animationDelay: '500ms' }}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Area Pengiriman</h3>
          <Card className="max-w-5xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {deliveryAreas.map((area) => (
                  <Badge 
                    key={area} 
                    variant="secondary" 
                    className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
