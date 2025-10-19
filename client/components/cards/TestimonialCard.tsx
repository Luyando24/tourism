import { Quote } from "lucide-react";

import RatingStars from "@/components/common/RatingStars";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TestimonialCard = ({ name, role, quote, avatar, rating }: TestimonialCardProps) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white p-4 sm:p-6 transition hover:shadow-md hover:border-primary/30">
      <Quote className="absolute right-4 sm:right-5 top-4 sm:top-5 size-6 sm:size-8 text-primary/10" />
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src={avatar}
          alt={name}
          className="size-12 sm:size-14 rounded-full border-2 border-border object-cover"
        />
        <div>
          <p className="text-sm sm:text-base font-semibold text-foreground">{name}</p>
          <span className="text-xs text-muted-foreground">{role}</span>
        </div>
      </div>
      <p className="mt-3 sm:mt-4 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">"{quote}"</p>
      <RatingStars rating={rating} className="mt-3 sm:mt-4" />
    </article>
  );
};

export default TestimonialCard;
