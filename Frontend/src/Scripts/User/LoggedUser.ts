export interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

// Pobranie danych użytkownika po ID
export const fetchUserLogged = async () => {
  try {
    const res = await fetch(`http://localhost:8080/user/me`, { credentials: 'include' });
    if (!res.ok) throw new Error("Błąd pobierania danych użytkownika");
    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};