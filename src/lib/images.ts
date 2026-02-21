import productPlates from "@/assets/product-plates.jpg";
import productBowls from "@/assets/product-bowls.jpg";
import productTray from "@/assets/product-tray.jpg";
import productCombo from "@/assets/product-combo.jpg";
import productCutlery from "@/assets/product-cutlery.jpg";
import productStraws from "@/assets/product-straws.jpg";

const imageMap: Record<string, string> = {
  plates: productPlates,
  bowls: productBowls,
  tray: productTray,
  combo: productCombo,
  cutlery: productCutlery,
  straws: productStraws,
};

export function getProductImageSrc(key: string): string {
  return imageMap[key] || productPlates;
}
