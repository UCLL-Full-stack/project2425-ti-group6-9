import { User } from "./user";
import { Book } from "./book";
import { Review as ReviewPrisma, User as UserPrisma, Book as BookPrisma } from '@prisma/client';

export class Review {
    private id?: number;
    private rating: number; // Rating between 1 and 5
    private comment?: string; // Optional comment
    private user: User;
    private book: Book;

    constructor(review: {rating: number, user: User, book: Book, comment?: string, id?: number}) {
        this.validate(review);
        
        if (review.rating < 1 || review.rating > 5) {
            throw new Error("Rating must be a number between 1 and 5.");
        }
        this.rating = review.rating;
        this.user = review.user;
        this.book = review.book;
        this.comment = review.comment;
        this.id = review.id;
    }

    validate(review: {rating: number, user: User, book: Book}) {
        if (!review.rating) {
            throw new Error("Rating is mandatory.");
        }
        if (!review.user) {
            throw new Error("User is mandatory.");
        }
        if (!review.book) {
            throw new Error("Book is mandatory.");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getRating(): number {
        return this.rating;
    }

    getComment(): string | undefined {
        return this.comment;
    }

    getUser(): User {
        return this.user;
    }

    getBook(): Book {
        return this.book;
    }

    // Utility Methods
    static equals(review1: Review, review2: Review): boolean {
        return (
            review1.id === review2.id &&
            review1.rating === review2.rating &&
            review1.comment === review2.comment &&
            review1.user === review2.user &&
            review1.book === review2.book
        );
    }

    static from({ id, comment, rating, user, book }: ReviewPrisma & { user: UserPrisma; book: BookPrisma}): Review {
        return new Review({
            id,
            comment: comment ?? undefined,
            rating,
            user: User.from(user), // Convert UserPrisma to User
            book: Book.from(book) // Convert BookPrisma to Book
        });
    }
}