export async function fetchUserPosts() {
  try {
    const response = await fetch("http://localhost:8080/post/my", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Błąd pobierania postów użytkownika");
    }

    return await response.json();
  } catch (err) {
    console.error("fetchUserPosts error:", err);
    return [];
  }
}
