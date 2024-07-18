import { Hono } from "hono";

import { loginUser, signUpUser } from "../controllers/userController";

const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRoutes.post('/login', loginUser);
userRoutes.post('/signup', signUpUser);

export default userRoutes