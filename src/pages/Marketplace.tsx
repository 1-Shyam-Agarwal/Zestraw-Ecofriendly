import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
} from "@/components/ui/pagination";

import { Search, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const marketplaceData = [
    {
        id: 1,
        company: "ZESTRAW (Hoshiarpur)",
        location: "Hoshiarpur, Punjab",
        moq: "100 Tons",
        price: "₹2,000",
    },
    {
        id: 2,
        company: "ZESTRAW (Palwal)",
        location: "Palwal, Haryana",
        moq: "50 Tons",
        price: "₹2,200",
    },
    {
        id: 3,
        company: "ZESTRAW (Bihar)",
        location: "Bihar, Bihar",
        moq: "50 Tons",
        price: "₹1,900",
    },
];

const MarketPlace = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                {t("marketplace.location")}
                            </h3>
                            <div className="space-y-3">
                                {["Punjab", "Haryana"].map((loc) => (
                                    <div key={loc} className="flex items-center space-x-2">
                                        <Checkbox id={loc} />
                                        <label htmlFor={loc} className="text-sm font-medium">
                                            {loc}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="space-y-6">

                        {/* Search and Sort */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t("marketplace.searchPlaceholder")}
                                    className="pl-10 h-11"
                                />
                            </div>

                            <Select defaultValue="latest">
                                <SelectTrigger className="w-full md:w-[150px] h-11">
                                    <SelectValue placeholder={t("marketplace.sortBy")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">{t("marketplace.latest")}</SelectItem>
                                    <SelectItem value="price-low">{t("marketplace.priceLowHigh")}</SelectItem>
                                    <SelectItem value="price-high">{t("marketplace.priceHighLow")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {marketplaceData.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-card rounded-xl border border-border p-5 space-y-4 hover:shadow-md transition-all duration-300"
                                >
                                    {/* Company */}
                                    <h4 className="text-lg font-semibold">
                                        {item.company}
                                    </h4>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span>{item.location}</span>
                                    </div>

                                    {/* Price */}
                                    <p className="text-sm font-medium">
                                        {t("marketplace.priceLabel")} <span className="font-semibold">{item.price} {t("marketplace.perTon")}</span>
                                    </p>

                                    {/* MOQ */}
                                    <p className="text-sm font-medium">
                                        {t("marketplace.moqLabel")} <span className="font-semibold">{item.moq}</span>
                                    </p>

                                    {/* Contact Button */}
                                    <Button className="w-full mt-2">
                                        {t("marketplace.contactBuyer")}
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Farmer Sell Form */}
                        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-semibold">
                                {t("marketplace.sellParali")}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {t("marketplace.sellParaliDesc")}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Farmer Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {t("marketplace.farmerName")}
                                    </label>
                                    <Input placeholder={t("marketplace.farmerNamePlaceholder")} />
                                </div>

                                {/* Contact Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {t("marketplace.contactNumber")}
                                    </label>
                                    <Input type="tel" placeholder={t("marketplace.contactNumberPlaceholder")} />
                                </div>

                                {/* Quantity Available */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {t("marketplace.quantityAvailable")}
                                    </label>
                                    <Input type="number" placeholder={t("marketplace.quantityPlaceholder")} />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {t("marketplace.locationField")}
                                    </label>
                                    <Input placeholder={t("marketplace.locationPlaceholder")} />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <Button className="w-full md:w-auto">
                                    {t("marketplace.submitDetails")}
                                </Button>
                            </div>
                        </div>


                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MarketPlace;
