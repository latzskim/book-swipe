import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
  coverUrl: text("cover_url").notNull(),
  likes: integer("likes").default(0).notNull(),
  dislikes: integer("dislikes").default(0).notNull(),
});

export type BookRow = typeof books.$inferSelect;
export type NewBookRow = typeof books.$inferInsert;

export const booksInteractions = sqliteTable("books_interactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userUuid: text("user_uuid").notNull(),
  bookId: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  liked: integer("liked", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type BookInteractionRow = typeof booksInteractions.$inferSelect;
export type NewBookInteractionRow = typeof booksInteractions.$inferInsert;
