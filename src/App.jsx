import axios from "axios";
import { useEffect, useState } from "react";
import Main from "./components/Main";

const initialData = {
  title: "",
  content: "",
  image: "",
  tags: "",
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialData);

  // RICHIESTA GET API
  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then((res) => setPosts(res.data));
  };

  // Viene eseguito una sola volta al caricamento
  useEffect(fetchPosts, []);

  // Funzione per aggiornare il campo del form
  const handleFormField = (fieldName, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Invia i dati del form al server
    axios.post("http://localhost:3000/posts", formData).then((res) => {
      const formattedTags = formData.tags.split(",").map((tag) => tag.trim());

      const postData = { ...formData, tags: formattedTags };

      setPosts((currentPost) => [...currentPost, postData]);
      setFormData(initialData);
    });
  };

  // Funzione per eliminare un post
  const handleDeletePost = (postId) => {
    axios.delete(`http://localhost:3000/posts/${postId}`).then(() => {
      setPosts((currentPost) =>
        currentPost.filter((post) => post.id !== postId)
      );
    });
  };

  return (
    <>
      <div>
        <header>
          <div className="container">
            <h1>Blog Culinario</h1>
          </div>
        </header>
        <Main
          posts={posts}
          formData={formData}
          handleFormField={handleFormField}
          handleSubmit={handleSubmit}
          handleDeletePost={handleDeletePost}
        />
      </div>
    </>
  );
}
