import { useEffect, useState } from "react";

function App() {
  const API = "http://127.0.0.1:8000/api/books/";

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  const fetchBooks = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = () => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    })
      .then(() => {
        setTitle("");
        setAuthor("");
        fetchBooks();
      })
      .catch((err) => console.error(err));
  };

  const deleteBook = (id) => {
    fetch(API + id + "/", {
      method: "DELETE",
    })
      .then(() => fetchBooks())
      .catch((err) => console.error(err));
  };

  const updateBook = (id) => {
    fetch(API + id + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        author: editAuthor,
      }),
    })
      .then(() => {
        setEditId(null);
        fetchBooks();
      })
      .catch((err) => console.error(err));
  };

  const patchBook = (id) => {
    const data = {};
    if (editTitle) data.title = editTitle;
    if (editAuthor) data.author = editAuthor;

    fetch(API + id + "/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setEditId(null);
        fetchBooks();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-base">
      <div className="container">
        <h1>📚 Book Manager</h1>

        {/* CREATE */}
        <div className="form">
          <input
            placeholder="Book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="primary" onClick={addBook}>
            Add Book
          </button>
        </div>

        {/* LIST */}
        <ul>
          {books.map((book) => (
            <li key={book.id} className="card">
              {editId === book.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                  />

                  <div className="actions">
                    <button onClick={() => updateBook(book.id)}>PUT</button>
                    <button onClick={() => patchBook(book.id)}>PATCH</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text">
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </div>

                  <div className="actions">
                    <button
                      onClick={() => {
                        setEditId(book.id);
                        setEditTitle(book.title);
                        setEditAuthor(book.author);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="danger"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;