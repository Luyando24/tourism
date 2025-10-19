import { useState } from "react";
import { Heart, Star, Clock, Users, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PackageCardProps {
  id: string;
  name: string;
  image: string;
  summary: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  priceUSD: number; // Changed from price string to priceUSD number
  originalPriceUSD?: number; // Changed from originalPrice string to originalPriceUSD number
  discount?: string;
  rating: number;
  reviewCount: number;
  includes: string[];
  highlights: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  bestTime: string;
  category: string;
}

export function PackageCard({
  id,
  name,
  image,
  summary,
  duration,
  groupSize,
  difficulty,
  priceUSD,
  originalPriceUSD,
  discount,
  rating,
  reviewCount,
  includes,
  highlights,
  itinerary,
  bestTime,
  category,
}: PackageCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const { formatPrice } = useCurrency();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "challenging":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-zambian-gold text-black font-medium text-xs">
          {category}
        </Badge>

        {/* Discount Badge */}
        {discount && (
          <Badge className="absolute bottom-3 left-3 bg-red-500 text-white text-xs">
            {discount}
          </Badge>
        )}

        {/* Price and Discount */}
        <div className="absolute bottom-4 right-4 text-right">
          {originalPriceUSD && (
            <p className="text-white/80 text-sm line-through">{formatPrice(originalPriceUSD)}</p>
          )}
          <p className="text-white text-lg sm:text-xl md:text-2xl font-bold">{formatPrice(priceUSD)}</p>
          <p className="text-white/90 text-xs sm:text-sm">per person</p>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-zambian-copper transition-colors truncate">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="hidden sm:inline">({reviewCount} reviews)</span>
                <span className="sm:hidden">({reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2">{summary}</p>

        {/* Package Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-zambian-copper flex-shrink-0" />
            <span className="truncate">{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-zambian-copper flex-shrink-0" />
            <span className="truncate">{groupSize}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-zambian-copper flex-shrink-0" />
            <span className="truncate">{bestTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${getDifficultyColor(difficulty)} text-xs`}>
              {difficulty}
            </Badge>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Highlights</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
            {highlights.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{highlights.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Includes */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Includes</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {includes.slice(0, 3).map((item, index) => (
              <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded truncate">
                {item}
              </span>
            ))}
            {includes.length > 3 && (
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                +{includes.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Itinerary Toggle */}
        <button
          onClick={() => setShowItinerary(!showItinerary)}
          className="flex items-center gap-2 text-zambian-copper hover:text-zambian-copper/80 transition-colors mb-4 text-sm font-medium w-full justify-start"
        >
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>View Itinerary</span>
          {showItinerary ? (
            <ChevronUp className="w-4 h-4 ml-auto" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-auto" />
          )}
        </button>

        {/* Itinerary Details */}
        {showItinerary && (
          <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {itinerary.map((day) => (
                <div key={day.day} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-zambian-copper text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {day.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 text-sm truncate">{day.title}</h5>
                    <p className="text-xs text-gray-600 line-clamp-2">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 border-zambian-copper text-zambian-copper hover:bg-zambian-copper hover:text-white text-sm"
          >
            View Details
          </Button>
          <Button className="flex-1 bg-zambian-copper hover:bg-zambian-copper/90 text-white text-sm">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}