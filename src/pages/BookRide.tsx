import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const BookRide = () => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookRide = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to book a ride.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Create ride request (using dummy coordinates for now)
      const { error } = await supabase
        .from("rides")
        .insert({
          rider_id: user.id,
          pickup_address: pickupAddress,
          destination_address: destinationAddress,
          pickup_latitude: 40.7128, // NYC coordinates as placeholder
          pickup_longitude: -74.0060,
          destination_latitude: 40.7589,
          destination_longitude: -73.9851,
          status: "requested"
        });

      if (error) throw error;

      toast({
        title: "Ride Requested!",
        description: "We're finding a driver for you.",
      });

      // Reset form
      setPickupAddress("");
      setDestinationAddress("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to book ride",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Book a Ride</CardTitle>
          <p className="text-muted-foreground">Where would you like to go?</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBookRide} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">
                <MapPin className="inline w-4 h-4 mr-2" />
                Pickup Location
              </Label>
              <Input
                id="pickup"
                type="text"
                placeholder="Enter pickup address"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">
                <Navigation className="inline w-4 h-4 mr-2" />
                Destination
              </Label>
              <Input
                id="destination"
                type="text"
                placeholder="Enter destination address"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Booking..." : "Book Ride"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-muted-foreground"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookRide;