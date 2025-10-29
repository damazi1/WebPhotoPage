export const fetchFollowersCount = async (id: string): Promise<number> => {
  try {
    const res = await fetch(`http://localhost:8080/follow/followers/${id}`);
    if (!res.ok) throw new Error("Błąd pobierania followers");
    const data = await res.json();
    return data.followersCount;
  } catch (err) {
    console.error(err);
    return 0;
  }
};