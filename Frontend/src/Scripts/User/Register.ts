// src/services/authService.ts
import axios from "axios";

interface AuthResponse {
  success: boolean;
  data?: any;
  message?: string;
}


// Funkcja rejestracji
export const handleRegister = async (name: string, email: string, password: string, roles: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/register",
      { name, email, password, roles },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    }

    return { success: false, message: response.data.message };
  } catch (error: any) {
    console.error("Błąd rejestracji:", error);
    return { success: false, message: error.message };
  }
};
