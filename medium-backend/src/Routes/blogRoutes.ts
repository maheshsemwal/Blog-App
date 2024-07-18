import { Hono, Context } from "hono";
import { postBlog, updateBlog, deleteBlog, getAllBlogs, getaBlog, getUnpublishBlog, publishBlog } from "../controllers/blogController";
import protect from "../middleware/authMiddleware";


const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

blogRoute.get("", getAllBlogs)
blogRoute.get("/get/:id", getaBlog)
blogRoute.put("/publish", protect , publishBlog)
blogRoute.get("/getPrivate", protect , getUnpublishBlog)
blogRoute.post("/post", protect , postBlog);
blogRoute.put("/post", protect , updateBlog);
blogRoute.delete("/post", protect , deleteBlog);

export default blogRoute;