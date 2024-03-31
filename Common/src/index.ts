import {z} from 'zod';


// signup Schema
export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
})


// signin schema
export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


// create blog
export const Createblog = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
})


//update blog
export const Updateblog = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
  published: z.boolean().optional()
})


export type signuptype = z.infer<typeof SignupSchema>
export type signintype = z.infer<typeof SigninSchema>
export type createtype = z.infer<typeof Createblog>
export type updatetype = z.infer<typeof Updateblog>