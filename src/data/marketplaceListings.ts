export interface MarketplaceListing {
  id: string;
  company: string;
  category: string;
  verified: boolean;
  location: string;
  state: string;
  moq: number;
  unit: string;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  contactEmail: string;
  contactPhone: string;
}

export const marketplaceListingsFallback: MarketplaceListing[] = [
  {
    id: "zestraw-hoshiarpur",
    company: "ZESTRAW (Hoshiarpur)",
    category: "Zestraw Procurement",
    verified: true,
    location: "Hoshiarpur",
    state: "Punjab",
    moq: 100,
    unit: "Tons",
    priceMin: 2000,
    priceMax: 2000,
    priceUnit: "Ton",
    contactEmail: "procurement@zestraw.in",
    contactPhone: "+91 98765 43210",
  },
  {
    id: "zestraw-palwal",
    company: "ZESTRAW (Palwal)",
    category: "Zestraw Procurement",
    verified: true,
    location: "Palwal",
    state: "Haryana",
    moq: 50,
    unit: "Tons",
    priceMin: 2200,
    priceMax: 2200,
    priceUnit: "Ton",
    contactEmail: "procurement@zestraw.in",
    contactPhone: "+91 98765 43211",
  },
  {
    id: "zestraw-bihar",
    company: "ZESTRAW (Bihar)",
    category: "Zestraw Procurement",
    verified: true,
    location: "Bihar",
    state: "Bihar",
    moq: 50,
    unit: "Tons",
    priceMin: 1900,
    priceMax: 1900,
    priceUnit: "Ton",
    contactEmail: "procurement@zestraw.in",
    contactPhone: "+91 98765 43212",
  },
  {
    id: "greenpulse",
    company: "GreenPulse Bio-Energy",
    category: "Power Plant",
    verified: true,
    location: "Ludhiana",
    state: "Punjab",
    moq: 50,
    unit: "Tons",
    priceMin: 2400,
    priceMax: 2800,
    priceUnit: "Ton",
    contactEmail: "sourcing@greenpulse.in",
    contactPhone: "+91 98110 22001",
  },
  {
    id: "everleaf",
    company: "EverLeaf Paper Mills",
    category: "Paper Industry",
    verified: true,
    location: "Karnal",
    state: "Haryana",
    moq: 100,
    unit: "Tons",
    priceMin: 3000,
    priceMax: 3500,
    priceUnit: "Ton",
    contactEmail: "buyers@everleaf.in",
    contactPhone: "+91 98110 22002",
  },
  {
    id: "ecobrick",
    company: "Eco-Brick Solutions",
    category: "Construction",
    verified: false,
    location: "Meerut",
    state: "Uttar Pradesh",
    moq: 20,
    unit: "Tons",
    priceMin: 2000,
    priceMax: 2200,
    priceUnit: "Ton",
    contactEmail: "contact@ecobrick.in",
    contactPhone: "+91 98110 22003",
  },
  {
    id: "agrofuel",
    company: "AgroFuel Ltd.",
    category: "Ethanol Plant",
    verified: true,
    location: "Bikaner",
    state: "Rajasthan",
    moq: 200,
    unit: "Tons",
    priceMin: 2600,
    priceMax: 3100,
    priceUnit: "Ton",
    contactEmail: "procure@agrofuel.in",
    contactPhone: "+91 98110 22004",
  },
  {
    id: "sustainabox",
    company: "Sustaina-Box Co.",
    category: "Packaging",
    verified: true,
    location: "Ambala",
    state: "Haryana",
    moq: 10,
    unit: "Tons",
    priceMin: 3200,
    priceMax: 3600,
    priceUnit: "Ton",
    contactEmail: "hello@sustainabox.in",
    contactPhone: "+91 98110 22005",
  },
  {
    id: "bioharvest",
    company: "BioHarvest India",
    category: "Power Plant",
    verified: true,
    location: "Amritsar",
    state: "Punjab",
    moq: 75,
    unit: "Tons",
    priceMin: 2100,
    priceMax: 2500,
    priceUnit: "Ton",
    contactEmail: "team@bioharvest.in",
    contactPhone: "+91 98110 22006",
  },
];

export const formatListingPrice = (listing: MarketplaceListing) => {
  if (listing.priceMin === listing.priceMax) {
    return `₹${listing.priceMin.toLocaleString("en-IN")}`;
  }
  return `₹${listing.priceMin.toLocaleString("en-IN")} - ₹${listing.priceMax.toLocaleString("en-IN")}`;
};
