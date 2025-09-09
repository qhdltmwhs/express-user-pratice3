import "dotenv/config";
import express from "express";

import passport from "./lib/passport.js";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Book Rental API Server',
        version: '1.0.0',
        endpoints: {
            users: {
                register: 'POST /users/register',
                login: 'POST /users/login',
                delete: 'DELETE /users/delete'
            },
            books: {
                list: 'GET /books',
                rent: 'POST /books/rent/:bookId',
                return: 'POST /books/return/:bookId'
            }
        }
    });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
