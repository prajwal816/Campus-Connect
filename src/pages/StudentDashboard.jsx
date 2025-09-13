import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut } from "lucide-react";
import { mockAuth } from "@/lib/auth";

const StudentDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has student role
    const user = mockAuth.getCurrentUser();
    if (!user || user.role !== 'student') {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    mockAuth.logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <h1 className="text-xl font-bold text-primary">CampusEventHub</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {currentUser.fullName}
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
                {showLogoutMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {currentUser.fullName.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Discover and register for exciting campus events</p>
        </div>

        {/* My Registered Events Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Registered Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0V19a2 2 0 002 2h4a2 2 0 002-2V7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">You haven't registered for any events yet</h3>
              <p className="text-muted-foreground mb-4">Start exploring!</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Explore Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;