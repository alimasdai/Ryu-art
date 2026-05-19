import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../utils/api";

export default function List() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* FETCH */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await getList(page);
        setData(res);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();
  }, [page]);

  const comics = data?.results || [];

  /* RANDOM OBJECTS */
  const objects = useMemo(() => {
    const types = [
      "desk-clip",
      "desk-tape",
      "desk-ring",
      "desk-staple",
      "desk-doodle",
      "paper-piece",
    ];

    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      top: Math.random() * 95,
      left: Math.random() * 95,
      rotate: Math.random() * 360,
      scale: 0.7 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.45,
    }));
  }, []);

  /* GET ID */
  const getId = (link) => {
    return link.replace("/detail-komik/", "").replaceAll("/", "");
  };

  /* FORMAT CHAPTER URL */
  const formatChapterUrl = (url) => {
    if (!url) return "/";

    const parts = url.split("/");
    const mangaSlug = parts[2];
    const chapterNum = parts[3];

    return `/chapter/${mangaSlug}-chapter-${chapterNum}`;
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
          {/* HERO HEADER */}
          {/* ================================================= */}
          <section className="relative mb-10">

            <div className="max-w-[1050px] mx-auto relative">

              {/* LEFT NOTE */}
              <div
                className="
                  hidden sm:block
                  absolute
                  left-[-35px]
                  xl:left-[-100px]
                  top-[70px]
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
                  Library Memo
                </p>

                <h3 className="mt-2 text-sm font-black leading-tight">
                  Manga Storage
                </h3>

                <div className="my-3 h-[1px] bg-black/10" />

                <p className="text-[11px] leading-relaxed opacity-70">
                  Browse all archived manga complete with chapters and details.
                </p>

              </div>

              {/* RIGHT STICKY */}
              <div
                className="
                  hidden sm:flex
                  absolute
                  right-[-15px]
                  xl:right-[-65px]
                  top-[120px]
                  w-[95px]
                  h-[95px]
                  rotate-[8deg]
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
                  FULL
                  <br />
                  LIBRARY
                  <br />
                  ACCESS
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

                <div className="grid lg:grid-cols-[1fr_320px] min-h-[340px]">

                  {/* LEFT */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between relative z-10">

                    <div>

                      <p className="text-[10px] tracking-[0.35em] uppercase opacity-50">
                        Manga Database
                      </p>

                      <h1 className="mt-4 text-3xl sm:text-5xl font-black leading-none">
                        Library
                        <br />
                        Archive
                      </h1>

                      <p className="mt-5 max-w-[520px] text-[12px] sm:text-[13px] leading-relaxed opacity-70">
                        Explore the complete manga collection from serialized
                        drafts, hidden gems, action series, romance stories,
                        and long-running archives.
                      </p>

                    </div>

                    <div className="flex items-center gap-3 mt-6 flex-wrap">

                      <div className="px-3 py-2 bg-black text-white text-[10px] tracking-[0.25em] uppercase">
                        {comics.length} Entries
                      </div>

                      <div className="px-3 py-2 bg-black/10 text-[10px] tracking-[0.25em] uppercase">
                        Page {page}
                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="relative hidden lg:block">

                    {comics[0] && (
                      <img
                        src={comics[0].thumbnail}
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
          {/* LIST */}
          {/* ================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      bg-[#f8f1de]
                      border border-black/10
                      p-4
                      flex gap-4
                      animate-pulse
                      rotate-[-1deg]
                      min-h-[180px]
                    "
                  >

                    <div className="w-[130px] h-[170px] bg-black/10" />

                    <div className="flex-1 space-y-3 pt-2">
                      <div className="h-4 bg-black/10 rounded w-3/4" />
                      <div className="h-3 bg-black/10 rounded w-1/2" />
                      <div className="h-3 bg-black/10 rounded w-full" />
                      <div className="h-3 bg-black/10 rounded w-5/6" />
                    </div>

                  </div>
                ))

              : comics.map((comic, i) => {

                  const rotate = [
                    "rotate-[-1deg]",
                    "rotate-[1deg]",
                    "rotate-[-2deg]",
                    "rotate-[1.5deg]",
                  ][i % 4];

                  return (
                    <article
                      key={i}
                      onClick={() =>
                        navigate(`/manga/${getId(comic.detailUrl)}`)
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
                        ${rotate}
                        paper-edge
                      `}
                    >

                      {/* PAPER TEXTURE */}
                      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply paper-noise pointer-events-none" />

                      {/* TAPE */}
                      <div className="absolute top-3 right-6 w-[60px] h-[14px] bg-[#fff6b3]/70 rotate-[12deg] border border-black/10 z-20" />

                      <div className="flex flex-col sm:flex-row gap-4 p-4 relative z-10">

                        {/* IMAGE */}
                        <div className="w-full sm:w-[140px] aspect-[3/4] sm:h-[190px] overflow-hidden shrink-0 bg-white border border-black/10 p-2 rotate-[-2deg]">

                          <img
                            src={comic.thumbnail}
                            alt={comic.title}
                            className="w-full h-full object-cover"
                          />

                        </div>

                        {/* INFO */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">

                          {/* TOP */}
                          <div>

                            <p className="text-[9px] tracking-[0.25em] uppercase opacity-45">
                              Manga Entry
                            </p>

                            <h2 className="mt-2 text-sm sm:text-lg font-black leading-snug line-clamp-2">
                              {comic.title}
                            </h2>

                            <div className="flex items-center gap-2 mt-3 flex-wrap">

                              <span className="text-[10px] px-2 py-1 bg-black text-white uppercase tracking-[0.15em]">
                                {comic.type}
                              </span>

                              {comic.genre && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                      `/genre/${comic.genre.toLowerCase()}`
                                    );
                                  }}
                                  className="
                                    text-[10px]
                                    px-2
                                    py-1
                                    bg-black/10
                                    uppercase
                                    tracking-[0.15em]
                                    hover:bg-black/20
                                    transition
                                  "
                                >
                                  {comic.genre}
                                </button>
                              )}

                            </div>

                            <p className="mt-4 text-[11px] leading-relaxed opacity-70 line-clamp-4">
                              {comic.description}
                            </p>

                          </div>

                          {/* BOTTOM */}
                          <div className="mt-5">

                            <p className="text-[10px] opacity-50 mb-3">
                              {comic.stats}
                            </p>

                            <div className="flex gap-2">

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    formatChapterUrl(
                                      comic.firstChapter?.url
                                    )
                                  );
                                }}
                                className="
                                  flex-1
                                  py-2
                                  text-[10px]
                                  uppercase
                                  tracking-[0.2em]
                                  bg-black/10
                                  hover:bg-black/20
                                  transition
                                "
                              >
                                First
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    formatChapterUrl(
                                      comic.latestChapter?.url
                                    )
                                  );
                                }}
                                className="
                                  flex-1
                                  py-2
                                  text-[10px]
                                  uppercase
                                  tracking-[0.2em]
                                  bg-black
                                  text-white
                                  hover:opacity-80
                                  transition
                                "
                              >
                                Latest
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                })}

          </section>

          {/* ================================================= */}
          {/* PAGINATION */}
          {/* ================================================= */}
          <section className="flex items-center justify-center gap-3 mt-12">

            {/* PREV */}
            <button
              disabled={page === 1 || loading}
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

            {/* PAGE */}
            <div
              className="
                px-5 py-3
                bg-black
                text-white
                border border-black/10
                shadow-[4px_4px_0px_rgba(255,255,255,.12)]
                text-[11px]
                uppercase
                tracking-[0.25em]
                rotate-[-2deg]
              "
            >
              {page}
            </div>

            {/* NEXT */}
            <button
              disabled={loading}
              onClick={() => setPage((p) => p + 1)}
              className="
                px-4 py-3
                bg-[#f8f1de]
                border border-black/10
                shadow-[4px_4px_0px_rgba(0,0,0,.12)]
                text-[11px]
                uppercase
                tracking-[0.25em]
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