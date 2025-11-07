import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/UserList.css";
import { fetchUserAvatar } from "../Scripts/User/Photo";

interface User {
  userId: number;
  name: string;
  email: string;
  roles: string;
}

type SortDirection = "asc" | "desc";
type FetchState = "idle" | "loading" | "ready" | "error";

const API_BASE_URL = "http://localhost:8080";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join("") || "U";

const formatRoles = (roles: string) =>
  roles
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
  const [avatars, setAvatars] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<FetchState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    fetch(`${API_BASE_URL}/user/`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Błąd serwera (${res.status})`);
        }
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(Array.isArray(data) ? data : []);
        setStatus("ready");
        setErrorMessage("");
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") {
          return;
        }
        setStatus("error");
        setErrorMessage(err.message ?? "Nie udało się wczytać użytkowników.");
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/user/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Nie udało się pobrać danych zalogowanego użytkownika");
        }
        return res.json();
      })
      .then((data: User) => setLoggedUserId(data.userId))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!users.length) {
      return;
    }

    let isCancelled = false;

    const loadAvatars = async () => {
      const fetchedEntries = await Promise.all(
        users.map(async (user) => {
          const url = await fetchUserAvatar(user.userId);
          return [user.userId, url] as const;
        })
      );

      if (isCancelled) {
        return;
      }

      setAvatars((prev) => {
        const next = { ...prev };
        fetchedEntries.forEach(([id, url]) => {
          next[id] = url;
        });
        return next;
      });
    };

    loadAvatars();

    return () => {
      isCancelled = true;
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = filter.trim().toLowerCase();

    return users
      .filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(query)
      )
      .slice()
      .sort((a, b) =>
        sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [users, filter, sortDirection]);

  const shouldShowEmptyState =
    status === "ready" && filteredUsers.length === 0 && filter !== "";

  const toggleSortDirection = () =>
    setSortDirection((current) => (current === "asc" ? "desc" : "asc"));

  const subtitle =
    status === "ready"
      ? `Znaleziono ${filteredUsers.length} ${filteredUsers.length === 1 ? "osobę" : "osób"}.`
      : "Pobieramy listę użytkowników...";

  return (
    <section className="user-list">
      <header className="user-list__header">
        <div>
          <p className="user-list__eyebrow">Społeczność</p>
          <h1 className="user-list__title">Lista użytkowników</h1>
          <p className="user-list__subtitle">{subtitle}</p>
        </div>

        <div className="user-list__controls">
          <label className="sr-only" htmlFor="user-search">
            Wyszukaj użytkowników
          </label>
          <input
            id="user-search"
            className="user-list__input"
            placeholder="Szukaj po imieniu lub adresie e-mail"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />

          <button
            type="button"
            className="user-list__button"
            onClick={toggleSortDirection}
          >
            Sortuj {sortDirection === "asc" ? "A → Z" : "Z → A"}
          </button>
        </div>
      </header>

      {status === "loading" && (
        <p className="user-list__status">Ładujemy listę użytkowników…</p>
      )}
      {status === "error" && (
        <p className="user-list__status user-list__status--error">
          {errorMessage}
        </p>
      )}

      {shouldShowEmptyState && (
        <div className="user-list__empty">
          <p>
            Nie znaleźliśmy osób spełniających kryteria{" "}
            <strong>„{filter}”</strong>.
          </p>
          <button
            type="button"
            className="user-list__button user-list__button--ghost"
            onClick={() => setFilter("")}
          >
            Wyczyść filtr
          </button>
        </div>
      )}

      <ul className="user-list__items">
        {filteredUsers.map((user) => {
          const roles = formatRoles(user.roles);
          const profileLink =
            loggedUserId === user.userId ? "/Profile" : `/user/${user.userId}`;
          const avatarUrl = avatars[user.userId];
          const avatarClasses = [
            "user-card__avatar",
            avatarUrl && "user-card__avatar--image",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={user.userId} className="user-card">
              <div className={avatarClasses}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`Avatar użytkownika ${user.name}`}
                    loading="lazy"
                  />
                ) : (
                  <span aria-hidden="true">{getInitials(user.name)}</span>
                )}
              </div>
              <div className="user-card__body">
                <div className="user-card__heading">
                  <h2>{user.name}</h2>
                  {loggedUserId === user.userId && (
                    <span className="user-card__badge">to Ty</span>
                  )}
                </div>
                <p className="user-card__email">{user.email}</p>
                <div className="user-card__footer">
                  <div className="user-card__roles">
                    {roles.map((role) => (
                      <span key={role} className="user-card__role">
                        {role}
                      </span>
                    ))}
                  </div>
                  <Link className="user-card__link" to={profileLink}>
                    Zobacz profil
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default UserList;
