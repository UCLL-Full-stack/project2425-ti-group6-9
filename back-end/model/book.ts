import { User } from './user';
import { Book as BookPrisma } from '@prisma/client';

export class Book {
    private id?: number;
    private title: string;
    private author: string;
    private length: number;
    private synopsis: string;

    constructor(book: {title: string, author: string, length: number, synopsis: string, id?: number}){
        this.validate(book);

        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.length = book.length;
        this.synopsis = book.synopsis;
    }

    validate(book: {title: string, author: string, length: number, synopsis: string, id?: number}) {
        if (!book.title) {
            throw new Error('Title is required');
        }
        if (!book.author) {
            throw new Error('Author is required');
        }
        if (!book.length) {
            throw new Error('Length is required');
        }
        if (!book.synopsis) {
            throw new Error('Synopsis is required');
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

    getLength(): number {
        return this.length;
    }

    getSynopsis(): string {
        return this.synopsis;
    }

    equals(book: Book): boolean {
        return (
            this.id === book.getId() &&
            this.title === book.getTitle() &&
            this.author === book.getAuthor() &&
            this.length === book.getLength() &&
            this.synopsis === book.getSynopsis()
        );
    }

    static from({ id, title, author, length, synopsis }: BookPrisma ): Book {
        return new Book({
            id,
            title,
            author,
            length,
            synopsis
        });
    }
}