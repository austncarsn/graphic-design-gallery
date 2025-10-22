import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
  src: string;
  alt: string;
}

interface CinematicImageGalleryProps {
  images: ImageItem[];
  title?: string;
  description?: string;
  category?: string;
  year?: string;
}

export function CinematicImageGallery({
  images,
  title,
  description,
  category,
  year,
}: CinematicImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullPreview, setIsFullPreview] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullPreview || selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullPreview, selectedIndex, images.length]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setIsFullPreview(true);
  };

  const handleClose = () => {
    setIsFullPreview(false);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="w-full bg-[#F5F3EE] p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Metadata */}
          {(title || description) && (
            <div className="mb-8 md:mb-12 space-y-4">
              {category && (
                <p className="text-elegant text-xs text-muted-foreground uppercase tracking-wider">
                  {category}
                </p>
              )}
              {title && (
                <h3 className="text-display text-3xl md:text-4xl text-foreground tracking-tight">
                  {title}
                </h3>
              )}
              {year && (
                <p className="text-muted-foreground tabular-nums">{year}</p>
              )}
              {description && (
                <p className="text-foreground/70 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Dynamic Grid: 2x2 on desktop, 1 column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] bg-card rounded-sm overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-200"
                onClick={() => handleThumbnailClick(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {isFullPreview && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Glassmorphic backdrop with vignette */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
            </div>

            {/* Content */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 md:right-8 md:top-8 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-110"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
                <span className="sr-only">Close</span>
              </button>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 md:left-8 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    <span className="sr-only">Previous image</span>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 md:right-8 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-110 md:mr-20"
                  >
                    <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    <span className="sr-only">Next image</span>
                  </button>
                </>
              )}

              {/* Image with crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
                >
                  <img
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-white text-sm tabular-nums">
                    {selectedIndex + 1} / {images.length}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
