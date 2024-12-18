import { Book } from './book';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private books: Book[];

    constructor(user: {username: string, password: string, books: Book[], id?: number}) {
        this.validate(user);
        
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.books = user.books;
    }

    validate(user: {username: string, password: string, books: Book[], id?: number}) {
        if (!user.username) {
            throw new Error('Username is required');
        }
        if (!user.password) {
            throw new Error('Password is required');
        }
        if (!user.books) {
            throw new Error('Books are required');
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

    getBooks(): Book[] {
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
};