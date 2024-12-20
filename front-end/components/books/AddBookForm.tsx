import { useState } from "react";
import BookService from "@services/BookService";
import { Book } from "@types";

const AddBookForm: React.FC = () => {
  // default input
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [length, setLength] = useState<number>(0);
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
      length,
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
        setLength(0);
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
          <label htmlFor="title" className="text-black">Title:</label>
          <input
            type="text"
            id="title"
            className="w-full h-9 bg-gray-800 rounded-xl pt-2 px-2 bg-opacity-20 text-black placeholder-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="text-black">Author:</label>
          <input
            type="text"
            id="author"
            className="w-full h-9 bg-gray-800 rounded-xl pt-2 px-2 bg-opacity-20 text-black placeholder-gray-800"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="length" className="text-black">Length:</label>
          <input
            type="number"
            id="length"
            className="w-full h-9 bg-gray-800 rounded-xl pt-2 px-2 bg-opacity-20 text-black placeholder-gray-800"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="synopsis" className="text-black">Synopsis:</label>
          <textarea
            id="synopsis"
            className="w-full h-9 bg-gray-800 rounded-xl pt-2 px-2 bg-opacity-20 text-black placeholder-gray-800"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="mt-4 button-75 relative flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-700 text-white font-bold uppercase w-full rounded-lg h-14 px-5 text-sm focus:outline-none">Add Book</button>
      </form>
      <button className="mt-4 button-75 relative flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-700 text-white font-bold uppercase w-full rounded-lg h-14 px-5 text-sm focus:outline-none" onClick={() => window.location.reload()}>Click here to reload the page!</button>
    </div>
  );
};

export default AddBookForm;