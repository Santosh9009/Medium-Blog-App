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

  const body = await c.req.json();
  const blog = await prisma.post.create({
    data:{
      title:body.title,
      content:body.content,
      published:body.published,
      authorId:body.authorId,
    }
  })
  return c.json({
    message: 'Blog created successfully',
    id: blog.id
  })
});


BlogRouter.put("/update", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  

});

BlogRouter.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text("get blog route");
});

BlogRouter.get("/bulk", (c) => {
  return c.text("blog bulk route");
});
