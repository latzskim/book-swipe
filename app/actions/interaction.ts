"use server";

import { db } from "@/db";
import { books, booksInteractions } from "@/db/schema";
import { BookInteractionItem } from "@/types/interaction";
import { desc, eq } from "drizzle-orm";

export async function getRecentInteractions(
  limit = 20,
): Promise<BookInteractionItem[]> {
  const rows = await db
    .select({
      id: booksInteractions.id,
      userUuid: booksInteractions.userUuid,
      liked: booksInteractions.liked,
      createdAt: booksInteractions.createdAt,
      book: {
        id: books.id,
        title: books.title,
        author: books.author,
        description: books.description,
        coverUrl: books.coverUrl,
        likes: books.likes,
        dislikes: books.dislikes,
      },
    })
    .from(booksInteractions)
    .innerJoin(books, eq(booksInteractions.bookId, books.id))
    .orderBy(desc(booksInteractions.createdAt))
    .limit(limit);

  return rows;
}
