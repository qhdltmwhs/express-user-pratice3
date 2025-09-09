import express from "express";
import bookService from "../services/bookService.js";
import passport from "../lib/passport.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
});

router.post('/rent/:bookId',
    passport.authenticate('access-token', { session: false }),
    async (req, res, next) => {
        try {
            const bookId = parseInt(req.params.bookId);
            const userId = req.user.id;

            if (isNaN(bookId)) {
                return res.status(400).json({ message: 'Invalid book ID' });
            }

            const rentBook = await bookService.rentBook(bookId, userId);
            console.log(rentBook);
            res.status(200).json({ "message": "Book rented successfully" });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/return/:bookId',
    passport.authenticate('access-token', { session: false }),
    async (req, res, next) => {
        try {
            const bookId = parseInt(req.params.bookId);
            const userId = req.user.id;

            if (isNaN(bookId)) {
                return res.status(400).json({ message: 'Invalid book ID' });
            }

            const returnBook = await bookService.returnBook(bookId, userId);
            console.log(returnBook);
            res.status(200).json({ "message": "Book returned successfully" });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
