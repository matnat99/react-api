import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then((res) => setPosts(res.data));
  };

  useEffect(fetchPosts, []);

  const handleFormField = (fieldName, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const tagsArray = formData.tags.split("").map((tag) => tag.trim());

    const newPost = { ...formData, tags: tagsArray };

    axios.post("http://localhost:3000/posts", newPost).then((res) => {
      setPosts((currentList) => [...currentList, res.data]);

      setFormData({
        title: "",
        content: "",
        image: "",
        tags: "",
      });
    });
  };

  return (
    <>
      <h1>Lista dei post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titolo post:</label>
        <input
          type="text"
          name="title"
          placeholder="Inserisci il titolo"
          value={formData.title}
          onChange={(event) => handleFormField("title", event.target.value)}
          required
        />
        <br />
        <label htmlFor="content">Descrizione post:</label>
        <input
          type="text"
          name="content"
          placeholder="Inserisci la descrizione"
          value={formData.content}
          onChange={(event) => handleFormField("content", event.target.value)}
          required
        />
        <br />
        <label htmlFor="image">URL Immagine:</label>
        <input
          type="text"
          name="image"
          placeholder="Inserisci l'URL dell'immagine"
          value={formData.image}
          onChange={(event) => handleFormField("image", event.target.value)}
        />
        <br />
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          name="tags"
          placeholder="Inserisci dei tags"
          value={formData.tags}
          onChange={(event) => handleFormField("tags", event.target.value)}
          required
        />
        <br />
        <button type="submit">Invia</button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <img src={post.image} alt={post.title} />
            <p>
              {post.tags.map((tag, index) => (
                <a href="#" key={index}>
                  #{tag}
                </a>
              ))}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}
