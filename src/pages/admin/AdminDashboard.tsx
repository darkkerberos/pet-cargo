import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  LogOut,
  User,
  Image as ImageIcon,
  FileText,
  ChevronRight,
  Menu,
  LayoutDashboard,
} from 'lucide-react'
import { toast } from 'sonner'

// Sub-pages
import AdminProfile from '@/pages/admin/AdminProfile'
import BookOrder from '@/pages/admin/BookOrder'
import Gallery from '@/pages/admin/Gallery'
import UserPage from '@/pages/admin/Users'
import { motion, AnimatePresence } from 'framer-motion';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // Warna aksen OKLCH yang tadi
  const accentColor = "oklch(0.62 0.15 265.19)";

  // ===============================
  // TOKEN CHECK
  // ===============================
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return Date.now() >= payload.exp * 1000
    } catch { return true }
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('authToken')
      toast.error('Sesi Berakhir', { description: 'Silakan login kembali.' })
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    toast.success('Berhasil Logout')
    navigate('/login')
  }

  const menuItems = [
    { id: 'profile', label: 'Pengaturan Profil', icon: User },
    { id: 'gallery', label: 'Galeri Foto', icon: ImageIcon },
    { id: 'orders', label: 'Pesanan Masuk', icon: FileText },
    
    // { id: 'users', label: 'Daftar Pengguna', icon: Users },
    
  ]

  return (
    <div className="flex min-h-screen bg-[#fcfdfe] text-slate-900 font-sans">
      
      {/* OVERLAY (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#00365c] text-white shadow-[10px_0_40px_rgba(0,0,0,0.1)]
        transform transition-all duration-500 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        
        {/* Branding Area */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-4 group">
            <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-md group-hover:bg-white/20 transition-all duration-300">
                <img src="/assets/logo_pet_cargo.png" className="h-10 w-10 object-contain" alt="Logo" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter leading-none">DARIN <span className="text-blue-400">ADMIN</span></h1>
              <p className="text-[9px] text-blue-200/50 uppercase tracking-[0.2em] mt-1 font-bold">Workspace v1.0</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 space-y-1.5">
          <p className="px-4 text-[10px] font-black text-blue-200/30 uppercase tracking-[0.15em] mb-4">Main Navigation</p>
          
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-white text-[#00365c] shadow-[0_10px_20px_rgba(0,0,0,0.2)] scale-[1.02]' 
                    : 'text-blue-100/60 hover:bg-white/5 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-[#00365c]/5' : 'bg-transparent group-hover:bg-white/10'}`}>
                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-sm tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                    <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-[#00365c]" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-6 mt-auto">
          <div className="bg-white/5 rounded-3xl p-4 border border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl
                text-blue-100/60 hover:bg-rose-500 hover:text-white transition-all duration-300 group shadow-sm"
            >
              <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-bold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-20 lg:h-24 px-6 lg:px-12 flex items-center justify-between bg-white/50 backdrop-blur-xl border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all"
            >
              <Menu size={20} color="#00365c" />
            </button>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                System <ChevronRight size={10} />
                <span style={{ color: accentColor }}>
                  {menuItems.find((m) => m.id === activeTab)?.label}
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-[#00365c] tracking-tight">
                {menuItems.find((m) => m.id === activeTab)?.label}
              </h2>
            </div>
          </div>

          {/* User Status Badge */}
          <div className="flex items-center gap-4 bg-white p-1.5 pr-4 rounded-full border border-slate-100 shadow-sm">
             <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[#00365c] font-black text-xs border border-slate-200">
                AD
             </div>
             <div className="hidden md:block">
                <p className="text-[10px] font-bold text-slate-900 leading-none">Administrator</p>
                <p className="text-[9px] text-green-500 font-bold uppercase mt-0.5">Online</p>
             </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
          <div className="max-w-[1600px] mx-auto p-6 lg:p-12">
            {activeTab === 'profile' && <AdminProfile />}
            {activeTab === 'orders' && <BookOrder />}
            {activeTab === 'gallery' && <Gallery />}
            {activeTab === 'users' && <UserPage />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard