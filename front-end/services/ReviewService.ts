import { Review } from "@types";

const getAllReviewsByBookId = async (bookId: number) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/book/${bookId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
};

const createReview = async (review: Review) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(review),
    });
};

const ReviewService = {
    getAllReviewsByBookId,
    createReview,
};

export default ReviewService;