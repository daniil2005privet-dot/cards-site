'use client'
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [cards, setCards] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  async function fetchCards() {
    const { data } = await supabase.from("cards").select("*");
    setCards(data || []);
  }

  useEffect(() => {
    fetchCards();
  }, []);

  const filtered = cards.filter(c =>
    filter === "all" ? true : c.category === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-black text-white">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-2">🔥 Cards Collection</h1>
        <p className="text-gray-400">Коллекционные карточки</p>
      </div>

      {/* ФИЛЬТР */}
      <div className="max-w-6xl mx-auto px-6 mb-6 flex gap-3 flex-wrap">
        {[
          { label: "Все", value: "all" },
          { label: "Человек-паук", value: "spiderman" },
          { label: "Черепашки", value: "tmnt" },
          { label: "Stranger Things", value: "stranger" }
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              filter === f.value
                ? "bg-blue-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* КАРТОЧКИ */}
      <div className="max-w-6xl mx-auto px-6 pb-10 grid grid-cols-2 md:grid-cols-4 gap-6">

        {filtered.map(card => (
          <div
            key={card.id}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:scale-105 transition duration-300"
          >
            <img
              src={card.image}
              className="w-full h-64 object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="absolute bottom-0 p-3">
              <h3 className="font-semibold text-lg">{card.title}</h3>
              <p className="text-xs text-gray-400">{card.category}</p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}