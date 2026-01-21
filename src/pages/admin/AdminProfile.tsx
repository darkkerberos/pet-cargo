import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { 
  Loader2, Save, User, MapPin, Mail, 
  Phone, Instagram, Camera, Globe, Info 
} from 'lucide-react';

interface ProfileData {
  id: number;
  name: string;
  tagline: string;
  address: string;
  address_latlong: string;
  email: string;
  telephone: string;
  whatsapp: string;
  instagram_url: string;
  logo_url: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7654';

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/profile`);
      if (!response.ok) throw new Error('Gagal mengambil data profil');
      const data: ProfileData = await response.json();
      setProfile(data);
    } catch (err) {
      toast.error("Error", { description: err instanceof Error ? err.message : 'Terjadi kesalahan' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${apiBaseUrl}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error('Gagal memperbarui profil');
      toast.success("Sukses", { description: "Profil berhasil diperbarui!" });
    } catch (err) {
      toast.error("Gagal", { description: err instanceof Error ? err.message : 'Terjadi kesalahan' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    if (profile) setProfile({ ...profile, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#00365c]" />
        <p className="text-slate-400 font-medium text-sm animate-pulse">Memuat data profil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-sm font-bold text-[#00365c] uppercase tracking-[0.2em] mb-2">Konfigurasi Sistem</h2>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Profil Perusahaan</h1>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#00365c] hover:bg-[#002845] text-white px-8 h-12 rounded-2xl shadow-xl shadow-[#00365c]/20 transition-all hover:-translate-y-1 active:scale-95"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Logo & Branding */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block text-center">Logo Instansi</Label>
              
              <div className="relative group mx-auto w-40 h-40">
                <div className="w-full h-full rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#00365c]/30">
                  {profile?.logo_url ? (
                    <img src={profile.logo_url} alt="Logo" className="w-full h-full object-contain p-4" />
                  ) : (
                    <Camera className="h-10 w-10 text-slate-300" />
                  )}
                </div>
                <label htmlFor="logo-upload" className="absolute -bottom-2 -right-2 bg-white shadow-xl p-3 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors border border-slate-100">
                  <Camera size={20} className="text-[#00365c]" />
                  <input 
                    id="logo-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => handleChange('logo_url', ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              
              <div className="mt-8 space-y-4 text-center">
                <h3 className="font-bold text-lg text-slate-900 leading-tight">{profile?.name || 'Nama Perusahaan'}</h3>
                <p className="text-sm text-slate-400 italic">"{profile?.tagline || 'Tagline belum diatur'}"</p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/50">
            <div className="flex gap-3 text-blue-600 mb-2">
              <Info size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Tips</span>
            </div>
            <p className="text-xs text-blue-600/70 leading-relaxed">
              Data yang Anda ubah di sini akan langsung sinkron dengan informasi di Landing Page (Footer, Header, & Kontak).
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-8 space-y-8">
              
              {/* Branding Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nama Perusahaan</Label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <Input
                      value={profile?.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Tagline</Label>
                  <Input
                    value={profile?.tagline || ''}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium"
                  />
                </div>
              </div>

              {/* Contact Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Publik</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <Input
                      type="email"
                      value={profile?.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <Input
                      value={profile?.whatsapp || ''}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Socials & Other */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Instagram URL</Label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <Input
                      value={profile?.instagram_url || ''}
                      onChange={(e) => handleChange('instagram_url', e.target.value)}
                      className="pl-12 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nomor Telepon</Label>
                  <Input
                    value={profile?.telephone || ''}
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Alamat Kantor</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                    <Textarea
                      value={profile?.address || ''}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="pl-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium min-h-[100px]"
                      placeholder="Tulis alamat lengkap..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Koordinat (Lat, Long)</Label>
                  <Input
                    value={profile?.address_latlong || ''}
                    onChange={(e) => handleChange('address_latlong', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#00365c] font-medium text-xs"
                    placeholder="-6.1234, 106.1234"
                  />
                  <div className="h-[250px] w-full bg-slate-200">
                    <iframe
                      src={`https://www.google.com/maps?q=${profile?.address_latlong}&hl=id&z=16&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;