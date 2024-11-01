import bookDb from "../repository/book.db";
import { Book } from "../model/book";
import { BookInput } from "../types";

const getAllBooks = (): Book[] => bookDb.getAllBooks();

const createBook = ({
    title,
    author,
    synopsis
}: BookInput): Book => {

    // DO THIS: PLACE VALIDATION OF TITLE, AUTHOR, SYNOPSIS HERE

    const book = new Book({ title, author, synopsis, users: [] }); // Users is by default empty
    return bookDb.createBook(book);
};

export default {
    getAllBooks
};