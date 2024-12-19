import database from './database';
import { Review } from '../model/review';

const getAllReviews = async (): Promise<Review[]> => {
    const reviewsPrisma = await database.review.findMany({
        include: {
            book: true,
            user: true,
        },
    });

    return reviewsPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
};

const createReview = async ( review: Review ): Promise<Review> => {
    try {
        const reviewPrisma = await database.review.create({
            data: {
                rating: review.getRating(),
                comment: review.getComment(),
                user: {
                    connect: { id: review.getUser().getId() },
                },
                book: {
                    connect: { id: review.getBook().getId() },
                },
            },
            include: {
                user: true,
                book: true
            },
        });
        return Review.from(reviewPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getReviewById = async ({ id }: { id: number }): Promise<Review | null> => {
    try {
        const reviewPrisma = await database.review.findUnique({
            where: { id },
            include: {
                user: true,
                book: true
            },
        });
        return reviewPrisma ? Review.from(reviewPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllReviewsByUserID = async ( { userId }: { userId: number }): Promise<Review[]> => {
    try {
        const reviewsPrisma = await database.review.findMany({
            where: { userId },
            include: {
                user: true,
                book: true,
            },
        });
        return reviewsPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllReviewsByBookID = async ( { bookId }: { bookId: number }): Promise<Review[]> => {
    try {
        const reviewsPrisma = await database.review.findMany({
            where: { bookId },
            include: {
                user: true,
                book: true,
            },
        });
        return reviewsPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    createReview,
    getAllReviews,
    getReviewById,
    getAllReviewsByUserID,
    getAllReviewsByBookID
}