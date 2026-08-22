import { Book } from "./book";

export type BookInteractionItem = {
  id: number;
  userUuid: string;
  liked: boolean;
  createdAt: Date;
  book: Book;
};
