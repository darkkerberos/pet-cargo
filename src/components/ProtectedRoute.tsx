import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '@/lib/utils/auth';
import { toast } from 'sonner';

const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('authToken');
    // Munculkan pesan hanya jika tokennya memang ada tapi basi
    if (token) {
        toast.error('Sesi Berakhir', { description: 'Silakan login kembali.' });
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;