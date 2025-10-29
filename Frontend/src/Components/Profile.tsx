import { useState, useEffect } from 'react';
import '../Styles/Profile.css';
import Utworzone from './Utworzone';
import Zapisane from './Zapisane';
import { fetchFollowersCount } from "../Scripts/User/Followers";
import { fetchFollowingCount } from "../Scripts/User/Following";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}
function Profile() {
  const [flag, setFlag] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);


  useEffect(() => {
  const loadUser = async () =>{
    const data = await fetchUserLogged()
    if(data) {
      setUser(data);
      await refreshFollowCounts(data.userId);
    }
    
  }
    loadUser();
  },[]);
  
  const refreshFollowCounts = async (userId?: number) => {
    if (!userId) return;
    const followers = await fetchFollowersCount(userId.toString());
    const following = await fetchFollowingCount(userId.toString());
    setFollowersCount(followers);
    setFollowingCount(following);
  };

  if (!user) return <p>Ładowanie...</p>;
  return (
    <div className='prof-main'>
      <label>
        <img src={'avatar-default.webp'} alt="zdjęcie profilowe" />

        <p>{user.name}</p>
        <p>Email: {user.email}</p>
        <p>Followers: {followersCount}</p>
        <p>Following: {followingCount}</p>
      </label>

      <label>
        <button>Udostępnij</button>
        <button type="submit">Edytuj profil</button>
      </label>

      <label>
        <a onClick={() => setFlag(true)} style={flag ? { textDecoration: "underline" } : {}}>Utworzone</a>
        <a onClick={() => setFlag(false)} style={!flag ? { textDecoration: "underline" } : {}}>Zapisane</a>
      </label>

      {flag && <Utworzone />}
      {!flag && <Zapisane />}
    </div>
  );
}

export default Profile;
