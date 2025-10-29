export const fetchUserLogout = async () => {
  try {
    const res = await fetch(`http://localhost:8080/user/logout`, { method: 'POST',credentials: 'include' });
    if (!res.ok) throw new Error("Nie jestes zalogowany");
  } catch (err) {
    console.error(err);
    return null;
  }
};