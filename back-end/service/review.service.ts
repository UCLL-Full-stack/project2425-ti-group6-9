import reviewDb from "../repository/review.db";
import { Review } from "../model/review";
import { ReviewInput, UserInput, BookInput } from "../types";
import userDb from "../repository/user.db";
import bookDb from "../repository/book.db";

const getAllReviews = async (): Promise<Review[]> => reviewDb.getAllReviews();

const createReview = async ({
    rating,
    comment,
    user: userInput,
    book: bookInput,
}: ReviewInput): Promise<Review> => {
    if (!userInput.id) { throw new Error('User ID is required'); };
    if (!bookInput.id) { throw new Error('Book ID is required'); };

    const user = await userDb.getUserById({ id: userInput.id });
    const book = await bookDb.getBookById({ id: bookInput.id });

    if (!user) throw new Error('Course not found');
    if (!book) throw new Error('Lecturer not found');

    const existingReview = await reviewDb.getReviewByUserAndBook({
        userId: userInput.id,
        bookId: bookInput.id,
    });

    if (existingReview) throw new Error('This Review already exists for this user and book.');

    const review = new Review({ rating, comment, user, book });
    return reviewDb.createReview(review);
}

const getReviewById = async (id: number): Promise<Review> => {
    const review = await reviewDb.getReviewById({ id });
    if (!review) {
        throw new Error(`Review with ID ${id} not found`);
    }
    return review;
}

const getAllReviewsByUserID = async (userId: number): Promise<Review[]> => reviewDb.getAllReviewsByUserID({ userId });

const getAllReviewsByBookID = async (bookId: number): Promise<Review[]> => reviewDb.getAllReviewsByBookID({ bookId });

const getReviewByUserAndBook = async ({ userId, bookId }: { userId: number, bookId: number }): Promise<Review | null> => reviewDb.getReviewByUserAndBook({ userId, bookId });

export default {
    createReview,
    getAllReviews,
    getReviewById,
    getAllReviewsByUserID,
    getAllReviewsByBookID,
    getReviewByUserAndBook,
}