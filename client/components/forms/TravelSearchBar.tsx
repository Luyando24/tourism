import { FormEvent, useState, useEffect } from "react";
import { Search, Plane, Building, MapPin, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DestinationAutocomplete from "./DestinationAutocomplete";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";

interface TravelSearchBarValues {
  destination: string;
  dates: string;
  travellers: string;
}

type SearchTab = "destinations" | "hotels" | "experiences" | "food";

const TravelSearchBar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchTab>("destinations");
  const [values, setValues] = useState<TravelSearchBarValues>({
    destination: "Victoria Falls",
    dates: "25 Nov - 02 Dec",
    travellers: "2 Adults",
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
  ];

  return (
    <div className="w-full">
      {/* Search Type Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-white/10 p-1 backdrop-blur-sm overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <IconComponent className="size-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl border border-white/20 bg-white/95 p-4 sm:p-6 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
          <div className="grid flex-1 gap-2">
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
          </div>
          
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
          
          <Button
            type="submit"
            className="h-[56px] w-full rounded-lg bg-primary px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl md:w-auto mt-4 md:mt-0"
          >
            <Search className="mr-2 size-5" />
            Find {activeTab === "destinations" ? "Places" : activeTab === "hotels" ? "Hotels" : activeTab === "experiences" ? "Experiences" : "Food"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TravelSearchBar;
