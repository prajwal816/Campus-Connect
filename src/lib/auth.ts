// Mock authentication utility using localStorage

export interface MockUser {
  email: string;
  fullName: string;
  role: string;
  college: string;
}

export const mockAuth = {
  // Save user to localStorage
  signUp: (userData: MockUser): void => {
    localStorage.setItem('mockUser', JSON.stringify(userData));
  },

  // Check if user exists in localStorage
  getCurrentUser: (): MockUser | null => {
    const userData = localStorage.getItem('mockUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Remove user from localStorage
  logout: (): void => {
    localStorage.removeItem('mockUser');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('mockUser') !== null;
  },

  // Get redirect path based on role
  getRedirectPath: (role: string): string => {
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