import { useState, useRef, useEffect } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface Destination {
  name: string;
  region: string;
  type: 'city' | 'park' | 'attraction' | 'region';
}

const popularDestinations: Destination[] = [
  { name: "Victoria Falls", region: "Southern Province", type: "attraction" },
  { name: "South Luangwa National Park", region: "Eastern Province", type: "park" },
  { name: "Lower Zambezi National Park", region: "Southern Province", type: "park" },
  { name: "Kafue National Park", region: "Central Province", type: "park" },
  { name: "Lusaka", region: "Lusaka Province", type: "city" },
  { name: "Livingstone", region: "Southern Province", type: "city" },
  { name: "Kasanka National Park", region: "Central Province", type: "park" },
  { name: "North Luangwa National Park", region: "Northern Province", type: "park" },
  { name: "Bangweulu Wetlands", region: "Northern Province", type: "attraction" },
  { name: "Liuwa Plain National Park", region: "Western Province", type: "park" },
  { name: "Mosi-oa-Tunya National Park", region: "Southern Province", type: "park" },
  { name: "Lochinvar National Park", region: "Southern Province", type: "park" },
  { name: "Blue Lagoon National Park", region: "Central Province", type: "park" },
  { name: "Sioma Ngwezi National Park", region: "Western Province", type: "park" },
  { name: "Mufumbwe", region: "North-Western Province", type: "city" },
];

const DestinationAutocomplete = ({ value, onChange, placeholder = "Search attractions, parks, cities", className }: DestinationAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = popularDestinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(filtered.slice(0, 8)); // Limit to 8 results
    } else {
      setFilteredDestinations(popularDestinations.slice(0, 6)); // Show top 6 when empty
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleDestinationSelect = (destination: Destination) => {
    setSearchTerm(destination.name);
    onChange(destination.name);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'city':
        return '🏙️';
      case 'park':
        return '🌳';
      case 'attraction':
        return '🎯';
      case 'region':
        return '🗺️';
      default:
        return '📍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'city':
        return 'City';
      case 'park':
        return 'National Park';
      case 'attraction':
        return 'Attraction';
      case 'region':
        return 'Region';
      default:
        return 'Location';
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20">
        <MapPin className="size-4 sm:size-5 text-primary flex-shrink-0" />
        <Input
          ref={inputRef}
          aria-label="Destination"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="h-auto border-0 bg-transparent px-0 text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          placeholder={placeholder}
        />
        {isOpen && (
          <Search className="size-4 text-muted-foreground" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {filteredDestinations.length > 0 ? (
            <div className="p-2">
              {searchTerm.length === 0 && (
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Popular Destinations
                </div>
              )}
              {filteredDestinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => handleDestinationSelect(destination)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-lg">{getTypeIcon(destination.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">
                      {destination.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {getTypeLabel(destination.type)} • {destination.region}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No destinations found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationAutocomplete;