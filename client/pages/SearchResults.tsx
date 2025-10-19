import { useState, useMemo } from "react";
import { Search, MapPin, Calendar, Users, Filter, ChevronDown, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SectionHeading from "@/components/common/SectionHeading";
import DestinationCard from "@/components/cards/DestinationCard";
import HotelCard from "@/components/cards/HotelCard";
import DestinationFilters, { FilterOptions } from "@/components/filters/DestinationFilters";
import HotelFilters, { HotelFilterOptions } from "@/components/filters/HotelFilters";
import SortOptions, { SortOption } from "@/components/filters/SortOptions";
import { featuredDestinations, premiumStays } from "@/data/content";

type SearchCategory = 'all' | 'destinations' | 'hotels';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [destinationFilters, setDestinationFilters] = useState<FilterOptions>({
    regions: [],
    activities: [],
    priceRanges: [],
    seasons: []
  });
  const [hotelFilters, setHotelFilters] = useState<HotelFilterOptions>({
    priceRanges: [],
    ratings: [],
    sustainabilityLevels: [],
    amenities: []
  });
  const [sortBy, setSortBy] = useState("relevance");

  // Enhanced data with search-friendly properties
  const enhancedDestinations = featuredDestinations.map(dest => ({
    ...dest,
    type: 'destination' as const,
    searchTerms: [dest.name, dest.region, dest.summary, ...dest.highlights].join(' ').toLowerCase(),
    activities: dest.highlights.map(h => {
      if (h.includes('safari') || h.includes('game drive')) return 'Wildlife Safari';
      if (h.includes('canoe') || h.includes('cruise')) return 'Canoe Safari';
      if (h.includes('walking')) return 'Walking Safari';
      if (h.includes('helicopter') || h.includes('flight')) return 'Helicopter Tours';
      if (h.includes('village') || h.includes('ceremonies')) return 'Cultural Tours';
      if (h.includes('birding')) return 'Birdwatching';
      return 'Adventure Sports';
    }),
    priceRange: dest.rating >= 4.8 ? 'Luxury ($300-500/day)' : 'Mid-range ($150-300/day)',
    season: dest.travelSeason.includes('June') || dest.travelSeason.includes('July') ? 'Dry Season (May-Oct)' : 'Green Season (Nov-Apr)'
  }));

  const enhancedHotels = premiumStays.map(hotel => ({
    ...hotel,
    type: 'hotel' as const,
    searchTerms: [hotel.name, hotel.location, hotel.summary, hotel.sustainabilityLevel].join(' ').toLowerCase(),
    priceRange: (() => {
      const price = parseInt(hotel.pricePerNight.replace(/[$,]/g, ''));
      if (price >= 900) return 'Ultra-luxury ($900+/night)';
      if (price >= 600) return 'Luxury ($600-900/night)';
      if (price >= 300) return 'Mid-range ($300-600/night)';
      return 'Budget ($100-300/night)';
    })(),
    ratingCategory: (() => {
      if (hotel.rating >= 4.5) return '4.5+ Stars';
      if (hotel.rating >= 4.0) return '4.0+ Stars';
      if (hotel.rating >= 3.5) return '3.5+ Stars';
      return '3.0+ Stars';
    })(),
    amenities: [
      'Game Drives',
      'Fine Dining',
      'Spa & Wellness',
      hotel.location.includes('River') ? 'River Activities' : 'Cultural Experiences',
      'Airport Transfer',
      'WiFi'
    ]
  }));

  const allItems = [...enhancedDestinations, ...enhancedHotels];

  const availableRegions = Array.from(new Set(enhancedDestinations.map(d => d.region)));
  const availableSustainabilityLevels = Array.from(new Set(enhancedHotels.map(h => h.sustainabilityLevel)));

  const sortOptions: SortOption[] = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'name-asc', label: 'Name A-Z', direction: 'asc' },
    { value: 'name-desc', label: 'Name Z-A', direction: 'desc' },
    { value: 'rating-desc', label: 'Highest Rated', direction: 'desc' },
    { value: 'rating-asc', label: 'Lowest Rated', direction: 'asc' }
  ];

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = allItems;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.searchTerms.includes(query) || 
        item.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.type === activeCategory.slice(0, -1));
    }

    // Apply destination-specific filters
    const destinations = filtered.filter(item => item.type === 'destination');
    const hotels = filtered.filter(item => item.type === 'hotel');

    let filteredDestinations = destinations;
    if (destinationFilters.regions.length > 0) {
      filteredDestinations = filteredDestinations.filter(d => 
        destinationFilters.regions.includes((d as any).region)
      );
    }
    if (destinationFilters.activities.length > 0) {
      filteredDestinations = filteredDestinations.filter(d => 
        (d as any).activities.some((activity: string) => destinationFilters.activities.includes(activity))
      );
    }
    if (destinationFilters.priceRanges.length > 0) {
      filteredDestinations = filteredDestinations.filter(d => 
        destinationFilters.priceRanges.includes((d as any).priceRange)
      );
    }
    if (destinationFilters.seasons.length > 0) {
      filteredDestinations = filteredDestinations.filter(d => 
        destinationFilters.seasons.includes((d as any).season)
      );
    }

    // Apply hotel-specific filters
    let filteredHotels = hotels;
    if (hotelFilters.priceRanges.length > 0) {
      filteredHotels = filteredHotels.filter(h => 
        hotelFilters.priceRanges.includes((h as any).priceRange)
      );
    }
    if (hotelFilters.ratings.length > 0) {
      filteredHotels = filteredHotels.filter(h => 
        hotelFilters.ratings.includes((h as any).ratingCategory)
      );
    }
    if (hotelFilters.sustainabilityLevels.length > 0) {
      filteredHotels = filteredHotels.filter(h => 
        hotelFilters.sustainabilityLevels.includes((h as any).sustainabilityLevel)
      );
    }
    if (hotelFilters.amenities.length > 0) {
      filteredHotels = filteredHotels.filter(h => 
        hotelFilters.amenities.some(amenity => (h as any).amenities.includes(amenity))
      );
    }

    filtered = [...filteredDestinations, ...filteredHotels];

    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-desc':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'rating-asc':
        return [...filtered].sort((a, b) => a.rating - b.rating);
      case 'relevance':
      default:
        // Sort by type (destinations first) then by rating
        return [...filtered].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type === 'destination' ? -1 : 1;
          }
          return b.rating - a.rating;
        });
    }
  }, [allItems, searchQuery, activeCategory, destinationFilters, hotelFilters, sortBy]);

  const destinationResults = filteredAndSortedResults.filter(item => item.type === 'destination');
  const hotelResults = filteredAndSortedResults.filter(item => item.type === 'hotel');

  const clearAllFilters = () => {
    setDestinationFilters({ regions: [], activities: [], priceRanges: [], seasons: [] });
    setHotelFilters({ priceRanges: [], ratings: [], sustainabilityLevels: [], amenities: [] });
    setSearchQuery("");
    setActiveCategory('all');
    setSortBy('relevance');
  };

  return (
    <div className="bg-surface-soft min-h-screen">
      {/* Search Results Section */}
      <section className="relative z-10 px-4 py-8 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl mb-4">
              Search Results
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Discover the perfect destinations and accommodations for your Zambian adventure.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search destinations, hotels, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
          </div>
          {/* Category Tabs */}
          <div className="mb-8 flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Results', count: filteredAndSortedResults.length },
              { key: 'destinations', label: 'Destinations', count: destinationResults.length },
              { key: 'hotels', label: 'Hotels', count: hotelResults.length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as SearchCategory)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  activeCategory === key
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/30 bg-white text-foreground hover:border-primary/50"
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Unified Filters Row */}
          <div className="mb-8">
            <div className="grid gap-4 rounded-lg border border-border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-6">
              {/* Destination Filters - Always visible when relevant */}
              {(activeCategory === 'all' || activeCategory === 'destinations') && (
                <>
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
                          checked={destinationFilters.regions.includes(region)}
                          onCheckedChange={(checked) => {
                            const newRegions = checked 
                              ? [...destinationFilters.regions, region]
                              : destinationFilters.regions.filter(r => r !== region);
                            setDestinationFilters({...destinationFilters, regions: newRegions});
                          }}
                        >
                          {region}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Activities Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Activities
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Select Activities</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["Wildlife Safari", "Walking Safari", "Canoe Safari", "Cultural Tours", "Adventure Sports", "Photography", "Birdwatching", "Fishing", "Helicopter Tours", "White Water Rafting"].map(activity => (
                        <DropdownMenuCheckboxItem
                          key={activity}
                          checked={destinationFilters.activities.includes(activity)}
                          onCheckedChange={(checked) => {
                            const newActivities = checked 
                              ? [...destinationFilters.activities, activity]
                              : destinationFilters.activities.filter(a => a !== activity);
                            setDestinationFilters({...destinationFilters, activities: newActivities});
                          }}
                        >
                          {activity}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}

              {/* Hotel Filters - Always visible when relevant */}
              {(activeCategory === 'all' || activeCategory === 'hotels') && (
                <>
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
                      {["Budget ($50-150/night)", "Mid-range ($150-300/night)", "Luxury ($300-500/night)", "Ultra-luxury ($500+/night)"].map(price => (
                        <DropdownMenuCheckboxItem
                          key={price}
                          checked={hotelFilters.priceRanges.includes(price)}
                          onCheckedChange={(checked) => {
                            const newPrices = checked 
                              ? [...hotelFilters.priceRanges, price]
                              : hotelFilters.priceRanges.filter(p => p !== price);
                            setHotelFilters({...hotelFilters, priceRanges: newPrices});
                          }}
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
                      {["4+ Stars", "3+ Stars", "2+ Stars", "Any Rating"].map(rating => (
                        <DropdownMenuCheckboxItem
                          key={rating}
                          checked={hotelFilters.ratings.includes(rating)}
                          onCheckedChange={(checked) => {
                            const newRatings = checked 
                              ? [...hotelFilters.ratings, rating]
                              : hotelFilters.ratings.filter(r => r !== rating);
                            setHotelFilters({...hotelFilters, ratings: newRatings});
                          }}
                        >
                          {rating}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              
              {/* Sort Options */}
              <SortOptions
                options={sortOptions}
                value={sortBy}
                onValueChange={setSortBy}
              />
              
              {/* Clear Filters Button */}
              {(destinationFilters.regions.length > 0 || 
                destinationFilters.activities.length > 0 || 
                hotelFilters.priceRanges.length > 0 || 
                searchQuery.trim()) && (
                <Button variant="outline" onClick={clearAllFilters} className="whitespace-nowrap">
                  Clear all filters
                </Button>
              )}
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredAndSortedResults.length} result{filteredAndSortedResults.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Results Grid */}
          {filteredAndSortedResults.length > 0 ? (
            <div className="space-y-12">
              {/* Destinations Section */}
              {destinationResults.length > 0 && (activeCategory === 'all' || activeCategory === 'destinations') && (
                <div>
                  <h2 className="mb-6 text-2xl font-semibold">
                    Destinations ({destinationResults.length})
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {destinationResults.map((destination) => (
                      <DestinationCard key={destination.name} {...destination} />
                    ))}
                  </div>
                </div>
              )}

              {/* Hotels Section */}
              {hotelResults.length > 0 && (activeCategory === 'all' || activeCategory === 'hotels') && (
                <div>
                  <h2 className="mb-6 text-2xl font-semibold">
                    Hotels & Lodges ({hotelResults.length})
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {hotelResults.map((hotel) => (
                      <HotelCard key={hotel.name} {...hotel} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto max-w-md space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-semibold">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;