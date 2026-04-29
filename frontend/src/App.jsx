import { useEffect, useState } from "react";

function App() {
  const API = "http://127.0.0.1:8000/api/books/";

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  // 🔹 READ (GET)
  const fetchBooks = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔹 CREATE (POST)
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

  // 🔹 DELETE
  const deleteBook = (id) => {
    fetch(API + id + "/", {
      method: "DELETE",
    })
      .then(() => fetchBooks())
      .catch((err) => console.error(err));
  };

  // 🔹 PUT (full update)
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

  // 🔹 PATCH (partial update)
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
    <div>
      <h1>Knjige</h1>

      <div className="book-list">
      {/* ➕ CREATE */}
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Dodaj</button>
      </div>

      {/* 📚 LIST */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.id}>
            {editId === book.id ? (
              <>
                <input
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  placeholder="Author"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                />

                <button onClick={() => updateBook(book.id)}>
                  PUT
                </button>

                <button onClick={() => patchBook(book.id)}>
                  PATCH
                </button>

                <button onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {book.title} - {book.author}

                <button
                  onClick={() => {
                    setEditId(book.id);
                    setEditTitle(book.title);
                    setEditAuthor(book.author);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
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