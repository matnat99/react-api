import PostCard from "./PostCard";

export default function Main({
  posts,
  formData,
  handleFormField,
  handleSubmit,
  handleDeletePost,
}) {
  return (
    <main>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <h3>Crea nuovo post</h3>
          <div className="space-between">
            <label htmlFor="title">Titolo post:</label>
            <input
              type="text"
              id="title"
              placeholder="Inserisci il titolo"
              value={formData.title}
              onChange={(event) => handleFormField("title", event.target.value)}
              required
            />
          </div>
          <div className="space-between">
            <label htmlFor="content">Descrizione post:</label>
            <textarea
              rows={10}
              type="text"
              id="content"
              placeholder="Inserisci la descrizione"
              value={formData.content}
              onChange={(event) =>
                handleFormField("content", event.target.value)
              }
              required
            />
          </div>
          <div className="space-between">
            <label htmlFor="image">URL Immagine:</label>
            <input
              type="text"
              id="image"
              placeholder="Inserisci l'URL dell'immagine"
              value={formData.image}
              onChange={(event) => handleFormField("image", event.target.value)}
            />
          </div>
          <div className="space-between">
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              placeholder="Inserisci dei tags"
              value={formData.tags}
              onChange={(event) => handleFormField("tags", event.target.value)}
            />
          </div>
          <div>
            <button type="submit">Crea</button>
          </div>
        </form>
      </section>
      <section className="container">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} handleDeletePost={handleDeletePost} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
