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