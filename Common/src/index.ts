import zod from 'zod';

export const loginSchema = zod.object({
    username : zod.string(),
    password: zod.string(),
});


export const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().min(1),
});


export const blogPostSchema = zod.object({
    title: zod.string(),
    content: zod.string(),
});


export const blogUpdateSchema = zod.object({
    title: zod.string(),
    content: zod.string(),
    id: zod.string()
});


export const deleteBlogSchema = zod.object({
    id: zod.string()
});

export const publishBlogSchema = zod.object({
    id: zod.string()
});

export type LoginSchema = zod.infer<typeof loginSchema>;
export type SignupSchema = zod.infer<typeof signupSchema>;
export type BlogPostSchema = zod.infer<typeof blogPostSchema>;
export type BlogUpdateSchema = zod.infer<typeof blogUpdateSchema>;  