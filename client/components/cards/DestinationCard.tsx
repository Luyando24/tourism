import { ArrowRight, MapPin, Star, Heart, Camera, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import RatingStars from "@/components/common/RatingStars";

interface DestinationCardProps {
  name: string;
  image: string;
  summary: string;
  region: string;
  travelSeason: string;
  highlights: string[];
  rating: number;
  href?: string;
  price?: string;
  duration?: string;
  activities?: number;
}

const DestinationCard = ({
  name,
  image,
  summary,
  region,
  travelSeason,
  highlights,
  rating,
  href = "/destinations",
  price = "From $299",
  duration = "3-5 days",
  activities = 12,
}: DestinationCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
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
          <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary shadow-sm">
            {region}
          </span>
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

        {/* Bottom overlay info */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-4 text-white text-sm">
            <div className="flex items-center gap-1">
              <Camera className="size-4" />
              <span>{activities} activities</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-4 sm:p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">{name}</h3>
            <span className="text-base sm:text-lg font-bold text-primary whitespace-nowrap">{price}</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{summary}</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="size-3 sm:size-4 flex-shrink-0" />
            <span className="truncate">{region} • Best time: {travelSeason}</span>
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-2">
            {highlights.slice(0, 3).map((highlight) => (
              <span
                key={highlight}
                className="inline-block rounded-full bg-secondary px-2 sm:px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RatingStars rating={rating} />
              <span className="text-xs sm:text-sm font-medium text-foreground">{rating}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            to={href}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-primary transition-colors hover:bg-primary/5 group/link"
          >
            View Activities
            <ArrowRight className="size-3 sm:size-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;
