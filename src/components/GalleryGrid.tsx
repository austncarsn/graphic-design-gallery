import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface Artwork {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

interface GalleryGridProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

export function GalleryGrid({ artworks, onArtworkClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
      {artworks.map((artwork, index) => (
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group cursor-pointer"
          onClick={() => onArtworkClick(artwork)}
        >
          <div className="relative w-full min-h-[400px] overflow-hidden bg-card/50 rounded-sm flex items-center justify-center">
            <ImageWithFallback
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-primary-foreground text-xl font-display mb-1">{artwork.title}</h3>
              <p className="text-primary-foreground/80 text-sm text-elegant">{artwork.category}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <h4 className="text-foreground text-lg font-display tracking-tight">{artwork.title}</h4>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-elegant text-xs">{artwork.category}</span>
              <span className="text-xs">•</span>
              <span className="text-xs tabular-nums">{artwork.year}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}