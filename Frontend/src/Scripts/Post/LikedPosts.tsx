export async function fetchLikedPosts() {
  try {
    const res = await fetch("http://localhost:8080/post/liked", {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Błąd pobierania zapisanych postów");
    }

    return await res.json();
  } catch (err) {
    console.error("fetchLikedPosts error:", err);
    return [];
  }
}
