import { useState } from "react";
import { Filter, X, ChevronDown, DollarSign, Star, Leaf, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface HotelFilterOptions {
  priceRanges: string[];
  ratings: string[];
  sustainabilityLevels: string[];
  amenities: string[];
}

interface HotelFiltersProps {
  filters: HotelFilterOptions;
  onFiltersChange: (filters: HotelFilterOptions) => void;
  availableSustainabilityLevels: string[];
  className?: string;
}

const priceRangeOptions = [
  "Budget ($100-300/night)",
  "Mid-range ($300-600/night)", 
  "Luxury ($600-900/night)",
  "Ultra-luxury ($900+/night)"
];

const ratingOptions = [
  "4.5+ Stars",
  "4.0+ Stars",
  "3.5+ Stars",
  "3.0+ Stars"
];

const amenityOptions = [
  "Spa & Wellness",
  "Private Pool",
  "Game Drives",
  "River Activities",
  "Cultural Experiences",
  "Photography Tours",
  "Fine Dining",
  "Airport Transfer",
  "Laundry Service",
  "WiFi"
];

const HotelFilters = ({ 
  filters, 
  onFiltersChange, 
  availableSustainabilityLevels, 
  className 
}: HotelFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (filterType: keyof HotelFilterOptions, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    
    if (checked) {
      newFilters[filterType] = [...newFilters[filterType], value];
    } else {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
    
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRanges: [],
      ratings: [],
      sustainabilityLevels: [],
      amenities: []
    });
  };

  const removeFilter = (filterType: keyof HotelFilterOptions, value: string) => {
    updateFilter(filterType, value, false);
  };

  const getTotalActiveFilters = () => {
    return filters.priceRanges.length + filters.ratings.length + 
           filters.sustainabilityLevels.length + filters.amenities.length;
  };

  const activeFiltersCount = getTotalActiveFilters();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Toggle and Active Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.priceRanges.map(price => (
            <Badge key={price} variant="secondary" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {price}
              <button
                onClick={() => removeFilter('priceRanges', price)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.ratings.map(rating => (
            <Badge key={rating} variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {rating}
              <button
                onClick={() => removeFilter('ratings', rating)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.sustainabilityLevels.map(level => (
            <Badge key={level} variant="secondary" className="flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              {level}
              <button
                onClick={() => removeFilter('sustainabilityLevels', level)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.amenities.map(amenity => (
            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              {amenity}
              <button
                onClick={() => removeFilter('amenities', amenity)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Expanded Filter Options */}
      {isExpanded && (
        <div className="grid gap-4 rounded-lg border border-border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {/* Price Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {priceRangeOptions.map(price => (
                <DropdownMenuCheckboxItem
                  key={price}
                  checked={filters.priceRanges.includes(price)}
                  onCheckedChange={(checked) => updateFilter('priceRanges', price, checked)}
                >
                  {price}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rating Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Rating
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ratingOptions.map(rating => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={(checked) => updateFilter('ratings', rating, checked)}
                >
                  {rating}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sustainability Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Sustainability
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sustainability Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableSustainabilityLevels.map(level => (
                <DropdownMenuCheckboxItem
                  key={level}
                  checked={filters.sustainabilityLevels.includes(level)}
                  onCheckedChange={(checked) => updateFilter('sustainabilityLevels', level, checked)}
                >
                  {level}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Amenities Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Amenities
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Amenities</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {amenityOptions.map(amenity => (
                <DropdownMenuCheckboxItem
                  key={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => updateFilter('amenities', amenity, checked)}
                >
                  {amenity}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default HotelFilters;