import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import Masonry from "react-masonry-css";
import "../Styles/Explore.css";
// Importujemy style profilu, bo tam są definicje modala (.fullscreen-modal itp.)
// Jeśli masz je w innym pliku, zmień ten import
import "../Styles/Profile.css"; 

import { fetchAllPosts } from "../Scripts/Post/FetchAllPosts";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
import { toggleLike } from "../Scripts/Post/LikePost";
import { fetchLikes } from "../Scripts/Post/FetchLikes";
import { fetchLikeStatus } from "../Scripts/Post/LikeStatus";
import {
  fetchComments,
  addComment,
  deleteComment,
  type PostComment,
} from "../Scripts/Post/Comments";

// Definicja interfejsu zgodna z backendem
interface Post {
  id: number;
  description: string;
  imageUrl: string;
  postCreationDate: string;
}



function Explore() {
  // --- STATE GŁÓWNY ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE MODALA (Skopiowany z Utworzone.tsx) ---
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [shareInfo, setShareInfo] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const breakpointColumns = {
    default: 4,
    1600: 3,
    1100: 2,
    700: 1,
  };

  // 1. Pobieranie postów
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchAllPosts();
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  // 2. Pobieranie zalogowanego usera (do usuwania komentarzy)
  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await fetchUserLogged();
      if (user) {
        setCurrentUserEmail(user.email);
      }
    };
    loadCurrentUser();
  }, []);

  // --- FUNKCJE OBSŁUGI MODALA ---

  const openPost = async (post: Post) => {
    setSelectedPost(post);
    setLikes(0);
    setComments([]);
    setHasLiked(false);
    setShareInfo("");

    try {
      // Pobieramy szczegóły równolegle
      const [likesCount, commentsList, likedStatus] = await Promise.all([
        fetchLikes(post.id),
        fetchComments(post.id),
        fetchLikeStatus(post.id),
      ]);
      setLikes(likesCount);
      setComments(commentsList);
      setHasLiked(likedStatus);
    } catch (err) {
      console.error("Błąd podczas ładowania szczegółów posta:", err);
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
    setLikes(0);
    setComments([]);
    setNewComment("");
    setHasLiked(false);
    setShareInfo("");
  };

  const handleLike = async () => {
    if (!selectedPost) return;
    try {
      await toggleLike(selectedPost.id);
      const [updatedLikes, likedStatus] = await Promise.all([
        fetchLikes(selectedPost.id),
        fetchLikeStatus(selectedPost.id),
      ]);
      setLikes(updatedLikes);
      setHasLiked(likedStatus);
    } catch (err) {
      console.error("Błąd podczas dodawania polubienia:", err);
    }
  };

  const handleAddComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPost) return;
    const trimmed = newComment.trim();
    if (!trimmed) return;

    try {
      await addComment(selectedPost.id, trimmed);
      const updatedComments = await fetchComments(selectedPost.id);
      setComments(updatedComments);
      setNewComment("");
    } catch (err) {
      console.error("Błąd podczas dodawania komentarza:", err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!selectedPost) return;
    try {
      await deleteComment(selectedPost.id, commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Błąd podczas usuwania komentarza:", err);
    }
  };

  const handleShare = async () => {
    if (!selectedPost) return;
    const shareUrl = `http://localhost:8080${selectedPost.imageUrl}`;

    try {
      if ("share" in navigator && typeof (navigator as any).share === "function") {
        await (navigator as any).share({
          title: selectedPost.description,
          url: shareUrl,
        });
        setShareInfo("Udostępniono ✔");
      } else if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(shareUrl);
        setShareInfo("Skopiowano link do schowka");
        setTimeout(() => setShareInfo(""), 2500);
      } else {
        setShareInfo("Twoja przeglądarka nie wspiera udostępniania");
      }
    } catch (err) {
      console.error("Nie udało się udostępnić posta:", err);
      setShareInfo("Błąd podczas udostępniania");
    }
  };

  // --- RENDEROWANIE ---

  return (
    <div className="explore-page">
      {/* Hero Section */}
      <section className="explore-hero">
        <div className="explore-hero__content">
          <h1>Odkrywaj Picnest</h1>
          <p>Wszystko, co inspiruje do działania. Zapisuj pomysły i twórz własne kolekcje.</p>
          <div className="explore-search">
            <input
              className="explore-search__input"
              type="search"
              placeholder="Spróbuj: zimowa kapsuła · domowe studio · comfort food"
            />
            <button className="explore-search__button" type="button">
              Szukaj
            </button>
          </div>
        </div>
      </section>

      

      {/* Dynamiczna Sekcja Postów */}
      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Na topie</span>
          <h2>Najnowsze inspiracje społeczności</h2>
        </header>

        {loading ? (
          <div className="explore-loading">Ładowanie inspiracji...</div>
        ) : posts.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="explore-masonry-card"
                onClick={() => openPost(post)} // TUTAJ OTWIERAMY MODAL
                style={{ cursor: "pointer" }}
              >
                <div className="explore-card-image-wrapper">
                  <img
                    src={`http://localhost:8080${post.imageUrl || ""}`}
                    alt={post.description || "Post"}
                    loading="lazy"
                  />
                  <div className="explore-card-overlay">
                    <button 
                        className="save-btn"
                        onClick={(e) => {
                            e.stopPropagation(); // Żeby nie otwierać modala przy kliknięciu Zapisz
                            // Tutaj dodasz logikę zapisywania w przyszłości
                            handleLike(); // Tymczasowo może działać jak like
                        }}
                    >
                        Zapisz
                    </button>
                  </div>
                </div>
                {post.description && (
                  <div className="explore-card-footer">
                    <h4>{post.description}</h4>
                  </div>
                )}
              </article>
            ))}
          </Masonry>
        ) : (
          <p className="explore-empty">Brak postów do wyświetlenia.</p>
        )}
      </section>

      {/* --- MODAL (PORTAL) --- */}
      {selectedPost &&
        createPortal(
          (
            <div className="fullscreen-modal-overlay" onClick={closeModal}>
              <div
                className="fullscreen-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>

                <div className="modal-image-section">
                  <img
                    src={`http://localhost:8080${selectedPost.imageUrl}`}
                    alt={selectedPost.description}
                    className="modal-large-image"
                  />
                </div>

                <div className="modal-info-section">
                  <h2>{selectedPost.description}</h2>
                  <p className="modal-date">
                    {new Date(selectedPost.postCreationDate).toLocaleDateString()}
                  </p>

                  <div className="modal-stats">
                    <span>❤️ {likes}</span>
                    <span>💬 {comments.length}</span>
                  </div>

                  <div className="modal-actions">
                    <button
                      onClick={handleLike}
                      className={hasLiked ? "is-liked" : ""}
                    >
                      {hasLiked ? "❤️ Polubiono" : "♡ Polub"}
                    </button>
                    <button type="button" className="share-btn" onClick={handleShare}>
                      ↗ Udostępnij
                    </button>
                  </div>
                  {shareInfo && <p className="share-info">{shareInfo}</p>}

                  <div className="comments-section">
                    <h4>Komentarze</h4>
                    {comments.length > 0 ? (
                      comments.map((comment) => {
                        const avatarUrl = comment.avatarUrl
                          ? comment.avatarUrl.startsWith("http")
                            ? comment.avatarUrl
                            : `http://localhost:8080${comment.avatarUrl}`
                          : null;
                        const displayName = comment.authorName || comment.authorEmail;
                        const initials = (displayName?.charAt(0) || "?").toUpperCase();
                        const createdAt = comment.creationDate
                          ? new Date(comment.creationDate).toLocaleDateString()
                          : "";
                        const canDelete =
                          currentUserEmail &&
                          comment.authorEmail &&
                          comment.authorEmail === currentUserEmail;

                        return (
                          <div key={comment.id} className="comment-item">
                            {avatarUrl ? (
                              <img
                                src={avatarUrl}
                                alt={displayName}
                                className="comment-avatar"
                              />
                            ) : (
                              <div className="comment-avatar comment-avatar--fallback">
                                {initials}
                              </div>
                            )}
                            <div className="comment-body">
                              <div className="comment-headline">
                                <div className="comment-meta">
                                  <span className="comment-author">{displayName}</span>
                                  {createdAt && <span className="comment-date">{createdAt}</span>}
                                </div>
                                {canDelete && (
                                  <button
                                    type="button"
                                    className="comment-delete"
                                    onClick={() => handleDeleteComment(comment.id)}
                                  >
                                    Usuń
                                  </button>
                                )}
                              </div>
                              <p className="comment-text">{comment.content}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="no-comments">Brak komentarzy.</p>
                    )}

                    <form onSubmit={handleAddComment} className="comment-form">
                      <input
                        type="text"
                        placeholder="Dodaj komentarz..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button type="submit">➤</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ),
          document.body
        )}
    </div>
  );
}

export default Explore;