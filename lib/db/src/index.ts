import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DB_PATH = process.env.DATABASE_PATH ?? "./data/blog.db";

const sqlite = new Database(DB_PATH);

// WAL mode for better read performance
sqlite.pragma("journal_mode = WAL");

// Create tables if they don't exist (no migration tooling needed at runtime)
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);

export const db = drizzle(sqlite, { schema });

export * from "./schema";
