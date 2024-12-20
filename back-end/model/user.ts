import { Role } from '../types';
import { Book } from './book';
import { LeesStatus } from './leesStatus';
import { Review } from './review';
import { User as UserPrisma, Book as BookPrisma, Review as ReviewPrisma, LeesStatus as LeesStatusPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private books?: Book[];
    private role: Role;

    constructor(user: {username: string, password: string, books?: Book[], role: Role, id?: number}) {
        this.validate(user);
        
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.books = user.books;
        this.role = user.role;
    }

    validate(user: {username: string, password: string, role: Role}) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
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

    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.password === user.getPassword() // &&
            // ***this.books.every((book, index) => book.equals(user.getBooks()[index]))
        );
    }

    static from({ id, username, password, books, role }: UserPrisma & { books?: BookPrisma[] }): User {
        return new User({
            id,
            username,
            password,
            books: books ? books.map((book) => Book.from(book)): [],
            role: role as Role,
        });
    }
    
};
