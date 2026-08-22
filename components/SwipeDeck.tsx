"use client";

import { useState } from "react";
import type { Book, SwipeDecision } from "@/types/book";
import BookComponent from "./BookComponent";
import { SwipeableCard } from "./SwipeableCard";
import { like, dislike } from "@/app/actions/book";

export function SwipeDeck({ books }: { books: Book[] }) {
  const [index, setIndex] = useState(0);
  const book = books[index];

  async function handleSwipe(decision: SwipeDecision) {
    if (!book) return;
    if (decision === "like") {
      await like(book.id);
    } else {
      await dislike(book.id);
    }
    setIndex((i) => i + 1);
  }

  if (!book) {
    return <p className="text-center text-sm text-zinc-500">No more books</p>;
  }

  return (
    <SwipeableCard onSwipe={handleSwipe}>
      <BookComponent {...book} />
    </SwipeableCard>
  );
}
