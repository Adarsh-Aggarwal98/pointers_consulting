import path from "path";
import { existsSync } from "fs";
import app from "./app";
import { logger } from "./lib/logger";
import { seedBlogs } from "./lib/seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// In production (Docker), serve the React build as static files
const staticDir = path.resolve(process.cwd(), "public");
if (existsSync(staticDir)) {
  const { default: sirv } = await import("sirv");
  app.use(sirv(staticDir, { single: true }));
  logger.info({ staticDir }, "Serving static files");
}

// Seed DB with initial blog posts on first run
await seedBlogs();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
