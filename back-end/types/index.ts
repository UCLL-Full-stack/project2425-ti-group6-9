type Role = 'admin' | 'student' | 'lecturer' | 'guest';

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
    books?: BookInput[],
    role: Role
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

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};

export {
    Role,
    BookInput,
    UserInput,
    LeesStatusInput,
    ReviewInput,
    AuthenticationResponse,
}