import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { fetchUserLogged, type User } from "../Scripts/User/LoggedUser";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedUser = await fetchUserLogged();
      setUser(loggedUser);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  // jeżeli user istnieje, renderujemy children, w przeciwnym wypadku przekierowujemy
  return user ? <>{children}</> : <Navigate to="/Login" replace />;
};

export default PrivateRoute;
