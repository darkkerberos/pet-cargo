export interface ContactItem {
    type: string;
    label: string;
    value: string;
  }
  
export interface ProfileData {
    id: number;
    name: string;
    tagline: string;
    address: string;
    address_latlong: string;
    email: string;
    telephone: string;
    whatsapp: string;
    logo_url: string;
    contacts: ContactItem[]; // Sesuai key di JSON kamu
  }

export const formatWhatsapp = (phone = ''): string => {
  const clean = phone.replace(/[^0-9]/g, '');

  if (clean.startsWith('0')) {
    return '62' + clean.slice(1);
  }

  if (clean.startsWith('62')) {
    return clean;
  }

  return clean;
};