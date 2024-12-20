import bookDb from "../repository/book.db";
import { Book } from "../model/book";
import { BookInput, Role } from "../types";
import userDb from "../repository/user.db";

const getBooks = async ({ username, role}: { username: string; role: Role }): Promise<Book[]> => {
    return bookDb.getAllBooks();
    // if (role === 'admin') {
    //     return bookDb.getAllBooks();
    // } else if (role === 'lecturer') {
    //     return userDb.get({ username });
    // } else {
    //     throw new UnauthorizedError('credentials_required', {
    //         message: 'You are not authorized to access this resource.',
    //     });
    // }
}

const getAllBooks = async (): Promise<Book[]> => bookDb.getAllBooks();

const createBook = async ({
    title,
    author,
    length,
    synopsis
}: BookInput): Promise<Book> => {
    const book = new Book({ title, author, length, synopsis }); // Users is by default empty
    return bookDb.createBook(book);
};

const getBookById = async ( id: number): Promise<Book> => {
    const book = await bookDb.getBookById({id});
    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }
    return book;
}

const getBookByTitle = async (title: string): Promise<Book> => {
    const book = await bookDb.getBookByTitle({title});
    if (!book) {
        throw new Error(`Book with title ${title} not found`);
    }
    return book;
}

export default {
    getAllBooks,
    createBook,
    getBookById,
    getBookByTitle,
    getBooks
};