import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../Styles/Profile.css';
import Utworzone from './Utworzone';
import { fetchFollowersCount } from "../Scripts/User/Followers";
import { fetchFollowingCount } from "../Scripts/User/Following";
import { fetchUserProfile } from "../Scripts/User/UserProfile";
import { followUser } from "../Scripts/User/FollowUser";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
import { fetchUserAvatar } from '../Scripts/User/Photo';

interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [flag, setFlag] = useState(true);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>('/avatar-default.webp');


   const refreshFollowCounts = async () => {
    if (!id) return;
    const followers = await fetchFollowersCount(id);
    const following = await fetchFollowingCount(id);
    setFollowersCount(followers);
    setFollowingCount(following);
  };
  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      const data = await fetchUserProfile(id);
      if (data) {
        setUser(data);
        const avatarPath = await fetchUserAvatar(data.userId);
        setAvatar(avatarPath);
      }
      await refreshFollowCounts();
    };
    loadUser();
  }, [id]);

  const handleFollowClick = async () => {
    if (!user) return;
      const loggedInUser = await fetchUserLogged();
      if (!loggedInUser) {
      console.error("Nie udało się pobrać zalogowanego użytkownika");
      return;
      }
      const loggedInUserId = loggedInUser.userId; // w praktyce pobrać z sesji/context
      const success = await followUser(loggedInUserId, user.userId);
      if (success) await refreshFollowCounts();
      else console.error("Nie udało się followować użytkownika");
  }
  if (!user) return <p>Ładowanie...</p>;

  return (
    <div className='prof-main'>
      <label>
        <img src={avatar ? avatar : '/avatar-default.webp'} alt="zdjęcie profilowe" style={{ width: 100, height: 100, borderRadius: '50%' }}/>
        <p>{user.name}</p>
        <p>Email: {user.email}</p>
      </label>
      <label>
        <p>Followers: {followersCount}</p>
        <p>Following: {followingCount}</p>
      </label>
      <label>
        <button>Udostępnij</button>
      </label>

      <label>
        <a 
          style={flag ? { textDecoration: "underline" } : {}}
          onClick={() => setFlag(true)}
        >
          Utworzone
        </a>
        <button 
          style={!flag ? { textDecoration: "underline" } : {}} 
          onClick={handleFollowClick}
        >
          Follow
        </button>
      </label>

      <Utworzone />
    </div>
  );
}

export default UserProfile;
