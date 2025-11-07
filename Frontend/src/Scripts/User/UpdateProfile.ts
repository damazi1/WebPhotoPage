interface UpdateProfilePayload {
  name: string;
  email: string;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const res = await fetch("http://localhost:8080/user/me", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Błąd aktualizacji profilu");
  }

  return res.json();
}
