import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Bookmark } from "lucide-react";
import { getGenre } from "../utils/api";

export default function Genre() {
  const { genre } = useParams();

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!genre) return;

      setLoading(true);

      try {
        const res = await getGenre(genre, page);
        setData(res);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();
  }, [genre, page]);

  const comics = data?.comics || [];
  const pagination = data?.pagination || {};
  const currentPage = pagination.current_page || page;

  const visiblePages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((p) => p > 0);

  const getSlug = (url) => {
    try {
      const parts = url.split("/").filter(Boolean);
      return parts[parts.length - 1];
    } catch {
      return "";
    }
  };

  // RANDOM OBJECTS
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

      {/* FLOATING OBJECT */}
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
        <section className="max-w-6xl mx-auto mb-8 sm:mb-10 relative">

          <div className="absolute -top-2 left-8 w-[90px] h-[24px] bg-[#fff1a8]/80 rotate-[-5deg] border border-black/10 shadow-sm" />

          <div
            className="
              relative
              bg-[#f8f1de]
              border-2 border-black/10
              shadow-[10px_10px_0px_rgba(0,0,0,.14)]
              rotate-[-1deg]
              overflow-hidden
              px-5
              py-6
            "
          >

            <div className="absolute inset-0 opacity-[0.05] paper-noise" />

            <div className="relative z-10 flex items-start justify-between gap-4">

              <div>

                <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase opacity-60">
                  <Sparkles size={12} />
                  Genre Archive
                </div>

                <h1 className="mt-3 text-2xl sm:text-4xl font-black capitalize leading-tight">
                  {genre}
                </h1>

                <p className="mt-3 text-[11px] sm:text-xs opacity-70 max-w-xl leading-relaxed">
                  Browse manga collections filtered by selected genre.
                  Discover new series, fresh updates, and editor-picked drafts.
                </p>

              </div>

              <div
                className="
                  hidden sm:flex
                  w-[90px]
                  h-[90px]
                  rotate-[8deg]
                  bg-[#ffe97a]
                  border border-black/10
                  shadow-[6px_6px_0px_rgba(0,0,0,.12)]
                  items-center
                  justify-center
                  text-center
                  shrink-0
                  p-2
                "
              >
                <p className="text-[10px] font-black leading-snug">
                  GENRE
                  <br />
                  FILTER
                  <br />
                  ACTIVE
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* GRID */}
        <section className="max-w-6xl mx-auto">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">

            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      bg-[#f8f1de]
                      border border-black/10
                      rounded-[24px]
                      overflow-hidden
                      animate-pulse
                      h-[260px]
                    "
                  />
                ))

              : comics.map((comic, i) => {

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
                      key={i}
                      onClick={() =>
                        navigate(`/manga/${getSlug(comic.link)}`)
                      }
                      className={`
                        paper-card
                        paper-hover
                        paper-edge
                        paper-clip
                        ${clipColor}
                        ${scatterClass}
                        group
                        overflow-hidden
                        cursor-pointer
                        bg-[#f8f1de]
                      `}
                    >

                      {/* IMAGE */}
                      <div className="relative aspect-[3/4] overflow-hidden">

                        <img
                          src={comic.image}
                          alt={comic.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-[1.05]
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute bottom-2 left-2 right-2">

                          <div className="flex items-center gap-1 text-white/80 text-[9px] tracking-[0.2em] uppercase mb-1">
                            <Bookmark size={10} />
                            Genre
                          </div>

                          <p className="text-[10px] text-white/85 capitalize">
                            {comic.genre}
                          </p>

                        </div>

                      </div>

                      {/* INFO */}
                      <div className="p-3 sm:p-4">

                        <h3 className="text-[11px] sm:text-sm font-black leading-snug line-clamp-2">
                          {comic.title}
                        </h3>

                        <div className="mt-3 flex items-center justify-between gap-2">

                          <p className="text-[10px] opacity-60">
                            {comic.chapter}
                          </p>

                          <div className="px-2 py-1 bg-black/5 text-[9px] uppercase tracking-[0.2em] rounded-full">
                            #{i + 1}
                          </div>

                        </div>

                      </div>

                    </article>
                  );
                })}
          </div>

        </section>

        {/* PAGINATION */}
        <section className="max-w-6xl mx-auto mt-10 flex justify-center">

          <div
            className="
              flex items-center gap-2
              bg-[#f8f1de]
              border border-black/10
              shadow-[8px_8px_0px_rgba(0,0,0,.12)]
              px-4
              py-3
              rotate-[-1deg]
            "
          >

            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="
                px-3 py-2
                text-xs font-bold
                bg-white/80
                border border-black/10
                hover:bg-black
                hover:text-white
                transition
                disabled:opacity-40
              "
            >
              Prev
            </button>

            {visiblePages.map((p) => (
              <button
                key={p}
                disabled={loading}
                onClick={() => setPage(p)}
                className={`
                  px-3 py-2
                  text-xs font-bold
                  border border-black/10
                  transition
                  ${
                    p === currentPage
                      ? "bg-black text-white"
                      : "bg-white/70 hover:bg-white"
                  }
                `}
              >
                {p}
              </button>
            ))}

            <button
              disabled={!pagination.has_more || loading}
              onClick={() => setPage((p) => p + 1)}
              className="
                px-3 py-2
                text-xs font-bold
                bg-white/80
                border border-black/10
                hover:bg-black
                hover:text-white
                transition
                disabled:opacity-40
              "
            >
              Next
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}