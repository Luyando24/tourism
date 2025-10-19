import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: ReactNode;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({
  badge,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:gap-6",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge ? (
        <span className="badge-pill text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold">
          {badge}
        </span>
      ) : null}
      <h2 className={cn(
        "text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-foreground",
        "tracking-tight"
      )}>
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
};