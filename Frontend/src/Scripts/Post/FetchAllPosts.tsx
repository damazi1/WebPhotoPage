// Plik: src/Scripts/Post/FetchAllPosts.ts

export async function fetchAllPosts() {
  try {
    const res = await fetch("http://localhost:8080/post/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Jeśli mimo to nie zadziała, odkomentuj linię poniżej (jeśli masz token w localStorage):
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!res.ok) {
      throw new Error(`Błąd pobierania postów: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchAllPosts error:", err);
    return [];
  }
}