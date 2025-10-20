import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Leaf,
  Star,
  Award,
  Utensils,
  Clock,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import DestinationCard from "@/components/cards/DestinationCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import HotelCard from "@/components/cards/HotelCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { PackageCard } from "@/components/cards/PackageCard";
import TravelSearchBar from "@/components/forms/TravelSearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  featuredDestinations,
  signatureExperiences,
  premiumStays,
  culturalHighlights,
  testimonials,
  travelInsights,
  travelPackages,
} from "@/data/content";

const heroStats = [
  { value: "20+", label: "Destinations", icon: MapPin },
  { value: "73", label: "Cultures", icon: Globe2 },
  { value: "45%", label: "Protected Land", icon: Leaf },
  { value: "4.8★", label: "Guest Rating", icon: Star },
];

const insightIconMap = {
  calendar: CalendarDays,
  globe: Globe2,
  shield: ShieldCheck,
  leaf: Leaf,
} as const;

// Featured restaurants and food items
const featuredRestaurants = [
  {
    id: 1,
    name: "KFC Kabulonga",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&h=300&fit=crop",
    rating: 4.2,
    category: "Fast food",
    deliveryTime: "50-60 min",
    location: "Kabulonga, Lusaka",
    description: "Finger lickin' good fried chicken and sides.",
    tags: ["Chicken", "Fast Food", "American"]
  },
  {
    id: 2,
    name: "Pizza Inn Longacres",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.2,
    category: "Pizza",
    deliveryTime: "40-50 min",
    location: "Longacres, Lusaka",
    description: "Fresh pizza with quality ingredients and great taste.",
    tags: ["Pizza", "Italian", "Delivery"]
  },
  {
    id: 3,
    name: "Zambian Kitchen",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    rating: 4.9,
    category: "Traditional",
    deliveryTime: "45-60 min",
    location: "Freedom Way, Lusaka",
    description: "Authentic Zambian cuisine featuring nshima, village chicken, and local vegetables.",
    tags: ["Authentic", "Local", "Nshima"]
  },
  {
    id: 4,
    name: "Hungry Lion Chilumbulu",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 3.9,
    category: "Fast food",
    deliveryTime: "35-45 min",
    location: "Chilumbulu, Lusaka",
    description: "Popular local fast food chain with chicken and burgers.",
    tags: ["Chicken", "Burgers", "Local"]
  }
];

const Index = () => {
  return (
    <div className="bg-background">
      {/* YANGO Badge */}
      <div className="fixed top-4 right-4 z-50">
        <Badge variant="secondary" className="bg-orange-500 text-white hover:bg-orange-600 px-3 py-1 text-sm font-semibold shadow-lg">
          YANGO
        </Badge>
      </div>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <iframe
            src="https://www.youtube.com/embed/KIxonNIbxWE?autoplay=0&mute=1&loop=1&playlist=KIxonNIbxWE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0"
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100%',
              minWidth: '177.77vh', // 16:9 aspect ratio
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%'
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="Zambia Background Video"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-32 flex items-center justify-center min-h-[60vh]">
          <div className="max-w-4xl w-full text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Welcome to Zambia
            </h1>
            <TravelSearchBar />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="relative px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Top Destinations"
            title="Explore Zambia's Iconic Locations"
            description="From thundering waterfalls to untamed wilderness, discover the places that define Zambia."
          />

          <div className="mt-12 sm:mt-16 flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <div key={destination.name} className="min-w-[70vw] snap-start sm:min-w-0 sm:w-auto">
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90"
            >
              Explore All Destinations
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Experiences */}
      <section id="experiences" className="relative bg-secondary px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Yamuloko"
            title="Signature Experiences"
            description="Exclusive Yamuloko discount experiences featuring authentic Zambian culture and adventure"
          />

          <div className="mt-12 sm:mt-16 flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {signatureExperiences.map((experience) => (
              <div key={experience.name} className="min-w-[70vw] snap-start sm:min-w-0 sm:w-auto">
                <ExperienceCard {...experience} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stays */}
      <section className="relative px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Where to Stay"
            title="Premium Lodges & Hotels"
            description="World-class accommodations in Africa's most intimate destinations"
          />

          <div className="mt-12 sm:mt-16 flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {premiumStays.map((hotel) => (
              <div key={hotel.name} className="min-w-[70vw] snap-start sm:min-w-0 sm:w-auto">
                <HotelCard {...hotel} />
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-8 py-3 font-semibold text-foreground transition hover:bg-secondary"
            >
              Browse All Properties
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Foods & Restaurants Near Me */}
      <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Local Flavors"
            title="Foods & Restaurants Near You"
            description="Discover delicious local cuisine and popular restaurants in your area"
          />

          <div className="mt-12 sm:mt-16 flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="min-w-[70vw] snap-start sm:min-w-0 sm:w-auto">
                <Link to="/restaurant" state={{ restaurant }}>
                  <div className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white rounded-2xl overflow-hidden">
                    <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-gray-100">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{restaurant.category}</p>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{restaurant.deliveryTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span className="truncate">{restaurant.location}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/food"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <Utensils className="size-4" />
              Explore All Restaurants
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Packages */}
      <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-zambian-gold/5 to-zambian-emerald/5">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Complete Journeys"
            title="Curated Travel Packages"
            description="Expertly crafted itineraries combining the best of Zambia's wildlife, culture, and adventure"
          />

          <div className="mt-12 sm:mt-16 flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory scrollbar-hide">
            {travelPackages.map((pkg) => (
              <div key={pkg.id} className="min-w-[85vw] sm:min-w-[400px] snap-start">
                <PackageCard {...pkg} />
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Button className="bg-zambian-copper hover:bg-zambian-copper/90 text-white px-8 py-3">
              View All Packages
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Travel Insights */}
      <section id="travel-insights" className="relative bg-secondary px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Planning Tips"
            title="Essential Travel Information"
            description="Everything you need to know for a seamless Zambian adventure"
          />

          <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {travelInsights.map((insight) => {
              const IconComponent = insightIconMap[insight.icon as keyof typeof insightIconMap];
              return (
                <div key={insight.title} className="rounded-lg border border-border bg-white p-4 sm:p-6">
                  <div className="flex size-10 sm:size-12 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="size-5 sm:size-6 text-primary" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-foreground">{insight.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{insight.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section id="culture" className="relative px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Culture"
            title="Celebrate Zambian Heritage"
            description="Immerse yourself in vibrant traditions, festivals, and local customs"
          />

          <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {culturalHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {highlight.period}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{highlight.description}</p>
                  <p className="mt-3 text-xs font-medium text-primary">📍 {highlight.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="relative bg-secondary px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Guest Reviews"
            title="Traveller Stories"
            description="Hear from adventurers who've discovered Zambia through ZamVoyage"
          />

          <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-br from-primary to-primary/80 p-6 sm:p-8 lg:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Ready to explore Zambia?
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/90">
            Our travel experts are ready to craft your perfect itinerary combining authentic
            experiences, world-class accommodations, and unforgettable moments.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/booking?type=package"
              className="rounded-lg bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-primary transition hover:bg-white/95 inline-flex items-center justify-center gap-2"
            >
              <CalendarDays className="size-4" />
              Start Booking
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border-2 border-white/30 bg-white/10 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-white/20 inline-flex items-center justify-center gap-2"
            >
              <ArrowRight className="size-4" />
              Plan Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
