import { Link, useLocation } from "react-router-dom";
import { Home, Search, MapPin, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Explore",
      icon: Search,
      href: "/search",
    },
    {
      label: "Destinations",
      icon: MapPin,
      href: "/destinations",
    },
    {
      label: "Saved",
      icon: Heart,
      href: "/saved",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border lg:hidden h-16">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 min-w-[4rem]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;