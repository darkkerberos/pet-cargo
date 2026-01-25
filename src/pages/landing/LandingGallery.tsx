import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Asumsi pakai Shadcn
import { useTranslation } from "react-i18next";


const LandingGallery = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    i18n.addResourceBundle(
      "en",
      "translation",
      {
        "Galeri Kami": "Our Gallery",
        "Halaman": "Page",
        "dari": "of",
        "Belum ada media": "No media available",
        "Sepertinya gallery masih kosong. Silakan kembali lagi nanti untuk melihat koleksi terbaru kami.": 
        "It looks like the gallery is still empty. Please check back later to see our latest collection.",

      },
      true,
      true
    );
  }, [i18n]);

  const itemsPerPage = 10;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://darin-api.ddns.net';

  interface GalleryItem {
    id: number;
    title: string;
    thumbnail_url: string;
  }
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchGallery = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        apiBaseUrl + `/api/gallery/search?page=${page}&item_per_page=${itemsPerPage}`
      );
      const result = await response.json();

      // Update state berdasarkan struktur respon yang kamu kasih
      setData(result.data || []);
      setTotalRow(result.total_row || 0);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(currentPage);
    gridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  const totalPages = Math.ceil(totalRow / itemsPerPage);

  return (
    <section id="galeri" ref={gridRef} className="scroll-mt-24 pt-32 py-20 px-4 bg-[#0f1f36] dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[oklch(0.62_0.15_265.19)] mb-4 tracking-tight">{t('Galeri Kami')}</h2>
          <div className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : data.length > 0 ? (
          <>
            {/* Pagination Controls */}
            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full w-12 h-12 border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[oklch(0.62_0.15_265.19)]">{t('Halaman')} {currentPage}</span>
                <span className="text-sm text-slate-400">{t('dari')} {totalPages || 1}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full w-12 h-12 border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
            {/* Masonry Grid */}
            <div className="my-16 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {data.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-sm cursor-pointer"
                  onClick={() => setSelectedImg(item.thumbnail_url)}
                >
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <Maximize2 className="absolute top-4 right-4 text-white w-5 h-5" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full w-12 h-12 border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[oklch(0.62_0.15_265.19)]">{t('Halaman')} {currentPage}</span>
                <span className="text-sm text-slate-400">{t('dari')} {totalPages || 1}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer rounded-full w-12 h-12 border-slate-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ImageOff className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-[oklch(0.62_0.15_265.19)] mb-2">{t('Belum ada media')}</h3>
            <p className="text-slate-500 max-w-xs">
              {t('Sepertinya gallery masih kosong. Silakan kembali lagi nanti untuk melihat koleksi terbaru kami.')}
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal (Sama seperti sebelumnya) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImg}
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              loading='lazy'
            />
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LandingGallery;