import { Strategy as LocalStrategy } from "passport-local";
import userService from "../../services/userService.js";

const localStrategy = new LocalStrategy(
    {
        usernameField: 'username'
    },
    async (username, password, done) => {
        try {
            const user = await userService.getUser(username, password);
            if (!user) {
                done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

export default localStrategy;
