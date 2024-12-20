import UserDb from '../repository/user.db';
import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => UserDb.getAllUsers();

const createUser = async ({
    username,
    password,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await UserDb.getUserByUsername({ username });
    if (existingUser) {
        throw new Error(`User with username ${username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, password: hashedPassword, books: [], role });
    return UserDb.createUser(user);
}

const authenticate = async ( {username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await UserDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }
    
    const isValid = await bcrypt.compare(password, user.getPassword());
    if (!isValid) {
        throw new Error('Invalid password');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        role: user.getRole(),
    };

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
    authenticate,
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
};