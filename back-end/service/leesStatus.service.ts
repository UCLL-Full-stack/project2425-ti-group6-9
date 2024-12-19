import leesStatusDb from "../repository/leesStatus.db";
import { LeesStatus } from "../model/leesStatus";
import { LeesStatusInput } from "../types";
import userDb from "../repository/user.db";
import bookDb from "../repository/book.db";

const getAllLeesStatuses = async (): Promise<LeesStatus[]> => leesStatusDb.getAllLeesStatuses();

const createLeesStatus = async ({
    status,
    progress,
    user: userInput,
    book: bookInput,
}: LeesStatusInput): Promise<LeesStatus> => {
    if (!userInput.id) { throw new Error('User ID is required'); };
    if (!bookInput.id) { throw new Error('Book ID is required'); };

    const user = await userDb.getUserById({ id: userInput.id });
    const book = await bookDb.getBookById({ id: bookInput.id });

    if (!user) throw new Error('Course not found');
    if (!book) throw new Error('Lecturer not found');

    const existingLeesStatus = await leesStatusDb.getLeesStatusByUserAndBook({
        userId: userInput.id,
        bookId: bookInput.id,
    });

    if (existingLeesStatus) throw new Error('This LeesStatus already exists for this user and book.');

    const leesStatus = new LeesStatus({ status, progress, user, book });
    return leesStatusDb.createLeesStatus(leesStatus);
};

const getLeesStatusById = async (id: number): Promise<LeesStatus> => {
    const leesStatus = await leesStatusDb.getLeesStatusById({ id });
    if (!leesStatus) {
        throw new Error(`LeesStatus with ID ${id} not found`);
    }
    return leesStatus;
};

const getAllLeesStatusesByUserId = async (userId: number): Promise<LeesStatus[]> => leesStatusDb.getAllLeesStatusesByUserId({ userId });

const getAllLeesStatusesByBookId = async (bookId: number): Promise<LeesStatus[]> => leesStatusDb.getAllLeesStatusesByBookId({ bookId });

const getLeesStatusByUserAndBook = async (userId: number, bookId: number): Promise<LeesStatus | null> => leesStatusDb.getLeesStatusByUserAndBook({ userId, bookId });

export default {
    getAllLeesStatuses,
    createLeesStatus,
    getLeesStatusById,
    getAllLeesStatusesByUserId,
    getAllLeesStatusesByBookId,
    getLeesStatusByUserAndBook,
};