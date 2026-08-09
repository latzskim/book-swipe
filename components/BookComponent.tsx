"use client";

import Image from "next/image";
import type { Book } from "@/types/book";

/**
 * Single book card for the swipe stack.
 * Large cover frame (max-w-sm, 2:3); no border. Metadata on hover/focus.
 */
export default function BookComponent({
  title,
  author,
  description,
  coverUrl,
  likes,
  dislikes,
}: Book) {
  return (
    <article
      tabIndex={0}
      className="group relative flex aspect-[2/3] w-full max-w-sm cursor-pointer items-center justify-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
      aria-label={`${title} by ${author}`}
    >
      {/* Wrapper hugs the painted cover so hover overlay never fills letterbox gaps */}
      <div className="relative h-full w-auto max-w-full">
        <Image
          src={coverUrl}
          alt={`Book cover of ${title}`}
          width={400}
          height={600}
          priority
          quality={95}
          sizes="(max-width: 384px) 100vw, 384px"
          className="block h-full w-auto max-w-full object-contain object-center pointer-events-none"
          draggable={false}
        />

        {/* Metadata only on hover/focus — bound to the image, not the outer frame */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 pb-6 opacity-0 transition-opacity duration-300 ease-out group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/45 group-hover:to-transparent group-hover:opacity-100 group-focus-within:bg-gradient-to-t group-focus-within:from-black/80 group-focus-within:via-black/45 group-focus-within:to-transparent group-focus-within:opacity-100"
          aria-hidden="true"
        >
          <header className="translate-y-3 space-y-1 transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="text-sm font-medium text-white/90 sm:text-base">
              by {author}
            </p>
          </header>

          <p className="mt-3 line-clamp-3 translate-y-3 text-sm leading-relaxed text-white/80 transition-transform delay-75 duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 sm:text-[15px]">
            {description}
          </p>

          {/* Stats — same rose/emerald language as Pass/Like stamps */}
          <div className="mt-3 flex translate-y-3 items-center gap-2 transition-transform delay-100 duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/50 bg-rose-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-rose-200">
              <span aria-hidden className="text-[10px] leading-none">
                ✕
              </span>
              <span className="tabular-nums text-rose-100">{dislikes}</span>
              <span className="font-medium normal-case tracking-normal text-rose-200/80">
                pass
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              <span aria-hidden className="text-[10px] leading-none">
                ♥
              </span>
              <span className="tabular-nums text-emerald-100">{likes}</span>
              <span className="font-medium normal-case tracking-normal text-emerald-200/80">
                like
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h2>{title}</h2>
        <p>by {author}</p>
        <p>{description}</p>
        <p>
          {likes} likes, {dislikes} passes
        </p>
      </div>
    </article>
  );
}
