import { ArrowRight, Clock, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

import RatingStars from "@/components/common/RatingStars";

interface ExperienceCardProps {
  name: string;
  image: string;
  summary: string;
  duration: string;
  priceUSD: number; // Changed from price string to priceUSD number
  originalPriceUSD?: number; // Changed from originalPrice string to originalPriceUSD number
  discount?: string;
  rating: number;
  href?: string;
  style?: string; // Added style prop for the badge display
}

const ExperienceCard = ({
  name,
  image,
  summary,
  duration,
  priceUSD,
  originalPriceUSD,
  discount,
  rating,
  href = "/destinations",
  style,
}: ExperienceCardProps) => {
  const { formatPrice } = useCurrency();
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition duration-300 hover:shadow-md hover:border-primary/30">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 sm:left-4 top-3 sm:top-4 inline-block rounded-full bg-white px-2 sm:px-3 py-1 text-xs font-semibold text-primary">
          {style}
        </span>
        {discount && (
          <span className="absolute right-3 sm:right-4 top-3 sm:top-4 inline-block rounded-full bg-red-500 px-2 sm:px-3 py-1 text-xs font-semibold text-white">
            {discount}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">{name}</h3>
          <RatingStars rating={rating} showLabel={false} />
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">{summary}</p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="size-3 sm:size-4 text-primary" /> {duration}
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Compass className="size-3 sm:size-4 text-primary" /> Expert guides
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 sm:pt-4">
          <div>
            <span className="text-xs font-medium text-muted-foreground">From</span>
            <div className="flex items-center gap-2">
              <p className="text-base sm:text-lg font-bold text-foreground">{formatPrice(priceUSD)}</p>
              {originalPriceUSD && (
                <p className="text-sm text-muted-foreground line-through">{formatPrice(originalPriceUSD)}</p>
              )}
            </div>
          </div>
          <Link
            to={href}
            className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            View
            <ArrowRight className="size-3 sm:size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
