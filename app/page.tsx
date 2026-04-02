'use client'
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [cards, setCards] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any>(null);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("all");

  async function fetchCards() {
    const { data } = await supabase.from("cards").select("*");
    setCards(data || []);
  }

  useEffect(() => {
    fetchCards();
  }, []);

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
    </div>
  );
}