import { useState } from "react";
import { Calendar, Users, MapPin, Phone, Mail, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DateRangePicker from "@/components/forms/DateRangePicker";
import GuestSelector from "@/components/forms/GuestSelector";
import { useCurrency } from "@/contexts/CurrencyContext";

interface BookingFormProps {
  itemType: 'destination' | 'hotel' | 'package';
  itemName: string;
  itemImage?: string;
  basePrice?: number;
  onSubmit?: (bookingData: any) => void;
}

const BookingForm = ({ 
  itemType, 
  itemName, 
  itemImage, 
  basePrice = 500,
  onSubmit 
}: BookingFormProps) => {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Trip Details
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: { adults: 2, children: 0, infants: 0 },
    
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    
    // Special Requirements
    specialRequests: "",
    dietaryRequirements: "",
    accessibility: "",
    
    // Payment Information
    paymentMethod: "",
    
    // Marketing
    newsletter: false,
    updates: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalGuests = formData.guests.adults + formData.guests.children;
  const numberOfNights = formData.checkIn && formData.checkOut 
    ? Math.ceil((formData.checkOut.getTime() - formData.checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 1;
  const subtotal = basePrice * totalGuests * numberOfNights;
  const taxes = subtotal * 0.15; // 15% tax
  const total = subtotal + taxes;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    if (onSubmit) {
      onSubmit({ ...formData, total, itemName, itemType });
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-green-600">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Thank you for your booking. We'll send you a confirmation email shortly.
              </p>
            </div>
            <div className="rounded-lg bg-surface-soft p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Booking Reference:</span>
                  <span className="font-mono font-semibold">ZMB-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
              step >= stepNumber 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`h-0.5 w-8 ${
                step > stepNumber ? "bg-primary" : "bg-muted"
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {itemImage && (
                <img 
                  src={itemImage} 
                  alt={itemName}
                  className="h-32 w-full rounded-lg object-cover"
                />
              )}
              
              <div>
                <h3 className="font-semibold">{itemName}</h3>
                <Badge variant="secondary" className="mt-1">
                  {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span>
                    {formData.checkIn && formData.checkOut 
                      ? `${formData.checkIn.toLocaleDateString()} - ${formData.checkOut.toLocaleDateString()}`
                      : "Not selected"
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{totalGuests} guest{totalGuests !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>{numberOfNights}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees:</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                <Shield className="h-4 w-4" />
                <span>Secure booking protected by SSL</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Trip Details"}
                {step === 2 && "Personal Information"}
                {step === 3 && "Special Requirements"}
                {step === 4 && "Payment & Confirmation"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Trip Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold">Travel Dates</Label>
                      <div className="mt-2">
                        <DateRangePicker
                          startDate={formData.checkIn}
                          endDate={formData.checkOut}
                          onDateChange={(start, end) => {
                            handleInputChange('checkIn', start);
                            handleInputChange('checkOut', end);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Guests</Label>
                      <div className="mt-2">
                        <GuestSelector
                          guests={formData.guests}
                          onGuestsChange={(guests) => handleInputChange('guests', guests)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="za">South Africa</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Special Requirements */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any special requests or preferences for your trip..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                      <Input
                        id="dietaryRequirements"
                        placeholder="e.g., Vegetarian, Vegan, Allergies..."
                        value={formData.dietaryRequirements}
                        onChange={(e) => handleInputChange('dietaryRequirements', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="accessibility">Accessibility Needs</Label>
                      <Input
                        id="accessibility"
                        placeholder="Any accessibility requirements..."
                        value={formData.accessibility}
                        onChange={(e) => handleInputChange('accessibility', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Payment & Confirmation */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Payment Method *</Label>
                      <div className="mt-2 space-y-2">
                        {['Credit Card', 'Bank Transfer', 'PayPal'].map((method) => (
                          <label key={method} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method}
                              checked={formData.paymentMethod === method}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                              className="h-4 w-4 text-primary"
                              required
                            />
                            <span className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              {method}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
                      <p className="font-semibold">Payment Information:</p>
                      <p>You will be redirected to our secure payment processor to complete your booking. No payment will be charged until your booking is confirmed by our team.</p>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                          className="mt-1 h-4 w-4 text-primary"
                        />
                        <span className="text-sm">Subscribe to our newsletter for travel tips and exclusive offers</span>
                      </label>
                      
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.updates}
                          onChange={(e) => handleInputChange('updates', e.target.checked)}
                          className="mt-1 h-4 w-4 text-primary"
                        />
                        <span className="text-sm">Receive SMS updates about your booking</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  
                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (step === 1 && (!formData.checkIn || !formData.checkOut)) ||
                        (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country))
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.paymentMethod}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;