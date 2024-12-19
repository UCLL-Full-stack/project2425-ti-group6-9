/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Book:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  format: int64
 *              title:
 *                  type: string
 *                  description: Book title.
 *              author:
 *                  type: string
 *                  description: Book author.
 *              length:
 *                  type: number
 *                  description: Book length (in pages).
 *              synopsis:
 *                  type: string
 *                  description: Book synopsis.
 *              users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *      BookInput:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: Inputted Title of new Book.
 *              author:
 *                  type: string
 *                  description: Inputted Author of new Book.
 *              length:
 *                  type: number
 *                  description: Inputted Length of new Book.
 *              synopsis:
 *                  type: string
 *                  description: Inputted Synopsis of new Book.
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  format: int64
 *              username:
 *                  type: string
 *                  description: User's name
 *              password:
 *                  type: string
 *                  description: User's password
 *              books:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Book'
 */
import express, { NextFunction, Request, Response } from 'express';
import bookService from '../service/book.service';
import { BookInput } from '../types';

const bookRouter = express.Router();


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of all books.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Book'
 */
bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books:
 *   post:
 *      summary: Create a new book.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BookInput'
 *      responses:
 *         200:
 *            description: The created book.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Book'
 */
bookRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = <BookInput>req.body;
        const result = await bookService.createBook(book);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a book by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The book id.
 *      responses:
 *          200:
 *              description: A book object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 */
bookRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookService.getBookById(Number(req.params.id));
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /books/title/{title}:
 *  get:
 *      summary: Get a book by title.
 *      parameters:
 *          - in: path
 *              name: title
 *              schema:
 *                  type: string
 *              required: true
 *      responses:
 *          200:
 *              description: A book object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 */
bookRouter.get('/title/:title', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await bookService.getBookByTitle(req.params.title);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

export { bookRouter };