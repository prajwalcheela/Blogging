import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
  return c.text("Hello User!");
});

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
