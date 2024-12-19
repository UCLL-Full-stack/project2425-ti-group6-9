import { Book } from '../model/book'
import { User } from '../model/user'
import database from './database';

// const books = [
//     new Book({title: "test title", author: "fictional author", length: 23, synopsis: "lang lang geleden in verwegistan", users: []})
// ];

const getAllBooks = async (): Promise<Book[]> => {
    try {
        const booksPrisma = await database.book.findMany({});
        return booksPrisma.map((bookPrisma) => Book.from(bookPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getBookById = async ({ id }: {id: number}): Promise<Book | null> => {
    try {
        const bookPrisma = await database.book.findUnique({
            where: { id }
        });
        return bookPrisma ? Book.from(bookPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createBook = async (book: Book): Promise<Book> => {
    try {
        const bookPrisma = await database.book.create({
            data: {
                title: book.getTitle(),
                author: book.getAuthor(),
                length: book.getLength(),
                synopsis: book.getSynopsis(),
            }
        });
        return Book.from(bookPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getBookByTitle = async ({ title }: { title: string}): Promise<Book | null> => {
    try {
        const bookPrisma = await database.book.findUnique({
            where: { title },
        });
        return bookPrisma ? Book.from(bookPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllBooks,
    getBookById,
    createBook,
    getBookByTitle,
};