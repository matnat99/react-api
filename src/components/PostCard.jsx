export default function PostCard({ post, handleDeletePost }) {
  return (
    <div className="post-card">
      <div className="card-header">
        <h3>{post.title}</h3>
        <button onClick={() => handleDeletePost(post.id)}>⨉</button>
      </div>
      <div className="card-body">
        <p>{post.content}</p>
        <img src={post.image} alt={post.title} />
        <ul className="tags-list">
          {Array.isArray(post.tags) &&
            post.tags.map((tag, index) => (
              <li key={index}>
                <a href="#">#{tag}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
