import { SwipeDeck } from "@/components/SwipeDeck";
import { getBooks } from "./actions/book";

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-white px-4 py-8">
      {/* Swipe stage: centered card area ready for a stack later */}
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <header className="w-full text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            BookSwipe
          </p>
          <h1 className="mt-1 text-lg font-semibold text-zinc-900">
            Discover your next read
          </h1>
        </header>

        <SwipeDeck books={books} />
      </div>
    </main>
  );
}
