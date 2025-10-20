import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Search, Loader2, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showCurrentLocation?: boolean;
}

interface Location {
  name: string;
  area: string;
  type: 'landmark' | 'mall' | 'hospital' | 'university' | 'hotel' | 'airport' | 'residential';
}

const popularLocations: Location[] = [
  // Lusaka locations
  { name: "Kenneth Kaunda International Airport", area: "Lusaka", type: "airport" },
  { name: "Manda Hill Shopping Mall", area: "Lusaka", type: "mall" },
  { name: "East Park Mall", area: "Lusaka", type: "mall" },
  { name: "Levy Mwanawasa Hospital", area: "Lusaka", type: "hospital" },
  { name: "University of Zambia", area: "Lusaka", type: "university" },
  { name: "Intercontinental Hotel", area: "Lusaka", type: "hotel" },
  { name: "New Life Medical Centre", area: "Libala Stage 1", type: "hospital" },
  { name: "Interland", area: "Burma Road", type: "mall" },
  { name: "Ridgeway Campus", area: "Civic Centre", type: "university" },
  { name: "Ibex Hill", area: "Lusaka", type: "residential" },
  { name: "Woodlands", area: "Chindo Road", type: "residential" },
  { name: "Zcas University", area: "Civic Centre", type: "university" },
  { name: "Pinnacle Mall", area: "Woodlands", type: "mall" },
  { name: "Crossroads Mall", area: "Great East Road", type: "mall" },
  { name: "Arcades Shopping Mall", area: "Great East Road", type: "mall" },
  { name: "Lusaka City Market", area: "City Centre", type: "landmark" },
  { name: "Freedom Park", area: "Freedom Way", type: "landmark" },
  { name: "Cairo Road", area: "City Centre", type: "landmark" },
  { name: "Chilenje", area: "Lusaka", type: "residential" },
  { name: "Kabulonga", area: "Lusaka", type: "residential" },
  { name: "Roma", area: "Lusaka", type: "residential" },
  { name: "Avondale", area: "Lusaka", type: "residential" },
  { name: "Olympia", area: "Lusaka", type: "residential" },
  { name: "Chelstone", area: "Lusaka", type: "residential" },
  { name: "Garden Compound", area: "Lusaka", type: "residential" },
  { name: "Matero", area: "Lusaka", type: "residential" },
  { name: "Ng'ombe", area: "Lusaka", type: "residential" },
  { name: "Kalingalinga", area: "Lusaka", type: "residential" },
  { name: "Chawama", area: "Lusaka", type: "residential" },
];

const LocationAutocomplete = ({ 
  value, 
  onChange, 
  placeholder = "Search locations", 
  className,
  showCurrentLocation = false 
}: LocationAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback((term: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setIsLoading(true);
    
    debounceTimeoutRef.current = setTimeout(() => {
      if (term.length > 0) {
        const filtered = popularLocations.filter(location =>
          location.name.toLowerCase().includes(term.toLowerCase()) ||
          location.area.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredLocations(filtered.slice(0, 8)); // Limit to 8 results
      } else {
        setFilteredLocations(popularLocations.slice(0, 6)); // Show top 6 when empty
      }
      setIsLoading(false);
    }, 300); // 300ms debounce delay
  }, []);

  useEffect(() => {
    debouncedSearch(searchTerm);
    
    // Cleanup timeout on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm, debouncedSearch]);

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

  const handleLocationSelect = (location: Location) => {
    setSearchTerm(location.name);
    onChange(location.name);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleCurrentLocation = () => {
    setSearchTerm("Current Location");
    onChange("Current Location");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'landmark':
        return '🏛️';
      case 'mall':
        return '🛍️';
      case 'hospital':
        return '🏥';
      case 'university':
        return '🎓';
      case 'hotel':
        return '🏨';
      case 'airport':
        return '✈️';
      case 'residential':
        return '🏘️';
      default:
        return '📍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'landmark':
        return 'Landmark';
      case 'mall':
        return 'Shopping Mall';
      case 'hospital':
        return 'Hospital';
      case 'university':
        return 'University';
      case 'hotel':
        return 'Hotel';
      case 'airport':
        return 'Airport';
      case 'residential':
        return 'Residential Area';
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
          aria-label="Location"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="h-auto border-0 bg-transparent px-0 text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          placeholder={placeholder}
        />
        {isLoading ? (
          <Loader2 className="size-4 text-primary animate-spin" />
        ) : isOpen ? (
          <Search className="size-4 text-muted-foreground" />
        ) : null}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto transition-all duration-200 ease-in-out">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="size-6 text-primary animate-spin mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Searching locations...</div>
            </div>
          ) : (
            <div className="p-2">
              {showCurrentLocation && (
                <>
                  <button
                    onClick={handleCurrentLocation}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-blue-50 transition-all duration-150 text-left transform hover:scale-[1.02] border-b border-gray-100"
                  >
                    <Navigation className="text-lg text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-blue-600">
                        Use Current Location
                      </div>
                      <div className="text-xs text-blue-500">
                        GPS • Automatic detection
                      </div>
                    </div>
                  </button>
                </>
              )}
              
              {searchTerm.length === 0 && (
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Popular Locations
                </div>
              )}
              
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition-all duration-150 text-left transform hover:scale-[1.02]"
                  >
                    <span className="text-lg">{getTypeIcon(location.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">
                        {location.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {getTypeLabel(location.type)} • {location.area}
                      </div>
                    </div>
                  </button>
                ))
              ) : searchTerm.length > 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No locations found for "{searchTerm}"
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;