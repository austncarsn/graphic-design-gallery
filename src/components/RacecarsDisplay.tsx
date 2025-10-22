import { CinematicImageGallery } from "./CinematicImageGallery";
import imgRacecars1 from "figma:asset/2b3bc8d255d115ce220b89ca1bc68a518cb63598.png";
import imgRacecarPreview1 from "figma:asset/acf26e1e254888aa26e74dd33cc22e6916860891.png";
import imgRacecars2 from "figma:asset/c7de8122a55b660312598b7edda9a7efa9cdf860.png";

export function RacecarsDisplay() {
  const images = [
    { src: imgRacecarPreview1, alt: "Vintage racecar collection preview" },
    { src: imgRacecars1, alt: "Vintage racecar illustration 1" },
    { src: imgRacecars2, alt: "Vintage racecar illustration 2" },
  ];

  return <CinematicImageGallery images={images} />;
}
