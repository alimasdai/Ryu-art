import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  Library,
  Tag,
} from "lucide-react";

import { getGenres } from "../utils/api";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await getGenres();

        // API OBJECT -> ARRAY
        const formatted = Object.values(res || {});
        setGenres(formatted);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  // RANDOM DESK OBJECTS
  const objects = useMemo(() => {
    const types = [
      "desk-clip",
      "desk-tape",
      "desk-ring",
      "desk-staple",
      "desk-doodle",
      "paper-piece",
    ];

    return Array.from({ length: 30 }).map((_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];

      return {
        id: i,
        type,
        top: Math.random() * 92,
        left: Math.random() * 94,
        rotate: Math.random() * 360,
        scale: 0.7 + Math.random() * 1.2,
        opacity: 0.15 + Math.random() * 0.4,
      };
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-[#1e1e1e]">

      {/* BG */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute inset-0 bg-[#183153]" />

        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)
            `,
            backgroundSize: "34px 34px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
            backgroundSize: "8px 8px",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(255,255,255,.08), transparent 30%),
              radial-gradient(circle at bottom right, rgba(0,0,0,.35), transparent 45%)
            `,
          }}
        />

      </div>

      {/* FLOAT OBJECTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">

        {objects.map((item) => (
          <div
            key={item.id}
            className={item.type}
            style={{
              position: "absolute",
              top: `${item.top}%`,
              left: `${item.left}%`,
              transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
              opacity: item.opacity,
            }}
          />
        ))}

      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-3 sm:px-5 py-6 sm:py-8">

        {/* HEADER */}
        <section className="max-w-6xl mx-auto mb-10 relative">

          {/* STICKY */}
          <div
            className="
              absolute
              right-2
              top-[-18px]
              sm:right-8
              rotate-[8deg]
              w-[85px]
              h-[85px]
              bg-[#ffe97a]
              border border-black/10
              shadow-[7px_7px_0px_rgba(0,0,0,.12)]
              flex items-center justify-center
              text-center
              z-20
            "
          >
            <p className="text-[10px] font-black leading-snug">
              GENRE
              <br />
              INDEX
              <br />
              BOARD
            </p>
          </div>

          {/* PAPER */}
          <div
            className="
              relative
              bg-[#f8f1de]
              border-2 border-black/10
              shadow-[10px_10px_0px_rgba(0,0,0,.14)]
              rotate-[-1deg]
              overflow-hidden
              px-5
              py-7
            "
          >

            <div className="absolute inset-0 opacity-[0.05] paper-noise" />

            <div className="relative z-10">

              <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase opacity-60">
                <Library size={12} />
                Genre Collection
              </div>

              <h1 className="mt-3 text-3xl sm:text-5xl font-black leading-none">
                Manga Genres
              </h1>

              <p className="mt-4 max-w-2xl text-[11px] sm:text-xs leading-relaxed opacity-70">
                Browse manga categories from action, fantasy, romance,
                horror, comedy, and many more editor archive collections.
              </p>

            </div>

          </div>

        </section>

        {/* GENRE GRID */}
        <section className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      h-[120px]
                      bg-[#f8f1de]
                      border border-black/10
                      rounded-[24px]
                      animate-pulse
                    "
                  />
                ))

              : genres.map((genre, i) => {

                  const scatterClass = [
                    "paper-scatter-1",
                    "paper-scatter-2",
                    "paper-scatter-3",
                    "paper-scatter-4",
                  ][i % 4];

                  const clipColor = [
                    "paper-clip-yellow",
                    "paper-clip-blue",
                    "paper-clip-red",
                    "paper-clip-green",
                  ][i % 4];

                  return (
                    <article
                      key={genre.value}
                      onClick={() => navigate(`/genre/${genre.value}`)}
                      className={`
                        paper-card
                        paper-hover
                        paper-edge
                        paper-clip
                        ${clipColor}
                        ${scatterClass}
                        group
                        relative
                        overflow-hidden
                        cursor-pointer
                        bg-[#f8f1de]
                        min-h-[120px]
                        p-4
                        flex flex-col justify-between
                      `}
                    >

                      {/* DECOR */}
                      <div className="absolute top-2 right-2 opacity-10">
                        <Sparkles size={42} />
                      </div>

                      {/* TOP */}
                      <div className="relative z-10 flex items-center justify-between">

                        <div
                          className="
                            w-9 h-9
                            rounded-full
                            bg-black/5
                            flex items-center justify-center
                          "
                        >
                          <Tag size={16} />
                        </div>

                        <p className="text-[9px] tracking-[0.25em] uppercase opacity-50">
                          Genre
                        </p>

                      </div>

                      {/* TEXT */}
                      <div className="relative z-10">

                        <h2 className="text-sm sm:text-base font-black leading-tight">
                          {genre.name}
                        </h2>

                        <div className="mt-2 flex items-center gap-1 text-[10px] opacity-60">
                          <BookOpen size={10} />
                          Explore archive
                        </div>

                      </div>

                    </article>
                  );
                })}
          </div>

        </section>

      </div>

    </main>
  );
}