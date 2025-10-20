import { useState, useMemo } from "react";
import { Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import HotelCard from "@/components/cards/HotelCard";
import RatingStars from "@/components/common/RatingStars";
import HotelFilters, { HotelFilterOptions } from "@/components/filters/HotelFilters";
import SortOptions, { SortOption } from "@/components/filters/SortOptions";
import { premiumStays } from "@/data/content";

const Hotels = () => {
  const [selectedSustainability, setSelectedSustainability] = useState<string | null>(null);
  const [filters, setFilters] = useState<HotelFilterOptions>({
    priceRanges: [],
    ratings: [],
    sustainabilityLevels: [],
    amenities: []
  });
  const [sortBy, setSortBy] = useState("default");

  // Enhanced hotels data with additional properties for filtering
  const enhancedHotels = premiumStays.map(hotel => ({
    ...hotel,
    priceRange: (() => {
      const price = hotel.pricePerNightUSD || 0;
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

  const sustainabilityLevels = Array.from(
    new Set(enhancedHotels.map((h) => h.sustainabilityLevel))
  );

  const sortOptions: SortOption[] = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name A-Z', direction: 'asc' },
    { value: 'name-desc', label: 'Name Z-A', direction: 'desc' },
    { value: 'rating-desc', label: 'Highest Rated', direction: 'desc' },
    { value: 'rating-asc', label: 'Lowest Rated', direction: 'asc' },
    { value: 'price-desc', label: 'Price High to Low', direction: 'desc' },
    { value: 'price-asc', label: 'Price Low to High', direction: 'asc' }
  ];

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let filtered = enhancedHotels;

    // Apply legacy sustainability filter
    if (selectedSustainability) {
      filtered = filtered.filter(h => h.sustainabilityLevel === selectedSustainability);
    }

    // Apply advanced filters
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(h => filters.priceRanges.includes(h.priceRange));
    }
    
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(h => filters.ratings.includes(h.ratingCategory));
    }
    
    if (filters.sustainabilityLevels.length > 0) {
      filtered = filtered.filter(h => filters.sustainabilityLevels.includes(h.sustainabilityLevel));
    }
    
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(h => 
        filters.amenities.some(amenity => h.amenities.includes(amenity))
      );
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
      case 'price-desc':
        return [...filtered].sort((a, b) => {
          const priceA = a.pricePerNightUSD || 0;
          const priceB = b.pricePerNightUSD || 0;
          return priceB - priceA;
        });
      case 'price-asc':
        return [...filtered].sort((a, b) => {
          const priceA = a.pricePerNightUSD || 0;
          const priceB = b.pricePerNightUSD || 0;
          return priceA - priceB;
        });
      default:
        return filtered;
    }
  }, [enhancedHotels, selectedSustainability, filters, sortBy]);

  return (
    <div className="bg-surface-soft">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551887373-6b0910e7e4f1?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury safari lodge"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-24 lg:py-32">
          <div className="space-y-6 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/90">
              <Sparkles className="size-4" /> Premium Stays
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Zambia's Finest Lodges & Hotels
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                Experience world-class accommodation in Africa's most intimate safari destinations.
                From riverside lodges to exclusive bush camps, each property is handpicked for
                exceptional service and authentic experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid Section */}
      <section className="relative z-10 -mt-16 px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Advanced Filters and Sorting */}
          <div className="mb-8 space-y-6">
            <HotelFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableSustainabilityLevels={sustainabilityLevels}
            />
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <SortOptions
                  options={sortOptions}
                  value={sortBy}
                  onValueChange={setSortBy}
                />
                <div className="text-sm text-muted-foreground">
                  {filteredAndSortedHotels.length} hotel{filteredAndSortedHotels.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </div>

          {/* Legacy Sustainability Filter (kept for backward compatibility) */}
          <div className="mb-12 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSustainability(null)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                selectedSustainability === null
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/30 bg-white text-foreground hover:border-primary/50"
              }`}
            >
              All Properties
            </button>
            {sustainabilityLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedSustainability(level)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  selectedSustainability === level
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/30 bg-white text-foreground hover:border-primary/50"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Hotels Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedHotels.length > 0 ? (
              filteredAndSortedHotels.map((hotel) => (
                <HotelCard key={hotel.name} {...hotel} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto max-w-md space-y-4">
                  <div className="text-6xl">🏨</div>
                  <h3 className="text-xl font-semibold">No hotels found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria to find more accommodations.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilters({ priceRanges: [], ratings: [], sustainabilityLevels: [], amenities: [] });
                      setSelectedSustainability(null);
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

      {/* Accommodation Types Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Lodging Styles"
            title="Choose Your Perfect Stay"
            description="Zambia offers diverse accommodation options to suit every travel style and budget."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Luxury Lodges",
                description:
                  "All-inclusive resorts with gourmet dining, spa facilities, and premium guiding services.",
                count: "8+",
                icon: "✨",
              },
              {
                title: "Bush Camps",
                description: "Intimate tented accommodations offering authentic wilderness experiences.",
                count: "12+",
                icon: "🏕️",
              },
              {
                title: "River Lodges",
                description:
                  "Riverside properties with water-based activities and sunset dining decks.",
                count: "6+",
                icon: "🌊",
              },
              {
                title: "Eco Resorts",
                description:
                  "Sustainable properties combining comfort with conservation and community support.",
                count: "10+",
                icon: "🌿",
              },
            ].map((type, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="text-4xl">{type.icon}</div>
                <h3 className="mt-4 font-bold text-foreground">{type.title}</h3>
                <p className="mt-2 text-sm text-muted">{type.description}</p>
                <p className="mt-4 text-lg font-semibold text-primary">{type.count} properties</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities & Services Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Guest Experience"
            title="What to Expect at Our Partner Properties"
          />

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Guided Safari Experiences",
                items: [
                  "Expert guides with wildlife knowledge and conservation passion",
                  "Game drives in open-air vehicles for optimal viewing",
                  "Walking safaris and night game drives",
                  "Specialized birding and photography expeditions",
                ],
              },
              {
                title: "Culinary Excellence",
                items: [
                  "Farm-to-table dining featuring local ingredients",
                  "Themed bush dinners and riverside sundowners",
                  "Dietary accommodations and chef consultations",
                  "Cooking classes and market visits with locals",
                ],
              },
              {
                title: "Wellness & Recreation",
                items: [
                  "Spa treatments in natural settings",
                  "Yoga and meditation sessions",
                  "Fishing, boating, and water activities",
                  "Cultural village visits and community engagement",
                ],
              },
              {
                title: "Sustainability Commitment",
                items: [
                  "Carbon-neutral operations and renewable energy use",
                  "Conservation partnerships and community contributions",
                  "Wildlife protection and habitat restoration",
                  "Ethical employment and local supplier partnerships",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3">
                      <span className="mt-1 inline-block size-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-sm text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Confidence Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading badge="Peace of Mind" title="Why Book With Us" />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Curated Selection",
                description: "Every property meets our rigorous standards for quality, service, and sustainability.",
              },
              {
                title: "Expert Support",
                description:
                  "Our team provides 24/7 assistance before, during, and after your journey.",
              },
              {
                title: "Fair Pricing",
                description:
                  "Transparent rates with no hidden fees. Direct partnerships ensure value.",
              },
              {
                title: "Flexible Bookings",
                description: "Easy modifications and cancellation policies to adapt to your plans.",
              },
              {
                title: "Verified Reviews",
                description:
                  "Authentic guest feedback helps you make informed decisions about your stay.",
              },
              {
                title: "Exclusive Perks",
                description:
                  "Airport transfers, activity upgrades, and special amenities for our guests.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-white p-6">
                <div className="inline-block rounded-full bg-primary/10 p-3">
                  <Star className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-center lg:p-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to book your Zambian escape?
          </h2>
          <p className="mt-4 text-base text-white/90">
            Our travel concierge will work with you to select the perfect accommodation and craft
            an unforgettable itinerary tailored to your desires.
          </p>
          <button className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-primary transition hover:bg-white/90">
            Discuss Your Perfect Stay
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
