import prisma from "../lib/prisma.js";

async function save(user) {
    return await prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
        },
    });
}

async function findByName(username) {
    return await prisma.user.findUnique({
        where: {
            username,
        },
    });
}

async function findById(id) {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
}

async function deleteById(id) {
    return await prisma.user.delete({
        where: {
            id,
        },
    });
}

async function deleteUserWithBooks(userId) {
    return await prisma.$transaction(async (tx) => {
        // 1. 해당 사용자가 대여 중인 도서들을 모두 반납 처리
        await tx.book.updateMany({
            where: {
                rentedById: userId,
                isRented: true
            },
            data: {
                isRented: false,
                rentedById: null,
                rentedDate: null
            }
        });

        // 2. 사용자 삭제
        const deletedUser = await tx.user.delete({
            where: { id: userId }
        });

        return deletedUser;
    });
}

export default {
    save,
    findById,
    findByName,
    deleteById,
    deleteUserWithBooks,
}