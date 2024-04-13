import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { SignupSchema, SigninSchema, UpdateUser } from '@santosh_pati/medium-common';
import { verify } from "hono/jwt";



type Environment = {
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }, 
    Variables: {
      userId: string;
    };
}
export const UserRouter = new Hono<Environment>()

UserRouter.use("/me/*", async (c, next) => {
  const headers = c.req.header("authorization");

  if (!headers || !headers.startsWith("Bearer ")) {
    c.status(403)
    return c.json({
      error: "unauthorised",
    });
  }

  const token = headers.split(" ")[1];

  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    c.set("userId", decoded.id);
    await next();
  } catch {
    c.status(403)
    return c.json({
      error: "unauthorised",
    });
  }
});


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
      email: body.email,
      password:body.password
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

UserRouter.get('/me',async (c)=>{
  const userid = c.get('userId')

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = await prisma.user.findUnique({
    where:{
      id:userid
    },
    select:{
      name:true,
      email:true,
      password:true,
    }
  })
  c.status(200)
  return c.json({
    user:user
  })
})


UserRouter.put('/me/update',async (c)=>{
  const body = await c.req.json();
  const userid = c.get('userId')
  const {success} = UpdateUser.safeParse(body);

  if(!success){
    c.status(411)
    return c.json({message:'Invalid Input'})
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = await prisma.user.update({
    where:{
      id:userid
    },
    data:{
      name:body.name,
      email:body.email,
      password:body.password
    }
  })

  c.status(200)
  return c.json({
    user:user
  })
})



