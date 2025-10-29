export interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

export const fetchUserLogged = async () => {
  try {
    const res = await fetch("http://localhost:8080/user/me", {
      credentials: "include",
    });

    if (res.status === 401 || res.status === 403) {
      // użytkownik niezalogowany
      return null;
    }

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
};
