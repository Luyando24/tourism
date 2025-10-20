import { FormEvent, useState, useEffect } from "react";
import { Search, Plane, Building, MapPin, Utensils, Train, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DestinationAutocomplete from "./DestinationAutocomplete";
import LocationAutocomplete from "./LocationAutocomplete";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";

interface TravelSearchBarValues {
  destination: string;
  dates: string;
  travellers: string;
  // Flight-specific fields
  departure?: string;
  arrival?: string;
  // Rides-specific fields
  pickupLocation?: string;
}

type SearchTab = "destinations" | "hotels" | "experiences" | "food" | "rides" | "flights" | "trains";

const TravelSearchBar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchTab>("destinations");
  const [values, setValues] = useState<TravelSearchBarValues>({
    destination: "Victoria Falls",
    dates: "25 Nov - 02 Dec",
    travellers: "2 Adults",
    departure: "",
    arrival: "",
    pickupLocation: "",
  });
  const [userLocation, setUserLocation] = useState<string>("");

  // Get user's geolocation when Food tab is selected
  useEffect(() => {
    if (activeTab === "food" && !userLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // For demo purposes, we'll set a default Zambian location
              // In a real app, you would use the coordinates to fetch the actual location name
              setUserLocation("Lusaka, Zambia");
              
              // Update the destination value when on food tab
              if (activeTab === "food") {
                setValues((prev) => ({ ...prev, destination: "Lusaka, Zambia" }));
              }
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
    }
  }, [activeTab, toast, userLocation]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // For Food tab, navigate directly to the Food page
    if (activeTab === "food") {
      navigate("/food");
      return;
    }
    
    if (activeTab === "rides") {
    // Navigate to taxi page with pickup and destination
    navigate("/taxi");
      return;
    }
    
    if (activeTab === "flights") {
      // Navigate to flights page
      navigate("/flights");
      return;
    }
    
    if (activeTab === "trains") {
      // Navigate to trains page
      navigate("/trains");
      return;
    }
    
    // Navigate to search results with query parameters for other tabs
    const searchParams = new URLSearchParams({
      type: activeTab,
      destination: values.destination,
      dates: values.dates,
      guests: values.travellers,
    });
    
    navigate(`/search?${searchParams.toString()}`);
    
    toast({
      title: "Searching for your perfect trip",
      description: `Finding ${activeTab} in ${values.destination} • ${values.dates} • ${values.travellers}`,
    });
  };

  const tabs = [
    { id: "destinations" as SearchTab, label: "Destinations", shortLabel: "Dest.", icon: Plane },
    { id: "hotels" as SearchTab, label: "Hotels", shortLabel: "Hotels", icon: Building },
    { id: "experiences" as SearchTab, label: "Experiences", shortLabel: "Exp.", icon: MapPin },
    { id: "food" as SearchTab, label: "Food", shortLabel: "Food", icon: Utensils },
    { id: "rides" as SearchTab, label: "Rides", shortLabel: "Rides", icon: Car },
    { id: "flights" as SearchTab, label: "Flights", shortLabel: "Flights", icon: Plane },
    { id: "trains" as SearchTab, label: "Trains", shortLabel: "Trains", icon: Train },
  ];

  return (
    <div className="w-full">
        {/* Tab Navigation */}
        <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {/* Animated orange dot for Food tab */}
                  {tab.id === "food" && (
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl border border-white/20 bg-white/95 p-4 sm:p-6 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
          <div className="grid flex-1 gap-2">
            {activeTab === "rides" ? (
              <>
                {/* Powered by Yango Badge */}
                <div className="flex justify-end mb-4">
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium border border-orange-200">
                    Powered by Yango
                  </div>
                </div>
                
                {/* Rides Form Fields - Row Layout on Desktop */}
                <div className="flex flex-col md:flex-row md:gap-4 space-y-4 md:space-y-0">
                  {/* Current Location Field */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Current location
                    </label>
                    <LocationAutocomplete
                      value={values.pickupLocation || ""}
                      onChange={(value) => setValues((prev) => ({ ...prev, pickupLocation: value }))}
                      placeholder="Your current location"
                      showCurrentLocation={true}
                    />
                  </div>
                  
                  {/* Destination Field */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      Destination
                    </label>
                    <LocationAutocomplete
                      value={values.destination}
                      onChange={(value) => setValues((prev) => ({ ...prev, destination: value }))}
                      placeholder="Where to?"
                    />
                  </div>
                </div>
              </>
            ) : activeTab === "flights" ? (
              <>
                {/* Flight Form Fields - Row Layout on Desktop */}
                <div className="flex flex-col md:flex-row md:gap-4 space-y-4 md:space-y-0">
                  {/* Departure Field */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Plane className="w-4 h-4 text-blue-500" />
                      From
                    </label>
                    <DestinationAutocomplete
                      value={values.departure || ""}
                      onChange={(value) => setValues((prev) => ({ ...prev, departure: value }))}
                      placeholder="Departure city or airport"
                    />
                  </div>
                  
                  {/* Arrival Field */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      To
                    </label>
                    <DestinationAutocomplete
                      value={values.arrival || ""}
                      onChange={(value) => setValues((prev) => ({ ...prev, arrival: value }))}
                      placeholder="Arrival city or airport"
                    />
                  </div>
                </div>
              </>
            ) : activeTab === "trains" ? (
              <>
                {/* Train Form Fields - Row Layout on Desktop */}
                <div className="flex flex-col md:flex-row md:gap-4 space-y-4 md:space-y-0">
                  {/* Departure Field */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Train className="w-4 h-4 text-green-600" />
                      From
                    </label>
                    <DestinationAutocomplete
                      value={values.departure || ""}
                      onChange={(value) => setValues((prev) => ({ ...prev, departure: value }))}
                      placeholder="Departure station or city"
                    />
                  </div>
                  
                  {/* Arrival Field */}
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      To
                    </label>
                    <DestinationAutocomplete
                      value={values.arrival || ""}
                      onChange={(value) => setValues((prev) => ({ ...prev, arrival: value }))}
                      placeholder="Arrival station or city"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="text-sm font-semibold text-gray-700">
                  {activeTab === "destinations" && "Where do you want to go?"}
                  {activeTab === "hotels" && "Hotel Location"}
                  {activeTab === "experiences" && "Experience Location"}
                  {activeTab === "food" && "Your Location"}
                </label>
                <DestinationAutocomplete
                  value={values.destination}
                  onChange={(value) => setValues((prev) => ({ ...prev, destination: value }))}
                  placeholder={
                    activeTab === "destinations" 
                      ? "Enter destination (e.g., Victoria Falls, Lusaka)"
                      : activeTab === "hotels"
                      ? "Enter city or area for hotels"
                      : activeTab === "experiences"
                      ? "Enter location for experiences"
                      : "Your current location (can be edited)"
                  }
                />
              </>
            )}
          </div>
          
          {/* Hide date and guest fields when food or rides tab is active */}
        {activeTab !== "food" && activeTab !== "rides" && (
            <>
              <div className="grid flex-1 gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {activeTab === "hotels" ? "Check-in & Check-out" : "When are you traveling?"}
                </label>
                <DateRangePicker
                  value={values.dates}
                  onChange={(value) => setValues((prev) => ({ ...prev, dates: value }))}
                  placeholder="Select your travel dates"
                />
              </div>
              
              <div className="grid flex-1 gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  {activeTab === "hotels" ? "How many guests?" : "How many travelers?"}
                </label>
                <GuestSelector
                  value={values.travellers}
                  onChange={(value) => setValues((prev) => ({ ...prev, travellers: value }))}
                  placeholder={activeTab === "hotels" ? "Select guests" : "Select travelers"}
                />
              </div>
            </>
          )}
          
          <Button
            type="submit"
            className="h-[56px] w-full rounded-lg bg-primary px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl md:w-auto mt-4 md:mt-0"
          >
            <Search className="mr-2 size-5" />
            Find {activeTab === "destinations" ? "Places" : activeTab === "hotels" ? "Hotels" : activeTab === "experiences" ? "Experiences" : activeTab === "food" ? "Food" : activeTab === "rides" ? "Rides" : activeTab === "flights" ? "Flights" : "Trains"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TravelSearchBar;
