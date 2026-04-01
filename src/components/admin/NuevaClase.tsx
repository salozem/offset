"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, addClass } from "@/lib/store";
import { DanceClass } from "@/lib/classes";

const ACCENT_COLORS = [
  "#ff4444", "#cc44ff", "#ff8800", "#44aaff", "#44ff88", "#ff44aa",
];

export default function NuevaClase() {
  const router = useRouter();
  const [form, setForm] = useState({
    instructor: "",
    type: "Open Pop Up Class",
    date: "",
    time: "",
    genre: "Hip Hop",
    price: "15",
    accentColor: ACCENT_COLORS[0],
    videos: "",
  });

  useEffect(() => {
    if (!isAuthenticated()) router.replace("/admin");
  }, [router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Convertir la fecha "2026-04-06" a formato legible "April 6th"
    const dateObj = new Date(form.date + "T12:00:00");
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const d = dateObj.getDate();
    const suffix =
      d === 1 || d === 21 || d === 31 ? "st"
      : d === 2 || d === 22 ? "nd"
      : d === 3 || d === 23 ? "rd"
      : "th";
    const dateLabel = `${months[dateObj.getMonth()]} ${d}${suffix}`;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayLabel = days[dateObj.getDay()];

    // Parsear IDs de YouTube (separados por coma o espacios)
    const videos = form.videos
      .split(/[\s,]+/)
      .map((v) => v.trim())
      .filter(Boolean)
      .slice(0, 3);

    // Si no pusieron videos, usar placeholder
    const finalVideos =
      videos.length > 0
        ? videos
        : ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"];

    const newClass: DanceClass = {
      id: `${form.instructor.toLowerCase().replace(/\s+/g, "-")}-${form.date}`,
      instructor: form.instructor,
      type: form.type,
      date: dateLabel,
      time: `${dayLabel} ${form.time}`,
      genre: form.genre,
      price: Number(form.price),
      videos: finalVideos,
      accentColor: form.accentColor,
      avatar: "🎤",
    };

    addClass(newClass);
    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <Link
          href="/admin/dashboard"
          className="osc-title text-2xl tracking-widest hover:opacity-70 transition-opacity"
        >
          OSC
        </Link>
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Admin · Nueva Clase
        </span>
      </nav>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-10 flex flex-col gap-8">
        <h1 className="osc-title text-2xl tracking-widest text-white">
          Nueva Clase
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Instructor */}
          <Field label="Instructor">
            <input
              className="osc-input"
              name="instructor"
              value={form.instructor}
              onChange={handleChange}
              placeholder="Ej: Alexa Olivier"
              required
            />
          </Field>

          {/* Fecha */}
          <Field label="Fecha">
            <input
              className="osc-input"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </Field>

          {/* Hora */}
          <Field label="Hora">
            <input
              className="osc-input"
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </Field>

          {/* Género */}
          <Field label="Género">
            <select
              className="osc-input bg-transparent"
              name="genre"
              value={form.genre}
              onChange={handleChange}
            >
              <option value="Hip Hop" className="bg-black">Hip Hop</option>
              <option value="Dancehall" className="bg-black">Dancehall</option>
              <option value="Afro" className="bg-black">Afro</option>
              <option value="House" className="bg-black">House</option>
              <option value="Waacking" className="bg-black">Waacking</option>
              <option value="Breaking" className="bg-black">Breaking</option>
              <option value="Other" className="bg-black">Other</option>
            </select>
          </Field>

          {/* Precio */}
          <Field label="Precio ($)">
            <input
              className="osc-input"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="1"
              required
            />
          </Field>

          {/* Videos de YouTube */}
          <Field label="Videos YouTube" hint="IDs separados por coma (máx 3)">
            <input
              className="osc-input"
              name="videos"
              value={form.videos}
              onChange={handleChange}
              placeholder="dQw4w9WgXcQ, abc123, xyz789"
            />
          </Field>

          {/* Color de acento */}
          <Field label="Color del instructor">
            <div className="flex gap-3 flex-wrap mt-1">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, accentColor: color }))}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: color,
                    borderColor:
                      form.accentColor === color ? "white" : "transparent",
                  }}
                />
              ))}
            </div>
          </Field>

          {/* Botones */}
          <div className="flex gap-4 mt-2">
            <Link
              href="/admin/dashboard"
              className="flex-1 text-center border border-white/20 text-white/50 py-3 text-sm osc-title tracking-widest uppercase hover:border-white/40 transition-colors"
            >
              Cancelar
            </Link>
            <button type="submit" className="flex-1 btn-rsvp py-3 text-sm">
              Crear Clase
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="osc-title text-xs tracking-widest text-white/60 uppercase">
        {label}
        {hint && <span className="text-white/30 ml-2 normal-case font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
