import { Hono } from "hono";

import { checkUsername, loginUser, signUpUser } from "../controllers/userController";

const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRoutes.post('/login', loginUser);
userRoutes.post('/signup', signUpUser);
userRoutes.get('/checkUser', checkUsername);

export default userRoutes