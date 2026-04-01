export type DanceClass = {
  id: string;
  instructor: string;
  type: string;
  date: string;
  time: string;
  genre: string;
  price: number;
  // IDs de videos de YouTube (solo el ID, ej: "dQw4w9WgXcQ")
  videos: string[];
  // Color de acento del instructor
  accentColor: string;
  // Emoji de avatar temporal (reemplazar con imagen real)
  avatar: string;
};

export const classes: DanceClass[] = [
  {
    id: "alexa-olivier",
    instructor: "Alexa Olivier",
    type: "Open Pop Up Class",
    date: "March 30th",
    time: "Monday 9PM",
    genre: "Hip Hop",
    price: 15,
    videos: ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    accentColor: "#ff4444",
    avatar: "🔴",
  },
  {
    id: "niko-fagan",
    instructor: "Niko Fagan",
    type: "Open Pop Up Class",
    date: "April 1st",
    time: "Wednesday 9:30PM",
    genre: "Hip Hop",
    price: 15,
    videos: ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    accentColor: "#cc44ff",
    avatar: "🟣",
  },
  {
    id: "jay-boogie",
    instructor: "Jay Boogie",
    type: "Open Pop Up Class",
    date: "April 6th",
    time: "Monday 9PM",
    genre: "Hip Hop",
    price: 15,
    videos: ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    accentColor: "#ff8800",
    avatar: "🟠",
  },
];

export function getClassById(id: string): DanceClass | undefined {
  return classes.find((c) => c.id === id);
}
