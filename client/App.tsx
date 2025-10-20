import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainLayout from "@/components/layout/MainLayout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Hotels from "./pages/Hotels";
import Food from "./pages/Food";
import Restaurant from "./pages/Restaurant";
import Taxi from "./pages/Taxi";
import Flights from "./pages/Flights";
import Trains from "./pages/Trains";
import Explore from "./pages/Explore";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:name" element={<DestinationDetails />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/food" element={<Food />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/taxi" element={<Taxi />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/trains" element={<Trains />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/search" element={<SearchResults />} />
            </Route>
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
