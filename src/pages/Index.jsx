import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                CampusEventHub
              </h1>
            </div>
            
            {/* Center Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#students" className="text-gray-600 hover:text-gray-900 transition-colors">
                For Students
              </a>
              <a href="#organizers" className="text-gray-600 hover:text-gray-900 transition-colors">
                For Organizers
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Extraordinary</span>
                <br />
                <span className="text-blue-600">
                  Campus Events,
                </span>
                <br />
                <span className="text-gray-900">Every Day.</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Plan, manage, and discover unforgettable events. Connect students and colleges seamlessly on one centralized platform.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/events">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg w-full sm:w-auto">
                    Explore Events
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Campus Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamlined event management and discovery for the modern campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "📅", title: "Event Discovery", desc: "Find events that match your interests and schedule" },
              { icon: "👥", title: "Community", desc: "Connect with like-minded students and build networks" },
              { icon: "🏆", title: "Competitions", desc: "Participate in hackathons, contests, and challenges" },
              { icon: "🏫", title: "Campus Wide", desc: "Events from all departments and organizations" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using CampusEventHub to discover and manage amazing campus experiences.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;