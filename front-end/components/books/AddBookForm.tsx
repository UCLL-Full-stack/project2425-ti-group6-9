import { useState } from "react";
import BookService from "@services/BookService";
import { Book } from "@types";

const AddBookForm: React.FC = () => {
  // default input
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [synopsis, setSynopsis] = useState<string>("");
  // feedback aan user ofdat Book correct aangemaakt werd.
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // book object aangemaakt
    const newBook: Book = {
      title,
      author,
      synopsis,
    };

    try {
      // Book stored naar back-end
      const response = await BookService.addBook(newBook);
      
      if (response.ok) {
        setSuccess(true);
        setError(null);
        setTitle("");
        setAuthor("");
        setSynopsis("");
      } else {
        setError("Failed to add book.");
      }
    } catch (error) {
      setError("An error occurred while adding the book.");
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Book added successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="synopsis">Synopsis:</label>
          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;