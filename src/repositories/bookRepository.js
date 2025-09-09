import prisma from "../lib/prisma.js";

async function findAll() {
    return prisma.book.findMany({
        include: {
            rentedBy: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    });
}

async function findById(id) {
    return prisma.book.findUnique({
        where: {
            id,
        }
    });
}

async function updateRentStatus(id, isRented, rentedById = null, rentedDate = null) {
    return prisma.book.update({
        where: { id },
        data: {
            isRented,
            rentedById,
            rentedDate,
        }
    });
}



export default {
    findAll,
    findById,
    updateRentStatus,

};
