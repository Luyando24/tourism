import { FormEvent, useState } from "react";
import { Search, Plane, Building, MapPin } from "lucide-react";
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

type SearchTab = "destinations" | "hotels" | "experiences";

const TravelSearchBar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SearchTab>("destinations");
  const [values, setValues] = useState<TravelSearchBarValues>({
    destination: "Victoria Falls",
    dates: "25 Nov - 02 Dec",
    travellers: "2 Adults",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Navigate to search results with query parameters
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
  ];

  return (
    <div className="w-full">
      {/* Search Type Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-white/10 p-1 backdrop-blur-sm overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
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
            </label>
            <DestinationAutocomplete
              value={values.destination}
              onChange={(value) => setValues((prev) => ({ ...prev, destination: value }))}
              placeholder={
                activeTab === "destinations" 
                  ? "Enter destination (e.g., Victoria Falls, Lusaka)"
                  : activeTab === "hotels"
                  ? "Enter city or area for hotels"
                  : "Enter location for experiences"
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
            Find {activeTab === "destinations" ? "Places" : activeTab === "hotels" ? "Hotels" : "Experiences"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TravelSearchBar;
