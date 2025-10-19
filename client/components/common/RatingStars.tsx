import { Star, StarHalf } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}

const RatingStars = ({
  rating,
  max = 5,
  showLabel = true,
  className,
}: RatingStarsProps) => {
  const filled = Math.floor(rating);
  const hasHalf = rating - filled >= 0.5;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1 text-secondary">
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < filled;
          const isHalf = !isFilled && hasHalf && index === filled;

          if (isHalf) {
            return <StarHalf key={`half-${index}`} className="size-4 text-secondary" />;
          }

          return (
            <Star
              key={index}
              className={cn(
                "size-4",
                isFilled ? "fill-current text-secondary" : "text-muted-foreground",
              )}
            />
          );
        })}
      </div>
      {showLabel ? (
        <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      ) : null}
    </div>
  );
};

export default RatingStars;
