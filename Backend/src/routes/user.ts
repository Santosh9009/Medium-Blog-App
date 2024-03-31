import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { SignupSchema, SigninSchema} from '@santosh_pati/medium-common';


type Environment = {
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }
}
export const UserRouter = new Hono<Environment>()


UserRouter.post('/signup', async (c) => {
  
  const body = await c.req.json();
  const { success } = SignupSchema.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({message:'Invalid Input'})
  }
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const existing = await prisma.user.findUnique({
    where:{
      email: body.email,
    }
  })
  
  if(existing){
    c.status(403)
    return c.json({
      message: 'User already exists'
    })
  }

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    const token = await sign({id: user.id},c.env?.JWT_SECRET)
	
		return c.json({
      token : token
    })

	} catch(e) {
		return c.status(403);
	}
})


UserRouter.post('/signin', async (c) => {
  
  const body = await c.req.json();
  
  const { success } = SigninSchema.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({message:'Invalid Input'})
  }
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const existing = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  })
  if(!existing){
    c.status(403)
    return c.json({
      message : 'User not found'
    })
  }

  const token = await sign({id:existing.id},c.env?.JWT_SECRET)
  c.status(200)
  return c.json({
    token : token
  })
})

