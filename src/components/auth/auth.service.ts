const API_URL = import.meta.env.VITE_API_URL + "/auth";
import axios from "axios";

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", email);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to login");
      }
      throw error;
    }
  },

  async signup(email: string, password: string) {
    try {
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to signup");
      }
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("token");
  },
};
