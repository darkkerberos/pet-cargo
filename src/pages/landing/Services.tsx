import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Plane, Globe, FileCheck, Dog, Cat, Bird, Bug, 
  CheckCircle2, ArrowRight, ArrowLeft, Send, MapPin, PawPrint, User, Users 
} from 'lucide-react';
import { showAlert} from '@/lib/swal2'
import axios from 'axios'

const Services = () => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    i18n.addResourceBundle('en', 'translation', {
      "Keunggulan Layanan Kami": "Our Expertise",
      "Layanan Profesional Kami": "Our Professional Services",
      "Isi Form Pengiriman": "Fill Shipping Form",
      "Langkah": "Step",
      "dari": "of",
      "Kembali": "Back",
      "Lanjut": "Next",
      "Kirim Form": "Submit Form",
      "Mengirim...": "Sending...",
      "Detail Rute": "Route Details",
      "Detail Hewan": "Pet Details",
      "Owner Information": "Owner Information",
      "Recipients Information": "Recipients Information",
      "Jenis Hewan Yang Kami Tangani": "Types of Animals We Handle",
      "Anjing": "Dog", "Kucing": "Cat", "Burung": "Bird", "Reptil": "Reptile",
      "Jangkauan Pengiriman Luas": "Wide Shipping Coverage",
      "Melayani pengiriman door-to-door ke berbagai kota besar dan mancanegara": "Serving door-to-door delivery to various major cities and abroad",
      "Seluruh Indonesia": "All over Indonesia",
      "Form Terkirim!": "Form Submitted!",
      "Terima kasih telah mengisi detail pengiriman. Tim Darin Pet's akan segera memproses data Anda dan menghubungi Anda via email/WhatsApp.": "Thank you for filling out the shipping details. Darin Pet's team will process your data and contact you via email/WhatsApp shortly.",
      "Tutup": "Close",
      "Laki-laki": "Male",
      "Perempuan": "Female",
      "Kargo Domestik": "Cargo Domestic", "Kargo Internasional": "Cargo International", "Pengurusan Bea Cukai": "Customs Clearance",
      "Jemput": "Pickup", "Antar": "Dropoff","Pesawat Terbang": "Airplane"
    }, true, true);
  }, [i18n]);

  // Form State
  const [formData, setFormData] = useState({
    origin: '', destination: '', serviceType: t('Kargo Domestik'), handling: t('Jemput'), transport: t('Pesawat Terbang'),
    petName: '', petDob: '', petColor: '', petSex: t('Laki-laki'), weight: '', microchip: '', breed: '', crateDim: '',
    ownerName: '', ownerSex: t('Laki-laki'), ownerEmail: '', ownerPhone: '', originAddress: '',
    receiverName: '', receiverSex: t('Laki-laki'), receiverEmail: '', receiverPhone: '', destAddress: ''
  });

  const animalTypes = [
    { icon: Dog, name: t('Anjing'), color: 'bg-blue-100 text-blue-700' },
    { icon: Cat, name: t('Kucing'), color: 'bg-purple-100 text-purple-700' },
    { icon: Bird, name: t('Burung'), color: 'bg-emerald-100 text-emerald-700' },
    { icon: Bug, name: t('Reptil'), color: 'bg-orange-100 text-orange-700' }
  ];

  const serviceTypes = [
    { icon: Plane, title: t('Kargo Domestik'), color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Globe, title: t('Kargo Internasional'), color: 'text-[#00365c]', bg: 'bg-slate-100' },
    { icon: FileCheck, title: t('Pengurusan Bea Cukai'), color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const resetForm = () => {
    setFormData({
      origin: '', destination: '', serviceType: t('Kargo Domestik'), handling: t('Jemput'), transport: t('Pesawat Terbang'),
      petName: '', petDob: '', petColor: '', petSex: t('Laki-laki'), weight: '', microchip: '', breed: '', crateDim: '',
      ownerName: '', ownerSex: t('Laki-laki'), ownerEmail: '', ownerPhone: '', originAddress: '',
      receiverName: '', receiverSex: t('Laki-laki'), receiverEmail: '', receiverPhone: '', destAddress: ''
    });
    setStep(1);
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://darin-api.ddns.net';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVdS0yA22wesBnViyvCMfLcR5FRqWW_9GgMQENR3ezUmzeaNr2io7oaHX-P73Tvhjx/exec";
    
    
    try {
      const apiPayload = {
        owner_name: formData.ownerName,
        owner_gender: formData.ownerSex === t('Laki-laki') ? 'male' : 'female',
        owner_email: formData.ownerEmail,
        owner_phone: formData.ownerPhone,
        owner_address: formData.originAddress,

        services_type: "pet_transport", // Sesuaikan jika dinamis
        transport_mode: "airplane",
        handling_method: formData.handling === t('Jemput') ? 'pickup' : 'dropoff',

        recipient_name: formData.receiverName,
        recipient_gender: formData.receiverSex === t('Laki-laki') ? 'male' : 'female',
        recipient_email: formData.receiverEmail,
        recipient_phone: formData.receiverPhone,
        recipient_address: formData.destAddress,

        pet_name: formData.petName,
        pet_gender: formData.petSex === 'male' ? 'male' : 'female',
        pet_color: formData.petColor,
        pet_weight: parseFloat(formData.weight) || 0,
        pet_microchip: formData.microchip,
        pet_species: formData.breed,
        pet_dob: formData.petDob,

        crate_dimension: formData.crateDim,
        origin_city_or_airport: formData.origin,
        destination_city_or_airport: formData.destination
      };
      console.log("req:", apiPayload)
      const response = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(formData) });
      if (response.ok){
        showAlert({ 
        icon: 'success', title: "Updated", text:'User info updated', isSuccess: true, useTimer: true});
        const responseAPI = await axios.post(`${apiBaseUrl}/api/book-order`, apiPayload);
        if (responseAPI.status === 200 || responseAPI.status === 201) {
          resetForm();
        }
        setSubmitted(true);
      } 
      else showAlert({ title: "Send Form", text: "Error sending data.", icon: 'error', });
    } catch (error) {
      showAlert({ title: "Send Form", text: "Failed to connect to server.", icon: 'error', });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="layanan" className="py-28 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#00365c] font-bold tracking-[0.2em] uppercase text-sm mb-4">{t("Keunggulan Layanan Kami")}</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t("Layanan Profesional Kami")}</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {serviceTypes.map((service, index) => (
            <Dialog key={index} onOpenChange={() => { setStep(1); setSubmitted(false); }}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white">
                  <CardContent className="p-10">
                    <div className={`h-16 w-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-4">{service.title}</CardTitle>
                    <div className="flex items-center text-[#00365c] font-bold text-sm gap-2">
                      {t("Isi Form Pengiriman")} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="custom-scrollbar sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[2rem] p-0 border-none shadow-2xl">
                {!submitted ? (
                  <div className="flex flex-col">
                    <div className="bg-[#00365c] p-8 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <DialogTitle className="text-2xl font-black flex items-center gap-2">
                          <service.icon className="w-6 h-6 text-primary" /> {service.title}
                        </DialogTitle>
                        <p className="text-white/60 text-sm mt-1">{t("Langkah")} {step} {t("dari")} 4</p>
                      </div>
                      <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                      {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                          <div className="flex items-center gap-2 text-[#00365c] font-bold mb-4"><MapPin size={18}/> {t("Detail Rute")}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Origin City *" required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                            <Input placeholder="Destination City *" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                          </div>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                            <option value={t("Kargo Domestik")}>{t("Kargo Domestik")}</option>
                            <option value={t("Kargo Internasional")}>{t("Kargo Internasional")}</option>
                            <option value={t("Pengurusan Bea Cukai")}>{t("Pengurusan Bea Cukai")}</option>
                          </select>
                          <div className="grid grid-cols-2 gap-4">
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.handling} onChange={e => setFormData({...formData, handling: e.target.value})}>
                              <option value={t("Jemput")}>{t("Jemput")}</option>
                              <option value={t("Antar")}>{t("Antar")}</option>
                            </select>
                            <Input readOnly value={t("Pesawat Terbang")} className="bg-slate-100 font-medium" />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                          <div className="flex items-center gap-2 text-[#00365c] font-bold mb-4"><PawPrint size={18}/> {t("Detail Hewan")}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Pet's Name" value={formData.petName} onChange={e => setFormData({...formData, petName: e.target.value})} />
                            <Input type="date" placeholder="Date of Birth" value={formData.petDob} onChange={e => setFormData({...formData, petDob: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Color" value={formData.petColor} onChange={e => setFormData({...formData, petColor: e.target.value})} />
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.petSex} onChange={e => setFormData({...formData, petSex: e.target.value})}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Weight (kg)" type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                            <Input placeholder="Microchip Number" value={formData.microchip} onChange={e => setFormData({...formData, microchip: e.target.value})} />
                          </div>
                          <Input placeholder="Species / Breed, ex: Cat / Persia" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
                          <Input placeholder="Crate Dim: L x H x W (cms) ex: 10x20x30" value={formData.crateDim} onChange={e => setFormData({...formData, crateDim: e.target.value})} />
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                          <div className="flex items-center gap-2 text-[#00365c] font-bold mb-4"><User size={18}/> {t("Owner Information")}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Owner Name *" required value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.ownerSex} onChange={e => setFormData({...formData, ownerSex: e.target.value})}>
                              <option value={t("Laki-laki")}>{t("Laki-laki")}</option>
                              <option value={t("Perempuan")}>{t("Perempuan")}</option>
                            </select>
                          </div>
                          <Input type="email" placeholder="Email *" required value={formData.ownerEmail} onChange={e => setFormData({...formData, ownerEmail: e.target.value})} />
                          <Input placeholder="Phone Number *" required value={formData.ownerPhone} onChange={e => setFormData({...formData, ownerPhone: e.target.value})} />
                          <Textarea placeholder="Origin Address *" required value={formData.originAddress} onChange={e => setFormData({...formData, originAddress: e.target.value})} />
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
                          <div className="flex items-center gap-2 text-[#00365c] font-bold mb-4"><Users size={18}/> {t("Recipients Information")}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Recipient Name *" required value={formData.receiverName} onChange={e => setFormData({...formData, receiverName: e.target.value})} />
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.receiverSex} onChange={e => setFormData({...formData, receiverSex: e.target.value})}>
                              <option value={t("Laki-laki")}>{t("Laki-laki")}</option>
                              <option value={t("Perempuan")}>{t("Perempuan")}</option>
                            </select>
                          </div>
                          <Input type="email" placeholder="Email *" required value={formData.receiverEmail} onChange={e => setFormData({...formData, receiverEmail: e.target.value})} />
                          <Input placeholder="Phone Number *" required value={formData.receiverPhone} onChange={e => setFormData({...formData, receiverPhone: e.target.value})} />
                          <Textarea placeholder="Destination Address *" required value={formData.destAddress} onChange={e => setFormData({...formData, destAddress: e.target.value})} />
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        {step > 1 && (
                          <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl cursor-pointer" onClick={prevStep}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> {t("Kembali")}
                          </Button>
                        )}
                        {step < 4 ? (
                          <Button type="button" className="flex-1 h-12 bg-[#00365c] rounded-xl font-bold cursor-pointer" onClick={nextStep}>
                            {t("Lanjut")} <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button type="submit" disabled={isSubmitting} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold cursor-pointer">
                            {isSubmitting ? t("Mengirim...") : <><Send className="w-4 h-4 mr-2" /> {t("Kirim Form")}</>}
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center text-center px-8">
                    <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{t("Form Terkirim!")}</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">{t("Terima kasih telah mengisi detail pengiriman. Tim Darin Pet's akan segera memproses data Anda dan menghubungi Anda via email/WhatsApp.")}</p>
                    <Button onClick={() => setSubmitted(false)} className="bg-[#00365c] rounded-xl px-10 h-12 cursor-pointer">{t("Tutup")}</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mb-24">
          <h4 className="text-center font-bold text-slate-400 uppercase tracking-widest text-xs mb-10">{t("Jenis Hewan Yang Kami Tangani")}</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {animalTypes.map((animal, i) => (
              <div key={i} className="group flex flex-col items-center">
                <div className={`h-24 w-24 rounded-[2rem] ${animal.color} flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-2 duration-300 shadow-sm`}>
                  <animal.icon className="h-10 w-10" />
                </div>
                <span className="font-bold text-slate-700">{animal.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="rounded-[3rem] border-none shadow-xl bg-[#00365c] overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-10">
                <h4 className="text-white text-2xl font-bold mb-2">{t("Jangkauan Pengiriman Luas")}</h4>
                <p className="text-white/60 text-sm">{t("Melayani pengiriman door-to-door ke berbagai kota besar dan mancanegara")}</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Jakarta', 'Tangerang', 'Surabaya', 'Bali', 'Medan', 'Makassar', 'Batam', 'Singapura', 'Malaysia', 'Australia', 'Eropa'].map((city) => (
                  <span key={city} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full transition-colors cursor-default border border-white/10">
                    {city}
                  </span>
                ))}
                <span className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-full">{t("Seluruh Indonesia")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;