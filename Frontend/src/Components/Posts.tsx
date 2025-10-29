// Plik: `src/Components/Posts.tsx`
        import type { FormEvent } from "react";
        import { useState } from "react";
        import { useNavigate } from "react-router-dom";
        import { addPost } from "../Scripts/Post/AddPost";

        function Posts() {
          const [description, setDescription] = useState("");
          const [file, setFile] = useState<File | null>(null);
          const navigate = useNavigate();

          const addPos = async (e: FormEvent) => {
            e.preventDefault();
            if (!file) {
              alert("Wybierz plik");
              return;
            }
            try {
              await addPost(description, file); // nie przypisujemy wartości, której nie używamy
              setDescription("");
              setFile(null);
              navigate("/");
            } catch (err) {
              console.error("Błąd dodawania posta:", err);
            }
          };

          return (
            <div style={{margin: "10vh"}}>
              <form className="auth-card" onSubmit={addPos}>
                <label>
                  Description:
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>

                <label>
                  Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.currentTarget.files?.[0] ?? null;
                      setFile(f);
                    }}
                  />
                </label>

                <button type="submit">Add</button>
              </form>
            </div>
          );
        }

        export default Posts;