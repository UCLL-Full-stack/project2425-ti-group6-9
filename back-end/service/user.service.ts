import UserDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => UserDb.getAllUsers();

const createUser = async ({
    username,
    password,
}: UserInput): Promise<User> => {
    const user = new User({ username, password, books: [] });
    return UserDb.createUser(user);
}

const getUserById = async (id: number): Promise<User> => {
    const user = await UserDb.getUserById({ id });
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
}

const getUserByUsername = async (username: string): Promise<User> => {
    const user = await UserDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }
    return user;
}

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
};