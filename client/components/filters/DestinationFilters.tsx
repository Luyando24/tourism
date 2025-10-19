import { useState } from "react";
import { Filter, X, ChevronDown, MapPin, Calendar, DollarSign, Activity } from "lucide-react";
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

export interface FilterOptions {
  regions: string[];
  activities: string[];
  priceRanges: string[];
  seasons: string[];
}

interface DestinationFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableRegions: string[];
  className?: string;
}

const activityOptions = [
  "Wildlife Safari",
  "Walking Safari", 
  "Canoe Safari",
  "Cultural Tours",
  "Adventure Sports",
  "Photography",
  "Birdwatching",
  "Fishing",
  "Helicopter Tours",
  "White Water Rafting"
];

const priceRangeOptions = [
  "Budget ($50-150/day)",
  "Mid-range ($150-300/day)", 
  "Luxury ($300-500/day)",
  "Ultra-luxury ($500+/day)"
];

const seasonOptions = [
  "Dry Season (May-Oct)",
  "Green Season (Nov-Apr)",
  "Peak Season (Jun-Sep)",
  "Shoulder Season (Apr-May, Oct-Nov)"
];

const DestinationFilters = ({ 
  filters, 
  onFiltersChange, 
  availableRegions, 
  className 
}: DestinationFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (filterType: keyof FilterOptions, value: string, checked: boolean) => {
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
      regions: [],
      activities: [],
      priceRanges: [],
      seasons: []
    });
  };

  const removeFilter = (filterType: keyof FilterOptions, value: string) => {
    updateFilter(filterType, value, false);
  };

  const getTotalActiveFilters = () => {
    return filters.regions.length + filters.activities.length + 
           filters.priceRanges.length + filters.seasons.length;
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
          {filters.regions.map(region => (
            <Badge key={region} variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {region}
              <button
                onClick={() => removeFilter('regions', region)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.activities.map(activity => (
            <Badge key={activity} variant="secondary" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              {activity}
              <button
                onClick={() => removeFilter('activities', activity)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
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
          {filters.seasons.map(season => (
            <Badge key={season} variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {season}
              <button
                onClick={() => removeFilter('seasons', season)}
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
          {/* Region Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Region
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Regions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableRegions.map(region => (
                <DropdownMenuCheckboxItem
                  key={region}
                  checked={filters.regions.includes(region)}
                  onCheckedChange={(checked) => updateFilter('regions', region, checked)}
                >
                  {region}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Activity Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Activities
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Activities</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {activityOptions.map(activity => (
                <DropdownMenuCheckboxItem
                  key={activity}
                  checked={filters.activities.includes(activity)}
                  onCheckedChange={(checked) => updateFilter('activities', activity, checked)}
                >
                  {activity}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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

          {/* Season Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Best Season
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Season</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {seasonOptions.map(season => (
                <DropdownMenuCheckboxItem
                  key={season}
                  checked={filters.seasons.includes(season)}
                  onCheckedChange={(checked) => updateFilter('seasons', season, checked)}
                >
                  {season}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default DestinationFilters;