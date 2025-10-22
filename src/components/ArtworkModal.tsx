import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface Artwork {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description?: string;
  customComponent?: React.ComponentType;
}

interface ArtworkModalProps {
  artwork: Artwork | null;
  open: boolean;
  onClose: () => void;
}

export function ArtworkModal({ artwork, open, onClose }: ArtworkModalProps) {
  if (!artwork) return null;

  const CustomComponent = artwork.customComponent;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`p-0 bg-[#F5F3EE]/95 backdrop-blur-md border-border/30 overflow-hidden ${CustomComponent ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {/* Visually hidden for accessibility */}
        <DialogTitle className="sr-only">{artwork.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {artwork.description || `${artwork.category} artwork from ${artwork.year}`}
        </DialogDescription>
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-foreground/10 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-foreground/20 hover:scale-110"
        >
          <X className="h-5 w-5 text-foreground" />
          <span className="sr-only">Close</span>
        </button>
        
        {CustomComponent ? (
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="max-h-[80vh] overflow-y-auto">
              <CustomComponent />
            </div>
            <div className="p-8 md:p-12 bg-background/50 backdrop-blur-sm border-t border-border/30">
              <div className="space-y-6 max-w-3xl">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-elegant text-xs uppercase tracking-wider">
                    {artwork.category}
                  </p>
                  <h2 className="text-foreground text-display text-3xl md:text-5xl tracking-tight leading-tight">{artwork.title}</h2>
                  <p className="text-muted-foreground tabular-nums">{artwork.year}</p>
                </div>
                {artwork.description && (
                  <p className="text-foreground/70 leading-relaxed text-lg">
                    {artwork.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 gap-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative aspect-square md:aspect-auto bg-muted/30">
              <ImageWithFallback
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center bg-background/50 backdrop-blur-sm">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-elegant text-xs uppercase tracking-wider">
                      {artwork.category}
                    </p>
                    <h2 className="text-foreground text-display text-3xl md:text-4xl tracking-tight">{artwork.title}</h2>
                  </div>
                  <p className="text-muted-foreground tabular-nums">{artwork.year}</p>
                </div>
                {artwork.description && (
                  <p className="text-foreground/70 leading-relaxed text-lg">
                    {artwork.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}