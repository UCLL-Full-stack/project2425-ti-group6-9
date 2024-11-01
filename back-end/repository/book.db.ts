import { Book } from '../model/book'

const books = [
    new Book({title: "test title", author: "fictional author", synopsis: "lang lang geleden in verwegistan", users: []})
];

const getAllBooks = (): Book[] => books;

const getBookById = ({ id }: { id: number }): Book | null => {
    return books.find((book) => book.getId() === id) || null;
};

const createBook = (book: Book): Book => {
    books.push(book);
    return book;
};

export default {
    getAllBooks,
    getBookById,
    createBook,
};