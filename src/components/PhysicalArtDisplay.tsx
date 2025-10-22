import { CinematicImageGallery } from "./CinematicImageGallery";
import imgImage3 from "figma:asset/8dd8a71234a05e883e098c1a205a215f38d80f08.png";

export function PhysicalArtDisplay() {
  const images = [
    { src: imgImage3, alt: "Physical artpiece mood board" },
  ];

  return <CinematicImageGallery images={images} />;
}
