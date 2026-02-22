import { locations } from "@/data/suppliers";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketplaceSidebarProps {
    selectedLocations: string[];
    onLocationChange: (loc: string) => void;
    capacityRange: number[];
    onCapacityChange: (range: number[]) => void;
    verifiedOnly: boolean;
    onVerifiedChange: (verified: boolean) => void;
    onReset?: () => void;
}

const MarketplaceSidebar = ({
    selectedLocations,
    onLocationChange,
    capacityRange,
    onCapacityChange,
    verifiedOnly,
    onVerifiedChange,
    onReset,
}: MarketplaceSidebarProps) => {
    return (
        <div className="space-y-8 py-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <h3 className="font-lora font-bold text-lg">Filters</h3>
                </div>
                {onReset && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={onReset}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Locations */}
            <div className="space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sourcing States</p>
                <div className="space-y-3">
                    {locations.map((loc) => (
                        <div key={loc} className="flex items-center space-x-3 group py-0.5">
                            <Checkbox
                                id={`loc-${loc}`}
                                checked={selectedLocations.includes(loc)}
                                onCheckedChange={() => onLocationChange(loc)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                                htmlFor={`loc-${loc}`}
                                className="text-sm font-medium leading-none cursor-pointer group-hover:text-primary transition-colors py-1 flex-1"
                            >
                                {loc}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Capacity Range */}
            <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Min. MOQ Capacity</p>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{capacityRange[0]} Tons</span>
                </div>
                <div className="px-1">
                    <Slider
                        defaultValue={capacityRange}
                        max={200}
                        step={10}
                        onValueChange={onCapacityChange}
                        className="[&_[role=slider]]:bg-primary"
                    />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                    <span>0T</span>
                    <span>100T</span>
                    <span>200T</span>
                </div>
            </div>

            {/* Verified Only */}
            <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between bg-warm-cream/50 p-3 rounded-xl border border-border/50 shadow-sm">
                    <div className="space-y-0.5">
                        <p className="text-xs font-bold text-foreground">Verified Only</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">Zestraw Inspected</p>
                    </div>
                    <Switch
                        checked={verifiedOnly}
                        onCheckedChange={onVerifiedChange}
                        className="data-[state=checked]:bg-primary"
                    />
                </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Sustainable Note</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    "Verified suppliers have undergone a 14-point sustainability audit on parali collection and emission controls."
                </p>
            </div>
        </div>
    );
};

export default MarketplaceSidebar;
