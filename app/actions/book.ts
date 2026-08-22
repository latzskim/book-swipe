"use server";

import { db } from "@/db";
import { books, booksInteractions } from "@/db/schema";
import type { Book } from "@/types/book";
import { eq, sql } from "drizzle-orm";

export async function getBooks(): Promise<Book[]> {
  return await db.select().from(books);
}

export async function like(bookId: string) {
  await db
    .update(books)
    .set({ likes: sql`${books.likes} + 1` })
    .where(eq(books.id, bookId));

  await db.insert(booksInteractions).values({
    bookId: bookId,
    userUuid: "1",
    liked: true,
  });
}

export async function dislike(bookId: string) {
  await db
    .update(books)
    .set({ dislikes: sql`${books.dislikes} + 1` })
    .where(eq(books.id, bookId));

  await db.insert(booksInteractions).values({
    bookId: bookId,
    userUuid: "1",
    liked: false,
  });
}
