import { useMemo, useState } from "react";
import { MapPin, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { featuredDestinations } from "@/data/content";
import DestinationCard from "@/components/cards/DestinationCard";
import DestinationFilters, { FilterOptions } from "@/components/filters/DestinationFilters";
import SortOptions, { SortOption } from "@/components/filters/SortOptions";

const Destinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filters, setFilters] = useState<FilterOptions>({
    regions: [],
    activities: [],
    priceRanges: [],
    seasons: []
  });
  const [sortBy, setSortBy] = useState("default");

  // Enhanced destinations data with additional properties for filtering
  const enhancedDestinations = featuredDestinations.map(dest => ({
    ...dest,
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

  const availableRegions = Array.from(new Set(enhancedDestinations.map(d => d.region)));

  const sortOptions: SortOption[] = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name A-Z', direction: 'asc' },
    { value: 'name-desc', label: 'Name Z-A', direction: 'desc' },
    { value: 'rating-desc', label: 'Highest Rated', direction: 'desc' },
    { value: 'rating-asc', label: 'Lowest Rated', direction: 'asc' }
  ];

  // Filter and sort destinations
  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = enhancedDestinations;

    // Apply region filter (legacy support)
    if (selectedRegion !== "all") {
      filtered = filtered.filter(d => d.region === selectedRegion);
    }

    // Apply advanced filters
    if (filters.regions.length > 0) {
      filtered = filtered.filter(d => filters.regions.includes(d.region));
    }
    
    if (filters.activities.length > 0) {
      filtered = filtered.filter(d => 
        d.activities.some(activity => filters.activities.includes(activity))
      );
    }
    
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(d => filters.priceRanges.includes(d.priceRange));
    }
    
    if (filters.seasons.length > 0) {
      filtered = filtered.filter(d => filters.seasons.includes(d.season));
    }

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
      default:
        return filtered;
    }
  }, [enhancedDestinations, selectedRegion, filters, sortBy]);

  const regions = Array.from(new Set(featuredDestinations.map((d) => d.region)));

  return (
    <div className="bg-surface-soft">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-8023e26305d7?auto=format&fit=crop&w=2000&q=80"
            alt="Zambia landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 lg:py-32">
          <div className="space-y-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/90">
              <Sparkles className="size-4" /> Explore Zambia
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Discover Zambia's Premier Destinations
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                From thundering waterfalls to untamed wilderness, explore the diverse landscapes and
                wildlife that make Zambia Africa's most authentic adventure destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section className="relative z-10 -mt-16 px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Advanced Filters and Sorting */}
          <div className="mb-8 space-y-6">
            <DestinationFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableRegions={availableRegions}
            />
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <SortOptions
                  options={sortOptions}
                  value={sortBy}
                  onValueChange={setSortBy}
                />
                <div className="text-sm text-muted-foreground">
                  {filteredAndSortedDestinations.length} destination{filteredAndSortedDestinations.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </div>

          {/* Legacy Region Filter (kept for backward compatibility) */}
          <div className="mb-12 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedRegion("all")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                selectedRegion === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/30 bg-white text-foreground hover:border-primary/50"
              }`}
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  selectedRegion === region
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/30 bg-white text-foreground hover:border-primary/50"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredAndSortedDestinations.length > 0 ? (
              filteredAndSortedDestinations.map((destination) => (
                <DestinationCard key={destination.name} {...destination} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto max-w-md space-y-4">
                  <div className="text-6xl">🔍</div>
                  <h3 className="text-xl font-semibold">No destinations found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria to find more destinations.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilters({ regions: [], activities: [], priceRanges: [], seasons: [] });
                      setSelectedRegion("all");
                      setSortBy("default");
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Regional Highlights Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Region Insights"
            title="Why Visit Each Region"
            description="Each corner of Zambia offers unique experiences shaped by local culture, wildlife, and landscapes."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                region: "Livingstone",
                highlights: [
                  "Home to Victoria Falls, one of the world's seven natural wonders",
                  "Adventure activities: bungee jumping, white-water rafting, helicopter tours",
                  "Cultural immersion in heritage townships",
                  "Best visited: May – August",
                ],
                image:
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
              },
              {
                region: "South Luangwa",
                highlights: [
                  "Birthplace of the walking safari tradition",
                  "Exceptional wildlife viewing with Big Five sightings",
                  "Intimate bush camps and authentic guide experiences",
                  "Best visited: June – September",
                ],
                image:
                  "https://images.unsplash.com/photo-1526481280695-3c4693f6adbc?auto=format&fit=crop&w=800&q=80",
              },
              {
                region: "Lower Zambezi",
                highlights: [
                  "Pristine canoe safari opportunities along the Zambezi River",
                  "Remote wilderness with minimal tourist footprint",
                  "Exceptional fishing and wildlife encounters",
                  "Best visited: April – October",
                ],
                image:
                  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
              },
              {
                region: "Western Province",
                highlights: [
                  "Liuwa Plain National Park and wildebeest migration spectacle",
                  "Authentic Lozi kingdom cultural experiences",
                  "Diverse birding paradise with over 400 species",
                  "Best visited: October – December",
                ],
                image:
                  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
              },
            ].map((item) => (
              <div
                key={item.region}
                className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:shadow-elevated"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.region}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="size-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{item.region}</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-1 inline-block size-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-center lg:p-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to explore Zambia?
          </h2>
          <p className="mt-4 text-base text-white/90">
            Our travel experts are here to craft your perfect itinerary, combining your favorite
            destinations with authentic experiences and world-class accommodations.
          </p>
          <button className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-primary transition hover:bg-white/90">
            Plan Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
