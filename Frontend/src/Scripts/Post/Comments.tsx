export interface PostComment {
  id: number;
  content: string;
  authorName: string | null;
  authorEmail: string;
  avatarUrl: string | null;
  creationDate: string | null;
}

export async function fetchComments(postId: number): Promise<PostComment[]> {
  const res = await fetch(`http://localhost:8080/post/${postId}/comments`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Błąd pobierania komentarzy");
  const data: PostComment[] = await res.json();
  return data;
}

export async function addComment(postId: number, content: string) {
  const res = await fetch(`http://localhost:8080/post/${postId}/comment`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Błąd dodawania komentarza");
}

export async function deleteComment(postId: number, commentId: number) {
  const res = await fetch(
    `http://localhost:8080/post/${postId}/comment/${commentId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Błąd usuwania komentarza");
}
