import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Profile.css";
import Utworzone from "./Utworzone";
import { fetchFollowersCount } from "../Scripts/User/Followers";
import { fetchFollowingCount } from "../Scripts/User/Following";
import { fetchUserProfile } from "../Scripts/User/UserProfile";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
import { followUser } from "../Scripts/User/FollowUser";
import { fetchUserAvatar } from "../Scripts/User/Photo";
import Zapisane from "./Zapisane";

interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>("/avatar-default.webp");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showCreated, setShowCreated] = useState(true);


  const refreshFollowCounts = async (userId?: number) => {
    if (!userId) return;
    const followers = await fetchFollowersCount(userId.toString());
    const following = await fetchFollowingCount(userId.toString());
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
        await refreshFollowCounts(data.userId);
      }
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
    const success = await followUser(loggedInUser.userId, user.userId);
    if (success) {
      await refreshFollowCounts(user.userId);
      setIsFollowing((prev) => !prev);
    } else {
      console.error("Nie udało się followować użytkownika");
    }
  };

  if (!user) {
    return (
      <section className="profile-section">
        <p className="profile-loading">Ładowanie profilu...</p>
      </section>
    );
  }

  return (
    <section className="profile-section">
      <div className="profile-card">
        <header className="profile-header">
          <img
            src={avatar ? avatar : "/avatar-default.webp"}
            alt="Zdjęcie profilowe"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </header>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat__value">{followersCount}</span>
            <span className="profile-stat__label">Obserwujący</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat__value">{followingCount}</span>
            <span className="profile-stat__label">Obserwowani</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat__value">{user.roles}</span>
            <span className="profile-stat__label">Rola</span>
          </div>
        </div>

        <div className="profile-actions">
          <button type="button" className="profile-button profile-button--ghost">
            Udostępnij
          </button>
          <button
            type="button"
            className="profile-button"
            onClick={handleFollowClick}
          >
            {isFollowing ? "Obserwujesz" : "Follow"}
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
        {showCreated ? (
          <Utworzone userId={Number(id)} />
        ) : (
          <Zapisane userId={Number(id)} />
        )}
      </div>

    </section>
  );
}

export default UserProfile;
