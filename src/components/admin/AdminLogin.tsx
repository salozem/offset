"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/store";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      router.push("/admin/dashboard");
    } else {
      setError(true);
      setPassword("");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Logo */}
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <h1 className="osc-title text-6xl text-white tracking-widest">OSC</h1>
            <div className="absolute -top-2 left-0 right-0 h-px bg-white" />
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-white" />
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase mt-4">
            Admin Panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="osc-title text-xs tracking-widest text-white/60 uppercase">
              Contraseña
            </label>
            <input
              type="password"
              className="osc-input text-base py-3"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              autoFocus
              required
            />
            {error && (
              <p className="text-red-400 text-xs tracking-wide">
                Contraseña incorrecta.
              </p>
            )}
          </div>

          <button type="submit" className="btn-rsvp w-full py-3 text-sm">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
