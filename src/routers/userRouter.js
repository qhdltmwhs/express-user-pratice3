import express from "express";
import userService from "../services/userService.js";
import passport from "../lib/passport.js";

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        console.log(user);
        res.status(201).json({ "message": "User registered successfully" });
    } catch (error) {
        next(error);
    }
});

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const accessToken = userService.createToken(req.user);
            res.status(200).json({ token: accessToken });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/delete',
    passport.authenticate('access-token', { session: false }),
    async (req, res, next) => {
        try {
            const user = await userService.deleteUser(req.user.id);
            console.log(user);
            res.status(200).json({ "message": "User deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
