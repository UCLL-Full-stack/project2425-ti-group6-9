import { Book } from './book';
import { User as UserPrisma, Book as BookPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private books?: Book[];

    constructor(user: {username: string, password: string, books?: Book[], id?: number}) {
        this.validate(user);
        
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.books = user.books;
    }

    validate(user: {username: string, password: string, id?: number}) {
        if (!user.username) {
            throw new Error('Username is required');
        }
        if (!user.password) {
            throw new Error('Password is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getBooks(): Book[] | undefined {
        return this.books;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.password === user.getPassword() // &&
            // ***this.books.every((book, index) => book.equals(user.getBooks()[index]))
            // This causes an infinite loop with book.equals()
            // Ignoring for now, will have to ask later.
        );
    }

    static from({ id, username, password, books }: UserPrisma & { books?: BookPrisma[] }): User {
        return new User({
            id,
            username,
            password,
            books: books ? books.map((book) => Book.from(book)): []
        });
    }
    
};
