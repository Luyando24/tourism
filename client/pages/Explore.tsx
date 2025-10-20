import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Star, Users, Camera, Mountain, Waves, TreePine, Calendar, ArrowRight, Heart, Share2 } from "lucide-react";

// Mock data for Zambian attractions and experiences
const attractions = [
  {
    id: 1,
    name: "Victoria Falls",
    location: "Livingstone",
    category: "Natural Wonder",
    rating: 4.9,
    reviews: 2847,
    duration: "Full Day",
    price: "From $45",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "One of the Seven Natural Wonders of the World, Victoria Falls is a breathtaking spectacle of nature.",
    highlights: ["World's largest waterfall", "Adventure activities", "UNESCO World Heritage Site"]
  },
  {
    id: 2,
    name: "South Luangwa National Park",
    location: "Eastern Province",
    category: "Wildlife Safari",
    rating: 4.8,
    reviews: 1523,
    duration: "3-5 Days",
    price: "From $120",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
    description: "Home to some of Africa's finest wildlife viewing and the birthplace of the walking safari.",
    highlights: ["Walking safaris", "Big Five wildlife", "Pristine wilderness"]
  },
  {
    id: 3,
    name: "Lake Kariba",
    location: "Southern Province",
    category: "Lake Adventure",
    rating: 4.7,
    reviews: 892,
    duration: "2-3 Days",
    price: "From $80",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "One of the world's largest man-made lakes, perfect for fishing, boating, and wildlife viewing.",
    highlights: ["Houseboat cruises", "Tiger fishing", "Sunset views"]
  },
  {
    id: 4,
    name: "Kafue National Park",
    location: "Central Province",
    category: "Wildlife Safari",
    rating: 4.6,
    reviews: 654,
    duration: "3-4 Days",
    price: "From $95",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop",
    description: "Zambia's largest national park, offering diverse ecosystems and abundant wildlife.",
    highlights: ["Diverse wildlife", "Boat safaris", "Remote wilderness"]
  },
  {
    id: 5,
    name: "Lower Zambezi National Park",
    location: "Lusaka Province",
    category: "River Safari",
    rating: 4.8,
    reviews: 743,
    duration: "2-4 Days",
    price: "From $110",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    description: "Experience the untamed beauty of the Zambezi River with canoe safaris and game drives.",
    highlights: ["Canoe safaris", "Elephant herds", "River activities"]
  },
  {
    id: 6,
    name: "Kasanka National Park",
    location: "Central Province",
    category: "Bat Migration",
    rating: 4.5,
    reviews: 432,
    duration: "2-3 Days",
    price: "From $70",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "Witness the world's largest mammal migration - millions of fruit bats.",
    highlights: ["Bat migration", "Unique wildlife", "Conservation success"]
  }
];

const experiences = [
  {
    id: 1,
    title: "Traditional Village Tour",
    category: "Cultural",
    duration: "Half Day",
    price: "From $35",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "Experience authentic Zambian culture and traditions in local villages."
  },
  {
    id: 2,
    title: "Copper Mine Heritage Tour",
    category: "Historical",
    duration: "Full Day",
    price: "From $55",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
    description: "Discover Zambia's mining heritage and its impact on the nation's development."
  },
  {
    id: 3,
    title: "Zambezi River Cruise",
    category: "Adventure",
    duration: "3 Hours",
    price: "From $40",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "Enjoy a scenic cruise along the mighty Zambezi River with wildlife viewing."
  },
  {
    id: 4,
    title: "Lusaka City Walking Tour",
    category: "Urban",
    duration: "4 Hours",
    price: "From $25",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop",
    description: "Explore Zambia's capital city, its markets, museums, and vibrant culture."
  }
];

const categories = [
  { name: "All", icon: MapPin, count: attractions.length },
  { name: "Wildlife Safari", icon: Camera, count: 3 },
  { name: "Natural Wonder", icon: Mountain, count: 1 },
  { name: "Lake Adventure", icon: Waves, count: 1 },
  { name: "River Safari", icon: TreePine, count: 1 }
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const filteredAttractions = selectedCategory === "All" 
    ? attractions 
    : attractions.filter(attraction => attraction.category === selectedCategory);

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Discover Zambia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Explore the Heart of Africa
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From the thundering Victoria Falls to pristine wildlife parks, discover the natural wonders and rich culture of Zambia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <MapPin className="mr-2 h-5 w-5" />
                Plan Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Book Experiences
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="attractions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="attractions">Top Attractions</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
            </TabsList>

            <TabsContent value="attractions" className="space-y-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.name)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {category.name}
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>

              {/* Attractions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map((attraction) => (
                  <Card key={attraction.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-white">
                          {attraction.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                          onClick={() => toggleLike(attraction.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${
                              likedItems.includes(attraction.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-600'
                            }`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                        >
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {attraction.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {attraction.location}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{attraction.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            ({attraction.reviews} reviews)
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        {attraction.description}
                      </p>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {attraction.highlights.map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {attraction.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              Group tours
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{attraction.price}</p>
                          </div>
                        </div>
                        <Button className="w-full group">
                          Explore Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experiences" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Unique Experiences</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Immerse yourself in Zambian culture, history, and adventure with these carefully curated experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiences.map((experience) => (
                  <Card key={experience.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-white">
                          {experience.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {experience.title}
                      </CardTitle>
                      <CardDescription>{experience.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {experience.duration}
                        </div>
                        <p className="font-semibold text-primary">{experience.price}</p>
                      </div>
                      <Button className="w-full group">
                        Book Experience
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-muted py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Explore Zambia?</h2>
          <p className="text-muted-foreground text-lg">
            Start planning your adventure today and discover the wonders that await you in the heart of Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              <MapPin className="mr-2 h-5 w-5" />
              Start Planning
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              <Calendar className="mr-2 h-5 w-5" />
              Contact Travel Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;