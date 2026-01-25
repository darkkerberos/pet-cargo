
import Header from './pages/landing/Header';
import Hero from './pages/landing/Hero';
import About from './pages/landing/About';
import Services from './pages/landing/Services';
import Procedure from './pages/landing/Procedure';
import Advantages from './pages/landing/Advantages';
import Contact from './pages/landing/Contact';
import Testimonials from './pages/landing/Testimonials';
import Footer from './pages/landing/Footer';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import { Toaster } from "@/components/ui/sonner"
import Gallery from './pages/landing/LandingGallery';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import {ContactItem, ProfileData} from '@/types/profile'


const LandingPage = ({ profile } : { profile: ProfileData | null}) => {
  const location = useLocation();
  useEffect(() => {
    // Cek apakah ada kiriman instruksi scroll dari halaman lain
    if (location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      
      // Kasih sedikit delay agar browser selesai render LandingPage dulu
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const offset = 80;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);

      // Bersihkan state agar tidak scroll ulang saat refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header profile={profile} />
      <main>
        <section id="beranda"><Hero /></section>
        <section id="tentang"><About /></section>
        <section id="layanan"><Services /></section>
        <section id="prosedur"><Procedure /></section>
        <section id="keunggulan"><Advantages /></section>
        <section id="testimoni"><Testimonials /></section>
        <section id="kontak"><Contact profile={profile} /></section>
      </main>
      <Footer profile={profile} />
    </div>
  );
}

const GalleryPage = ({ profile } : { profile: ProfileData | null}) => {
  return (
    <div className="min-h-screen">
      <Header profile={profile} />
      <main>
        <Gallery />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

// const basename = import.meta.env.MODE === 'production' ? '/pet-cargo' : '';
const basename =  '';

function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://darin-api.ddns.net';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/profile`);
        const result = await response.json();
        setProfile(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, [apiBaseUrl]);

  
  return (
    <Router >
      <ScrollToTop />
      <Routes>
        
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage profile={profile} />} />
        <Route path="/gallery" element={<GalleryPage profile={profile} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* --- PROTECTED ROUTES --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Kalau ada halaman admin lain, tinggal taruh di sini */}
        </Route>
      </Routes>
      <Toaster theme="light" richColors closeButton />
    </Router>
  );
}

export default App;
