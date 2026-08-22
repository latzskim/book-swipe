import { InteractionList } from "@/components/InteractionList";
import { getRecentInteractions } from "../actions/interaction";

export default async function HistoryPage() {
  const items = await getRecentInteractions();

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-zinc-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-xl font-semibold text-zinc-900">Interaction History</h1>
        <InteractionList items={items} />
      </div>
    </main>
  );
}
