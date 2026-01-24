import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  exp: number; // Ini standar JWT (dalam detik)
  iat?: number;
  userId?: string; // Sesuaikan dengan isi payload kamu
  email?: string;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<MyTokenPayload>(token);
    
    // Jika tidak ada field exp, kita anggap expired demi keamanan
    if (!decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    
    // Return true jika waktu sekarang sudah melewati waktu expired
    return decoded.exp < currentTime;
  } catch (error) {
    // Jika token tidak bisa di-decode (format rusak), anggap expired
    return true;
  }
};