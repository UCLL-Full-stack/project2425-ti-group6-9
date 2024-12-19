import database from './database';
import { LeesStatus } from '../model/leesStatus';

const getAllLeesStatuses = async (): Promise<LeesStatus[]> => {
    try {
        const leesStatusesPrisma = await database.leesStatus.findMany({
            include: {
                user: true,
                book: true,
            },
        });
        return leesStatusesPrisma.map((leesStatusPrisma) => LeesStatus.from(leesStatusPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createLeesStatus = async ( leesStatus: LeesStatus): Promise<LeesStatus> => {
    try {
        const leesStatusPrisma = await database.leesStatus.create({
            data: {
                status: leesStatus.getStatus(),
                progress: leesStatus.getProgress(),
                user: {
                    connect: { id: leesStatus.getUser().getId() },
                },
                book: {
                    connect: { id: leesStatus.getBook().getId() },
                },
            },
            include : {
                user: true,
                book: true,
            },
        });
        return LeesStatus.from(leesStatusPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getLeesStatusById = async ({ id }: { id: number }): Promise<LeesStatus | null> => {
    try {
        const leesStatusPrisma = await database.leesStatus.findUnique({
            where: { id },
            include: {
                user: true,
                book: true,
            },
        });
        return leesStatusPrisma ? LeesStatus.from(leesStatusPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllLeesStatusesByUserId = async ( { userId }: { userId: number }): Promise<LeesStatus[]> => {
    try {
        const leesStatusesPrisma = await database.leesStatus.findMany({
            where: { userId },
            include: {
                user: true,
                book: true,
            },
        });
        return leesStatusesPrisma.map((leesStatusPrisma) => LeesStatus.from(leesStatusPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllLeesStatusesByBookId = async ( { bookId }: { bookId: number }): Promise<LeesStatus[]> => {
    try {
        const leesStatusesPrisma = await database.leesStatus.findMany({
            where: { bookId },
            include: {
                user: true,
                book: true,
            },
        });
        return leesStatusesPrisma.map((leesStatusPrisma) => LeesStatus.from(leesStatusPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllLeesStatuses,
    createLeesStatus,
    getLeesStatusById,
    getAllLeesStatusesByUserId,
    getAllLeesStatusesByBookId,
}