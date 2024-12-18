import { Book } from './book';
import { LeesStatus } from './leesStatus';
import { Review } from './review';
import { User as UserPrisma, Book as BookPrisma, Review as ReviewPrisma, LeesStatus as LeesStatusPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private books?: Book[];
    private reviews?: Review[];
    private leesstatuses?: LeesStatus[];

    constructor(user: {username: string, password: string, books?: Book[], reviews?: Review[], leesstatuses?: LeesStatus[], id?: number}) {
        this.validate(user);
        
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.books = user.books;
        this.reviews = user.reviews;
        this.leesstatuses = user.leesstatuses;
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

    getReviews(): Review[] | undefined {
        return this.reviews;
    }

    getLeesStatuses(): LeesStatus[] | undefined {
        return this.leesstatuses;
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

    static from({ id, username, password, books, reviews, leesstatuses }: UserPrisma & { books?: BookPrisma[]; reviews?: (ReviewPrisma[] & { book: BookPrisma}); leesstatuses?: LeesStatusPrisma[] }): User {
        return new User({
            id,
            username,
            password,
            books: books ? books.map((book) => Book.from(book)): [],
            reviews: reviews ? reviews.map((review) => Review.fromWithoutUser(review)): []
        });
    }
    
};
