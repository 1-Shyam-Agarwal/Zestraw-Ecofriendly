import { Supplier } from "@/data/suppliers";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle2, MapPin, Package, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SupplierCardProps {
    supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border group bg-card/50 backdrop-blur-sm">
            <CardHeader className="p-0">
                <div className="h-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative p-6">
                    <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-xl bg-white shadow-sm border border-border group-hover:scale-110 transition-transform duration-300`}>
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        {supplier.verified && (
                            <Badge variant="secondary" className="bg-eco-green/10 text-eco-green border-eco-green/20 gap-1 px-2 py-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 -mt-8 relative z-10">
                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{supplier.category}</p>
                        <h3 className="font-lora text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">{supplier.name}</h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{supplier.location}, {supplier.state}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">MOQ</p>
                            <p className="font-semibold text-sm">{supplier.moq} {supplier.unit}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Price Range</p>
                            <p className="font-semibold text-sm text-primary">₹{supplier.priceMin} - ₹{supplier.priceMax}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < Math.floor(supplier.sustainabilityRating / 20)
                                                ? "fill-primary text-primary"
                                                : "fill-muted text-muted"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-bold">{supplier.sustainabilityRating}/100</span>
                        </div>
                        <p className="text-[10px] font-medium text-muted-foreground italic">Sustainability Score</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
                <Button className="w-full gap-2 group/btn" variant="outline">
                    View Details
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SupplierCard;
