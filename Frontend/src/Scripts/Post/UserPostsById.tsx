export async function fetchUserPostsById(userId: number) {
  try {
    const response = await fetch(`http://localhost:8080/post/user/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Błąd pobierania postów użytkownika");
    }

    return await response.json();
  } catch (err) {
    console.error("fetchUserPostsById error:", err);
    return [];
  }
}
