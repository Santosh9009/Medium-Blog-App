import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { Createblog, Updateblog  } from '@santosh_pati/medium-common';


type Environment = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
};

export const BlogRouter = new Hono<Environment>();

BlogRouter.use("/*", async (c, next) => {
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


BlogRouter.post("/add", async (c) => {
  
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = Createblog.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({message:'Invalid Input'})
  }
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      publishDate: body.publishDate,
      authorId: userId,
    },
  });
  return c.json({
    message: "Blog created successfully",
    id: post.id,
  });
});


BlogRouter.put("/update", async (c) => {
  
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = Updateblog.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({message:'Invalid Input'})
  }
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
      publishDate: body.publishDate,
    },
  });

  return c.text("Updated successfully!");
});


BlogRouter.get("/bulk", async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const allpost = await prisma.post.findMany({
    select:{
      id:true,
      title:true,
      content:true,
      publishDate:true,
      author:{
        select:{
          name:true,
        }
      }
    }
  });

  return c.json({
    posts: allpost,
  });
});

// all my posts
BlogRouter.get("/mypost", async (c) => {
  const userId = c.get("userId");
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const mypost = await prisma.post.findMany({
   where:{
    author:{
      id:userId,
    },
   },select:{
    title:true,
    content:true,
    publishDate:true,
    author:{
      select:{
        name:true,
      }
    }
   }
  });

  return c.json({
    posts: mypost,
  });
});


BlogRouter.get("/:id", async (c) => {
  
  const id = c.req.param("id");
  const userId = c.get("userId");
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
    const post = await prisma.post.findUnique({
      where: {
        id: id,
        authorId: userId,
      },
    });
    
    return c.json({
      post: post,
    });
  });
  

