import passport from "passport";
import localStrategy from "../middlewares/passport/localStrategy.js"
import jwtStrategy from "../middlewares/passport/jwtStrategy.js";

passport.use('local', localStrategy);
passport.use('access-token', jwtStrategy.accessTokenStrategy);

export default passport;
