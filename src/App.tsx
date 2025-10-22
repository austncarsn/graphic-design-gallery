import { useState } from "react";
import { GalleryGrid } from "./components/GalleryGrid";
import { ArtworkModal } from "./components/ArtworkModal";
import { Button } from "./components/ui/button";
import { RacecarsDisplay } from "./components/RacecarsDisplay";
import { PhysicalArtDisplay } from "./components/PhysicalArtDisplay";
import { SportsCarDisplay } from "./components/SportsCarDisplay";
import imgRacecarPreview1 from "figma:asset/acf26e1e254888aa26e74dd33cc22e6916860891.png";
import imgPhysicalArt from "figma:asset/8dd8a71234a05e883e098c1a205a215f38d80f08.png";
import imgSportsCar from "figma:asset/5f587a9e35ecba1bd3a0c487a838e620be0fe805.png";

interface Artwork {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description?: string;
  customComponent?: React.ComponentType;
}

const artworks: Artwork[] = [
  {
    id: "1",
    title: "Velocity",
    category: "Illustration",
    year: "2025",
    imageUrl: imgRacecarPreview1,
    description: "A minimalist interpretation of speed and motion through geometric forms and bold color choices.",
    customComponent: RacecarsDisplay,
  },
  {
    id: "2",
    title: "Abstract Sculpture",
    category: "Physical Art",
    year: "2025",
    imageUrl: imgPhysicalArt,
    description: "An abstract sculpture created from recycled materials, showcasing the beauty of repurposed objects.",
    customComponent: PhysicalArtDisplay,
  },
  {
    id: "3",
    title: "Speedster",
    category: "Illustration",
    year: "2025",
    imageUrl: imgSportsCar,
    description: "A sleek and modern sports car design, emphasizing aerodynamics and performance.",
    customComponent: SportsCarDisplay,
  },
];

const categories = ["All", "Illustration", "Physical Art"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredArtworks = selectedCategory === "All" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtwork(null), 300);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/30 bg-background">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
              {/* Main heading */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-elegant text-xs text-muted-foreground font-medium">
                    Visual Design & Creative Direction
                  </span>
                  <h1 className="text-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] tracking-tight">
                    Design<br />Portfolio
                  </h1>
                </div>
                <p className="text-foreground/70 max-w-lg text-lg leading-relaxed">
                  A curated collection of graphic design works exploring form, color, and visual storytelling.
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex md:flex-col gap-8 md:gap-6 items-start md:items-end">
                <div className="text-left md:text-right">
                  <div className="text-4xl md:text-5xl text-display text-foreground tabular-nums">
                    {filteredArtworks.length}
                  </div>
                  <div className="text-elegant text-xs text-muted-foreground mt-1.5">
                    Selected Works
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-4xl md:text-5xl text-display text-foreground">
                    {new Date().getFullYear()}
                  </div>
                  <div className="text-elegant text-xs text-muted-foreground mt-1.5">
                    Collection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap transition-all ${
                  selectedCategory === category 
                    ? "bg-foreground text-background hover:bg-foreground/90" 
                    : "bg-transparent border-border/50 text-foreground hover:bg-foreground/5"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="container mx-auto px-6 py-12 md:py-16">
        <GalleryGrid artworks={filteredArtworks} onArtworkClick={handleArtworkClick} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2025 Design Portfolio. All rights reserved.</p>
            <div className="flex gap-6 text-muted-foreground text-sm">
              <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="hover:text-foreground transition-colors">Behance</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Artwork Modal */}
      <ArtworkModal 
        artwork={selectedArtwork} 
        open={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}