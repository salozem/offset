import Link from "next/link";

export default function ConfirmacionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-8">
      {/* Logo */}
      <div className="relative">
        <h1 className="osc-title text-7xl text-white tracking-widest">OSC</h1>
        <div className="absolute -top-2 left-0 right-0 h-px bg-white" />
        <div className="absolute -bottom-2 left-0 right-0 h-px bg-white" />
      </div>

      {/* Mensaje */}
      <div className="text-center flex flex-col gap-3 max-w-sm">
        <p className="osc-title text-xl tracking-widest text-white">
          ¡RSVP Confirmado!
        </p>
        <p className="text-white/50 text-sm">
          Tu pago fue procesado exitosamente. Te esperamos en la clase.
        </p>
        <p className="text-white/30 text-xs">
          Revisa tu correo para los detalles de confirmación.
        </p>
      </div>

      {/* Volver */}
      <Link href="/" className="btn-rsvp px-10 py-3 text-sm">
        Ver más clases
      </Link>
    </main>
  );
}
