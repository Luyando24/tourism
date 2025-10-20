import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPinned,
  MessagesSquare,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SiteFooter = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("relative mt-24 border-t border-border bg-secondary text-foreground", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,_1fr,_1fr,_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary font-bold text-white">
                Z
              </span>
              <div>
                <p className="font-semibold">ZamVoyage</p>
                <p className="text-sm text-muted-foreground">Tourism Platform</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              From Victoria Falls to the wetlands of the Liuwa Plain, explore curated
              routes, handpicked stays, and authentic cultural encounters across
              Zambia.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MessagesSquare className="size-4" />
                support@zamvoyage.com
              </span>
              <span className="flex items-center gap-2">
                <MapPinned className="size-4" /> Lusaka, Zambia
              </span>
            </div>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-semibold">Plan Your Trip</p>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/destinations" className="transition hover:text-white">
                  Popular destinations
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="transition hover:text-white">
                  Hotels &amp; lodges
                </Link>
              </li>
              <li>
                <Link to="/#experiences" className="transition hover:text-white">
                  Safari packages
                </Link>
              </li>
              <li>
                <Link to="/#travel-insights" className="transition hover:text-white">
                  Travel advice
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-semibold">Cultural Highlights</p>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/#culture" className="transition hover:text-white">
                  Festivals &amp; events
                </Link>
              </li>
              <li>
                <Link to="/#heritage" className="transition hover:text-white">
                  Heritage sites
                </Link>
              </li>
              <li>
                <Link to="/#local-guides" className="transition hover:text-white">
                  Local guides
                </Link>
              </li>
              <li>
                <Link to="/#stories" className="transition hover:text-white">
                  Traveller stories
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-semibold">Travel Dispatch</p>
            <p className="text-sm text-muted-foreground">
              Subscribe for seasonal highlights, conservation news, and special offers.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Email address"
                className="h-10 rounded-lg border-border bg-white text-foreground placeholder:text-muted-foreground"
              />
              <Button className="w-full rounded-lg bg-primary text-white hover:bg-primary/90">
                <Mail className="mr-2 size-4" /> Subscribe
              </Button>
            </form>
            <div className="flex gap-4 text-muted-foreground">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-lg border border-border transition hover:border-primary hover:text-primary hover:bg-primary/5"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-lg border border-border transition hover:border-primary hover:text-primary hover:bg-primary/5"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-lg border border-border transition hover:border-primary hover:text-primary hover:bg-primary/5"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-border px-0 py-6 text-sm text-muted-foreground xl:flex-row xl:items-center xl:justify-between">
          <p>
            &copy; {new Date().getFullYear()} ZamVoyage. Crafted in partnership with
            Zambia Tourism Board.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/#travel-insights" className="transition hover:text-foreground">
              Travel insights
            </Link>
            <Link to="/#culture" className="transition hover:text-foreground">
              Culture &amp; events
            </Link>
            <Link to="/destinations" className="transition hover:text-foreground">
              Destination guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
