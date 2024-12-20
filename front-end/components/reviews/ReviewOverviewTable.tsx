import React from 'react';
import { Review } from '@types';

type Props = {
    reviews: Review[];
};

const ReviewOverviewTable: React.FC<Props> = ({ reviews }: Props) => {
    return (
        <>
            {reviews && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Rating</th>
                            <th scope="col">Comment</th>
                            <th scope="col">User</th>
                            <th scope="col">Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                                <td>{review.userId}</td>
                                <td>{review.bookId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ReviewOverviewTable;