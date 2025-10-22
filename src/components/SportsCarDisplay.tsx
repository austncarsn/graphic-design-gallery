import { CinematicImageGallery } from "./CinematicImageGallery";
import img202510211829SleekSportsCarRemix01K84Hj56Mefpv29Qejsvjtwyr1 from "figma:asset/782b9228612966e75e831a7c37ed2068ac04fafa.png";
import imgImage4 from "figma:asset/5f587a9e35ecba1bd3a0c487a838e620be0fe805.png";
import img202510211843AddSideMirrorRemix01K84Jd5Zcf2B811D30Jx63M5W1 from "figma:asset/76951a0e8314420dfb88d9486ec4b4eca4501fad.png";
import img202510211845SleekCarModificationRemix01K84Jgt5Qe3Q8D0Ypk839W3121 from "figma:asset/a508e2f8e334f6b6688f7dbafbcd287f632ced77.png";

export function SportsCarDisplay() {
  const images = [
    { src: imgImage4, alt: "Sleek sports car with golden circular taillight" },
    { src: img202510211843AddSideMirrorRemix01K84Jd5Zcf2B811D30Jx63M5W1, alt: "Sports car with red LED taillights" },
    { src: img202510211829SleekSportsCarRemix01K84Hj56Mefpv29Qejsvjtwyr1, alt: "Sports car with amber LED light bar" },
    { src: img202510211845SleekCarModificationRemix01K84Jgt5Qe3Q8D0Ypk839W3121, alt: "Silver sports car on forest road" },
  ];

  return <CinematicImageGallery images={images} />;
}
