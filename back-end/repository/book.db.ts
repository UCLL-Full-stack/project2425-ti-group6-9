import { Book } from '../model/book'
import { User } from '../model/user'
import database from './database';

// const books = [
//     new Book({title: "test title", author: "fictional author", length: 23, synopsis: "lang lang geleden in verwegistan", users: []})
// ];

const getAllBooks = async (): Promise<Book[]> => {
    try {
        const booksPrisma = await database.book.findMany({
            include: {

            }
        })
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const getBookById = ({ id }: { id: number }): Book | null => {
//     return books.find((book) => book.getId() === id) || null;
// };

// const createBook = (book: Book): Book => {
//     books.push(book);
//     return book;
// };

// export default {
//     getAllBooks,
//     getBookById,
//     createBook,
// };