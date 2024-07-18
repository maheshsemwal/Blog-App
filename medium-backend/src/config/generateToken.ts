import { Context } from "hono"
import { Jwt } from "hono/utils/jwt"

const generateToken = (id : string, c:Context) => {
    const payload = {
        sub: id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Token expires in 30 days
      }
    return Jwt.sign(payload, c.env.JWT_SECRET);
}

export default generateToken