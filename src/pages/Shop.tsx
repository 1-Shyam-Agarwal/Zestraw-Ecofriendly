import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Grid, List, ChevronDown, ShoppingCart, ChevronRight, Leaf } from "lucide-react";
import { products, Product } from "@/data/products";
import { getProductImageSrc } from "@/lib/images";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import riceField from "@/assets/rice-field.jpg";

const productTypes = ["All", "Plates", "Bowls", "Trays", "Combo Packs", "Cutlery"];
const orderTypes = ["Retail", "Bulk / Wholesale"];
const sizes = ["Small", "Medium", "Large", "XL", "Party Pack"];
const sortOptions = ["Newest Arrivals", "Price: Low to High", "Price: High to Low", "Best Selling"];

export default function ShopPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState("Retail");
  const [priceRange, setPriceRange] = useState([1, 150]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered = products.filter((p) => {
    if (selectedType !== "All" && p.type !== selectedType) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast({ title: "Added to cart!", description: `${product.name} has been added.` });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Conscious Catalog</h1>
          <p className="text-muted-foreground max-w-xl">
            Discover tableware crafted from premium rice straw—the sustainable alternative to single-use plastics. From intimate dinners to high-volume events, find the perfect piece for your purpose.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" /> Refine Selection
              <span className="ml-4">Showing 1-{filtered.length} of {products.length} items</span>
              <div className="flex items-center gap-1 ml-4">
                <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-accent" : ""}`}><Grid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-accent" : ""}`}><List className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-56 shrink-0 space-y-6">
              {/* Product Type */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                  Product Type <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {productTypes.filter(t => t !== "All").map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(selectedType === type ? "All" : type)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Type */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                  Order Type <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {orderTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="orderType"
                        checked={selectedOrder === type}
                        onChange={() => setSelectedOrder(type)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                  Price Range <ChevronDown className="w-4 h-4" />
                </h3>
                <input
                  type="range"
                  min={1}
                  max={150}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                  Dimensions <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        selectedSizes.includes(size) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compostable Promise */}
              <div className="bg-eco-light rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-eco" />
                  <span className="text-sm font-semibold">Compostable Promise</span>
                </div>
                <p className="text-xs text-muted-foreground">Every item in our shop is guaranteed 100% biodegradable and chemical-free.</p>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} gap-6`}>
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-square overflow-hidden">
                        {product.badge && (
                          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">{product.badge}</span>
                        )}
                        {product.ecoScore && (
                          <span className="absolute top-3 right-3 z-10 px-2 py-0.5 bg-eco text-eco-foreground text-[10px] font-bold rounded-full flex items-center gap-1">
                            <Leaf className="w-2.5 h-2.5" /> {product.ecoScore}
                          </span>
                        )}
                        <img
                          src={getProductImageSrc(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                          <span>{product.category}</span>
                          {product.size && <span>{product.size}</span>}
                        </div>
                        <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-base font-bold">${product.price.toFixed(2)}</span>
                          <span className="text-xs text-muted-foreground">Bulk: ${product.bulkPrice.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-10">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-muted-foreground">...</span>
                <button className="w-8 h-8 rounded-lg text-sm font-medium hover:bg-accent">8</button>
              </div>
              <div className="text-center mt-4">
                <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mx-auto">
                  Load More Products <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Tracker Banner */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-4">IMPACT TRACKER</span>
              <h2 className="text-3xl font-bold mb-3">Making Every Meal Count</h2>
              <p className="text-muted-foreground mb-6">
                Switching from plastic to Zestraw saves an average of 1.2kg of CO2 per event. Track your cumulative impact in your dashboard after every purchase.
              </p>
              <Link to="/impact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                See Our Impact Metrics <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={riceField} alt="Rice field impact" className="w-full h-64 object-cover rounded-2xl" />
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl">
                <span className="text-lg font-bold">1.2M+</span>
                <p className="text-[10px]">KGS OF RICE STRAW UPCYCLED</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
