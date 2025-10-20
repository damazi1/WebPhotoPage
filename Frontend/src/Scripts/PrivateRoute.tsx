import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("jwt"); // sprawdzamy, czy użytkownik jest zalogowany
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
