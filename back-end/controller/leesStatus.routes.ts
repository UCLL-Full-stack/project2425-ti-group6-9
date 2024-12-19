/**
 * @swagger
 *  components:
 *      schemas:
 *          LeesStatus:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  status:
 *                      type: string
 *                  progress:
 *                      type: number
 *                  user:
 *                      $ref: '#/components/schemas/User'
 *                  book:
 *                      $ref: '#/components/schemas/Book'
 *          LeesStatusInput:
 *              type: object
 *              properties:
 *                  status:
 *                      type: string
 *                  progress:
 *                      type: number
 *                  user:
 *                      $ref: '#/components/schemas/UserInput'
 *                  book:
 *                      $ref: '#/components/schemas/BookInput'
 */

import express, { NextFunction, Request, Response } from 'express';
import leesStatusService from '../service/leesStatus.service';
import { LeesStatusInput } from '../types';

const leesStatusRouter = express.Router();

/**
 * @swagger
 * /leesStatus:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all leesStatuses
 *     responses:
 *       200:
 *         description: A list of leesStatuses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/LeesStatus'
 */
leesStatusRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leesStatuses = await leesStatusService.getAllLeesStatuses();
        res.status(200).json(leesStatuses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /leesStatus:
 *   post:
 *      summary: Create a new leesStatus.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LeesStatusInput'
 *      responses:
 *        200:
 *          description: A new leesStatus.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LeesStatus'
 */
leesStatusRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leesStatusInput = <LeesStatusInput>req.body;
        const leesStatus = await leesStatusService.createLeesStatus(leesStatusInput);
        res.status(200).json(leesStatus);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /leesStatus/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a leesStatus by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the leesStatus
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A leesStatus.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeesStatus'
 */
leesStatusRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const leesStatus = await leesStatusService.getLeesStatusById(id);
        res.status(200).json(leesStatus);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /leesStatus/user/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of leesStatuses by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of leesStatuses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeesStatus'
 */
leesStatusRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const leesStatuses = await leesStatusService.getAllLeesStatusesByUserId(userId);
        res.status(200).json(leesStatuses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /leesStatus/book/{bookId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of leesStatuses by book ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of leesStatuses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeesStatus'
 */
leesStatusRouter.get('/book/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const leesStatuses = await leesStatusService.getAllLeesStatusesByBookId(bookId);
        res.status(200).json(leesStatuses);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /leesStatus/user/{userId}/book/{bookId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a leesStatus by user ID and book ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A leesStatus.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeesStatus'
 */
leesStatusRouter.get('/user/:userId/book/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        const bookId = Number(req.params.bookId);
        const leesStatus = await leesStatusService.getLeesStatusByUserAndBook(userId, bookId);
        res.status(200).json(leesStatus);
    } catch (error) {
        next(error);
    }
});

export { leesStatusRouter };