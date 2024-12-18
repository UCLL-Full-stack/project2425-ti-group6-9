import { User } from "./user";
import { Book } from "./book";
import { User as UserPrisma, Book as BookPrisma, LeesStatus as LeesStatusPrisma } from '@prisma/client';

export class LeesStatus {
    private id?: number;
    private status: string;
    private progress: number; // Huidige pagina
    private user: User;
    private book: Book;

    constructor(leesstatus: {status: string, progress: number, user: User, book: Book, id?: number}) {
        this.validate(leesstatus);

        this.id = leesstatus.id;
        this.status = leesstatus.status;
        this.progress = leesstatus.progress;
        this.user = leesstatus.user;
        this.book = leesstatus.book;
    }

    validate(leesstatus: {status: string, progress: number, user: User, book: Book}) {
        if (!leesstatus.status) {
            throw new Error("Status is mandatory.");
        }
        if (!leesstatus.book) {
            throw new Error("Book is mandatory.");
        }
        if (leesstatus.progress < 0 || leesstatus.progress > leesstatus.book.getLength()) {
            throw new Error("Progress must be within the range of 0 and the book's length.");
        }
        if (!leesstatus.user) {
            throw new Error("User is mandatory.");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getStatus(): string {
        return this.status;
    }

    getProgress(): number {
        return this.progress;
    }

    getUser(): User {
        return this.user;
    }

    getBook(): Book {
        return this.book;
    }

    // Utility Methods
    static equals(status1: LeesStatus, status2: LeesStatus): boolean {
        return (
            status1.id === status2.id &&
            status1.status === status2.status &&
            status1.progress === status2.progress &&
            status1.user === status2.user &&
            status1.book === status2.book
        );
    }

    static from({ id, status, user, book, progress }: LeesStatusPrisma & {user: UserPrisma; book: BookPrisma}): LeesStatus {
        return new LeesStatus({
            id,
            status,
            user: User.from(user),
            book: Book.from(book), 
            progress
        });
    }
}
