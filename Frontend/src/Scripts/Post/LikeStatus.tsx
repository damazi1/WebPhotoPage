export async function fetchLikeStatus(postId: number): Promise<boolean> {
  const res = await fetch(`http://localhost:8080/post/${postId}/liked`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Błąd pobierania statusu polubienia");
  const data: boolean = await res.json();
  return data;
}
