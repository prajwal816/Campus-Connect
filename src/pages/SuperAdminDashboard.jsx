import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  User, Calendar, Users, TrendingUp, CheckCircle, Eye, MoreHorizontal, 
  UserCheck, Activity, Shield, AlertTriangle, LogOut, Settings
} from "lucide-react";
import { mockAuth } from "@/lib/auth";

// Mock data
const stats = [
  { 
    title: "Total Events", 
    value: "156", 
    change: "+12%",
    icon: Calendar, 
    color: "text-primary"
  },
  { 
    title: "Active Users", 
    value: "2,847", 
    change: "+5%",
    icon: Users, 
    color: "text-success"
  },
  { 
    title: "Total Registrations", 
    value: "8,924", 
    change: "+18%",
    icon: UserCheck, 
    color: "text-secondary"
  },
  { 
    title: "Pending Reviews", 
    value: "23", 
    change: "-3%",
    icon: AlertTriangle, 
    color: "text-warning"
  }
];

const recentEvents = [
  { id: 1, title: "Tech Innovation Workshop", date: "March 15, 2024", registrations: 45, college: "Stanford", status: "active" },
  { id: 2, title: "Career Fair 2024", date: "April 22, 2024", registrations: 120, college: "MIT", status: "published" },
  { id: 3, title: "AI & ML Symposium", date: "February 28, 2024", registrations: 78, college: "Harvard", status: "completed" }
];

const userActivity = [
  { id: 1, user: "John Doe", college: "Stanford", lastActive: "2 hours ago", events: 12, status: "active" },
  { id: 2, user: "Jane Smith", college: "MIT", lastActive: "1 day ago", events: 8, status: "active" },
  { id: 3, user: "Bob Johnson", college: "Harvard", lastActive: "3 days ago", events: 15, status: "inactive" }
];

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has super-admin role
    const user = mockAuth.getCurrentUser();
    if (!user || user.role !== 'super-admin') {
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
                <Link 
                  to="#" 
                  className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Admin Panel
                </Link>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage platform events, users, and system health</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {" "}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="events">Event Management</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="logs">Admin Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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
                          <p className="text-xs text-muted-foreground">{event.college} • {event.date}</p>
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

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Status</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Normal</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivity.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.user}</TableCell>
                        <TableCell>{user.college}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>{user.events}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Management Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Platform Events</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>College</TableHead>
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
                        <TableCell>{event.college}</TableCell>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle>Registration Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Registration data</h3>
                  <p className="text-muted-foreground">Detailed registration analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Admin Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium text-foreground mb-2">System Logs</h3>
                  <p className="text-muted-foreground">Administrative activity logs would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;