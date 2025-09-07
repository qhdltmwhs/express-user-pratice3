import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

async function createUser(user) {
    const existingUser = await userRepository.findByName(user.username);

    if (existingUser) {
        const error = new Error('Username is already taken');
        error.code = 409;
        throw error;
    }

    const hashedPassword = await hashingPassword(user.password);
    const createdUser = await userRepository.save({ ...user, password: hashedPassword });
    return filterSensitiveUserData(createdUser);
}

async function getUser(username, password) {
    const user = await userRepository.findByName(username);

    if (!user) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }

    verifyPassword(password, user.password);
    return filterSensitiveUserData(user);
}

async function getUserById(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }

    return filterSensitiveUserData(user);
}

async function deleteUser(userId) {
    // 1. 기존 유저만 삭제 시
    // const user = await userRepository.deleteById(userId);
    // 2. 유저 삭제 + 대여 도서 리셋 시
    const user = await userRepository.deleteUserWithBooks(userId);

    if (!user) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }

    return filterSensitiveUserData(user);
}

//=== util functions ===//

async function hashingPassword(password) {
    return bcrypt.hash(password, 10);
}

async function verifyPassword(inputPassword, savedPassword) {
    const isValid = await bcrypt.compare(inputPassword, savedPassword);
    if (!isValid) {
        const error = new Error('Unauthorized');
        error.code = 401;
        throw error;
    }
}

function filterSensitiveUserData(user) {
    const { password, ...rest } = user;
    return rest;
}

function createToken(user, type) {
    const payload = { userId: user.id };
    const options = { expiresIn: type === 'refresh' ? '1w' : '1h' };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default {
    createUser,
    getUser,
    createToken,
    getUserById,
    deleteUser,
};