import bookDb from "../repository/book.db";
import { Book } from "../model/book";
import { BookInput } from "../types";

const getAllBooks = (): Book[] => bookDb.getAllBooks();

const createBook = ({
    title,
    author,
    synopsis
}: BookInput): Book => {
    const book = new Book({ title, author, length, synopsis, users: [] }); // Users is by default empty
    return bookDb.createBook(book);
};

export default {
    getAllBooks,
    createBook,
};