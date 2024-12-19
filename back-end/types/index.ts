
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

export {
    BookInput,
    UserInput,
}