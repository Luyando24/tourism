import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Star, MapPin } from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Food categories and sample data
const foodCategories = [
  {
    id: "restaurants",
    label: "Restaurants",
    items: [
      {
        id: 1,
        name: "Marlin Restaurant",
        image: "/images/placeholder.jpg",
        rating: 4.8,
        reviews: 124,
        location: "Cairo Road, Lusaka",
        description: "Fine dining restaurant offering a mix of Zambian and international cuisine.",
        tags: ["Fine Dining", "International", "Zambian"]
      },
      {
        id: 2,
        name: "Dil Restaurant",
        image: "/images/placeholder.jpg",
        rating: 4.5,
        reviews: 98,
        location: "Manda Hill Mall, Lusaka",
        description: "Popular restaurant known for its diverse menu and excellent service.",
        tags: ["Casual", "Family-friendly"]
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
        image: "/images/placeholder.jpg",
        rating: 4.9,
        reviews: 210,
        location: "Freedom Way, Lusaka",
        description: "Authentic Zambian cuisine featuring nshima, village chicken, and local vegetables.",
        tags: ["Authentic", "Local", "Nshima"]
      },
      {
        id: 2,
        name: "Mama Africa",
        image: "/images/placeholder.jpg",
        rating: 4.6,
        reviews: 175,
        location: "Great East Road, Lusaka",
        description: "Traditional Zambian food with cultural performances on weekends.",
        tags: ["Cultural", "Entertainment"]
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
        image: "/images/placeholder.jpg",
        rating: 4.3,
        reviews: 320,
        location: "Multiple locations across Lusaka",
        description: "Popular fast food chain serving fried chicken and burgers.",
        tags: ["Chicken", "Quick", "Affordable"]
      },
      {
        id: 2,
        name: "Debonairs Pizza",
        image: "/images/placeholder.jpg",
        rating: 4.4,
        reviews: 285,
        location: "East Park Mall, Lusaka",
        description: "South African pizza chain with unique African-inspired toppings.",
        tags: ["Pizza", "Delivery"]
      }
    ]
  }
];

const FoodCard = ({ item }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <div 
          className="h-full w-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-white text-primary">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {item.rating} ({item.reviews})
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{item.location}</span>
        </div>
        <p className="mt-3 text-sm text-gray-600">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-4 w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const Food = () => {
  const [activeTab, setActiveTab] = useState("restaurants");

  return (
    <MainLayout>
      <Helmet>
        <title>Food & Dining | Zambia Tourism</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-primary">Home</a>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-primary">Food & Dining</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Explore Zambian Food & Dining</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover the rich flavors and culinary traditions of Zambia, from authentic local dishes to international cuisine.
          </p>
        </div>

        <Tabs defaultValue="restaurants" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full overflow-x-auto">
            {foodCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="min-w-[120px]">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {foodCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Food;