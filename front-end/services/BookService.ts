import { Book } from "@types";

const getAllBooks = async () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/books', {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

const addBook = async (book: Book) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/books', {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(book)
  })
}
  
const BookService = {
    getAllBooks,
    addBook,
};
  
export default BookService;
  