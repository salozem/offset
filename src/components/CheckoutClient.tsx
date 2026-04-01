"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { addRSVP } from "@/lib/store";

function CheckoutInner() {
  const params = useSearchParams();
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const classId = params.get("classId") ?? "";
  const instructor = params.get("instructor") ?? "Instructor";
  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "";
  const price = Number(params.get("price") ?? 15);
  const attendeeName = params.get("name") ?? "";
  const attendeeEmail = params.get("email") ?? "";
  const attendeePhone = params.get("phone") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addRSVP({
      id: `${classId}-${Date.now()}`,
      classId,
      name: attendeeName,
      email: attendeeEmail,
      phone: attendeePhone,
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-8">
        <div className="relative">
          <h1 className="osc-title text-7xl text-white tracking-widest">OSC</h1>
          <div className="absolute -top-2 left-0 right-0 h-px bg-white" />
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-white" />
        </div>
        <div className="text-center flex flex-col gap-3 max-w-sm">
          <p className="osc-title text-xl tracking-widest text-white">
            ¡RSVP Confirmado!
          </p>
          <p className="text-white/50 text-sm">
            Tu pago fue procesado exitosamente. Te esperamos en la clase.
          </p>
        </div>
        <Link href="/" className="btn-rsvp px-10 py-3 text-sm">
          Ver más clases
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <Link
          href="/"
          className="osc-title text-2xl tracking-widest hover:opacity-70 transition-opacity"
        >
          OSC
        </Link>
        <div className="border border-white px-4 py-1">
          <span className="osc-title text-xs tracking-widest">RSVP HERE. ®</span>
        </div>
      </nav>

      <div className="flex-1 max-w-md mx-auto w-full px-4 py-10 flex flex-col gap-8">
        {/* Título */}
        <div className="text-center">
          <h1 className="osc-title text-3xl tracking-widest text-white mb-1">
            Checkout
          </h1>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Order Summary
          </p>
        </div>

        {/* Resumen de la orden */}
        <div className="border border-white/30 p-6 text-center flex flex-col gap-1">
          <p className="osc-title text-sm tracking-widest text-white">
            Open Pop Up Class
          </p>
          <p className="osc-title text-sm tracking-widest text-white">
            {instructor}
          </p>
          <p className="osc-title text-sm tracking-widest text-white/70">
            {date} {time}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Express Checkout */}
          <div className="border border-white/20 p-5 flex flex-col gap-3">
            <p className="osc-title text-xs tracking-widest text-center text-white/50 uppercase mb-1">
              Express Checkout
            </p>
            {/* Apple Pay */}
            <button
              type="button"
              className="w-full bg-black border border-white/30 text-white py-3 flex items-center justify-center gap-2 hover:border-white/60 transition-colors"
            >
              <span className="text-lg">🍎</span>
              <span className="font-semibold text-sm tracking-wide">Pay</span>
            </button>
            {/* Google Pay */}
            <button
              type="button"
              className="w-full bg-black border border-white/30 text-white py-3 flex items-center justify-center gap-2 hover:border-white/60 transition-colors"
            >
              <span className="text-lg">G</span>
              <span className="font-semibold text-sm tracking-wide">Pay</span>
            </button>
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs tracking-widest uppercase">
              o paga con tarjeta
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Formulario de tarjeta */}
          <div className="border border-white/20 p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="osc-title text-xs tracking-widest text-white/60 uppercase">
                Cardholder Name
              </label>
              <input
                className="osc-input"
                placeholder="Enter full name"
                name="name"
                value={card.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="osc-title text-xs tracking-widest text-white/60 uppercase">
                Card Number
              </label>
              <input
                className="osc-input"
                placeholder="Enter number"
                name="number"
                value={card.number}
                onChange={handleChange}
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="osc-title text-xs tracking-widest text-white/60 uppercase">
                  Expiration Date
                </label>
                <input
                  className="osc-input"
                  placeholder="MM/YY"
                  name="expiry"
                  value={card.expiry}
                  onChange={handleChange}
                  maxLength={5}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="osc-title text-xs tracking-widest text-white/60 uppercase">
                  CVV/CVC
                </label>
                <input
                  className="osc-input"
                  placeholder="3-4 digits"
                  name="cvv"
                  value={card.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Total y botón */}
          <div className="flex items-center justify-between osc-title text-sm">
            <span className="text-white/60 tracking-widest uppercase">
              Payment Total
            </span>
            <span className="text-white">${price}</span>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn-rsvp px-16 py-3 text-sm">
              RSVP
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function CheckoutClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
