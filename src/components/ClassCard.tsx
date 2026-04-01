"use client";
import Link from "next/link";
import { DanceClass } from "@/lib/classes";

export default function ClassCard({ cls }: { cls: DanceClass }) {
  return (
    <Link href={`/clase/${cls.id}`} className="block group">
      <div className="relative border border-white/20 bg-black/40 overflow-hidden transition-all duration-200 group-hover:border-white/60">
        {/* Header de color del instructor */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: cls.accentColor }}
        />

        {/* Contenido */}
        <div className="p-6 flex flex-col gap-3">
          {/* Presentado por */}
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Offset Crew · Presents
          </p>

          {/* Nombre del instructor */}
          <h2
            className="osc-title text-2xl"
            style={{ color: cls.accentColor }}
          >
            {cls.instructor}
          </h2>

          <p className="text-white/60 text-xs tracking-widest uppercase">
            {cls.type}
          </p>

          {/* Info de la clase */}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-white text-sm osc-title">
            <span>{cls.date}</span>
            <span>{cls.time}</span>
            <span>{cls.genre}</span>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-white/50 text-sm">${cls.price}</span>
            <div className="btn-rsvp text-xs px-4 py-2">RSVP Here ®</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
