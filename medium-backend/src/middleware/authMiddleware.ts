import { Context } from "hono";
import { Jwt } from "hono/utils/jwt";

const protect = async (c: Context, next: () => Promise<void>) => {
    const authorizationHeader = c.req.header("Authorization");
    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return c.body("Unauthorized", 401);
    }
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return c.body("Unauthorized", 401);
    }

    try {
        const user = await Jwt.verify(token, c.env.JWT_SECRET);
        c.set("user", user);
        await next();
    } catch (e) {
        return c.body("Unauthorized", 401);
    }
};


export default protect;