import { create } from "zustand";

interface AuthState {
  token: string | null;
  userEmail: string | null;
  setToken: (token: string | null, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  userEmail: localStorage.getItem("userEmail"),
  isAuthenticated: !!localStorage.getItem("token"),
  
  setToken: (token, email) => {
    if (token) {
      localStorage.setItem("token", token);
      if (email) {
        localStorage.setItem("userEmail", email);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    }
    set({ 
      token, 
      userEmail: email || null,
      isAuthenticated: !!token 
    });
  },
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    set({ 
      token: null, 
      userEmail: null,
      isAuthenticated: false 
    });
  }
}));
