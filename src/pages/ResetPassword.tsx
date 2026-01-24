import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showAlert } from '@/lib/swal2'
import { Eye, EyeOff, Lock, User, ArrowRight, PawPrint } from "lucide-react";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7654";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isTokenExpired, setTokenExpired] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Ambil token dari URL: /#/reset-password?token=abc123...
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  let expiresStr = query.get('exp');
const expires = expiresStr ? parseInt(expiresStr, 10) : 0;
  useEffect(() => {
    if (!token) {
      setMessage({ type: 'error', text: 'Token tidak ditemukan atau tidak valid.' });
    }
    const checkTime = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const res = await axios.get('https://time.now/developer/api/timezone/Greenwich');
        const serverUtcUnix = res.data.unixtime;
        if (!expires || serverUtcUnix > expires) {
          setTokenExpired(true);
          showAlert({
            title: "Link Kedaluwarsa",
            text: "Waktu reset password sudah habis. Silakan minta link baru.",
            icon: 'warning',
            showConfirm: true,
            isSuccess: false,
            useTimer: false,
            targetPath: '/forgot-password',
            navigateFunc: navigate
          });
        }
      } catch (e) {
        console.log("Gagal ambil jam dunia, pakai jam lokal");
        const localUnix = Math.floor(Date.now() / 1000);
        if (expires && localUnix > expires) {
          setTokenExpired(true);
          showAlert({
            title: "Link Kedaluwarsa",
            text: "Waktu reset password sudah habis. Silakan minta link baru.",
            icon: 'warning',
            targetPath: '/forgot-password',
            navigateFunc: navigate
          });
        }
      }
    };
    checkTime();
  }, [token, expires, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return showAlert(
        {
          text: "'Konfirmasi password tidak cocok.'",
          title: "Gagal", icon: 'error', isSuccess: false
        });
    }
    if (isTokenExpired) {
      return showAlert({
        title: "Gagal",
        text: "Link sudah kedaluwarsa.",
        icon: 'error',
        targetPath: '/forgot-password',
        navigateFunc: navigate
      });
    }

    setLoading(true);
    try {
      await axios.post(apiBaseUrl + '/api/reset-password', {
        token: token,
        new_password: newPassword
      });

      showAlert({
        text: "Password kamu sudah diupdate.",
        title: "Berhasil", icon: 'success', isSuccess: true,
        targetPath: '/login',
        navigateFunc: navigate
      })

    } catch (err) {
      showAlert(
        {
          text: getErrorMessage(err),
          title: "Waduh!", icon: 'error', isSuccess: false
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="z-0 absolute top-10 left-10 text-slate-200 rotate-12">
        <PawPrint size={120} />
      </div>
      <div className="z-0 absolute bottom-10 right-10 text-slate-200 -rotate-12">
        <PawPrint size={150} />
      </div>
      <div className="z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Atur Ulang Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Masukkan password baru Anda di bawah ini.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          {message.text && (
            <div className={`mb-4 p-3 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleReset}>
            <div className="space-y-2">
            <div className="relative">  
              <label className="block text-sm font-medium text-gray-700">Password Baru</label>
              <input
                type={showNewPassword ? "text" : "password"}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="cursor-pointer absolute right-4 top-8 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer absolute right-4 top-8 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !token}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`}
              >
                {loading ? 'Memproses...' : 'Simpan Password Baru'}
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;