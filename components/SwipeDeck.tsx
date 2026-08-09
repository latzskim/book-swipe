"use client";

import { useState } from "react";
import type { Book, SwipeDecision } from "@/types/book";
import BookComponent from "./BookComponent";
import { SwipeableCard } from "./SwipeableCard";

export function SwipeDeck({ books }: { books: Book[] }) {
  const [index, setIndex] = useState(0);
  const book = books[index];

  async function handleSwipe(decision: SwipeDecision) {
    if (!book) return;
    console.log(`you ${decision}d ${book.title}`);
    setIndex((i) => i + 1);
  }

  if (!book) {
    return <p className="text-center text-sm text-black-500">No more books</p>;
  }

  return (
    <SwipeableCard onSwipe={handleSwipe}>
      <BookComponent {...book} />
    </SwipeableCard>
  );
}
