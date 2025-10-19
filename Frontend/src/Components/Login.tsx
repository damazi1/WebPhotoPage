import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Register.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook do przekierowań

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const token = await res.text(); // backend zwraca token jako string
        localStorage.setItem("jwt", token);
        alert("Zalogowano pomyślnie!");
        navigate("/"); // przekierowanie po zalogowaniu
      } else {
        alert("Błędne dane logowania");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <div className="Panel">
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
