import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, MapPin, Clock, Shield, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Go Drive</span>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Your Ride, Your Way
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Book a ride in minutes. Track your driver in real-time. Get to your destination safely and comfortably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => window.location.href = '/book-ride'}>
                  Book a Ride
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => window.location.href = '/become-driver'}>
                  Become a Driver
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center h-64">
                  <Car className="h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Go Drive?
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the future of ride-sharing with our premium features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Track your ride in real-time with GPS accuracy. Know exactly when your driver will arrive.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Booking</h3>
              <p className="text-muted-foreground">
                Book a ride in under 30 seconds. Our smart matching connects you with nearby drivers instantly.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                All drivers are verified. Share your trip with loved ones for added safety and peace of mind.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-primary-foreground/80">Happy Riders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-foreground/80">Active Drivers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join millions of riders who trust Go Drive for their daily commute
          </p>
          <Button size="lg" className="text-lg px-12">
            Download App Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Go Drive</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted ride-sharing partner for safe, comfortable, and reliable transportation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Contact Us</li>
                <li>Trust & Safety</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Go Drive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
