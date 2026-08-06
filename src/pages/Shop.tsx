import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Leaf, SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/data/products";
import riceField from "@/assets/rice-field.jpg";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/services/operations/productAPI";
import { PageLoader } from "@/components/PageLoader";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const productTypes = ["All", "Plates", "Bowls", "Section Plates", "Cups", "Cutlery", "ComboPack"];
const sortOptions = ["Price: Low to High", "Price: High to Low"];

export default function ShopPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();

    // Handle deep linking from categories
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      // Find matching type from productTypes
      const matched = productTypes.find(t => t.toLowerCase() === categoryParam.toLowerCase());
      if (matched) {
        setSelectedType(matched);
      }
    }
  }, [location.search]);

  const filteredAndSorted = useMemo(() => {
    let result = products.filter((p) => {
      const category = p.category || p.type || "";
      if (selectedType !== "All" && category.toLowerCase() !== selectedType.toLowerCase()) return false;
      const price = p.sizesAvailable?.[0]?.price ?? p.productPrice ?? p.price ?? 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      return true;
    });

    // Sorting
    result.sort((a, b) => {
      const isACutlery = (a.category || a.type || "").toLowerCase() === "cutlery";
      const isBCutlery = (b.category || b.type || "").toLowerCase() === "cutlery";

      // If one is cutlery and the other isn't, cutlery moves to the end
      if (isACutlery && !isBCutlery) return 1;
      if (!isACutlery && isBCutlery) return -1;

      // If both are same (both cutlery or both NOT cutlery), sort by price
      const priceA = a.sizesAvailable?.[0]?.price ?? a.productPrice ?? a.price ?? 0;
      const priceB = b.sizesAvailable?.[0]?.price ?? b.productPrice ?? b.price ?? 0;

      if (sortBy === "Price: Low to High") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    return result;
  }, [products, selectedType, priceRange, sortBy]);

  const hasActiveFilters = selectedType !== "All" || priceRange[1] < 500;

  const clearFilters = () => {
    setSelectedType("All");
    setPriceRange([0, 500]);
  };

  const filterControls = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 font-lora">{t("shop.productType")}</h3>
        <div className="space-y-2">
          {productTypes.filter((pt) => pt !== "All").map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={selectedType === type}
                onChange={() => setSelectedType(selectedType === type ? "All" : type)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              {t(`shop.types.${type}`)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 font-lora">{t("shop.priceRange")}</h3>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}+</span>
        </div>
      </div>

      <div className="bg-eco-light rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-eco" />
          <span className="text-sm font-semibold">{t("shop.compostablePromise")}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("shop.compostableDesc")}
        </p>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Header */}
      <div className="container mx-auto px-6 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-normal font-lora mb-2 sm:border-l-4 sm:border-orange-500 sm:pl-4">{t("shop.title")}</h1>
      </div>

      {/* Shop Content */}
      <section>
        <div className="container mx-auto px-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t("shop.filters")}
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">{t("shop.sortBy")}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "Price: Low to High" ? t("shop.sortLowHigh") : t("shop.sortHighLow")}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-56 shrink-0">
              {filterControls}
            </aside>

            {/* Mobile / Tablet Filters Sheet */}
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetContent side="left" className="w-[85%] max-w-sm overflow-y-auto">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="font-lora">{t("shop.filters")}</SheetTitle>
                  <SheetDescription>
                    {t("shop.filterDesc")}
                  </SheetDescription>
                </SheetHeader>
                {filterControls}
                <div className="mt-8 flex gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted/50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      {t("shop.clear")}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {t("shop.showResults", { value: filteredAndSorted.length })}
                  </button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Product Grid */}
            <div className="flex-1 p-2">
              {loading ? (
                <PageLoader message={t("shop.loadingProducts")} />
              ) : filteredAndSorted.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSorted.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                  <Leaf className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                  <h3 className="text-xl font-normal font-lora mb-2">{t("shop.noMatches")}</h3>
                  <p className="text-muted-foreground text-[12px] max-w-xs mx-auto">
                    {t("shop.noMatchesDesc")}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-6 text-sm font-semibold text-primary hover:underline transition-all"
                  >
                    {t("shop.clearAll")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Tracker Banner */}
      <section className="bg-secondary py-16 mt-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-4">{t("shop.impactTracker")}</span>
              <h2 className="text-3xl font-bold font-lora   mb-3">{t("shop.impactTitle")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("shop.impactDesc")}
              </p>
              <Link to="/impact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                {t("shop.impactCta")} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={riceField} alt="Rice field impact" className="w-full h-80 md:h-[450px] object-cover rounded-2xl" />
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl">
                <span className="text-lg font-bold">1.2M+</span>
                <p className="text-[10px]">{t("shop.kgsUpcycled")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
