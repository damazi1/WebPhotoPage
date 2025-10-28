import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

function UsersList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/user/", {
      credentials: 'include' // uwierzytelnianie ciasteczkami
    })
      .then(res => {
        if (!res.ok) throw new Error("Błąd: " + res.status);
        return res.json();
      })
      .then((data: User[]) => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{margin:"150px"}}>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.userId}>
            <Link to={`/user/${u.userId}`} style={{textDecoration: "none", color: "blue"}}>
              <strong>{u.name}</strong>
            </Link> ({u.email}) - Role: {u.roles}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
