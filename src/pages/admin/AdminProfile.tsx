import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { 
  Loader2, Save, MapPin, Camera, Globe, Info, 
  Plus, Trash2, ChevronDown
} from 'lucide-react';
import { ProfileData, ContactItem } from '@/types/profile';
import MapPicker from '@/components/MapPicker';
import { isMap } from 'util/types';

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isMapChange, setMapChange] = useState(false);
  const [tempLatlong, setTempLatlong] = useState('');
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
      setTempLatlong(data.address_latlong)
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
      const body = JSON.stringify(profile)
      console.log(body)
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

  const handleChange = (field: keyof ProfileData, value: any) => {
    if (profile?.address_latlong) {
      setMapChange(true)
    }
    if (profile) setProfile({ ...profile, [field]: value });
  };

  // --- LOGIKA TABEL KONTAK ---
  const addContact = () => {
    if (!profile) return;
    const newContact: ContactItem = { type: 'whatsapp', label: '', value: '' };
    setProfile({ ...profile, contacts: [...profile.contacts, newContact] });
  };

  const removeContact = (index: number) => {
    if (!profile) return;
    const updatedContacts = profile.contacts.filter((_, i) => i !== index);
    setProfile({ ...profile, contacts: updatedContacts });
  };

  const updateContact = (index: number, field: keyof ContactItem, value: string) => {
    if (!profile) return;
    const updatedContacts = [...profile.contacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setProfile({ ...profile, contacts: updatedContacts });
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
    <div className="max-w-6xl animate-in fade-in duration-700 pb-20">
      {/* Header Tetap Sama */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-[#00365c] uppercase tracking-[0.2em] opacity-60">Konfigurasi Sistem</h2>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Profil Perusahaan</h1>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#00365c] hover:bg-[#002845] text-white px-8 h-12 rounded-2xl shadow-xl shadow-[#00365c]/20"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Branding (Logo & Info) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block text-center">Logo Perusahaan</Label>
              <div className="relative group mx-auto w-40 h-40 mb-6">
                <div className="w-full h-full rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {profile?.logo_url ? (
                    <img src={profile.logo_url} alt="Logo" className="w-full h-full object-contain p-4" />
                  ) : (
                    <Camera className="h-10 w-10 text-slate-300" />
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase ml-1">Nama Perusahaan</Label>
                  <Input 
                    value={profile?.name || ''} 
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-slate-50 border-none rounded-xl h-11 text-sm focus-visible:ring-1 focus-visible:ring-[#00365c]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase ml-1">Tagline</Label>
                  <Textarea 
                    value={profile?.tagline || ''} 
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="bg-slate-50 border-none rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-[#00365c] min-h-[80px] resize-none"
                  />
                </div>
              </div>
          </Card>
          
          <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/50">
            <div className="flex gap-3 text-blue-600 mb-2 font-bold uppercase text-[10px] tracking-widest"><Info size={14}/> Tips</div>
            <p className="text-[11px] text-blue-600/70 leading-relaxed">
              Gunakan tabel kontak untuk menambahkan banyak admin WhatsApp atau Email. Field ini akan otomatis terfilter di Landing Page.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Alamat & Tabel Kontak */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alamat Section */}
          <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
               <MapPin size={20} className="text-[#00365c]" /> Alamat & Maps
            </h3>
            <div className="space-y-4 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Alamat</Label>
              <Textarea 
                value={profile?.address || ''} 
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Alamat Lengkap..."
                className="bg-slate-50 border-none rounded-xl text-sm min-h-[80px]"
              />
              </div>
              <div className="space-y-1">
                   <Label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Koordinat (Lat, Long)</Label>
                   <Input 
                    value={profile?.address_latlong || ''} 
                    onChange={(e) => handleChange('address_latlong', e.target.value)}
                    className="bg-slate-50 border-none rounded-xl h-10 text-xs"
                    placeholder="-6.123, 106.123"
                  />
                  { isMapChange ? <span className='text-[10px] font-light text-slate-400 ml-1'>Latlong awal: { tempLatlong }</span>: ''}
                  
                </div>
                <div className="md:col-span-2 h-[250px] w-full bg-slate-200 overflow-hidden">
                  <MapPicker 
                    value={profile?.address_latlong || ''} 
                    onChange={(newVal) => handleChange('address_latlong', newVal)} 
                  />
                    {/* <iframe
                      src={`https://www.google.com/maps?q=${profile?.address_latlong}&hl=id&z=16&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe> */}
                  </div>
            </div>
          </Card>

          {/* Tabel Kontak Section */}
          <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Daftar Kontak Informasi</h3>
              <Button 
                onClick={addContact}
                variant="outline" 
                className="rounded-xl border-dashed border-2 text-[#00365c] hover:bg-slate-50 gap-2 h-9 text-xs font-bold"
              >
                <Plus size={16} /> Tambah Kontak
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase tracking-widest">
                    <th className="px-4 pb-2">Tipe</th>
                    <th className="px-4 pb-2">Label (Nama Admin)</th>
                    <th className="px-4 pb-2">Nilai (No/Email)</th>
                    <th className="px-4 pb-2 w-10"></th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {profile?.contacts.map((contact, index) => (
                    <tr key={index} className="group animate-in slide-in-from-top-1 duration-300">
                      <td className="px-2">
                        <select 
                          value={['whatsapp', 'telephone', 'email', 'instagram'].includes(contact.type) ? contact.type : 'other'}
                          onChange={(e) => updateContact(index, 'type', e.target.value === 'other' ? '' : e.target.value)}
                          className="w-full h-11 bg-slate-50 border-none rounded-xl text-sm px-3 focus:ring-1 focus:ring-[#00365c] appearance-none"
                        >
                          <option value="whatsapp">WhatsApp</option>
                          <option value="telephone">Telepon</option>
                          <option value="email">Email</option>
                          <option value="instagram">Instagram</option>
                          <option value="other">Lainnya...</option>
                        </select>
                        {/* Munculkan input manual jika 'other' atau type tidak ada di list standar */}
                        {!['whatsapp', 'telephone', 'email', 'instagram'].includes(contact.type) && (
                          <Input 
                            value={contact.type}
                            onChange={(e) => updateContact(index, 'type', e.target.value)}
                            placeholder="Ketik tipe..."
                            className="mt-2 h-8 text-[10px] bg-white border-slate-200 rounded-lg"
                          />
                        )}
                      </td>
                      <td className="px-2">
                        <Input 
                          value={contact.label}
                          onChange={(e) => updateContact(index, 'label', e.target.value)}
                          placeholder="Misal: Admin Support"
                          className="h-11 bg-slate-50 border-none rounded-xl text-sm"
                        />
                      </td>
                      <td className="px-2">
                        <Input 
                          value={contact.value}
                          onChange={(e) => updateContact(index, 'value', e.target.value)}
                          placeholder="No telp / email..."
                          className="h-11 bg-slate-50 border-none rounded-xl text-sm"
                        />
                      </td>
                      <td className="px-2 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeContact(index)}
                          className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {profile?.contacts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-slate-400 text-sm italic">
                        Belum ada kontak. Klik "Tambah Kontak" untuk memulai.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;