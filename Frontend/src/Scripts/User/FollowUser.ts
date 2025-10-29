export const followUser = async (loggedInUserId: number, followedId: number): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/follow/followUser/${loggedInUserId}/${followedId}`, {
      method: 'POST',
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};