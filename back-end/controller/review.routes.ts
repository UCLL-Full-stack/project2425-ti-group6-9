/**
 * @swagger
 *  components:
 *      schemas:
 *          Review:
 *             type: object
 *             properties:
 *                 id:
 *                     type: number
 *                     format: int64
 *                 rating:
 *                     type: number
 *                 comment:
 *                     type: string
 *                 user:
 *                     $ref: '#/components/schemas/User'
 *                 book:
 *                     $ref: '#/components/schemas/Book'
 *          ReviewInput:
 *              type: object
 *              properties:
 *                  rating:
 *                      type: number
 *                  comment:
 *                      type: string
 *                  user:
 *                      $ref: '#/components/schemas/UserInput'
 *                  book:
 *                      $ref: '#/components/schemas/BookInput'
 */
import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';
import { ReviewInput } from '../types';

const reviewRouter = express.Router();

/**
 * @swagger
 * /review:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all reviews
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /review:
 *   post:
 *      summary: Create a new review.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReviewInput'
 *      responses:
 *        200:
 *          description: A new review.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Review'
 */
reviewRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewInput = <ReviewInput>req.body;
        const review = await reviewService.createReview(reviewInput);
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const review = await reviewService.getReviewById(id);
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /review/user/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all reviews by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const reviews = await reviewService.getAllReviewsByUserID(userId);
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /review/book/{bookId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all reviews by book ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/book/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const reviews = await reviewService.getAllReviewsByBookID(bookId);
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /review/user/{userId}/book/{bookId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a review by user ID and book ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: A review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/user/:userId/book/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const bookId = Number(req.params.bookId);
        const review = await reviewService.getReviewByUserAndBook({ userId, bookId });
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

export { reviewRouter };