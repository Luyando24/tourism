import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
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
      {eyebrow ? (
        <span className="badge-pill text-xs sm:text-sm uppercase tracking-[0.22em] text-primary font-semibold">
          {eyebrow}
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

export default SectionHeading;
