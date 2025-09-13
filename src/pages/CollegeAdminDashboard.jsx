import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, User, Calendar, Users, TrendingUp, CheckCircle, Eye, MoreHorizontal, Download, UserCheck, LogOut } from "lucide-react";
import { mockAuth } from "@/lib/auth";

// Mock data
const stats = [
  { 
    title: "Total Events", 
    value: "24", 
    icon: Calendar, 
    color: "text-primary"
  },
  { 
    title: "Active Events", 
    value: "8", 
    icon: CheckCircle, 
    color: "text-success"
  },
  { 
    title: "Total Registrations", 
    value: "1,247", 
    icon: Users, 
    color: "text-secondary"
  },
  { 
    title: "Average Participants", 
    value: "52", 
    icon: TrendingUp, 
    color: "text-warning"
  }
];

const recentEvents = [
  {
    id: 1,
    title: "Tech Innovation Workshop",
    date: "March 15, 2024",
    registrations: 45,
    status: "active"
  },
  {
    id: 2,
    title: "Career Fair 2024",
    date: "April 22, 2024",
    registrations: 120,
    status: "published"
  },
  {
    id: 3,
    title: "AI & ML Symposium",
    date: "February 28, 2024",
    registrations: 78,
    status: "completed"
  }
];

const CollegeAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has college-admin role
    const user = mockAuth.getCurrentUser();
    if (!user || user.role !== 'college-admin') {
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
            <div className="flex items-center space-x-8">
              <Link to="/">
                <h1 className="text-xl font-bold text-primary">CampusEventHub</h1>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab("events")}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === "events" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === "dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Dashboard
                </button>
              </nav>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Organizer Dashboard</h1>
          <p className="text-muted-foreground">Create and manage your campus events</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="events">All Events</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground">{event.registrations} registrations</p>
                        </div>
                        <Badge variant={
                          event.status === "active" ? "default" :
                          event.status === "published" ? "secondary" : "outline"
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Event
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <UserCheck className="w-4 h-4 mr-2" />
                      View All Registrations
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Event Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* All Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Events Overview</CardTitle>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Event
                </Button>
              </CardHeader>
              <CardContent>
                {recentEvents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Registrations</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.registrations}</TableCell>
                          <TableCell>
                            <Badge variant={
                              event.status === "active" ? "default" :
                              event.status === "published" ? "secondary" : "outline"
                            }>
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0V19a2 2 0 002 2h4a2 2 0 002-2V7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No events created</h3>
                    <p className="text-muted-foreground">Get started by creating your first event!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollegeAdminDashboard;