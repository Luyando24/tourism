import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Star, 
  Heart, 
  Share2, 
  Camera, 
  Clock, 
  Users, 
  Thermometer,
  Droplets,
  Sun,
  Wind,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingStars from "@/components/common/RatingStars";
import { featuredDestinations } from "@/data/content";

interface WeatherInfo {
  month: string;
  temp: string;
  rainfall: string;
  sunshine: string;
}

interface Activity {
  name: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  description: string;
}

const DestinationDetails = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the destination from the data
  const destination = featuredDestinations.find(
    (dest) => dest.name.toLowerCase().replace(/\s+/g, '-') === name?.toLowerCase()
  );

  useEffect(() => {
    if (!destination) {
      navigate('/destinations');
    }
  }, [destination, navigate]);

  if (!destination) {
    return null;
  }

  // Mock additional data for the details page
  const additionalImages = [
    destination.image,
    "https://images.unsplash.com/photo-1516426122078-8023e26305d7?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80"
  ];

  const weatherData: WeatherInfo[] = [
    { month: "Jan", temp: "26°C", rainfall: "150mm", sunshine: "7h" },
    { month: "Feb", temp: "26°C", rainfall: "130mm", sunshine: "7h" },
    { month: "Mar", temp: "26°C", rainfall: "100mm", sunshine: "8h" },
    { month: "Apr", temp: "25°C", rainfall: "40mm", sunshine: "9h" },
    { month: "May", temp: "23°C", rainfall: "10mm", sunshine: "9h" },
    { month: "Jun", temp: "21°C", rainfall: "2mm", sunshine: "9h" },
    { month: "Jul", temp: "21°C", rainfall: "1mm", sunshine: "9h" },
    { month: "Aug", temp: "24°C", rainfall: "2mm", sunshine: "10h" },
    { month: "Sep", temp: "28°C", rainfall: "5mm", sunshine: "10h" },
    { month: "Oct", temp: "30°C", rainfall: "20mm", sunshine: "9h" },
    { month: "Nov", temp: "28°C", rainfall: "80mm", sunshine: "8h" },
    { month: "Dec", temp: "26°C", rainfall: "120mm", sunshine: "7h" }
  ];

  const activities: Activity[] = [
    {
      name: "Helicopter Flight over Victoria Falls",
      duration: "15 minutes",
      price: "From $165",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
      description: "Experience the breathtaking aerial view of Victoria Falls"
    },
    {
      name: "Sunset Zambezi River Cruise",
      duration: "3 hours",
      price: "From $45",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
      description: "Relax on a scenic cruise with wildlife viewing opportunities"
    },
    {
      name: "Victoria Falls Walking Tour",
      duration: "2 hours",
      price: "From $25",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=400&q=80",
      description: "Guided tour of the falls with historical insights"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % additionalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + additionalImages.length) % additionalImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={additionalImages[currentImageIndex]}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        
        {/* Image Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {additionalImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Header Content */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="bg-white/90 hover:bg-white text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/90 hover:bg-white text-gray-900"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="bg-white/90 hover:bg-white text-gray-900"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            {destination.region}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <RatingStars rating={destination.rating} />
              <span className="font-medium">{destination.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Best time: {destination.travelSeason}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {destination.summary}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Camera className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">12+ Activities</p>
                      <p className="text-sm text-muted-foreground">Available experiences</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">3-5 Days</p>
                      <p className="text-sm text-muted-foreground">Recommended stay</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">All Ages</p>
                      <p className="text-sm text-muted-foreground">Family friendly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Top Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                      <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{activity.name}</h4>
                          <span className="font-bold text-primary">{activity.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <RatingStars rating={activity.rating} />
                            <span>{activity.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="self-start">
                        Book Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Weather & Climate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <Thermometer className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                        <p className="text-sm text-muted-foreground">Avg Temp</p>
                        <p className="font-semibold">25°C</p>
                      </div>
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                        <p className="text-sm text-muted-foreground">Rainfall</p>
                        <p className="font-semibold">55mm</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best visited during the dry season ({destination.travelSeason}) for optimal weather conditions.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="space-y-2">
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {weatherData.map((month, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary/30 rounded text-sm">
                          <span className="font-medium w-8">{month.month}</span>
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            {month.temp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Droplets className="h-3 w-3" />
                            {month.rainfall}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sun className="h-3 w-3" />
                            {month.sunshine}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to={`/booking?destination=${encodeURIComponent(destination.name)}`}>
                    Book Experience
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/hotels">
                    Find Hotels
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Virtual Tour
                </Button>
              </CardContent>
            </Card>

            {/* Travel Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-900 mb-1">Best Time to Visit</p>
                  <p className="text-blue-700">{destination.travelSeason} offers the best weather and wildlife viewing.</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-green-900 mb-1">What to Bring</p>
                  <p className="text-green-700">Comfortable walking shoes, sun protection, and a waterproof camera.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="font-medium text-amber-900 mb-1">Local Currency</p>
                  <p className="text-amber-700">Zambian Kwacha (ZMW). USD widely accepted at tourist areas.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;