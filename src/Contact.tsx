import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const Contact = () => {
  const contactInfo = [
    {
      icon: SiWhatsapp,
      title: 'WhatsApp',
      value: '081280826143',
      link: 'https://wa.me/6281280826143',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Phone,
      title: 'Telepon',
      value: '(021) 55722971',
      link: 'tel:+622155722971',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'Dpu.ekspres@gmail.com',
      link: 'mailto:Dpu.ekspres@gmail.com',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      value: '24 Jam Setiap Hari',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section id="kontak" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Siap melayani Anda 24 jam. Hubungi kami untuk konsultasi gratis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <Card 
              key={contact.title}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
              style={{ animationDuration: '700ms', animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`h-14 w-14 rounded-lg ${contact.bgColor} flex items-center justify-center mb-4`}>
                  <contact.icon className={`h-7 w-7 ${contact.color}`} />
                </div>
                <CardTitle className="text-lg">{contact.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {contact.link ? (
                  <a 
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground font-medium">{contact.value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="animate-in fade-in slide-in-from-left" style={{ animationDuration: '700ms', animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Alamat Kantor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tangerang, Banten, Indonesia
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/6281280826143', '_blank')}
                >
                  <SiWhatsapp className="mr-2 h-5 w-5" />
                  Chat via WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => window.location.href = 'tel:+622155722971'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Telepon Sekarang
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-right" style={{ animationDuration: '700ms', animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Lokasi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=-6.159450,106.642404&hl=id&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi DARIN PET'S TRANSPORT"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
