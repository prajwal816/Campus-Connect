import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users } from "lucide-react";
import { mockAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!formData.fullName || !formData.email || !formData.college || !formData.password) {
      toast({
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Save user data to localStorage
    mockAuth.signUp({
      email: formData.email,
      fullName: formData.fullName,
      role: formData.role,
      college: formData.college
    });

    toast({
      title: "Success",
      description: "Account created successfully!",
    });

    // Redirect to appropriate dashboard
    const redirectPath = mockAuth.getRedirectPath(formData.role);
    navigate(redirectPath);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Registration Card */}
        <Card className="bg-card shadow-xl rounded-3xl border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* App Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-secondary to-primary rounded-3xl flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">Join CampusEventHub</h1>
              <p className="text-muted-foreground text-base">Create your account to start exploring events</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-14 bg-muted/30 border-border rounded-xl text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-14 bg-muted/30 border-border rounded-xl text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="college" className="text-sm font-medium text-foreground">College/University</Label>
                <Select value={formData.college} onValueChange={(value) => handleInputChange("college", value)}>
                  <SelectTrigger className="h-14 bg-muted/30 border-border rounded-xl text-base">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-xl shadow-lg">
                    <SelectItem value="stanford" className="text-base py-3">Stanford University</SelectItem>
                    <SelectItem value="mit" className="text-base py-3">MIT</SelectItem>
                    <SelectItem value="harvard" className="text-base py-3">Harvard University</SelectItem>
                    <SelectItem value="other" className="text-base py-3">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-foreground">Account Type</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className="h-14 bg-muted/30 border-border rounded-xl text-base">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3 text-muted-foreground" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border rounded-xl shadow-lg">
                    <SelectItem value="student" className="text-base py-3">Student</SelectItem>
                    <SelectItem value="college-admin" className="text-base py-3">College Admin</SelectItem>
                    <SelectItem value="super-admin" className="text-base py-3">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-14 bg-muted/30 border-border rounded-xl pr-12 text-base"
                    required
                  />
                  <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="h-14 bg-muted/30 border-border rounded-xl pr-12 text-base"
                    required
                  />
                  <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero"
                className="w-full h-14 text-white font-semibold rounded-xl text-base border-0 shadow-lg hover:shadow-glow transition-all"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;