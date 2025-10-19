import { useState } from "react";
import { Calendar, Users, ArrowRight, Phone, Mail, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";

interface BookingCTAProps {
  type: 'destination' | 'hotel' | 'package' | 'general';
  title?: string;
  subtitle?: string;
  itemName?: string;
  itemImage?: string;
  price?: number;
  rating?: number;
  location?: string;
  highlights?: string[];
  variant?: 'default' | 'compact' | 'hero' | 'sidebar';
  onBookNow?: () => void;
  onInquire?: () => void;
}

const BookingCTA = ({
  type,
  title,
  subtitle,
  itemName,
  itemImage,
  price,
  rating,
  location,
  highlights = [],
  variant = 'default',
  onBookNow,
  onInquire
}: BookingCTAProps) => {
  const { formatPrice } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);

  const defaultTitles = {
    destination: "Ready to Explore?",
    hotel: "Book Your Stay",
    package: "Reserve Your Adventure",
    general: "Start Your Journey"
  };

  const defaultSubtitles = {
    destination: "Create unforgettable memories in Zambia's most spectacular destinations.",
    hotel: "Experience luxury and comfort in the heart of Zambia's wilderness.",
    package: "Everything you need for the perfect Zambian adventure, all in one package.",
    general: "Discover the beauty and wonder of Zambia with our expert guides."
  };

  const displayTitle = title || defaultTitles[type];
  const displaySubtitle = subtitle || defaultSubtitles[type];

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Default behavior - could navigate to booking page
      window.location.href = `/booking?type=${type}&item=${encodeURIComponent(itemName || '')}`;
    }
  };

  const handleInquire = () => {
    if (onInquire) {
      onInquire();
    } else {
      // Default behavior - could open contact form or navigate to contact page
      window.location.href = '/contact';
    }
  };

  // Compact variant for cards and smaller spaces
  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        {price && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-lg font-semibold">{formatPrice(price)}/night</span>
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={handleBookNow} className="flex-1">
            Book Now
          </Button>
          <Button variant="outline" onClick={handleInquire}>
            Inquire
          </Button>
        </div>
      </div>
    );
  }

  // Sidebar variant for detailed pages
  if (variant === 'sidebar') {
    return (
      <Card className="sticky top-4">
        <CardContent className="p-6">
          <div className="space-y-4">
            {itemImage && (
              <img 
                src={itemImage} 
                alt={itemName}
                className="h-32 w-full rounded-lg object-cover"
              />
            )}
            
            <div>
              <h3 className="font-semibold">{itemName}</h3>
              {location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {location}
                </div>
              )}
              {rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{rating}</span>
                </div>
              )}
            </div>

            {price && (
              <div className="rounded-lg bg-surface-soft p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">From</span>
                  <span className="text-xl font-semibold">{formatPrice(price)}</span>
                </div>
                <div className="text-xs text-muted-foreground">per person/night</div>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Highlights:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Button onClick={handleBookNow} className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
              <Button variant="outline" onClick={handleInquire} className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Get Quote
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Free cancellation • Best price guarantee
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Hero variant for large promotional sections
  if (variant === 'hero') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-white lg:p-12">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
                <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
                  {displayTitle}
                </h2>
                <p className="text-lg text-white/90">
                  {displaySubtitle}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleBookNow}
                  className="group bg-white text-primary hover:bg-white/90"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Start Booking
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${
                    isHovered ? 'translate-x-1' : ''
                  }`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleInquire}
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Speak to Expert
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Expert Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>5-Star Rated</span>
                </div>
              </div>
            </div>

            {itemImage && (
              <div className="relative">
                <img
                  src={itemImage}
                  alt={itemName || "Zambia destination"}
                  className="h-64 w-full rounded-xl object-cover lg:h-80"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />
      </div>
    );
  }

  // Default variant
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold">{displayTitle}</h3>
            <p className="text-muted-foreground">{displaySubtitle}</p>
          </div>

          {itemName && (
            <div className="rounded-lg bg-surface-soft p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{itemName}</h4>
                  {location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {location}
                    </div>
                  )}
                </div>
                {price && (
                  <div className="text-right">
                    <div className="text-lg font-semibold">{formatPrice(price)}</div>
                    <div className="text-xs text-muted-foreground">per night</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={handleBookNow} className="w-full" size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Experience
            </Button>
            <Button variant="outline" onClick={handleInquire} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Request Information
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center text-sm text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground">Free Cancellation</div>
              <div>Up to 24 hours before</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">Best Price</div>
              <div>Guaranteed lowest rates</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCTA;