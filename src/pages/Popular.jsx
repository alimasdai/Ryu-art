import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopular } from "../utils/api";

export default function Popular() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FETCH
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await getPopular(page);
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

  // PAGINATION
  const visiblePages = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter((p) => p > 0);

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

    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      top: Math.random() * 95,
      left: Math.random() * 95,
      rotate: Math.random() * 360,
      scale: 0.7 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.45,
    }));
  }, []);

  // SLUG
  const getSlug = (url) => {
    try {
      const parts = url.split("/").filter(Boolean);
      return parts[parts.length - 1];
    } catch {
      return "";
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden text-[#1e1e1e]">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}
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

      {/* ================================================= */}
      {/* RANDOM OBJECTS */}
      {/* ================================================= */}
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

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}
      <div className="relative z-10">

        <div className="max-w-[1450px] mx-auto px-3 sm:px-5 md:px-6 py-6 sm:py-8">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}
          <section className="relative mb-10">

            <div className="max-w-[1000px] mx-auto relative">

              {/* LEFT NOTE */}
              <div
                className="
                  hidden sm:block
                  absolute
                  left-[-40px]
                  xl:left-[-110px]
                  top-[80px]
                  rotate-[-8deg]
                  bg-[#fff6d9]
                  border border-black/10
                  shadow-[8px_8px_0px_rgba(0,0,0,.12)]
                  p-4
                  w-[150px]
                  z-20
                "
              >

                <p className="text-[9px] tracking-[0.25em] uppercase opacity-50">
                  Popular Memo
                </p>

                <h3 className="mt-2 text-sm font-black leading-tight">
                  Reader Favorites
                </h3>

                <div className="my-3 h-[1px] bg-black/10" />

                <p className="text-[11px] leading-relaxed opacity-70">
                  Most read manga selected from daily archive activity.
                </p>

              </div>

              {/* RIGHT STICKY */}
              <div
                className="
                  hidden sm:flex
                  absolute
                  right-[-20px]
                  xl:right-[-70px]
                  top-[120px]
                  w-[95px]
                  h-[95px]
                  rotate-[7deg]
                  bg-[#ffe97a]
                  border border-black/10
                  shadow-[7px_7px_0px_rgba(0,0,0,.14)]
                  items-center
                  justify-center
                  text-center
                  p-3
                  z-20
                "
              >

                <p className="text-[10px] font-black leading-snug">
                  MOST
                  <br />
                  READ
                  <br />
                  TODAY
                </p>

              </div>

              {/* MAIN HERO */}
              <div
                className="
                  relative
                  overflow-hidden
                  bg-[#f8f1de]
                  border border-black/10
                  shadow-[14px_14px_0px_rgba(0,0,0,.14)]
                  rotate-[-1deg]
                  paper-edge
                "
              >

                {/* TEXTURE */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply paper-noise" />

                {/* TAPE */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[#fff6b3]/80 rotate-[-3deg] border border-black/10 z-20" />

                <div className="grid lg:grid-cols-[1fr_300px] min-h-[340px]">

                  {/* LEFT */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between relative z-10">

                    <div>

                      <p className="text-[10px] tracking-[0.35em] uppercase opacity-50">
                        Manga Ranking
                      </p>

                      <h1 className="mt-4 text-3xl sm:text-5xl font-black leading-none">
                        Popular
                        <br />
                        Archive
                      </h1>

                      <p className="mt-5 max-w-[520px] text-[12px] sm:text-[13px] leading-relaxed opacity-70">
                        Discover the most viewed and most talked-about manga
                        currently dominating the reader workspace.
                      </p>

                    </div>

                    <div className="flex items-center gap-3 mt-6">

                      <div className="px-3 py-2 bg-black text-white text-[10px] tracking-[0.25em] uppercase">
                        {comics.length} Entries
                      </div>

                      <div className="px-3 py-2 bg-black/10 text-[10px] tracking-[0.25em] uppercase">
                        Page {currentPage}
                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="relative hidden lg:block">

                    {comics[0] && (
                      <img
                        src={comics[0].image}
                        alt={comics[0].title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#f8f1de]" />

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* GRID */}
          {/* ================================================= */}
          <section
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-5
            "
          >

            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      bg-[#f8f1de]
                      border border-black/10
                      overflow-hidden
                      animate-pulse
                      rotate-[-1deg]
                      min-h-[300px]
                    "
                  >

                    <div className="aspect-[3/4] bg-black/10" />

                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-black/10 rounded w-3/4" />
                      <div className="h-2 bg-black/10 rounded w-1/2" />
                    </div>

                  </div>
                ))
              : comics.map((comic, i) => {

                  const scatter = [
                    "rotate-[-2deg]",
                    "rotate-[1.5deg]",
                    "rotate-[-1deg]",
                    "rotate-[2deg]",
                  ][i % 4];

                  return (
                    <article
                      key={i}
                      onClick={() =>
                        navigate(`/manga/${getSlug(comic.link)}`)
                      }
                      className={`
                        relative
                        overflow-hidden
                        cursor-pointer
                        bg-[#f8f1de]
                        border border-black/10
                        shadow-[8px_8px_0px_rgba(0,0,0,.12)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-[12px_12px_0px_rgba(0,0,0,.18)]
                        ${scatter}
                        paper-edge
                        paper-hover
                      `}
                    >

                      {/* PAPER TEXTURE */}
                      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply paper-noise pointer-events-none" />

                      {/* RANK */}
                      <div className="absolute top-3 left-3 z-20 bg-black text-white text-[10px] font-black px-2 py-1 shadow-lg">
                        #{i + 1}
                      </div>

                      {/* TAPE */}
                      <div className="absolute top-2 right-5 w-[55px] h-[14px] bg-[#fff6b3]/70 rotate-[12deg] border border-black/10 z-20" />

                      {/* IMAGE */}
                      <div className="relative aspect-[3/4] overflow-hidden">

                        <img
                          src={comic.image}
                          alt={comic.title}
                          className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      </div>

                      {/* CONTENT */}
                      <div className="p-4 relative z-10">

                        <p className="text-[9px] tracking-[0.25em] uppercase opacity-45">
                          Popular Entry
                        </p>

                        <h2 className="mt-2 text-xs sm:text-sm font-black leading-snug line-clamp-2 min-h-[38px]">
                          {comic.title}
                        </h2>

                        <div className="mt-4 flex items-center justify-between gap-2">

                          <span className="text-[10px] opacity-60">
                            {comic.chapter}
                          </span>

                          <span className="text-[10px] px-2 py-1 bg-black text-white uppercase tracking-[0.15em]">
                            Hot
                          </span>

                        </div>

                      </div>

                    </article>
                  );
                })}

          </section>

          {/* ================================================= */}
          {/* PAGINATION */}
          {/* ================================================= */}
          <section className="flex items-center justify-center gap-2 mt-12">

            {/* PREV */}
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="
                px-4 py-3
                bg-[#f8f1de]
                border border-black/10
                shadow-[4px_4px_0px_rgba(0,0,0,.12)]
                text-[11px]
                uppercase
                tracking-[0.25em]
                disabled:opacity-40
                hover:-translate-y-[2px]
                transition-all
              "
            >
              Prev
            </button>

            {/* PAGES */}
            {visiblePages.map((p, i) => {

              const rotate = [
                "rotate-[-2deg]",
                "rotate-[2deg]",
                "rotate-[-1deg]",
              ][i % 3];

              return (
                <button
                  key={p}
                  disabled={loading}
                  onClick={() => setPage(p)}
                  className={`
                    px-4 py-3
                    text-[11px]
                    uppercase
                    tracking-[0.25em]
                    border border-black/10
                    transition-all
                    ${rotate}
                    ${
                      p === currentPage
                        ? "bg-black text-white shadow-[5px_5px_0px_rgba(255,255,255,.15)]"
                        : "bg-[#f8f1de] shadow-[4px_4px_0px_rgba(0,0,0,.12)] hover:-translate-y-[2px]"
                    }
                  `}
                >
                  {p}
                </button>
              );
            })}

            {/* NEXT */}
            <button
              disabled={!pagination.has_more || loading}
              onClick={() => setPage((p) => p + 1)}
              className="
                px-4 py-3
                bg-[#f8f1de]
                border border-black/10
                shadow-[4px_4px_0px_rgba(0,0,0,.12)]
                text-[11px]
                uppercase
                tracking-[0.25em]
                disabled:opacity-40
                hover:-translate-y-[2px]
                transition-all
              "
            >
              Next
            </button>

          </section>

        </div>

      </div>

    </main>
  );
}