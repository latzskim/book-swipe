import { db } from ".";
import { books, NewBookRow } from "./schema";

const GENRES = ["fantasy", "science_fiction", "mystery", "romance", "history"];

const BOOKS_PER_GENRE = 20;

async function seed() {
  console.log("Fetching books from OpenLibrary...");
  const items: NewBookRow[] = [];

  for (const genre of GENRES) {
    console.log(` -> fetching ${genre}...`);
    try {
      const res = await fetch(
        `https://openlibrary.org/subjects/${genre}.json?limit=${BOOKS_PER_GENRE}`,
      );

      const data = await res.json();
      for (const work of data.works) {
        if (!work.cover_id) continue;

        items.push({
          id: work.key.replace("/works/", ""),
          title: work.title,
          author: work.authors?.[0]?.name ?? "Unknown Author",
          description: `A celebrated ${genre.replace("_", " ")} classic.`,
          coverUrl: `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
          likes: 0,
          dislikes: 0,
        });
      }
    } catch (err) {
      console.error(`Failed to fetch genre ${genre}: `, err);
    }

    console.log(`Inserting ${items.length} books into SQLite...`);
    await db.insert(books).values(items).onConflictDoNothing();
    console.log("Seeding completed successfully!");
  }
}

seed().catch((err) => {
  console.error("Seed failed: ", err);
  process.exit(1);
});
