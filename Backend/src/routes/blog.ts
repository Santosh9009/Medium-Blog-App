import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

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
    return c.json({
      error: "unauthorised",
    });
  }
});

BlogRouter.post("/add", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: userId,
    },
  });
  return c.json({
    message: "Blog created successfully",
    id: post.id,
  });
});

BlogRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const body = await c.req.json();
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });

  return c.text("Updated successfully!");
});


BlogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const allpost = await prisma.post.findMany();

  return c.json({
    posts: allpost,
  });
});


BlogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const userId = c.get("userId");

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
  

