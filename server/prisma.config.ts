import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    url: process.env["DIRECT_URL"], // Tells Prisma to use the direct connection for migrations
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
