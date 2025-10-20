import { useState } from "react";
import '../Styles/Register.css';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // zapobiega przeładowaniu strony
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone })
      });

      if (res.ok) {
        setMessage("User added successfully!");
        setName(""); setEmail(""); setPassword(""); setPhone("");
      } else {
        setMessage("Failed to add user.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="Panel">
      <p>Sign up</p>
      <form onSubmit={handleSubmit}>
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
          Telefon:
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <button type="submit">Sign up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
