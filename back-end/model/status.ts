import { User } from "./user";
import { Book } from "./book";

export class Status {
    private id?: number;
    private status: string;
    private progress: number; // Huidige pagina
    private user: User;
    private book: Book;

    constructor(status: {status: string, progress: number, user: User, book: Book, id?: number}) {
        this.validate(status);

        this.id = status.id;
        this.status = status.status;
        this.progress = status.progress;
        this.user = status.user;
        this.book = status.book;
    }

    validate(status: {status: string, progress: number, user: User, book: Book}) {
        if (!status.status) {
            throw new Error("Status is mandatory.");
        }
        if (!status.book) {
            throw new Error("Book is mandatory.");
        }
        if (status.progress < 0 || status.progress > status.book.getLength()) {
            throw new Error("Progress must be within the range of 0 and the book's length.");
        }
        if (!status.user) {
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
    static equals(status1: Status, status2: Status): boolean {
        return (
            status1.id === status2.id &&
            status1.status === status2.status &&
            status1.progress === status2.progress &&
            status1.user === status2.user &&
            status1.book === status2.book
        );
    }
}
