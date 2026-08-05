import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, MapPin, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import MarketplaceSidebar from "@/components/MarketplaceSidebar";
import { PageLoader } from "@/components/PageLoader";
import {
  formatListingPrice,
  type MarketplaceListing,
} from "@/data/marketplaceListings";
import {
  getMarketplaceListings,
  submitFarmerDetails,
} from "@/services/operations/marketplaceAPI";

const ITEMS_PER_PAGE = 6;

























const MarketPlace = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState([200]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [contactListing, setContactListing] = useState<MarketplaceListing | null>(null);

  const [farmerForm, setFarmerForm] = useState({
    farmerName: "",
    contactNumber: "",
    quantityTons: "",
    location: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const data = await getMarketplaceListings();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, []);

  const handleLocationChange = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedLocations([]);
    setCapacityRange([200]);
    setVerifiedOnly(false);
    setSearchQuery("");
    setSortBy("price-low");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedLocations.length > 0 ||
    verifiedOnly ||
    capacityRange[0] < 200 ||
    searchQuery.trim().length > 0;

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.company.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.state.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    if (selectedLocations.length > 0) {
      result = result.filter((item) => selectedLocations.includes(item.state));
    }

    if (verifiedOnly) {
      result = result.filter((item) => item.verified);
    }

    result = result.filter((item) => item.moq <= capacityRange[0]);

    result.sort((a, b) => {
      if (sortBy === "price-high") {
        return b.priceMax - a.priceMax;
      }
      if (sortBy === "latest") {
        return a.company.localeCompare(b.company);
      }
      return a.priceMin - b.priceMin;
    });

    return result;
  }, [
    listings,
    searchQuery,
    selectedLocations,
    verifiedOnly,
    capacityRange,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / ITEMS_PER_PAGE));
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !farmerForm.farmerName.trim() ||
      !farmerForm.contactNumber.trim() ||
      !farmerForm.quantityTons.trim() ||
      !farmerForm.location.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const quantity = Number(farmerForm.quantityTons);
    if (!quantity || quantity < 1) {
      toast.error("Quantity must be at least 1 ton.");
      return;
    }

    const phoneDigits = farmerForm.contactNumber.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      toast.error("Please enter a valid contact number.");
      return;
    }

    setSubmitting(true);
    const result = await submitFarmerDetails({
      farmerName: farmerForm.farmerName.trim(),
      contactNumber: farmerForm.contactNumber.trim(),
      quantityTons: quantity,
      location: farmerForm.location.trim(),
    });
    setSubmitting(false);

    if (result) {
      setFarmerForm({
        farmerName: "",
        contactNumber: "",
        quantityTons: "",
        location: "",
      });
    }
  };

  const sidebar = (
    <MarketplaceSidebar
      selectedLocations={selectedLocations}
      onLocationChange={handleLocationChange}
      capacityRange={capacityRange}
      onCapacityChange={(range) => {
        setCapacityRange(range);
        setCurrentPage(1);
      }}
      verifiedOnly={verifiedOnly}
      onVerifiedChange={(value) => {
        setVerifiedOnly(value);
        setCurrentPage(1);
      }}
      onReset={resetFilters}
    />
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-normal font-lora mb-2">
            Parali Marketplace
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Connect with verified buyers for rice straw (parali) and submit your
            crop residue for procurement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="hidden lg:block">{sidebar}</aside>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>

              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by company or location..."
                  className="pl-10 h-11"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-[180px] h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Name: A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low-High</SelectItem>
                  <SelectItem value="price-high">Price: High-Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {filteredListings.length} buyer
                {filteredListings.length === 1 ? "" : "s"} found
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <PageLoader message="Loading marketplace listings..." />
            ) : paginatedListings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                  {paginatedListings.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card rounded-xl border border-border p-5 flex flex-col h-full hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3 min-h-[3.25rem] mb-3">
                        <h4 className="text-lg font-semibold leading-tight line-clamp-2 flex-1">
                          {item.company}
                        </h4>
                        <div className="w-[76px] shrink-0 flex justify-end">
                          {item.verified ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
                              <ShieldCheck className="w-3 h-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-block h-[26px]" aria-hidden />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <p className="text-xs text-muted-foreground min-h-[1rem]">
                          {item.category}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground min-h-[1.25rem]">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span className="line-clamp-1">
                            {item.location}, {item.state}
                          </span>





























                        </div>

                        <p className="text-sm font-medium">
                          Price:{" "}
                          <span className="font-semibold">
                            {formatListingPrice(item)} / {item.priceUnit}
                          </span>
                        </p>















































                        <p className="text-sm font-medium">
                          MOQ:{" "}
                          <span className="font-semibold">
                            {item.moq} {item.unit}
                          </span>
                        </p>
                      </div>

                      <Button
                        className="w-full mt-5"
                        onClick={() => setContactListing(item)}
                      >
                        Contact Buyer
                      </Button>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination className="pt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((page) => Math.max(1, page - 1));
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((page) =>
                              Math.min(totalPages, page + 1)
                            );
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                <h3 className="text-xl font-normal font-lora mb-2">
                  No buyers match your filters
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                  Try adjusting your location, MOQ capacity, or search terms.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset filters
                </Button>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold font-lora">Sell Your Parali</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Farmers can fill this form to sell crop residue (parali). Our
                  team will reach out with the best buyer match.
                </p>
              </div>

              <form onSubmit={handleFarmerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Farmer Name</label>
                    <Input
                      placeholder="Enter your full name"
                      value={farmerForm.farmerName}
                      onChange={(e) =>
                        setFarmerForm((prev) => ({
                          ...prev,
                          farmerName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={farmerForm.contactNumber}
                      onChange={(e) =>
                        setFarmerForm((prev) => ({
                          ...prev,
                          contactNumber: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Quantity Available (in Tons)
                    </label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter quantity in tons"
                      value={farmerForm.quantityTons}
                      onChange={(e) =>
                        setFarmerForm((prev) => ({
                          ...prev,
                          quantityTons: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Location (Village / District / State)
                    </label>
                    <Input
                      placeholder="Enter your location"
                      value={farmerForm.location}
                      onChange={(e) =>
                        setFarmerForm((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>


                <div>
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Details"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-[85%] max-w-sm overflow-y-auto">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="font-lora">Filters</SheetTitle>
            <SheetDescription>
              Refine buyers by state, MOQ, and verification.
            </SheetDescription>
          </SheetHeader>
          {sidebar}
          <Button className="w-full mt-8" onClick={() => setFiltersOpen(false)}>
            Show {filteredListings.length} results
          </Button>
        </SheetContent>
      </Sheet>

      <Dialog
        open={!!contactListing}
        onOpenChange={(open) => !open && setContactListing(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-lora">
              {contactListing?.company}
            </DialogTitle>
            <DialogDescription>
              Reach out to discuss parali procurement and pricing.
            </DialogDescription>
          </DialogHeader>

          {contactListing && (
            <div className="space-y-4 text-sm">
              <div className="rounded-lg border border-border p-4 space-y-2">
                <p>
                  <span className="text-muted-foreground">Location:</span>{" "}
                  {contactListing.location}, {contactListing.state}
                </p>
                <p>
                  <span className="text-muted-foreground">Price:</span>{" "}
                  {formatListingPrice(contactListing)} / {contactListing.priceUnit}
                </p>
                <p>
                  <span className="text-muted-foreground">MOQ:</span>{" "}
                  {contactListing.moq} {contactListing.unit}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild>
                  <a href={`mailto:${contactListing.contactEmail}`}>
                    Email Buyer
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`tel:${contactListing.contactPhone.replace(/\s/g, "")}`}>
                    Call {contactListing.contactPhone}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketPlace;
