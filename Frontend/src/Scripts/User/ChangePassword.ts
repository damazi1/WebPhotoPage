interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export async function changePassword(payload: ChangePasswordPayload) {
  const res = await fetch("http://localhost:8080/user/me/password", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Błąd zmiany hasła");
  }
}
