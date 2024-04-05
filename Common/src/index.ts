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

// update user
export const UpdateUser = z.object({
  name: z.string().optional(),
  email:z.string().optional(),
  password: z.string().optional()
})


// create blog
export const Createblog = z.object({
  title: z.string(),
  content: z.string(),
  publishDate: z.string().optional(),
})


//update blog
export const Updateblog = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  publishDate: z.string().optional()
})


export type signuptype = z.infer<typeof SignupSchema>
export type signintype = z.infer<typeof SigninSchema>
export type UpdateUsertype = z.infer<typeof UpdateUser>
export type createtype = z.infer<typeof Createblog>
export type updatetype = z.infer<typeof Updateblog>