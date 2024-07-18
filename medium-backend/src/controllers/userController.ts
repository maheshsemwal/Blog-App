import { Context } from "hono";
import { loginSchema, signupSchema } from "@maheshsemwal/common";
import generateToken from "../config/generateToken";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



enum StatusCode {
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSIOON = 403,
    SERVERERR = 500,
}

export const loginUser = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body: {
        username: string,
        password: string
    } = await c.req.json();

    try {

        const parsedUser = loginSchema.safeParse(body);
        if (!parsedUser.success) {
            return c.body("Invalid user Input", StatusCode.BADREQ);
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: body.username,
                    }, {
                        email: body.username
                    }
                ]
            }
        })

        if (!user)
            return c.body("User not found", StatusCode.NOTFOUND);

        // Check password
        if (user.password !== body.password)
            return c.body("Invalid password", StatusCode.NOTPERMISSIOON);

        const token = await generateToken(user.id, c);
        
        return c.json({
            msg: "Login success",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name
            }
        })
    } catch (e) {
        return c.body("Internal server error", StatusCode.SERVERERR);
    }
}

export const signUpUser = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body: {
        username: string,
        email: string,
        password : string,
        consfirmPassword : string,
        name : string
    } = await c.req.json();

    try {
        const parsedUser = signupSchema.safeParse(body);
        if(!parsedUser.success){
            return c.body("Invalid user input", StatusCode.BADREQ);
        }

        const isUserExist = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: body.username,
                    }, {
                        email: body.email
                    }
                ]
            }
        })

        if(isUserExist)
            return c.body("User already exist", StatusCode.NOTPERMISSIOON);

        const res = await prisma.user.create({
            data:{
                username: body.username,
                email: body.email,
                password: body.password,
                name: body.name
            },
            select: {
                id: true,
                username: true,
                email: true,
                name: true
            }
        })

        const token = await generateToken(res.id, c);

        return c.json({
            msg: "User created successfully",
            token: token,
            user: res
        })
    } catch (error: any) {
        c.body(`${error.message}`, StatusCode.SERVERERR);
    }
}