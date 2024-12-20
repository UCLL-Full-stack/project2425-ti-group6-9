export type Book = {
    id?: number;
    title: string;
    author: string;
    synopsis: string;
};

export type User = {
    username?: string;
    password?: string;
    role?: string;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};