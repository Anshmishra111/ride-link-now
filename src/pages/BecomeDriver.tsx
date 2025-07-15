import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, FileText, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const BecomeDriver = () => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    licensePlate: "",
    licenseNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to become a driver.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if user already exists as driver
      const { data: existingDriver } = await supabase
        .from("drivers")
        .select("id")
        .eq("id", user.id)
        .single();

      if (existingDriver) {
        toast({
          title: "Already Registered",
          description: "You are already registered as a driver.",
          variant: "destructive",
        });
        return;
      }

      // Create driver profile
      const { error } = await supabase
        .from("drivers")
        .insert({
          id: user.id,
          vehicle_type: formData.vehicleType,
          vehicle_make: formData.vehicleMake,
          vehicle_model: formData.vehicleModel,
          vehicle_year: parseInt(formData.vehicleYear),
          vehicle_color: formData.vehicleColor,
          license_plate: formData.licensePlate,
          license_number: formData.licenseNumber,
          is_available: false,
          is_online: false
        });

      if (error) throw error;

      toast({
        title: "Driver Registration Successful!",
        description: "Welcome to the Go Drive driver network.",
      });

      // Reset form
      setFormData({
        vehicleType: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        vehicleColor: "",
        licensePlate: "",
        licenseNumber: ""
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register as driver",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Become a Driver</CardTitle>
          <p className="text-muted-foreground">Join our driver network and start earning</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Vehicle Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select onValueChange={(value) => handleInputChange("vehicleType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="pickup">Pickup Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleMake">Make</Label>
                  <Input
                    id="vehicleMake"
                    placeholder="e.g., Toyota"
                    value={formData.vehicleMake}
                    onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Model</Label>
                  <Input
                    id="vehicleModel"
                    placeholder="e.g., Camry"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleYear">Year</Label>
                  <Input
                    id="vehicleYear"
                    type="number"
                    placeholder="e.g., 2020"
                    min="2000"
                    max="2025"
                    value={formData.vehicleYear}
                    onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleColor">Color</Label>
                  <Input
                    id="vehicleColor"
                    placeholder="e.g., Black"
                    value={formData.vehicleColor}
                    onChange={(e) => handleInputChange("vehicleColor", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    placeholder="e.g., ABC123"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Driver License */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Driver License</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="Enter your driver's license number"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register as Driver"}
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

export default BecomeDriver;