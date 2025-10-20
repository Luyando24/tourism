import { useState } from "react";
import { ArrowLeft, Plane, Clock, Users, Wifi, Coffee, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Flights = () => {
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);

  // Mock flight data
  const flightOptions = [
    {
      id: "1",
      airline: "Zambia Airways",
      flightNumber: "ZA 101",
      departure: {
        time: "08:30",
        airport: "Kenneth Kaunda International Airport (LUN)",
        city: "Lusaka"
      },
      arrival: {
        time: "10:45",
        airport: "Harry Mwanga Nkumbula International Airport (LVI)",
        city: "Livingstone"
      },
      duration: "2h 15m",
      aircraft: "Boeing 737-800",
      price: "$180",
      class: "Economy",
      amenities: ["WiFi", "Refreshments", "Checked Bag"],
      stops: "Direct",
      rating: 4.2
    },
    {
      id: "2",
      airline: "Proflight Zambia",
      flightNumber: "PF 205",
      departure: {
        time: "14:20",
        airport: "Kenneth Kaunda International Airport (LUN)",
        city: "Lusaka"
      },
      arrival: {
        time: "16:30",
        airport: "Harry Mwanga Nkumbula International Airport (LVI)",
        city: "Livingstone"
      },
      duration: "2h 10m",
      aircraft: "Jetstream 41",
      price: "$165",
      class: "Economy",
      amenities: ["Light Refreshments", "Checked Bag"],
      stops: "Direct",
      rating: 4.0
    },
    {
      id: "3",
      airline: "Ethiopian Airlines",
      flightNumber: "ET 835",
      departure: {
        time: "11:15",
        airport: "Kenneth Kaunda International Airport (LUN)",
        city: "Lusaka"
      },
      arrival: {
        time: "15:40",
        airport: "Simon Mwansa Kapwepwe International Airport (NLA)",
        city: "Ndola"
      },
      duration: "4h 25m",
      aircraft: "Boeing 737-800",
      price: "$220",
      class: "Economy",
      amenities: ["WiFi", "Meal Service", "Entertainment", "Checked Bag"],
      stops: "1 Stop (ADD)",
      rating: 4.5
    }
  ];

  const handleBookFlight = (flightId: string) => {
    setSelectedFlight(flightId);
    // Here you would typically navigate to a booking page or open a booking modal
    console.log(`Booking flight ${flightId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Plane className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Flight Search Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Flights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of domestic flights across Zambia
          </p>
        </div>

        {/* Flight Options */}
        <div className="space-y-6">
          {flightOptions.map((flight) => (
            <Card 
              key={flight.id} 
              className={`transition-all duration-200 hover:shadow-lg border-2 ${
                selectedFlight === flight.id 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Plane className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{flight.airline}</h3>
                          <p className="text-sm text-muted-foreground">{flight.flightNumber} • {flight.aircraft}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {flight.stops}
                      </Badge>
                    </div>

                    {/* Route Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Departure */}
                      <div className="text-center md:text-left">
                        <div className="text-2xl font-bold text-gray-900">{flight.departure.time}</div>
                        <div className="text-sm font-medium text-gray-700">{flight.departure.city}</div>
                        <div className="text-xs text-muted-foreground">{flight.departure.airport}</div>
                      </div>

                      {/* Duration */}
                      <div className="text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Clock className="w-4 h-4" />
                          <span>{flight.duration}</span>
                        </div>
                        <div className="w-full h-px bg-gray-300 relative">
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center md:text-right">
                        <div className="text-2xl font-bold text-gray-900">{flight.arrival.time}</div>
                        <div className="text-sm font-medium text-gray-700">{flight.arrival.city}</div>
                        <div className="text-xs text-muted-foreground">{flight.arrival.airport}</div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {flight.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {amenity === "WiFi" && <Wifi className="w-3 h-3" />}
                          {amenity === "Refreshments" && <Coffee className="w-3 h-3" />}
                          {amenity === "Meal Service" && <Coffee className="w-3 h-3" />}
                          {amenity === "Light Refreshments" && <Coffee className="w-3 h-3" />}
                          {amenity === "Checked Bag" && <Luggage className="w-3 h-3" />}
                          {amenity === "Entertainment" && <Users className="w-3 h-3" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Book Button */}
                  <div className="flex flex-col items-center lg:items-end gap-4 lg:min-w-[200px]">
                    <div className="text-center lg:text-right">
                      <div className="text-3xl font-bold text-blue-600">{flight.price}</div>
                      <div className="text-sm text-muted-foreground">{flight.class}</div>
                      <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                        <span>★</span>
                        <span>{flight.rating}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleBookFlight(flight.id)}
                      className="w-full lg:w-auto px-8 py-2 bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Book Flight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help Booking?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Our travel experts are available 24/7 to assist you with your flight booking and travel arrangements.
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

export default Flights;