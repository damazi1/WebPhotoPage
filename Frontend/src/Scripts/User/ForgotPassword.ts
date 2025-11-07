export async function requestPasswordReset(email: string) {
  const res = await fetch("http://localhost:8080/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Nie udało się wysłać resetu hasła");
  }

  return res.text();
}
