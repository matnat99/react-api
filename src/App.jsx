import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then((res) => setPosts(res.data));
  };

  useEffect(fetchPosts, []);

  return (
    <>
      <h1>Lista dei post</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <img src={post.image} alt={post.title} />
            <p>
              {post.tags.map((tag) => (
                <a href="#" key={tag.index}>
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
