"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getClasses,
  deleteClass,
  getRSVPsByClass,
  isAuthenticated,
  logout,
} from "@/lib/store";
import { DanceClass } from "@/lib/classes";

export default function AdminDashboard() {
  const router = useRouter();
  const [classes, setClasses] = useState<DanceClass[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin");
      return;
    }
    setClasses(getClasses());
  }, [router]);

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta clase?")) return;
    deleteClass(id);
    setClasses(getClasses());
  }

  function handleLogout() {
    logout();
    router.push("/admin");
  }

  // Ordenar por fecha más próxima
  const sorted = [...classes].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/" className="osc-title text-2xl tracking-widest hover:opacity-70 transition-opacity">
            OSC
          </Link>
          <span className="text-white/30 text-xs tracking-widest uppercase">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clases/nueva"
            className="btn-rsvp text-xs px-4 py-2"
          >
            + Nueva Clase
          </Link>
          <button
            onClick={handleLogout}
            className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
          >
            Salir
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 flex flex-col gap-8">
        <h1 className="osc-title text-2xl tracking-widest text-white">
          Dashboard
        </h1>

        {/* Stats rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Clases activas" value={classes.length} />
          <StatCard
            label="RSVPs totales"
            value={classes.reduce(
              (acc, c) => acc + getRSVPsByClass(c.id).length,
              0
            )}
          />
          <StatCard
            label="Ingresos estimados"
            value={`$${classes.reduce(
              (acc, c) => acc + getRSVPsByClass(c.id).length * c.price,
              0
            )}`}
          />
        </div>

        {/* Lista de clases */}
        <div className="flex flex-col gap-3">
          <h2 className="osc-title text-xs text-white/40 tracking-widest uppercase">
            Clases programadas
          </h2>

          {sorted.length === 0 ? (
            <div className="border border-white/10 p-8 text-center">
              <p className="text-white/30 text-sm">No hay clases programadas.</p>
              <Link
                href="/admin/clases/nueva"
                className="inline-block mt-4 btn-rsvp text-xs px-6 py-2"
              >
                + Crear primera clase
              </Link>
            </div>
          ) : (
            sorted.map((cls) => {
              const rsvps = getRSVPsByClass(cls.id);
              return (
                <div
                  key={cls.id}
                  className="border border-white/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cls.accentColor }}
                      />
                      <span className="osc-title text-sm text-white">
                        {cls.instructor}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs ml-5">
                      {cls.date} · {cls.time} · {cls.genre}
                    </p>
                    <p className="text-white/40 text-xs ml-5">
                      {rsvps.length} inscritos · ${cls.price} c/u
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-3 shrink-0">
                    <RsvpList rsvps={rsvps} />
                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="text-red-400/60 text-xs tracking-widest uppercase hover:text-red-400 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-white/20 p-4 flex flex-col gap-1">
      <p className="text-white/40 text-xs tracking-widest uppercase">{label}</p>
      <p className="osc-title text-2xl text-white">{value}</p>
    </div>
  );
}

function RsvpList({
  rsvps,
}: {
  rsvps: { name: string; email: string; phone: string }[];
}) {
  const [open, setOpen] = useState(false);
  if (rsvps.length === 0) return null;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-white/50 text-xs tracking-widest uppercase hover:text-white transition-colors"
      >
        Ver RSVPs ({rsvps.length})
      </button>
      {open && (
        <div className="absolute right-0 top-6 z-10 bg-black border border-white/20 p-4 min-w-64 flex flex-col gap-2 shadow-xl">
          <p className="osc-title text-xs text-white/40 tracking-widest uppercase mb-1">
            Inscritos
          </p>
          {rsvps.map((r, i) => (
            <div key={i} className="text-xs text-white/70 flex flex-col gap-0.5">
              <span className="text-white">{r.name}</span>
              <span>{r.email}</span>
              <span>{r.phone}</span>
            </div>
          ))}
          <button
            onClick={() => setOpen(false)}
            className="text-white/30 text-xs mt-2 hover:text-white transition-colors text-right"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
