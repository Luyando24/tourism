import { useState, useEffect } from "react";
import { ChevronRight, Star, MapPin, Clock, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DestinationAutocomplete from "@/components/forms/DestinationAutocomplete";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

// Food categories and sample data
const foodCategories = [
  {
    id: "restaurants",
    label: "Restaurants",
    items: [
      {
        id: 1,
        name: "KFC Kabulonga",
        image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&h=300&fit=crop",
        rating: 4.2,
        category: "Fast food",
        deliveryTime: "50-60 min",
        location: "Kabulonga, Lusaka",
        description: "Finger lickin' good fried chicken and sides.",
        tags: ["Chicken", "Fast Food", "American"]
      },
      {
        id: 2,
        name: "Pizza Inn Longacres",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        rating: 4.2,
        category: "Pizza",
        deliveryTime: "40-50 min",
        location: "Longacres, Lusaka",
        description: "Fresh pizza with quality ingredients and great taste.",
        tags: ["Pizza", "Italian", "Delivery"]
      },
      {
        id: 3,
        name: "Hungry Lion Chilumbulu",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        rating: 3.9,
        category: "Fast food",
        deliveryTime: "35-45 min",
        location: "Chilumbulu, Lusaka",
        description: "Popular local fast food chain with chicken and burgers.",
        tags: ["Chicken", "Burgers", "Local"]
      },
      {
        id: 4,
        name: "TIMKET FOODS LEWANIKA",
        image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop",
        rating: 4.3,
        category: "Fast food",
        deliveryTime: "50-60 min",
        location: "Lewanika Road, Lusaka",
        description: "Quality fast food with local and international options.",
        tags: ["Fast Food", "Variety", "Quality"]
      }
    ]
  },
  {
    id: "traditional",
    label: "Traditional Food",
    items: [
      {
        id: 1,
        name: "Zambian Kitchen",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        rating: 4.9,
        category: "Traditional",
        deliveryTime: "45-60 min",
        location: "Freedom Way, Lusaka",
        description: "Authentic Zambian cuisine featuring nshima, village chicken, and local vegetables.",
        tags: ["Authentic", "Local", "Nshima"]
      },
      {
        id: 2,
        name: "Mama Africa",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        rating: 4.6,
        category: "Traditional",
        deliveryTime: "50-70 min",
        location: "Great East Road, Lusaka",
        description: "Traditional Zambian food with cultural performances on weekends.",
        tags: ["Cultural", "Entertainment", "Traditional"]
      }
    ]
  },
  {
    id: "fastfood",
    label: "Fast Food",
    items: [
      {
        id: 1,
        name: "Hungry Lion",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        rating: 4.3,
        category: "Fast food",
        deliveryTime: "30-45 min",
        location: "Multiple locations across Lusaka",
        description: "Popular fast food chain serving fried chicken and burgers.",
        tags: ["Chicken", "Quick", "Affordable"]
      },
      {
        id: 2,
        name: "Debonairs Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        rating: 4.4,
        category: "Pizza",
        deliveryTime: "35-50 min",
        location: "East Park Mall, Lusaka",
        description: "South African pizza chain with unique African-inspired toppings.",
        tags: ["Pizza", "Delivery", "South African"]
      }
    ]
  }
];

// Featured food items section
const featuredItems = [
  {
    id: 1,
    name: "Special shawarma",
    price: "58 K",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Chicken wings & chips",
    price: "102 K",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Plain chips",
    price: "37 K",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    name: "Double pizza",
    price: "89 K",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop"
  }
];

const FoodCard = ({ item }) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white rounded-2xl">
      <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardContent className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            <span className="text-sm">{item.deliveryTime}</span>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin className="mr-1 h-3 w-3" />
          <span className="truncate">{item.location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedItem = ({ item }) => {
  return (
    <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm border-0">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 mb-2">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{item.price}</p>
        <p className="text-xs sm:text-sm text-gray-600 leading-tight">{item.name}</p>
      </div>
    </div>
  );
};

const Food = () => {
  const [activeTab, setActiveTab] = useState("restaurants");
  const [searchLocation, setSearchLocation] = useState("Lusaka, Zambia");
  const { toast } = useToast();

  // Get user's geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // For demo purposes, we'll set a default Zambian location
            // In a real app, you would use the coordinates to fetch the actual location name
            setSearchLocation("Lusaka, Zambia");
          } catch (error) {
            console.error("Error getting location:", error);
            toast({
              title: "Location Error",
              description: "Could not determine your location. Please enter it manually.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location Access Denied",
            description: "Please enable location access or enter your location manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Please enter your location manually.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Searching for food",
      description: `Finding restaurants and food options in ${searchLocation}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Improved Food Search Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Craving Something Delicious?</h1>
            <p className="text-orange-100 text-lg">Find the best restaurants and food near you</p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <DestinationAutocomplete
                      value={searchLocation}
                      onChange={setSearchLocation}
                      placeholder="Enter delivery location"
                      className="pl-12 h-14 text-base border-0 rounded-xl bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Find Food
                </Button>
              </div>
            </div>
          </form>
          
          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Fast Food", "Pizza", "Traditional", "Chinese", "Indian"].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-orange-500 rounded-full px-4 py-2"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="restaurants" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full bg-white rounded-xl p-1 shadow-sm border-0">
            {foodCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="flex-1 rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-600 font-medium"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {foodCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {category.items.map((item) => (
                  <Link key={item.id} to="/restaurant" state={{ restaurant: item }}>
                    <FoodCard item={item} />
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Featured Section */}
        <div className="mt-8 bg-white rounded-2xl p-4 shadow-sm border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Mcsimons Foodcorner Int...</h2>
            <Button variant="ghost" size="sm" className="text-gray-600">
              More
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {featuredItems.map((item) => (
              <FeaturedItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;