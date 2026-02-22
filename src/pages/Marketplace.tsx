import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, PackageSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SupplierCard from "@/components/SupplierCard";
import MarketplaceSidebar from "@/components/MarketplaceSidebar";
import { suppliers } from "@/data/suppliers";
import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const ITEMS_PER_PAGE = 6;

const Marketplace = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [capacityRange, setCapacityRange] = useState([0]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [page, setPage] = useState(1);

    const toggleLocation = (loc: string) => {
        setSelectedLocations((prev) =>
            prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
        );
        setPage(1);
    };

    const handleResetFilters = () => {
        setSelectedLocations([]);
        setCapacityRange([0]);
        setVerifiedOnly(false);
        setSearch("");
        setPage(1);
        setSortBy("latest");
    };

    const filtered = useMemo(() => {
        let result = [...suppliers];
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (s) =>
                    s.name.toLowerCase().includes(q) ||
                    s.category.toLowerCase().includes(q) ||
                    s.location.toLowerCase().includes(q)
            );
        }
        if (selectedLocations.length > 0) {
            result = result.filter((s) =>
                selectedLocations.some(
                    (loc) =>
                        s.state.toLowerCase().includes(loc.toLowerCase()) ||
                        s.location.toLowerCase().includes(loc.toLowerCase())
                )
            );
        }
        if (capacityRange[0] > 0) {
            result = result.filter((s) => s.moq >= capacityRange[0]);
        }
        if (verifiedOnly) {
            result = result.filter((s) => s.verified);
        }
        if (sortBy === "price-low") result.sort((a, b) => a.priceMin - b.priceMin);
        if (sortBy === "price-high") result.sort((a, b) => b.priceMin - a.priceMin);
        if (sortBy === "rating") result.sort((a, b) => b.sustainabilityRating - a.sustainabilityRating);
        return result;
    }, [search, selectedLocations, capacityRange, verifiedOnly, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <Layout>
            <div className="min-h-screen bg-background pb-20">
                {/* Hero Header */}
                <section className="bg-secondary relative py-16 overflow-hidden border-b border-border">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-4 border border-primary/20">
                            B2B Marketplace
                        </span>
                        <h1 className="font-lora text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Sustainability <span className="text-gradient-primary italic">Sourcing</span> Network
                        </h1>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Connect with verified industrial suppliers repurposing rice-straw to build a circular economy.
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
                        {/* Sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <MarketplaceSidebar
                                    selectedLocations={selectedLocations}
                                    onLocationChange={toggleLocation}
                                    capacityRange={capacityRange}
                                    onCapacityChange={(v) => { setCapacityRange(v); setPage(1); }}
                                    verifiedOnly={verifiedOnly}
                                    onVerifiedChange={(v) => { setVerifiedOnly(v); setPage(1); }}
                                    onReset={handleResetFilters}
                                />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 min-w-0">
                            {/* Search + Sort Bar */}
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-card p-4 rounded-2xl border border-border shadow-sm">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by company, location or industry..."
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                        className="pl-11 h-12 bg-background border-border rounded-xl focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-full md:w-44 h-12 rounded-xl bg-background border-border">
                                            <div className="flex items-center gap-2">
                                                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                                                <SelectValue placeholder="Sort By" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="latest">Recently Joined</SelectItem>
                                            <SelectItem value="rating">Highest Sustainability</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Mobile Filter Button */}
                                    <div className="lg:hidden">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline" className="h-12 w-12 rounded-xl p-0">
                                                    <SlidersHorizontal className="w-5 h-5" />
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                                                <SheetHeader className="text-left mb-6">
                                                    <SheetTitle className="font-lora text-2xl font-bold">Marketplace Filters</SheetTitle>
                                                    <SheetDescription>
                                                        Refine your supplier search parameters
                                                    </SheetDescription>
                                                </SheetHeader>
                                                <MarketplaceSidebar
                                                    selectedLocations={selectedLocations}
                                                    onLocationChange={toggleLocation}
                                                    capacityRange={capacityRange}
                                                    onCapacityChange={(v) => { setCapacityRange(v); setPage(1); }}
                                                    verifiedOnly={verifiedOnly}
                                                    onVerifiedChange={(v) => { setVerifiedOnly(v); setPage(1); }}
                                                    onReset={handleResetFilters}
                                                />
                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                </div>
                            </div>

                            {/* Status Info */}
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-sm text-muted-foreground font-medium">
                                    Showing <span className="text-foreground font-bold">{filtered.length}</span> Verified Suppliers
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
                                    <span className="text-[10px] font-bold text-eco-green uppercase tracking-widest">Pricing Updated Today</span>
                                </div>
                            </div>

                            {/* Grid */}
                            <AnimatePresence mode="popLayout">
                                {paged.length > 0 ? (
                                    <motion.div
                                        layout
                                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                    >
                                        {paged.map((s) => (
                                            <motion.div
                                                key={s.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <SupplierCard supplier={s} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-24 text-center"
                                    >
                                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                                            <PackageSearch className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-lora text-2xl font-bold mb-2">No Matching Suppliers</h3>
                                        <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                                            We couldn't find any suppliers matching your current filter criteria.
                                        </p>
                                        <Button onClick={handleResetFilters} variant="outline" className="rounded-full px-8">
                                            Clear All Filters
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-3 mt-16 pt-8 border-t border-border/50">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        className="rounded-xl h-10"
                                    >
                                        Previous
                                    </Button>
                                    <div className="flex items-center gap-1.5">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === i + 1
                                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-110"
                                                        : "bg-card text-muted-foreground hover:bg-muted"
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === totalPages}
                                        onClick={() => setPage(page + 1)}
                                        className="rounded-xl h-10"
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Marketplace;
