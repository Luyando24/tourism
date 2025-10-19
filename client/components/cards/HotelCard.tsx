import { ArrowRight, Leaf, MapPin, Star, Heart, Wifi, Car, Coffee, Utensils, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import RatingStars from "@/components/common/RatingStars";
import { useCurrency } from "@/contexts/CurrencyContext";

interface HotelCardProps {
  name: string;
  image: string;
  location: string;
  summary: string;
  rating: number;
  pricePerNightUSD: number;
  sustainabilityLevel: string;
  href?: string;
  originalPriceUSD?: number;
  discount?: string;
  amenities?: string[];
  reviewCount?: number;
  isFreeCancellation?: boolean;
}

const HotelCard = ({
  name,
  image,
  location,
  summary,
  rating,
  pricePerNightUSD,
  sustainabilityLevel,
  href = "/hotels",
  originalPriceUSD,
  discount,
  amenities = ["WiFi", "Parking", "Restaurant"],
  reviewCount = 245,
  isFreeCancellation = true,
}: HotelCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { formatPrice } = useCurrency();

  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Restaurant: Utensils,
    Coffee: Coffee,
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top badges and wishlist */}
        <div className="absolute left-4 top-4 flex items-center justify-between w-[calc(100%-2rem)]">
          <div className="flex gap-2">
            <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary shadow-sm">
              {sustainabilityLevel}
            </span>
            {discount && (
              <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                -{discount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="flex items-center justify-center size-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors hover:bg-white"
          >
            <Heart 
              className={`size-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} 
            />
          </button>
        </div>

        {/* Bottom overlay amenities */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 text-white text-sm">
            {amenities.slice(0, 3).map((amenity) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi;
              return (
                <div key={amenity} className="flex items-center gap-1">
                  <IconComponent className="size-4" />
                  <span>{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-4 sm:p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">{name}</h3>
            <div className="text-right">
              {originalPriceUSD && (
                <span className="block text-xs text-muted-foreground line-through">{formatPrice(originalPriceUSD)}</span>
              )}
              <span className="text-base sm:text-lg font-bold text-primary">{formatPrice(pricePerNightUSD)}</span>
              <span className="block text-xs text-muted-foreground">per night</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="size-3 sm:size-4 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{summary}</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RatingStars rating={rating} />
              <span className="text-xs sm:text-sm font-medium text-foreground">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-2">
            {amenities.slice(0, 3).map((amenity) => {
              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
              return (
                <div key={amenity} className="flex items-center gap-1 rounded-full bg-secondary px-2 sm:px-3 py-1">
                  {IconComponent && <IconComponent className="size-3" />}
                  <span className="text-xs font-medium text-secondary-foreground">{amenity}</span>
                </div>
              );
            })}
          </div>

          {isFreeCancellation && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Shield className="size-3" />
              <span>Free cancellation</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            to={href}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-primary px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-primary transition-colors hover:bg-primary/5 group/link"
          >
            View Details
            <ArrowRight className="size-3 sm:size-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
          <Link
            to={`/booking?type=hotel&item=${encodeURIComponent(name)}`}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-primary/90 group/book"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
