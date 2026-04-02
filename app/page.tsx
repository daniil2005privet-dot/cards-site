'use client'
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 2ef9aa72f8e38b392ac1887dd92fff334cc41712
import { supabase } from "../lib/supabase";

export default function Home() {
  const [cards, setCards] = useState<any[]>([]);
<<<<<<< HEAD
=======
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any>(null);
  const [category, setCategory] = useState("");
>>>>>>> 2ef9aa72f8e38b392ac1887dd92fff334cc41712
  const [filter, setFilter] = useState("all");

  async function fetchCards() {
    const { data } = await supabase.from("cards").select("*");
    setCards(data || []);
  }

  useEffect(() => {
    fetchCards();
  }, []);

<<<<<<< HEAD
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

=======
  async function addCard() {
    if (!file) return alert("Загрузи картинку");

    const fileName = Date.now() + ".png";

    const { error: uploadError } = await supabase.storage
      .from("image")
      .upload(fileName, file);

    if (uploadError) {
      console.log(uploadError);
      alert("Ошибка загрузки");
      return;
    }

    const { data } = supabase.storage
      .from("image")
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("cards").insert([
      {
        title,
        image: data.publicUrl,
        category,
      },
    ]);

    if (insertError) {
      console.log(insertError);
      alert("Ошибка записи в базу");
      return;
    }

    alert("Добавлено 🔥");

    setTitle("");
    setCategory("");
    fetchCards();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Карточки</h1>

      {/* ФОРМА */}
      <input
        placeholder="Название"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Выбери категорию</option>
        <option value="spiderman">Человек-паук</option>
        <option value="tmnt">Черепашки-ниндзя</option>
        <option value="stranger">Очень странные дела</option>
      </select>

      <input
        type="file"
        onChange={e => setFile(e.target.files?.[0])}
      />

      <button onClick={addCard}>Добавить</button>

      {/* ФИЛЬТР */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("spiderman")}>Человек-паук</button>
        <button onClick={() => setFilter("tmnt")}>Черепашки</button>
        <button onClick={() => setFilter("stranger")}>Stranger Things</button>
      </div>

      {/* КАРТОЧКИ */}
      <div style={{ marginTop: 20 }}>
        {cards
          .filter(c => filter === "all" || c.category === filter)
          .map(c => (
            <div key={c.id} style={{ marginBottom: 20 }}>
              <img src={c.image} width={150} />
              <p>{c.title}</p>
              <p>{c.category}</p>
            </div>
          ))}
      </div>
>>>>>>> 2ef9aa72f8e38b392ac1887dd92fff334cc41712
    </div>
  );
}