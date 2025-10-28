import { useState } from "react";
import '../Styles/Register.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState("");
  const navigate = useNavigate(); // hook do przekierowań

    const handleRegister = async (e) => {
    e.preventDefault(); 
    try {
        const response = await axios.post("http://localhost:8080/auth/register",
            {name, email, password, roles},
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
        if (response.status === 200) {
            navigate("/Login");
            return {success: true, data: response.data};
        }
        return {success: false, message: response.data.message};
    } catch (error) {
      console.error("Błąd Rejestracji:", error);
      setMessage("Rejestracja nie powiodła się!");
    }
  };

  return (
    <div className="Panel">
      <p>Sign up</p>
      <form onSubmit={handleRegister}>
        <label>
          Login:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Hasło:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Role:
          <input type="text" value={roles} onChange={e => setRoles(e.target.value)} />
        </label>
        <button type="submit">Sign up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
