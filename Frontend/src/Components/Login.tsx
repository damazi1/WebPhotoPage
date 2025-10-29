import {useState} from "react";
import { useNavigate } from "react-router-dom";
import handleLogin from "../Scripts/User/Login";
import '../Styles/Register.css';


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

  const submitLogin = async () => {
    const result = await handleLogin(email, password);
    if (!result.success) alert(result.message);
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
        <button type="button" onClick={submitLogin}>Login</button>
      </label>
    </div>
  );
}

export default Login;
