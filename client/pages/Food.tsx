import { useState, useEffect } from "react";
import { ArrowLeft, Star, MapPin, Clock, Search, Plus, MoreHorizontal, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DestinationAutocomplete from "@/components/forms/DestinationAutocomplete";
import { useToast } from "@/hooks/use-toast";

// Restaurant data
const restaurantData = {
  name: "KUNFU PANDA",
  rating: 4.1,
  reviewCount: 132,
  deliveryTime: "55-65 min",
  deliveryType: "Delivery",
  minOrder: "100 K",
  discount: "-10%",
  discountText: "For orders from 100 K",
  timer: "TIMER 🔥"
};

// Food categories matching the screenshot
const foodCategories = [
  { id: "popular", label: "POPULAR" },
  { id: "lunch", label: "LUNCH" },
  { id: "noodles", label: "NOODLES" },
  { id: "rice-noodles", label: "RICE NOODLES" },
  { id: "rice", label: "RICE" },
  { id: "drinks", label: "DRINKS" }
];

// Food items data
const foodItems = {
  popular: [
    {
      id: 1,
      name: "Bubble tea 珍珠奶茶",
      price: "50K",
      description: "500 ml",
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Fried rice with chicken 鸡肉炒饭",
      price: "150K",
      description: "550 g",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Steamed dumplings 蒸饺",
      price: "80K",
      description: "6 pieces",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Beef noodle soup 牛肉面",
      price: "120K",
      description: "Large bowl",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop"
    }
  ],
  lunch: [
    {
      id: 5,
      name: "Lunch combo A",
      price: "180K",
      description: "Rice + 2 dishes",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Lunch combo B",
      price: "200K",
      description: "Noodles + drink",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop"
    }
  ],
  noodles: [
    {
      id: 7,
      name: "Beef noodles",
      price: "120K",
      description: "Spicy beef noodles",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Chicken noodles",
      price: "100K",
      description: "Chicken with vegetables",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop"
    }
  ],
  "rice-noodles": [
    {
      id: 9,
      name: "Rice noodle soup",
      price: "90K",
      description: "Traditional style",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop"
    }
  ],
  rice: [
    {
      id: 10,
      name: "Fried rice",
      price: "80K",
      description: "Egg fried rice",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop"
    }
  ],
  drinks: [
    {
      id: 11,
      name: "Bubble tea",
      price: "50K",
      description: "Various flavors",
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop"
    },
    {
      id: 12,
      name: "Fresh juice",
      price: "40K",
      description: "Orange/Apple",
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300&h=200&fit=crop"
    }
  ]
};

const FoodItemCard = ({ item }: { item: any }) => {
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-sm rounded-2xl">
      <div className="relative">
        <div className="h-32 w-full overflow-hidden bg-gray-100 rounded-t-2xl">
          <img 
            src={item.image} 
            alt={item.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
        <Button 
          size="sm" 
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white hover:bg-gray-50 text-gray-900 shadow-md border"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-3">
        <div className="mb-2">
          <p className="text-lg font-semibold text-gray-900">{item.price}</p>
          <h3 className="text-sm font-medium text-gray-900 leading-tight">{item.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Food = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [searchLocation, setSearchLocation] = useState("Lusaka, Zambia");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get user's geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setSearchLocation("Lusaka, Zambia");
          } catch (error) {
            console.error("Error getting location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Searching for food",
      description: `Finding restaurants and food options in ${searchLocation}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button and Actions */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Info Header */}
      <div className="px-4 py-6 bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{restaurantData.name}</h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{restaurantData.rating}</span>
            <span className="text-sm text-gray-500 ml-1">{restaurantData.reviewCount} ratings</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{restaurantData.deliveryTime}</span>
          </div>
          
          <Button variant="ghost" size="sm" className="p-1">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Delivery Info and Promotion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="bg-red-500 text-white">
              {restaurantData.discount}
            </Badge>
            <span className="text-sm text-gray-600">{restaurantData.discountText}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">from {restaurantData.minOrder}</span>
            <span className="text-sm">{restaurantData.timer}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start bg-transparent p-0 h-auto overflow-x-auto">
            <div className="flex gap-0 px-4 py-2 min-w-max">
              {foodCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent bg-transparent text-gray-600 data-[state=active]:text-gray-900 rounded-none"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          {/* Food Items Content */}
          <div className="px-4 py-6">
            {foodCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-2 gap-4">
                  {foodItems[category.id as keyof typeof foodItems]?.map((item) => (
                    <FoodItemCard key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>

      {/* Delivery Info Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs">🚲</span>
            </div>
            <div>
              <p className="text-sm font-medium">Delivery K 1 • {restaurantData.deliveryTime}</p>
              <p className="text-xs text-gray-500">Detailed conditions</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <span className="text-sm">›</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Food;