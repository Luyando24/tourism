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

const Index = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <iframe
            src="https://www.youtube.com/embed/KIxonNIbxWE?autoplay=1&mute=1&loop=1&playlist=KIxonNIbxWE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0"
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

          <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.name} {...destination} />
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

          <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {signatureExperiences.map((experience) => (
              <ExperienceCard key={experience.name} {...experience} />
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

          <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {premiumStays.map((hotel) => (
              <HotelCard key={hotel.name} {...hotel} />
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

      {/* Travel Packages */}
      <section className="relative px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-zambian-gold/5 to-zambian-emerald/5">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Complete Journeys"
            title="Curated Travel Packages"
            description="Expertly crafted itineraries combining the best of Zambia's wildlife, culture, and adventure"
          />

          <div className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {travelPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
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

          <div className="mt-12 sm:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
