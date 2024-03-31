import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt'


type Environment = {
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }
}
export const UserRouter = new Hono<Environment>()


UserRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
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
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  const body = await c.req.json();

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

