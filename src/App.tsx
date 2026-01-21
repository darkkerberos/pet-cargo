
import Header from './pages/landing/Header';
import Hero from './pages/landing/Hero';
import About from './pages/landing/About';
import Services from './pages/landing/Services';
import Procedure from './pages/landing/Procedure';
import Advantages from './pages/landing/Advantages';
import Contact from './pages/landing/Contact';
import Testimonials from './pages/landing/Testimonials';
import Footer from './pages/landing/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import { Toaster } from "@/components/ui/sonner"
import Gallery from './pages/landing/LandingGallery';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';

const LandingPage = () => {
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
      <Header />
      <main>
        <section id="beranda"><Hero /></section>
        <section id="tentang"><About /></section>
        <section id="layanan"><Services /></section>
        <section id="prosedur"><Procedure /></section>
        <section id="keunggulan"><Advantages /></section>
        <section id="testimoni"><Testimonials /></section>
        <section id="kontak"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

const GalleryPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Gallery />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

const basename = import.meta.env.MODE === 'production' ? '/pet-cargo' : '';

function App() {
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <Routes>
        
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
