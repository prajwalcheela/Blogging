import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono();

const allowedOrigins = [
  "https://blogging.prajwalcheela.in",
  "https://blogging-8vmmomogo-prajwalcheelas-projects.vercel.app/",
  "https://blogging-liard-chi.vercel.app/",
  // "http://localhost:5173/",
];

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (origin && allowedOrigins.includes(origin)) {
        return origin;
      }
      // console.log(`Origin ${origin} is not allowed`);
      return null;
    },
  })
);
app.get("/", (c) => {
  return c.text("Hello User!");
});

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
// http://localhost:5173/
