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
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/books', {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(book)
  })
}
  
const BookService = {
    getAllBooks,
    addBook,
};
  
export default BookService;
  