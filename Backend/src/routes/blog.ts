import {
  createBlogInput,
  updateBlogInput,
} from "@prajwalcheela/blogging-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

import { verify } from "hono/jwt";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_KEY);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    console.log(success);
    if (!success) {
      return c.json({ message: "Invalid inputs" }, 400);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    });
    const userId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        autherId: userId,
      },
    });
    c.status(200);
    return c.json(blog);
  } catch (err) {
    console.log(err);
    return c.json({ message: "Invalid" });
  }
});

blogRoute.put("/", async (c) => {
  try {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid inputs" }, 400);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
      select: {},
    });
    return c.json({ message: "sucessfully Updated" }, 200);
  } catch (err) {
    console.log(err);
    return c.json({ message: "Invalid" }, 411);
  }
});
blogRoute.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    // console.log(post);
    return c.json(post);
  } catch (err) {
    return c.json({ message: "Invalid" });
  }
});
blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  //   console.log(body);
  const blogs = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  // console.log(blogs);
  return c.json(blogs);
});
