import { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getLatest } from "../utils/api";

export default function Latest() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FETCH
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await getLatest(page);
        setData(res);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();
  }, [page]);

  const comics = data?.comics || [];
  const pagination = data?.pagination || {};

  const currentPage = pagination.current_page || page;

  const visiblePages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((p) => p > 0);

  // SLUG
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

    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      top: Math.random() * 92,
      left: Math.random() * 94,
      rotate: Math.random() * 360,
      scale: 0.7 + Math.random() * 1.2,
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-[#1e1e1e]">

      {/* BACKGROUND */}
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

      {/* RANDOM OBJECTS */}
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
      <div className="relative z-10">

        <div className="max-w-[1450px] mx-auto px-3 sm:px-5 md:px-6 py-6 sm:py-8">

          {/* HEADER */}
          <section className="relative mb-10">

            <div className="max-w-[980px] mx-auto relative">

              {/* LEFT NOTE */}
              <div
                className="
                  absolute
                  left-[-10px]
                  sm:left-[-25px]
                  xl:left-[-120px]
                  top-[40px]
                  sm:top-[90px]
                  xl:top-[120px]
                  w-[110px]
                  sm:w-[130px]
                  xl:w-[160px]
                  rotate-[-7deg]
                  bg-[#fff6d9]
                  border border-black/10
                  shadow-[8px_8px_0px_rgba(0,0,0,.12)]
                  p-3 sm:p-4
                  z-20
                  transition-all
                  duration-500
                  active:translate-x-[-120px]
                  active:rotate-[-18deg]
                  sm:active:translate-x-0
                "
              >

                <p className="text-[7px] sm:text-[9px] tracking-[0.25em] uppercase opacity-50">
                  Update Memo
                </p>

                <h3 className="mt-2 text-[11px] sm:text-sm font-black leading-tight">
                  Latest Release
                </h3>

                <div className="my-2 sm:my-3 h-[1px] bg-black/10" />

                <p className="text-[9px] sm:text-[11px] leading-relaxed opacity-70">
                  Fresh manga drafts updated every day directly from the editor desk.
                </p>

              </div>

              {/* RIGHT STICKY */}
              <div
                className="
                  absolute
                  right-[-6px]
                  sm:right-[-20px]
                  xl:right-[-70px]
                  top-[60px]
                  sm:top-[110px]
                  w-[82px]
                  sm:w-[90px]
                  xl:w-[100px]
                  h-[82px]
                  sm:h-[90px]
                  xl:h-[100px]
                  rotate-[8deg]
                  bg-[#ffe97a]
                  border border-black/10
                  shadow-[7px_7px_0px_rgba(0,0,0,.14)]
                  flex items-center justify-center
                  text-center
                  p-2 sm:p-3
                  z-20
                  transition-all
                  duration-500
                  active:translate-x-[100px]
                  active:rotate-[18deg]
                  sm:active:translate-x-0
                "
              >

                <p className="text-[8px] sm:text-[10px] font-black leading-snug">
                  DAILY
                  <br />
                  MANGA
                  <br />
                  UPDATE
                </p>

              </div>

              {/* MAIN HERO */}
              <div
                className="
                  relative
                  bg-[#f8f1de]
                  border border-black/10
                  rotate-[-1deg]
                  shadow-[12px_12px_0px_rgba(0,0,0,.15)]
                  overflow-hidden
                  paper-edge
                "
              >

                {/* TEXTURE */}
                <div
                  className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
                  }}
                />

                {/* TAPE */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[24px] rotate-[-3deg] bg-[#fff6b3]/80 border border-black/10 z-20" />

                <div className="relative z-10 p-6 sm:p-8 text-center">

                  <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.35em] uppercase opacity-60">

                    <Clock3 size={12} />

                    Latest Drafts

                  </div>

                  <h1 className="mt-4 text-3xl sm:text-5xl font-black leading-tight">
                    Newly Updated Manga
                  </h1>

                  <p className="mt-4 text-[12px] sm:text-sm opacity-65 max-w-[650px] mx-auto leading-relaxed">
                    Explore freshly updated manga chapters, newly serialized stories,
                    and editor-picked releases straight from the archive desk.
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* GRID */}
          <section
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              gap-5
              sm:gap-6
            "
          >

            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      bg-[#f8f1de]
                      border border-black/10
                      animate-pulse
                      overflow-hidden
                      rotate-[-1deg]
                    "
                  >

                    <div className="aspect-[4/3] bg-black/10" />

                    <div className="p-3 space-y-2">

                      <div className="h-3 bg-black/10 rounded w-3/4" />

                      <div className="h-2 bg-black/10 rounded w-1/2" />

                      <div className="h-2 bg-black/10 rounded w-1/3" />

                    </div>

                  </div>
                ))

              : comics.map((comic, i) => {
                  const scatter = [
                    "rotate-[-2deg]",
                    "rotate-[1deg]",
                    "rotate-[2deg]",
                    "rotate-[-1deg]",
                  ][i % 4];

                  return (
                    <article
                      key={i}
                      onClick={() =>
                        navigate(`/manga/${getSlug(comic.link)}`)
                      }
                      className={`
                        relative
                        bg-[#f8f1de]
                        border border-black/10
                        overflow-hidden
                        cursor-pointer
                        shadow-[10px_10px_0px_rgba(0,0,0,.14)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:rotate-0
                        ${scatter}
                      `}
                    >

                      {/* TAPE */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[16px] rotate-[-4deg] bg-[#fff6b3]/80 border border-black/10 z-20" />

                      {/* IMAGE */}
                      <div className="relative aspect-[4/3] overflow-hidden">

                        <img
                          src={comic.image}
                          alt={comic.title}
                          className="
                            absolute inset-0
                            w-full h-full
                            object-cover
                            transition duration-700
                            hover:scale-105
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 text-[9px] tracking-[0.2em] uppercase">
                          Update
                        </div>

                      </div>

                      {/* INFO */}
                      <div className="p-3 sm:p-4">

                        <div className="flex items-center gap-2 text-[8px] tracking-[0.25em] uppercase opacity-50">

                          <Sparkles size={10} />

                          Latest Chapter

                        </div>

                        <h3 className="mt-2 text-[12px] sm:text-sm font-black leading-snug line-clamp-2">
                          {comic.title}
                        </h3>

                        <div className="mt-3 flex items-center justify-between gap-2">

                          <p className="text-[10px] sm:text-xs opacity-70">
                            {comic.chapter}
                          </p>

                          <p className="text-[9px] sm:text-[10px] opacity-45 shrink-0">
                            {comic.time_ago}
                          </p>

                        </div>

                      </div>

                    </article>
                  );
                })}

          </section>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-2 mt-12">

            {/* PREV */}
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="
                w-10 h-10
                flex items-center justify-center
                bg-[#f8f1de]
                border border-black/10
                text-black
                disabled:opacity-40
                hover:rotate-[-6deg]
                transition-all
              "
            >
              <ChevronLeft size={16} />
            </button>

            {/* PAGE */}
            {visiblePages.map((p, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => setPage(p)}
                className={`
                  min-w-[42px]
                  h-[42px]
                  px-3
                  border
                  text-sm
                  font-black
                  transition-all
                  ${
                    p === currentPage
                      ? "bg-black text-white border-black rotate-[-4deg]"
                      : "bg-[#f8f1de] text-black border-black/10 hover:rotate-[4deg]"
                  }
                `}
              >
                {p}
              </button>
            ))}

            {/* NEXT */}
            <button
              disabled={!pagination.has_more || loading}
              onClick={() => setPage((p) => p + 1)}
              className="
                w-10 h-10
                flex items-center justify-center
                bg-[#f8f1de]
                border border-black/10
                text-black
                disabled:opacity-40
                hover:rotate-[6deg]
                transition-all
              "
            >
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}