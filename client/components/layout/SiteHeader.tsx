import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  CalendarDays,
  Globe2,
  MapPin,
  Menu,
  Phone,
  Plane,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search/SearchBar";
import CurrencyToggler from "@/components/ui/currency-toggler";
import UserAccountButton from "@/components/UserAccountButton";

type NavItem = {
  label: string;
  href: string;
  type: "route" | "anchor";
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", type: "route" },
];

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:py-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
            Z
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-base font-bold tracking-tight text-foreground">ZamVoyage</span>
            <span className="text-xs font-medium text-muted-foreground">Tourism</span>
          </span>
        </Link>
        
        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <SearchBar className="w-full" />
        </div>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.type === "route" ? (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <CurrencyToggler />
          <Button
            variant="ghost"
            className="hidden lg:inline-flex rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link to="/hotels">
              <Plane className="mr-2 size-4" /> Trips
            </Link>
          </Button>
          <div className="hidden sm:block">
            <UserAccountButton />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "lg:hidden",
          "absolute inset-x-0 top-full border-b border-border bg-background transition-all duration-300 overflow-hidden",
          menuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        {/* Mobile Search Bar */}
        <div className="px-4 pt-3 pb-2">
          {/* Mobile Search Bar removed */}
        </div>
        
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
