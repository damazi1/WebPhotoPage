export async function fetchLikes(postId: number): Promise<number> {
  const res = await fetch(`http://localhost:8080/post/${postId}/likes`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Błąd pobierania polubień");
  const data: number = await res.json();
  return data;
}
