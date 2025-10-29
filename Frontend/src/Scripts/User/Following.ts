export const fetchFollowingCount = async (id: string): Promise<number> => {
  try {
    const res = await fetch(`http://localhost:8080/follow/following/${id}`);
    if (!res.ok) throw new Error("Błąd pobierania following");
    const data = await res.json();
    return data.followingCount;
  } catch (err) {
    console.error(err);
    return 0;
  }
};