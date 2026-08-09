"use server";

import type { Book } from "@/types/book";

const books: Book[] = [
  {
    id: "harry-potter-sorcerers-stone",
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer's Stone",
    description:
      "Harry Potter has never even heard of Hogwarts when letters start dropping on the doormat. Destined for greatness, he discovers a world of magic, friendship, and a dark force that wants him gone.",
    coverUrl: "https://covers.openlibrary.org/b/id/15155644-L.jpg",
    likes: 0,
    dislikes: 0,
  },
];

export async function getBooks(): Promise<Book[]> {
  return books;
}

export async function like(bookId: string) {
  const book = books.find((b) => b.id === bookId);
  if (!book) return;
  book.likes += 1;
}

export async function dislike(bookId: string) {
  const book = books.find((b) => b.id === bookId);
  if (!book) return;
  book.dislikes += 1;
}
