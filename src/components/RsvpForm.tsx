"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DanceClass } from "@/lib/classes";

export default function RsvpForm({ cls }: { cls: DanceClass }) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.name || !form.phone) return;
    // Guardamos los datos en la URL para pasarlos al checkout
    const params = new URLSearchParams({
      classId: cls.id,
      instructor: cls.instructor,
      date: cls.date,
      time: cls.time,
      price: String(cls.price),
      email: form.email,
      name: form.name,
      phone: form.phone,
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Título RSVP */}
      <div className="flex justify-center">
        <div className="border-2 border-white px-8 py-2">
          <span className="osc-title text-lg tracking-widest">RSVP HERE. ®</span>
        </div>
      </div>

      {/* Campos */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <label className="osc-title text-xs tracking-widest w-32 shrink-0 text-white/80">
            Email
          </label>
          <input
            className="osc-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="osc-title text-xs tracking-widest w-32 shrink-0 text-white/80">
            Your Name
          </label>
          <input
            className="osc-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="osc-title text-xs tracking-widest w-32 shrink-0 text-white/80">
            Phone Number
          </label>
          <input
            className="osc-input"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="osc-title text-xs tracking-widest w-32 shrink-0 text-white/80">
            Payment Total
          </label>
          <span className="text-white font-bold">${cls.price}</span>
        </div>
      </div>

      {/* Botón continuar */}
      <div className="flex justify-center mt-2">
        <button type="submit" className="btn-rsvp px-12 py-3 text-sm">
          Continue
        </button>
      </div>
    </form>
  );
}
