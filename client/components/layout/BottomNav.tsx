import { Link, useLocation } from "react-router-dom";
import { Home, Search, MapPin, User, Utensils } from "lucide-react";
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
      label: "Food",
      icon: Utensils,
      href: "/food",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border lg:hidden h-16 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 min-w-[4rem] relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <item.icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.label === "Food" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse">
                    <div className="absolute inset-0 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;