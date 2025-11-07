export async function toggleLike(postId: number) {
  const res = await fetch(`http://localhost:8080/post/${postId}/like`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Błąd podczas polubienia posta");
}
