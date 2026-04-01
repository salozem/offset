import { getClassById, classes } from "@/lib/classes";
import { notFound } from "next/navigation";
import RsvpForm from "@/components/RsvpForm";
import VideoGrid from "@/components/VideoGrid";
import Link from "next/link";

export function generateStaticParams() {
  return classes.map((c) => ({ id: c.id }));
}

export default async function ClasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cls = getClassById(id);
  if (!cls) notFound();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="osc-title text-2xl tracking-widest hover:opacity-70 transition-opacity">
          OSC
        </Link>
        <div className="border border-white px-4 py-1">
          <span className="osc-title text-xs tracking-widest">RSVP HERE. ®</span>
        </div>
      </nav>

      {/* Contenido */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 flex flex-col gap-8">

        {/* Encabezado de la clase */}
        <div className="text-center">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-2">
            Offset Crew · Presents
          </p>
          <h1
            className="osc-title text-4xl md:text-5xl mb-1"
            style={{ color: cls.accentColor }}
          >
            {cls.instructor}
          </h1>
          <p className="text-white/60 text-sm tracking-widest uppercase">
            {cls.type}
          </p>
        </div>

        {/* Videos */}
        <VideoGrid videos={cls.videos} />

        {/* Info de la clase */}
        <div className="flex justify-center gap-8 osc-title text-sm text-white border-t border-b border-white/10 py-4">
          <span>{cls.date}</span>
          <span>{cls.time}</span>
          <span>{cls.genre}</span>
        </div>

        {/* Formulario RSVP */}
        <RsvpForm cls={cls} />
      </div>
    </main>
  );
}
