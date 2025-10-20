import { ArrowLeft, MapPin, Clock, Star, Car, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rideOptions = [
  {
    id: 1,
    name: "YANGO Economy",
    type: "Economy",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    rating: 4.8,
    price: "K25",
    estimatedTime: "3-5 min",
    capacity: "4 passengers",
    features: ["Air conditioning", "GPS tracking", "Safe ride"]
  },
  {
    id: 2,
    name: "YANGO Comfort",
    type: "Comfort",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
    rating: 4.9,
    price: "K35",
    estimatedTime: "2-4 min",
    capacity: "4 passengers",
    features: ["Premium car", "Air conditioning", "Bottled water"]
  },
  {
    id: 3,
    name: "YANGO XL",
    type: "Large Group",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    rating: 4.7,
    price: "K45",
    estimatedTime: "4-6 min",
    capacity: "6-8 passengers",
    features: ["Large vehicle", "Extra luggage space", "Family friendly"]
  }
];

const Taxi = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Available Rides</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>From Current Location to Destination</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Info */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="w-0.5 h-8 bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">From</div>
                <div className="font-medium">Current Location</div>
                <div className="text-sm text-gray-600 mt-2">To</div>
                <div className="font-medium">Destination</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Estimated time</div>
              <div className="font-semibold">15-20 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Options */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {rideOptions.map((ride) => (
            <div key={ride.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={ride.image}
                    alt={ride.name}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{ride.name}</h3>
                    <p className="text-sm text-gray-600">
                      {ride.type}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{ride.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{ride.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{ride.capacity}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {ride.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      {ride.price}
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-orange-600" />
            <div>
              <div className="font-semibold text-orange-800">Need help?</div>
              <div className="text-sm text-orange-700">Call YANGO support: +260 XXX XXX XXX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxi;