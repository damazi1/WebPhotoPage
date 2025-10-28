import {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Register.css';
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook do przekierowań

    /**
     * Tak powinny wyglądać odwołania mniej więcej
     * możecie to poprawić według własnych potrzeb
     * Polecam utworzyć wszystkie zapytania w osobnym pakiecie
     * importować pakiet i tylko wywoływać metody żeby tu było mniej kodu
     * Wszystko idzie po ciasteczkach więc wierze że dacie radę
     * Ciasteczka są w przeglądarce pod F12 -> Application -> Cookies
     * Serwer sam obsługuje ciasteczka więc nie trzeba ich ręcznie dodawać
     * piszecie zapytanie i backend wszystko ogarnia
     */

  const handleLogin = async () => {
    try {
        const response = await axios.post("http://localhost:8080/auth/login",
            {email, password},
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
        if (response.status === 200) {
            localStorage.setItem("isLoggedIn","true")
            window.location.href = "/";
            return {success: true, data: response.data};
        }
        return {success: false, message: response.data.message};
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <div className="Panel" style={{margin:"200px"}}>
      <p>Logowanie</p>
      <label>
        E-mail: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Hasło: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        <button type="button" onClick={handleLogin}>Login</button>
      </label>
    </div>
  );
}

export default Login;
