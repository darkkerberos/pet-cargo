import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PawPrint } from 'lucide-react';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:7654";


  // Re-use fungsi alert biar konsisten
  const customAlert = (
    isSuccess: boolean, 
    title: string, 
    text: string, 
    targetPath?: string) => {
    Swal.fire({
      icon: isSuccess ? 'success' : 'error',
      title: title,
      text: text,
      showConfirmButton: !isSuccess,
      timer: isSuccess ? 1500 : undefined,
      timerProgressBar: isSuccess,
    }).then(() => {
      if (isSuccess && targetPath) {
        navigate(targetPath);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Menembak endpoint Go yang kamu buat tadi
      await axios.post(apiBaseUrl+`/api/request-reset-password`, {
        email: email
      });

      customAlert(
        true,
        'Email Terkirim!',
        'Silakan cek kotak masuk email Anda (termasuk folder spam) untuk instruksi reset password.',
        '/login'
      );
    } catch (err) {
    //   const errorMsg = err.response?.data?.message || 'Gagal mengirim permintaan reset password.';
      customAlert(false, 'Gagal', getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="z-0 absolute top-10 left-10 text-slate-200 rotate-12">
        <PawPrint size={120} />
      </div>
      <div className="z-0 absolute bottom-10 right-10 text-slate-200 -rotate-12">
        <PawPrint size={150} />
      </div>
      <div className="z-10 sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Kamu bisa pasang logo Darin Pet di sini */}
        <h2 className="text-3xl font-extrabold text-gray-900">Lupa Password?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan link untuk mengatur ulang password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="contoh@email.com"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`z-10 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                } transition-all duration-200`}
              >
                {loading ? (
                  <span className="z-10 flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  'Kirim Instruksi Reset'
                )}
              </button>
            </div>
          </form>

          <div className="z-10 mt-6 text-center">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Kembali ke Halaman Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;