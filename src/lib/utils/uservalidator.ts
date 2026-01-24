export const validateUsername = (username: string) => {
  // Minimal 3 karakter, tidak boleh ada spasi, hanya huruf & angka
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!username) return "Username tidak boleh kosong";
  if (!regex.test(username)) return "Username minimal 3-20 karakter, tanpa spasi & simbol";
  return null;
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email tidak boleh kosong";
  if (!regex.test(email)) return "Format email tidak valid";
  return null;
};