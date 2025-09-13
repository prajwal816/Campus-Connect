// Mock authentication utility using localStorage

export const mockAuth = {
  // Save user to localStorage
  signUp: (userData) => {
    localStorage.setItem('mockUser', JSON.stringify(userData));
  },

  // Check if user exists in localStorage
  getCurrentUser: () => {
    const userData = localStorage.getItem('mockUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Remove user from localStorage
  logout: () => {
    localStorage.removeItem('mockUser');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('mockUser') !== null;
  },

  // Get redirect path based on role
  getRedirectPath: (role) => {
    switch (role) {
      case 'student':
        return '/student-dashboard';
      case 'college-admin':
        return '/college-admin-dashboard';
      case 'super-admin':
        return '/admin-dashboard';
      default:
        return '/student-dashboard';
    }
  }
};