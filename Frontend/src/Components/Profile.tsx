import { useEffect, useState } from "react";
import "../Styles/Profile.css";
import Utworzone from "./Utworzone";
import Zapisane from "./Zapisane";
import { fetchFollowersCount } from "../Scripts/User/Followers";
import { fetchFollowingCount } from "../Scripts/User/Following";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
import { useRef } from "react";

import { fetchUserAvatar, uploadUserAvatar } from '../Scripts/User/Photo';

interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

function Profile() {
  const [showCreated, setShowCreated] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>('/avatar-default.webp');


  const refreshFollowCounts = async (userId?: number) => {
    if (!userId) return;
    const followers = await fetchFollowersCount(userId.toString());
    const following = await fetchFollowingCount(userId.toString());
    setFollowersCount(followers);
    setFollowingCount(following);
  };
  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUserLogged();
      if (data) {
        setUser(data);
        const avatarPath = await fetchUserAvatar(data.userId);
        setAvatar(avatarPath);
        await refreshFollowCounts(data.userId);
      }
    };
    loadUser();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const success = await uploadUserAvatar(file);
    if (success && user) {
      const avatarPath = await fetchUserAvatar(user.userId);
      setAvatar(avatarPath);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  if (!user) {
    return (
      <section className="profile-section">
        <p className="profile-loading">Ladowanie profilu...</p>
      </section>
    );
  }

  return (
    <section className="profile-section">
      <div className="profile-card">
        <header className="profile-header">
        <img
          src={avatar ? avatar : '/avatar-default.webp'}
          alt="Zdjęcie profilowe"
          className="profile-avatar"
          style={{ cursor: 'pointer' }}
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </header>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat__value">{followersCount}</span>
            <span className="profile-stat__label">Followers</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat__value">{followingCount}</span>
            <span className="profile-stat__label">Following</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat__value">{user.roles}</span>
            <span className="profile-stat__label">Rola</span>
          </div>
        </div>

        <div className="profile-actions">
          <button type="button" className="profile-button profile-button--ghost">
            Udostepnij
          </button>
          <button type="button" className="profile-button">
            Edytuj profil
          </button>
        </div>

        <div
          className="profile-tabs"
          data-active={showCreated ? "created" : "saved"}
        >
          <button
            type="button"
            className={`profile-tab ${showCreated ? "is-active" : ""}`}
            onClick={() => setShowCreated(true)}
          >
            Utworzone
          </button>
          <button
            type="button"
            className={`profile-tab ${!showCreated ? "is-active" : ""}`}
            onClick={() => setShowCreated(false)}
          >
            Zapisane
          </button>
        </div>
      </div>

      <div className="profile-content">
        {showCreated ? <Utworzone /> : <Zapisane />}
      </div>
    </section>
  );
}

export default Profile;
