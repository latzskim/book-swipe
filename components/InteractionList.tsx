import { BookInteractionItem } from "@/types/interaction";
import Image from "next/image";

export function InteractionList({ items }: { items: BookInteractionItem[] }) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-zinc-500">
        No book interactions yet.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white shadow-sm">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-4 p-4 transition-colors hover:bg-zinc-50"
        >
          <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded bg-zinc-100 border border-zinc-200">
            {item.book.coverUrl && (
              <Image
                src={item.book.coverUrl}
                alt={item.book.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-medium text-zinc-900">
              {item.book.title}
            </h2>
            <p className="truncate text-xs text-zinc-500">
              {item.book.author}
            </p>
          </div>

          <div>
            {item.liked ? (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                Liked
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 border border-rose-200">
                Passed
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
