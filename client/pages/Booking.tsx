import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Shield, Award, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/booking/BookingForm";
import { featuredDestinations, premiumStays, travelPackages } from "@/data/content";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [bookingItem, setBookingItem] = useState<any>(null);
  const [itemType, setItemType] = useState<'destination' | 'hotel' | 'package'>('destination');

  useEffect(() => {
    const type = searchParams.get('type') as 'destination' | 'hotel' | 'package' || 'destination';
    const itemName = searchParams.get('item') || '';
    
    setItemType(type);

    // Find the item based on type and name
    let item = null;
    switch (type) {
      case 'destination':
        item = featuredDestinations.find(d => d.name === itemName);
        break;
      case 'hotel':
        item = premiumStays.find(h => h.name === itemName);
        break;
      case 'package':
        item = travelPackages.find(p => p.name === itemName);
        break;
    }

    if (item) {
      setBookingItem(item);
    } else {
      // Default item if none found
      setBookingItem({
        name: itemName || 'Zambia Experience',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8
      });
    }
  }, [searchParams]);

  const handleBookingSubmit = (bookingData: any) => {
    console.log('Booking submitted:', bookingData);
    // Here you would typically send the data to your backend
  };

  const getBasePrice = () => {
    if (itemType === 'hotel' && bookingItem?.pricePerNightUSD) {
      return bookingItem.pricePerNightUSD;
    }
    if (itemType === 'package' && bookingItem?.priceUSD) {
      return bookingItem.priceUSD;
    }
    // Default pricing based on type
    switch (itemType) {
      case 'destination':
        return 350;
      case 'hotel':
        return 450;
      case 'package':
        return 1200;
      default:
        return 350;
    }
  };

  if (!bookingItem) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-6xl">🔍</div>
          <h2 className="mt-4 text-xl font-semibold">Loading booking details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-soft min-h-screen">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Complete Your Booking</h1>
          <p className="mt-2 text-muted-foreground">
            You're just a few steps away from your amazing Zambian adventure
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Secure Payment</div>
                  <div className="text-sm text-muted-foreground">SSL encrypted</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Best Price Guarantee</div>
                  <div className="text-sm text-muted-foreground">Lowest rates</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">24/7 Support</div>
                  <div className="text-sm text-muted-foreground">Always here to help</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm
          itemType={itemType}
          itemName={bookingItem.name}
          itemImage={bookingItem.image}
          basePrice={getBasePrice()}
          onSubmit={handleBookingSubmit}
        />

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Need Help?</h3>
              <p className="mt-2 text-muted-foreground">
                Our travel experts are available 24/7 to assist you with your booking.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call +260 123 456 789
                </Button>
                <Button variant="outline">
                  Live Chat Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;