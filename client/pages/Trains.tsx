import { useState } from "react";
import { ArrowLeft, Train, Clock, Users, Wifi, Coffee, Luggage, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Trains = () => {
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  // Mock train data for Zambian railway services
  const trainOptions = [
    {
      id: "1",
      operator: "Zambia Railways Limited",
      trainNumber: "ZRL 001",
      departure: {
        time: "07:00",
        station: "Lusaka Central Station",
        city: "Lusaka"
      },
      arrival: {
        time: "19:30",
        station: "Livingstone Railway Station",
        city: "Livingstone"
      },
      duration: "12h 30m",
      trainType: "Express Passenger",
      price: "$25",
      class: "Economy Class",
      amenities: ["Dining Car", "Restrooms", "Luggage Storage"],
      stops: "5 Stops",
      rating: 3.8,
      route: "Lusaka - Kafue - Mazabuka - Choma - Livingstone"
    },
    {
      id: "2",
      operator: "Zambia Railways Limited",
      trainNumber: "ZRL 003",
      departure: {
        time: "06:30",
        station: "Lusaka Central Station",
        city: "Lusaka"
      },
      arrival: {
        time: "14:45",
        station: "Kitwe Railway Station",
        city: "Kitwe"
      },
      duration: "8h 15m",
      trainType: "Regional Service",
      price: "$18",
      class: "Economy Class",
      amenities: ["Refreshments", "Restrooms", "Luggage Storage"],
      stops: "7 Stops",
      rating: 3.5,
      route: "Lusaka - Kabwe - Kapiri Mposhi - Ndola - Kitwe"
    },
    {
      id: "3",
      operator: "TAZARA Railway",
      trainNumber: "TZ 101",
      departure: {
        time: "14:00",
        station: "New Kapiri Mposhi Station",
        city: "Kapiri Mposhi"
      },
      arrival: {
        time: "08:30",
        station: "Dar es Salaam Central Station",
        city: "Dar es Salaam, Tanzania"
      },
      duration: "18h 30m",
      trainType: "International Express",
      price: "$45",
      class: "Sleeper Class",
      amenities: ["Sleeping Berths", "Dining Car", "Restrooms", "Luggage Storage"],
      stops: "12 Stops",
      rating: 4.1,
      route: "Kapiri Mposhi - Serenje - Kasama - Mbeya - Dar es Salaam"
    },
    {
      id: "4",
      operator: "Zambia Railways Limited",
      trainNumber: "ZRL 005",
      departure: {
        time: "15:30",
        station: "Lusaka Central Station",
        city: "Lusaka"
      },
      arrival: {
        time: "22:15",
        station: "Ndola Railway Station",
        city: "Ndola"
      },
      duration: "6h 45m",
      trainType: "Express Service",
      price: "$22",
      class: "First Class",
      amenities: ["Air Conditioning", "Dining Car", "Wifi", "Comfortable Seating"],
      stops: "3 Stops",
      rating: 4.2,
      route: "Lusaka - Kabwe - Kapiri Mposhi - Ndola"
    }
  ];

  const handleBookTrain = (trainId: string) => {
    setSelectedTrain(trainId);
    // Here you would typically navigate to a booking page or open a booking modal
    console.log(`Booking train ${trainId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Train className="h-4 w-4 text-green-600" />
              <span className="font-medium">Train Search Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Trains
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore Zambia and beyond with our railway connections
          </p>
        </div>

        {/* Train Options */}
        <div className="space-y-6">
          {trainOptions.map((train) => (
            <Card 
              key={train.id} 
              className={`transition-all duration-200 hover:shadow-lg border-2 ${
                selectedTrain === train.id 
                  ? 'border-green-500 shadow-lg' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Train Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Train className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{train.operator}</h3>
                          <p className="text-sm text-muted-foreground">{train.trainNumber} • {train.trainType}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {train.stops}
                      </Badge>
                    </div>

                    {/* Route Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Departure */}
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-gray-900">{train.departure.time}</div>
                        <div className="text-sm font-medium text-gray-700">{train.departure.city}</div>
                        <div className="text-xs text-muted-foreground">{train.departure.station}</div>
                      </div>

                      {/* Duration */}
                      <div className="text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Clock className="w-4 h-4" />
                          <span>{train.duration}</span>
                        </div>
                        <div className="w-full h-px bg-gray-300 relative">
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center md:text-right">
                        <div className="text-2xl font-bold text-gray-900">{train.arrival.time}</div>
                        <div className="text-sm font-medium text-gray-700">{train.arrival.city}</div>
                        <div className="text-xs text-muted-foreground">{train.arrival.station}</div>
                      </div>
                    </div>

                    {/* Route Details */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Route:</span>
                      </div>
                      <p className="text-sm text-gray-600">{train.route}</p>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {train.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {amenity === "Wifi" && <Wifi className="w-3 h-3" />}
                          {amenity === "Dining Car" && <Coffee className="w-3 h-3" />}
                          {amenity === "Refreshments" && <Coffee className="w-3 h-3" />}
                          {amenity === "Luggage Storage" && <Luggage className="w-3 h-3" />}
                          {amenity === "Restrooms" && <Users className="w-3 h-3" />}
                          {amenity === "Sleeping Berths" && <Users className="w-3 h-3" />}
                          {amenity === "Air Conditioning" && <Users className="w-3 h-3" />}
                          {amenity === "Comfortable Seating" && <Users className="w-3 h-3" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Book Button */}
                  <div className="flex flex-col items-center lg:items-end gap-4 lg:min-w-[200px]">
                    <div className="text-center lg:text-right">
                      <div className="text-3xl font-bold text-green-600">{train.price}</div>
                      <div className="text-sm text-muted-foreground">{train.class}</div>
                      <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                        <span>★</span>
                        <span>{train.rating}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleBookTrain(train.id)}
                      className="w-full lg:w-auto px-8 py-2 bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      Book Train
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2">Travel Tips</h3>
            <ul className="text-green-700 text-sm space-y-2">
              <li>• Arrive at the station 30 minutes before departure</li>
              <li>• Bring valid identification for ticket verification</li>
              <li>• International routes require passport and visa</li>
              <li>• Food and beverages are available on most services</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Assistance?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Our railway booking specialists are here to help you plan your journey across Zambia and the region.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trains;