import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "../Styles/Profile.css";
import { fetchUserPosts } from "../Scripts/Post/UserPosts";
import { fetchUserPostsById } from "../Scripts/Post/UserPostsById";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";

interface Post {
  id: number;
  description: string;
  imageUrl: string;
  postCreationDate: string;
}

interface UtworzoneProps {
  userId?: number;
  refreshTrigger?: boolean;
}

function Utworzone({ userId, refreshTrigger }: UtworzoneProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let data: Post[] = [];

        if (userId) {
          data = await fetchUserPostsById(userId);
        } else {
          const user = await fetchUserLogged();
          if (!user) {
            console.error("Brak zalogowanego użytkownika");
            setLoading(false);
            return;
          }
          data = await fetchUserPosts();
        }

        setPosts(data);
      } catch (err) {
        console.error("Błąd podczas ładowania postów:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId, refreshTrigger]);

  if (loading) return <p className="profile-loading">Ładowanie postów...</p>;

  if (posts.length === 0) {
    return (
      <div className="profile-empty">
        <h1>Brak postów</h1>
        <p>
          {userId
            ? "Ten użytkownik nie dodał jeszcze żadnych postów."
            : "Utwórz swojego pierwszego Pina!"}
        </p>
        {!userId && <button className="prof-main-utworzone">Utwórz</button>}
      </div>
    );
  }

  // Responsywna liczba kolumn
  const breakpointColumns = {
    default: 4,
    1600: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <img
            src={`http://localhost:8080${post.imageUrl}`}
            alt={post.description}
            className="post-image"
          />
          <p className="post-desc">{post.description}</p>
        </div>
      ))}
    </Masonry>
  );
}

export default Utworzone;
