import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, User, AlertCircle } from "lucide-react";
import { mockAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Check if user exists in localStorage
    const mockUser = mockAuth.getCurrentUser();
    
    if (!mockUser) {
      setError("User not found. Please sign up to continue.");
      return;
    }

    // Simple check - in real app you'd verify credentials
    if (mockUser.email === email && mockUser.role === loginAs) {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      // Redirect to appropriate dashboard
      const redirectPath = mockAuth.getRedirectPath(loginAs);
      navigate(redirectPath);
    } else {
      setError("Invalid credentials or role mismatch. Please check your email and selected role.");
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <Card className="bg-card shadow-xl rounded-3xl border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* App Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">Welcome Back</h1>
              <p className="text-muted-foreground text-base">Sign in to your CampusEventHub account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-muted/30 border-border rounded-xl text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 bg-muted/30 border-border rounded-xl pr-12 text-base"
                    required
                  />
                  <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginAs" className="text-sm font-medium text-foreground">Login as</Label>
                <Select value={loginAs} onValueChange={setLoginAs}>
                  <SelectTrigger className="h-14 bg-muted/30 border-primary rounded-xl border-2 text-base">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-muted-foreground" />
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

              {error && (
                <div className="flex items-center space-x-2 text-destructive text-sm bg-destructive/10 p-4 rounded-xl">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                variant="hero"
                className="w-full h-14 text-white font-semibold rounded-xl text-base border-0 shadow-lg hover:shadow-glow transition-all"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;