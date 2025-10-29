
import axios from "axios";

interface LoginResponse {
  success: boolean;
  data?: any;
  message?: string;
}

const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      { email, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    if (response.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
      return { success: true, data: response.data };
    }

    return { success: false, message: response.data.message };
  } catch (error: any) {
    console.error("Błąd logowania:", error);
    return { success: false, message: error.message };
  }
};


export default handleLogin