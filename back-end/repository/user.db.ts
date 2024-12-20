import database from './database';
import { User } from '../model/user';


const createUser = async ( user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                books: {
                    connect: user.getBooks()?.map((book) => ({id: book.getId()})),
                },
                role: user.getRole(),
            },
            include: {
                books: true,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                books: true,
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }    
}

const userReadsBook = async ({ userId, bookId }: { userId: number; bookId: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: userId },
            data: {
                books: {
                    connect: { id: bookId },
                },
            },
            include: {
                books: true,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                books: true,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username },
            include: {
                books: true,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    userReadsBook
}