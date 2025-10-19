import { useState } from "react";
import { UserRound, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GuestSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

const GuestSelector = ({ value, onChange, placeholder = "Guests", className }: GuestSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    infants: 0,
  });

  const formatGuestString = (guestCounts: GuestCounts) => {
    const { adults, children, infants } = guestCounts;
    const total = adults + children + infants;
    
    if (total === 0) return "";
    
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);
    
    return parts.join(', ');
  };

  const updateGuestCount = (type: keyof GuestCounts, increment: boolean) => {
    setGuests(prev => {
      const newGuests = { ...prev };
      
      if (increment) {
        newGuests[type] += 1;
      } else {
        newGuests[type] = Math.max(0, newGuests[type] - 1);
      }
      
      // Ensure at least 1 adult
      if (type === 'adults' && newGuests.adults < 1) {
        newGuests.adults = 1;
      }
      
      return newGuests;
    });
  };

  const handleApply = () => {
    const formattedString = formatGuestString(guests);
    onChange(formattedString);
    setIsOpen(false);
  };

  const guestTypes = [
    {
      key: 'adults' as keyof GuestCounts,
      label: 'Adults',
      description: 'Ages 13 or above',
      min: 1,
    },
    {
      key: 'children' as keyof GuestCounts,
      label: 'Children',
      description: 'Ages 2-12',
      min: 0,
    },
    {
      key: 'infants' as keyof GuestCounts,
      label: 'Infants',
      description: 'Under 2',
      min: 0,
    },
  ];

  return (
    <div className={cn("relative", className)}>
      <div 
        className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserRound className="size-4 sm:size-5 text-primary flex-shrink-0" />
        <span className={cn(
          "text-sm sm:text-base font-medium flex-1",
          value ? "text-foreground" : "text-muted-foreground"
        )}>
          {value || placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
          <div className="space-y-4">
            {guestTypes.map(({ key, label, description, min }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground">{description}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateGuestCount(key, false)}
                    disabled={guests[key] <= min}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {guests[key]}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateGuestCount(key, true)}
                    disabled={guests[key] >= 10}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;