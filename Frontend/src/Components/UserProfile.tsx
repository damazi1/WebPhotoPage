import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/user/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then((data: User) => {
        setUser(data)
        console.log(data)
    })
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p>Ładowanie...</p>;

  return (
    <div style={{margin:"150px"}}>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.roles}</p>
    </div>
  );
}

export default UserProfile;
