import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Masonry from "react-masonry-css";
import "../Styles/Profile.css";
import { fetchUserPosts } from "../Scripts/Post/UserPosts";
import { fetchUserPostsById } from "../Scripts/Post/UserPostsById";
import { fetchUserLogged } from "../Scripts/User/LoggedUser";
import { createPortal } from "react-dom";
import { toggleLike } from "../Scripts/Post/LikePost";
import { fetchLikes } from "../Scripts/Post/FetchLikes";
import {
  fetchComments,
  addComment,
  deleteComment,
  type PostComment,
} from "../Scripts/Post/Comments";
import { fetchLikeStatus } from "../Scripts/Post/LikeStatus";
import { fetchLikedPosts } from "../Scripts/Post/LikedPosts";

interface Post {
  id: number;
  description: string;
  imageUrl: string;
  postCreationDate: string;
  likes?: number;
  comments?: string[];
  shares?: number;
}

interface UtworzoneProps {
  userId?: number;
  refreshTrigger?: boolean;
  variant?: "default" | "liked";
}

function Utworzone({ userId, refreshTrigger, variant = "default" }: UtworzoneProps) {
  const isLikedView = variant === "liked";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [shareInfo, setShareInfo] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        let data: Post[] = [];

        if (isLikedView) {
          data = await fetchLikedPosts();
        } else if (userId) {
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
  }, [userId, refreshTrigger, isLikedView]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await fetchUserLogged();
      if (user) {
        setCurrentUserEmail(user.email);
      }
    };
    loadCurrentUser();
  }, []);

  const openPost = async (post: Post) => {
    setSelectedPost(post);
    setLikes(0);
    setComments([]);
    setHasLiked(false);
    setShareInfo("");

    try {
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
      if (isLikedView && !likedStatus) {
        setPosts((prev) => prev.filter((post) => post.id !== selectedPost.id));
        setSelectedPost(null);
      }
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
      } else if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
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

  const breakpointColumns = {
    default: 4,
    1600: 3,
    1100: 2,
    700: 1,
  };

  if (loading) return <p className="profile-loading">Ładowanie postów...</p>;

  if (posts.length === 0) {
    return (
      <div className="profile-empty">
        <h1>{isLikedView ? "Brak zapisanych" : "Brak postów"}</h1>
        <p>
          {isLikedView
            ? "Nie polubiłeś jeszcze żadnych postów."
            : userId
            ? "Ten użytkownik nie dodał jeszcze żadnych postów."
            : "Utwórz swojego pierwszego Pina!"}
        </p>
        {!userId && !isLikedView && (
          <button className="prof-main-utworzone">Utwórz</button>
        )}
      </div>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => openPost(post)}
          >
            <img
              src={`http://localhost:8080${post.imageUrl}`}
              alt={post.description}
              className="post-image"
            />
            <p className="post-desc">{post.description}</p>
          </div>
        ))}
      </Masonry>

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
                                  {comment.authorEmail && (
                                    <span className="comment-email">{comment.authorEmail}</span>
                                  )}
                                  {createdAt && (
                                    <span className="comment-date">{createdAt}</span>
                                  )}
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
    </>
  );
}

export default Utworzone;
