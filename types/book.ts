/**
 * Shared domain model for a book.
 * Safe to import from both Server and Client Components
 * (keep this file free of "use server" / "use client").
 */
export type Book = {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly coverUrl: string;
  // TODO: restore readonly :)
  likes: number;
  dislikes: number;
};

/** User decision when swiping a book. */
export type SwipeDecision = "like" | "dislike";
