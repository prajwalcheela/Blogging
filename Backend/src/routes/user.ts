import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@prajwalcheela/blogging-common";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_KEY: string;
  };
}>();
userRoute.post("/signup", async (c) => {
  try {
    const check = signupInput.safeParse(await c.req.json());
    console.log(await c.req.json());
    if (!check.success) {
      return c.json({ message: "Invalid inputs" }, 400);
    }
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name || "user",
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_KEY);
    return c.json({ token });
  } catch (err) {
    console.log(err);
    return c.json({ message: "Something went wrong", err }, 500);
  }
});

userRoute.post("/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.json({ message: "Invalid inputs" }, 400);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) throw new Error("Invalid email or password");
    const token = await sign({ id: user.id }, c.env.JWT_KEY);
    return c.json({ token });
  } catch (err) {
    console.log(err);
    return c.json({ message: "Invalid" });
  }
});
