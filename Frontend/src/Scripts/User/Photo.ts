export const fetchUserAvatar = async (userId: number): Promise<string> => {
  try {
    const res = await fetch(`http://localhost:8080/photo/avatar-by-id/${userId}`, {
      credentials: 'include'
    });
    if (!res.ok) throw new Error("Błąd pobierania awatara");

    const data = await res.json();
    const url = data.path.startsWith('/') ? `http://localhost:8080${data.path}` : data.path;
    return url;

  } catch (err) {
    console.error(err);
    return '/avatar-default.webp';
  }
};

export const uploadUserAvatar = async (file: File): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:8080/photo/avatar', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};
