import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleLogin from "../Scripts/User/Login";
import { requestPasswordReset } from "../Scripts/User/ForgotPassword";
import "../Styles/Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [isSubmittingForgot, setIsSubmittingForgot] = useState(false);
  const navigate = useNavigate(); // hook do przekierowan

  /**
   * Tak powinny wygladac odwolania mniej wiecej
   * mozecie to poprawic wedlug wlasnych potrzeb
   * Polecam utworzyc wszystkie zapytania w osobnym pakiecie
   * importowac pakiet i tylko wywolywac metody zeby tu bylo mniej kodu
   * Wszystko idzie po ciasteczkach wiec wierze ze dacie rade
   * Ciasteczka sa w przegladarce pod F12 -> Application -> Cookies
   * Serwer sam obsluguje ciasteczka wiec nie trzeba ich recznie dodawac
   * piszecie zapytanie i backend wszystko ogarnia
   */

  const submitLogin = async (e?: FormEvent) => {
    e?.preventDefault();
    const result = await handleLogin(email, password);
    if (!result.success) alert(result.message);
  };

  const submitForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError("Podaj adres e-mail");
      return;
    }
    setForgotError("");
    setForgotMessage("");
    try {
      setIsSubmittingForgot(true);
      const message = await requestPasswordReset(forgotEmail.trim());
      setForgotMessage(message || "Sprawdź swoją skrzynkę e-mail");
    } catch (err: any) {
      setForgotError(err?.message ?? "Nie udało się wysłać linku resetującego");
    } finally {
      setIsSubmittingForgot(false);
    }
  };

  return (
    <div className="Panel">
      <p>Logowanie</p>
      <form className="auth-card" onSubmit={submitLogin}>
        <label>
          E-mail:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Haslo:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        <div className="auth-links">
          <button type="button" className="auth-link" onClick={() => navigate("/Register")}>
            Nie masz konta? Zarejestruj sie
          </button>
          <button
            type="button"
            className="auth-link auth-link--ghost"
            onClick={() => setForgotVisible((prev) => !prev)}
          >
            Zapomniales haslo?
          </button>
        </div>
        {forgotVisible && (
          <div className="forgot-panel">
            <p>Podaj e-mail, aby otrzymać instrukcję resetu.</p>
            <form onSubmit={submitForgotPassword}>
              <input
                type="email"
                placeholder="Adres e-mail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <button type="submit" disabled={isSubmittingForgot}>
                {isSubmittingForgot ? "Wysyłanie..." : "Wyślij link"}
              </button>
            </form>
            {forgotError && <span className="form-error">{forgotError}</span>}
            {forgotMessage && <span className="form-success">{forgotMessage}</span>}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
