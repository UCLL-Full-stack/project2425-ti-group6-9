
type BookInput = {
    id?: number,
    title: string,
    author: string,
    length: number,
    synopsis: string
};

type UserInput = {
    id?: number,
    username: string,
    password: string,
    books?: BookInput[]
};

type LeesStatusInput = {
    id?: number,
    status: string,
    progress: number,
    user: UserInput,
    book: BookInput
};

type ReviewInput = {
    id?: number,
    rating: number,
    comment?: string,
    user: UserInput,
    book: BookInput
};

export {
    BookInput,
    UserInput,
    LeesStatusInput,
    ReviewInput,
}