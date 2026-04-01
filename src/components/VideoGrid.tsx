"use client";

export default function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {videos.map((videoId, i) => (
        <div
          key={i}
          className="relative aspect-[9/16] bg-black border border-white/20 overflow-hidden"
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0`}
            title={`Video ${i + 1}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
