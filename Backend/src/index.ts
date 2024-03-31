import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>();





app.post('/api/v1/signup', async (c) => {
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


app.post('/api/v1/signin', async (c) => {
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


app.post('/api/v1/blog', (c) => {
  return c.text('blog post route')
})


app.put('/api/v1/blog', (c) => {
  return c.text('bolg put route')
})


app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  return c.text('get blog route')
})


app.get('/api/v1/blog/bulk', (c) => {
  return c.text('blog bulk route')
})



export default app
