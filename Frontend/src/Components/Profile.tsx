import { useEffect, useState, useRef } from "react";
import "../Styles/Profile.css";
import Utworzone from "./Utworzone";
import Zapisane from "./Zapisane";
import { fetchFollowersCount } from "../Scripts/User/Followers";
import { fetchFollowingCount } from "../Scripts/User/Following";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
import { fetchUserAvatar, uploadUserAvatar } from "../Scripts/User/Photo";
import { updateProfile } from "../Scripts/User/UpdateProfile";
import { changePassword } from "../Scripts/User/ChangePassword";
import { addPost } from "../Scripts/Post/AddPost";
import type { FormEvent } from "react";


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
  const [avatar, setAvatar] = useState<string>("/avatar-default.webp");

  // 🔹 Modal state (Utwórz)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [description, setDescription] = useState("");
  const [postFile, setPostFile] = useState<File | null>(null);
  const [postPreview, setPostPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const [refreshPosts, setRefreshPosts] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [profileInfo, setProfileInfo] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editError, setEditError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const availableTags = [
    "Kuchnia",
    "Salon",
    "Industrialny",
    "Nowoczesny",
    "Minimalizm",
  ];

  // 🧩 Avatar logic
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;
  const file = e.target.files[0];

  try {
    const success = await uploadUserAvatar(file);
    if (success && user) {
      const avatarPath = await fetchUserAvatar(user.userId);
      setAvatar(`${avatarPath}?t=${Date.now()}`); // odświeżenie
    } else {
      console.error("Nie udało się zaktualizować avatara");
    }
  } catch (err) {
    console.error("Błąd podczas przesyłania avatara:", err);
  }
};


  // 🧩 Create modal logic
  const handlePostFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setPostFile(f);
    setPostPreview(f ? URL.createObjectURL(f) : null);
  };

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!postFile) {
      alert("Wybierz zdjęcie");
      return;
    }
    try {
      await addPost(description, postFile);
      setDescription("");
      setPostFile(null);
      setPostPreview(null);
      setTags([]);
      setShowCreateModal(false);
      setRefreshPosts((prev) => !prev);
    } catch (err) {
      console.error("Błąd dodawania posta:", err);
    }
  };

  const openEditModal = () => {
    if (!user) return;
    setEditName(user.name);
    setEditEmail(user.email);
    setEditError("");
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordFields(false);
    setShowEditModal(true);
  };

  const handleEditProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const trimmedName = editName.trim();
    const trimmedEmail = editEmail.trim();
    if (!trimmedName || !trimmedEmail) {
      setEditError("Wszystkie pola są wymagane");
      return;
    }

    const trimmedCurrent = currentPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();
    const wantsPasswordChange =
      trimmedCurrent.length > 0 ||
      trimmedNew.length > 0 ||
      trimmedConfirm.length > 0;

    if (wantsPasswordChange) {
      if (!trimmedCurrent || !trimmedNew || !trimmedConfirm) {
        setPasswordError("Uzupełnij wszystkie pola hasła");
        return;
      }
      if (trimmedNew.length < 8) {
        setPasswordError("Hasło musi mieć co najmniej 8 znaków");
        return;
      }
      if (trimmedNew !== trimmedConfirm) {
        setPasswordError("Hasła nie są zgodne");
        return;
      }
    }

    try {
      setIsSavingProfile(true);
      setEditError("");
      setPasswordError("");
      const updated: User = await updateProfile({
        name: trimmedName,
        email: trimmedEmail,
      });
      setUser(updated);

      if (wantsPasswordChange) {
        await changePassword({
          oldPassword: trimmedCurrent,
          newPassword: trimmedNew,
        });
        setProfileInfo("Profil i hasło zostały zaktualizowane");
      } else {
        setProfileInfo("Profil został zaktualizowany");
      }
      setTimeout(() => setProfileInfo(""), 3000);
      setShowEditModal(false);
    } catch (err: any) {
      const message =
        err?.message ??
        (wantsPasswordChange
          ? "Nie udało się zaktualizować profilu lub hasła"
          : "Nie udało się zaktualizować profilu");
      setEditError(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleShareProfile = async () => {
    if (!user) return;
    const profileUrl = window.location.href;
    try {
      if ("share" in navigator && typeof (navigator as any).share === "function") {
        await (navigator as any).share({
          title: `${user.name} – profil`,
          url: profileUrl,
        });
        setShareMessage("Profil udostępniony ✔");
      } else if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(profileUrl);
        setShareMessage("Link do profilu skopiowany");
      } else {
        setShareMessage("Twoja przeglądarka nie obsługuje udostępniania");
      }
    } catch (err) {
      console.error("Błąd podczas udostępniania profilu:", err);
      setShareMessage("Nie udało się udostępnić profilu");
    }

    setTimeout(() => setShareMessage(""), 2500);
  };

  

  // 🧩 Load user data
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
            style={{ cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            style={{ display: "none" }}
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
          <button
            type="button"
            className="profile-button profile-button--ghost"
            onClick={handleShareProfile}
          >
            Udostępnij profil
          </button>
          <button type="button" className="profile-button" onClick={openEditModal}>
            Edytuj profil
          </button>
          <button
            type="button"
            className="profile-button profile-button--primary"
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Utwórz
          </button>
        </div>
        {shareMessage && <p className="share-info">{shareMessage}</p>}
        {profileInfo && <p className="share-info">{profileInfo}</p>}

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
          <Utworzone refreshTrigger={refreshPosts} />
        ) : (
          <Zapisane refreshTrigger={refreshPosts} isOwnProfile />
        )}
      </div>

      {/* 🔹 Modal: Utwórz nowy post */}
      {showCreateModal && (
        <div
          className="create-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="create-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Utwórz nowy post</h2>

            <form onSubmit={handleCreatePost}>
              <div className="create-image-area">
                {postPreview ? (
                  <img
                    src={postPreview}
                    alt="Podgląd"
                    className="create-image-preview"
                    onClick={() =>
                      document.getElementById("postFileInput")?.click()
                    }
                  />
                ) : (
                  <div
                    className="create-image-placeholder"
                    onClick={() =>
                      document.getElementById("postFileInput")?.click()
                    }
                  >
                    Kliknij, aby dodać zdjęcie
                  </div>
                )}
                <input
                  id="postFileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePostFileChange}
                />
              </div>

              <div className="create-field">
                <label>Opis</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Opisz swój projekt..."
                />
              </div>

              <div className="create-field">
                <label>Tagi</label>
                <div className="tag-list">
                  {availableTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`tag-btn ${
                        tags.includes(tag) ? "active" : ""
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="create-buttons">
                <button type="submit" className="create-save">
                  Zapisz
                </button>
                <button
                  type="button"
                  className="create-cancel"
                  onClick={() => setShowCreateModal(false)}
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Modal: Edytuj profil */}
      {showEditModal && (
        <div
          className="create-modal-overlay"
          onClick={() => (!isSavingProfile ? setShowEditModal(false) : undefined)}
        >
          <div className="create-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edytuj profil</h2>
            <form onSubmit={handleEditProfile}>
              <div className="create-field">
                <label>Imię i nazwisko</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="create-field">
                <label>Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="create-cancel"
                style={{ marginBottom: "12px" }}
                onClick={() => setShowPasswordFields((prev) => !prev)}
                disabled={isSavingProfile}
              >
                {showPasswordFields ? "Ukryj zmianę hasła" : "Zmień hasło"}
              </button>
              {showPasswordFields && (
                <>
                  <div className="create-field">
                    <label>Aktualne hasło</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="create-field">
                    <label>Nowe hasło</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="create-field">
                    <label>Powtórz nowe hasło</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              {editError && <p className="form-error">{editError}</p>}
              {passwordError && <p className="form-error">{passwordError}</p>}
              <div className="create-buttons">
                <button
                  type="button"
                  className="create-cancel"
                  onClick={() => (!isSavingProfile ? setShowEditModal(false) : undefined)}
                  disabled={isSavingProfile}
                >
                  Anuluj
                </button>
                <button type="submit" className="create-save" disabled={isSavingProfile}>
                  {isSavingProfile ? "Zapisywanie..." : "Zapisz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}

export default Profile;
