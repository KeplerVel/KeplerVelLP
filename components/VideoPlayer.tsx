"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  label?: string;
  portrait?: boolean;
};

export default function VideoPlayer({ src, poster, label = "Play video", portrait = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className={portrait ? "flex justify-center" : ""}>
      <div
        className={`relative bg-(--bg2) overflow-hidden ${portrait ? "w-full max-w-sm aspect-9/16" : "w-full aspect-video"}`}
      >
        <video
          ref={ref}
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          className="w-full h-full object-cover"
        />
        {!playing && (
          <button
            onClick={toggle}
            aria-label={label}
            className="absolute inset-0 flex items-center justify-center bg-(--ink)/40 hover:bg-(--ink)/20 transition-[background-color] duration-200 focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-(--accent) text-(--accent)">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
        {playing && (
          <button
            onClick={toggle}
            aria-label="Pause"
            className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-(--ink)/70 text-(--cream) hover:bg-(--ink)/90 transition-[background-color] duration-150 focus-visible:outline-2 focus-visible:outline-(--accent)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
