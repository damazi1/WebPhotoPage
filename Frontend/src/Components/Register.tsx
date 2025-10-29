import { useState } from "react";
import '../Styles/Register.css';
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../Scripts/User/Register";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState("");
  const navigate = useNavigate(); // hook do przekierowań

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleRegister(name, email, password, roles);

    if (result.success) {
      navigate("/Login");
    } else {
      setMessage(result.message || "Rejestracja nie powiodła się!");
    }
  };

  return (
    <div className="Panel">
      <p>Rejestracja</p>
      <form className="auth-card" onSubmit={submitRegister}>
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
