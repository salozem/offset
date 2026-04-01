import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSC · RSVP Here",
  description: "Offset Crew – Open Pop Up Dance Classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="osc-bg min-h-full text-white antialiased">
        {children}
      </body>
    </html>
  );
}
