import { z } from 'zod';
export declare const SignupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const SigninSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const UpdateUser: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
}>;
export declare const Createblog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    publishDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    publishDate?: string | undefined;
}, {
    title: string;
    content: string;
    publishDate?: string | undefined;
}>;
export declare const Updateblog: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    publishDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
    publishDate?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
    publishDate?: string | undefined;
}>;
export type signuptype = z.infer<typeof SignupSchema>;
export type signintype = z.infer<typeof SigninSchema>;
export type UpdateUsertype = z.infer<typeof UpdateUser>;
export type createtype = z.infer<typeof Createblog>;
export type updatetype = z.infer<typeof Updateblog>;
