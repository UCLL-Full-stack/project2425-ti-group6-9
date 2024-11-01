import { User } from './user';

export class Book {
    private id?: number;
    private title: string;
    private author: string;
    private synopsis: string;
    private users: User[];

    constructor(book: {title: string, author: string, synopsis: string, users: User[], id?: number}){
        this.validate(book);

        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.synopsis = book.synopsis;
        this.users = book.users;
    }

    validate(book: {title: string, author: string, synopsis: string, users: User[], id?: number}) {
        if (!book.title) {
            throw new Error('Title is required');
        }
        if (!book.author) {
            throw new Error('Author is required');
        }
        if (!book.synopsis) {
            throw new Error('Synopsis is required');
        }
        if (!book.users) {
            throw new Error('Users are required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getSynopsis(): string {
        return this.synopsis;
    }

    getUsers(): User[] {
        return this.users;
    }

    equals(book: Book): boolean {
        return (
            this.id === book.getId() &&
            this.title === book.getTitle() &&
            this.author === book.getAuthor() &&
            this.synopsis === book.getSynopsis() // &&
            // ***this.users.every((user, index) => user.equals(book.getUsers()[index]))
            // This causes an infinite loop with user.equals()
            // Ignoring for now, will have to ask later.
        );
    }


}