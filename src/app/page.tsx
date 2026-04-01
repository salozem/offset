import ClassCard from "@/components/ClassCard";
import { classes } from "@/lib/classes";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header / Hero */}
      <header className="flex flex-col items-center justify-center py-16 px-4 border-b border-white/10">
        {/* Logo OSC */}
        <div className="relative mb-4">
          <h1 className="osc-title text-7xl md:text-9xl text-white tracking-widest select-none">
            OSC
          </h1>
          {/* Líneas decorativas arriba y abajo del logo */}
          <div className="absolute -top-2 left-0 right-0 h-px bg-white" />
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-white" />
        </div>
        <div className="border border-white px-6 py-1 mt-4">
          <p className="osc-title text-sm tracking-widest">RSVP HERE. ®</p>
        </div>
        <p className="mt-6 text-white/40 text-xs tracking-widest uppercase">
          Offset Crew · Open Pop Up Classes
        </p>
      </header>

      {/* Grid de clases */}
      <section className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <h2 className="osc-title text-xs text-white/40 tracking-widest mb-8 uppercase">
          Próximas Clases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <ClassCard key={cls.id} cls={cls} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">
          © Offset Crew · RSVP Here ®
        </p>
      </footer>
    </main>
  );
}
