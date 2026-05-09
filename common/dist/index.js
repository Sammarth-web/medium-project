import { z } from 'zod';
export const signupInput = z.object({
    username: z.string(),
    password: z.string().min(6)
});
export const signinInput = z.object({
    username: z.string(),
    password: z.string().min(6)
});
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});
//# sourceMappingURL=index.js.map