import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { blogPostSchema, blogUpdateSchema, deleteBlogSchema, publishBlogSchema } from "@maheshsemwal/common";

enum StatusCode {
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSIOON = 403,
    SERVERERR = 500,
}
const publishBlog = async(c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: {
        id: string
    } = await c.req.json();

    if (!publishBlogSchema.safeParse(body).success)
        return c.body("Invalid data", StatusCode.BADREQ);

    try {
        const user = c.get("user");

        if (!user)
            return c.body("Unauthorized", StatusCode.NOTPERMISSIOON);

        const res = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
            }
        })

        return c.json(res);

    } catch (e) {
        return c.body("Internal Server error", StatusCode.SERVERERR)
    }
}


const getUnpublishBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = c.get("user");

        if (!user)
            return c.body("Unauthorized", StatusCode.NOTPERMISSIOON);

        const res = await prisma.post.findMany({
            where: {
                authorId: user.sub,
                published: false,
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
            }
        })

        console.log("blogs are: ", res);
        

        return c.json(res);

    } catch (e) {
        return c.body("Internal Server error", StatusCode.SERVERERR)
    }
}

const getaBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const id = c.req.param("id");

        const res = await prisma.post.findUnique({
            where: {
                id,
                published: true
            }
        })

        return c.json(res);
    } catch (e) {
        return c.body("Internal Server error", StatusCode.SERVERERR)
    }

}
const getAllBlogs = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const res = await prisma.post.findMany({
            //exclude some blogs which are not published
            where: {
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
            },

        })

        return c.json(res);
    } catch (e) {
        return c.body("Internal Server error", StatusCode.SERVERERR)

    }

}

const postBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: {
        title: string,
        content: string,
    } = await c.req.json();

    if (!blogPostSchema.safeParse(body).success)
        return c.body("Invalid data", StatusCode.BADREQ);

    try {
        const user = await c.get("user");

        if (!user)
            return c.body("Unauthorized", StatusCode.NOTPERMISSIOON);

        const res = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: user.sub,
            },
            select: {
                title: true,
                content: true,
                authorId: true,
            }
        })

        return c.json(res);
    } catch (e: any) {
        return c.body(`${e.message}`, StatusCode.SERVERERR)
    }
}


const updateBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: {
        title: string,
        content: string,
        id: string
    } = await c.req.json();

    if (!blogUpdateSchema.safeParse(body).success)
        return c.body("Invalid data", StatusCode.BADREQ);

    try {
        const user = await c.get("user");
        if (!user)
            return c.body("Unauthorized", StatusCode.NOTPERMISSIOON);

        const res = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
            select: {
                title: true,
                content: true,
                authorId: true,
            }
        })

        return c.json(res);
    } catch (e) {
        return c.body("Internal Server error", StatusCode.SERVERERR)
    }
}

const deleteBlog = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: {
        id: string
    } = await c.req.json();

    if (!deleteBlogSchema.safeParse(body).success)
        return c.body("Invalid data", StatusCode.BADREQ);

    try {
        const user = await c.get("user");
        if (!user)
            return c.body("Unauthorized", StatusCode.NOTPERMISSIOON);

        const res = await prisma.post.delete({
            where: {
                id: body.id,
            },
        })

        if (res) {
            return c.json({
                msg: "Blog deleted Successfully"
            })
        }
    } catch (e) {
        return c.body("Internal Server error", StatusCode.SERVERERR)
    }
}
export { postBlog, updateBlog, deleteBlog, getAllBlogs, getaBlog, getUnpublishBlog, publishBlog }