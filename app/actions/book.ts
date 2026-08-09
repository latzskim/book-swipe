"use server";

import type { Book } from "@/types/book";

export async function getBooks(): Promise<Book[]> {
  return [
    {
      id: "harry-potter-sorcerers-stone",
      author: "J.K. Rowling",
      title: "Harry Potter and the Sorcerer's Stone",
      description:
        "Harry Potter has never even heard of Hogwarts when letters start dropping on the doormat. Destined for greatness, he discovers a world of magic, friendship, and a dark force that wants him gone.",
      coverUrl: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
      likes: 0,
      dislikes: 0,
    },
  ];
}
