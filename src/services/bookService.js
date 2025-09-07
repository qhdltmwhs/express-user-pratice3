import bookRepository from "../repositories/bookRepository.js"

async function getAllBooks() {
    const books = await bookRepository.findAll();
    return books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isRented: book.isRented,
        rentedBy: book.rentedBy ? book.rentedBy.username : null,
        rentedDate: book.rentedDate || null
    }));
}

async function rentBook(bookId, userId) {
    const book = await bookRepository.findById(bookId);

    if (!book) {
        const error = new Error('Book not found');
        error.code = 404;
        throw error;
    }

    if (book.isRented) {
        const error = new Error('Book already rented');
        error.code = 409;
        throw error;
    }

    return await bookRepository.updateRentStatus(bookId, true, userId, new Date());
}

async function returnBook(bookId, userId) {
    const book = await bookRepository.findById(bookId);

    if (!book) {
        const error = new Error('Book not found');
        error.code = 404;
        throw error;
    }

    if (!book.isRented) {
        const error = new Error('Book not rented');
        error.code = 400;
        throw error;
    }

    if (book.rentedById !== userId) {
        const error = new Error('You can only return books you have rented');
        error.code = 403;
        throw error;
    }

    return await bookRepository.updateRentStatus(bookId, false);
}

export default {
    getAllBooks,
    rentBook,
    returnBook,
};