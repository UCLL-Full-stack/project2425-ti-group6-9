import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReviewService from '@services/ReviewService';
import { Review } from '@types';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const WriteReview: React.FC = () => {

    const { t } = useTranslation();
    const router = useRouter();
    const { bookId } = router.query;
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            console.log(user);
            setUserId(user.id);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userId === null) {
            console.error("User is not logged in");
            return;
        }
        const review: Review = { rating, comment, userId: Number(userId), bookId: Number(bookId) };
        await ReviewService.createReview(review);
        router.push('/books');
    };

    return (
        <div>
            <Header />
            <h1>Write a Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export const getServerSideProps = async (context: { locale: any}) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default WriteReview;