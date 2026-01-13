import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react'
import { SiWhatsapp } from 'react-icons/si';

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSendWhatsApp = () => {
    const text = `Hai, Darin Pet's Transport, saya mau relokasi hewan.\n\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`
    const url = `https://wa.me/6281280826143?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* KIRI - INFO & MAP */}
          <Card>
            <CardHeader>
              <CardTitle>Kontak Langsung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <SiWhatsapp className="text-green-600 h-5 w-5" />
                <a
                  rel='noopener noreferrer'
                  href="https://wa.me/6281280826143"
                  target="_blank"
                  className="hover:text-primary"
                >
                  0812-8082-6143
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-600 h-5 w-5" />
                <a href="tel:+622155722971" className="hover:text-primary">
                  (021) 55722971
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-purple-600 h-5 w-5" />
                <a
                  href="mailto:Dpu.ekspres@gmail.com"
                  className="hover:text-primary"
                >
                  Dpu.ekspres@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-red-600 h-5 w-5 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Komplek Taman Adhiloka Blok A No. 9, Karangsari – Neglasari,
                  Tangerang – Banten
                </p>
              </div>

              <div className="pt-4">
                <div className="relative w-full h-[260px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=-6.159450,106.642404&hl=id&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Darin Pet's Transport"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KANAN - FORM */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan Relokasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Pesan / Kebutuhan Relokasi
                </label>
                <textarea
                  className="w-full mt-1 px-3 py-2 border rounded-md min-h-[120px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Contoh: Relokasi kucing dari Jakarta ke Bali"
                />
              </div>

              <Button
                size="lg"
                className="w-full flex gap-2"
                onClick={handleSendWhatsApp}
              >
                <SiWhatsapp className="h-5 w-5" />
                Kirim via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact