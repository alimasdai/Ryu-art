import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getManga } from "../utils/api";

export default function Manga() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [moveLeftNote, setMoveLeftNote] = useState(false);
  const [moveRightNote, setMoveRightNote] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      setLoading(true);

      try {
        const res = await getManga(slug);
        setData(res);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchData();
  }, [slug]);

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

    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      top: Math.random() * 92,
      left: Math.random() * 94,
      rotate: Math.random() * 360,
      scale: 0.7 + Math.random() * 1.2,
      opacity: 0.15 + Math.random() * 0.45,
    }));
  }, []);

  // LOADING
  if (loading) {
    return (
      <main className="relative min-h-screen overflow-x-hidden">

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

        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 animate-pulse">

          <div className="h-[320px] bg-[#f8f1de] rounded-[8px]" />

          <div className="mt-6 h-10 bg-[#f8f1de]" />

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-[#f8f1de]" />
            ))}
          </div>

        </div>

      </main>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#183153] text-white flex items-center justify-center">
        Data tidak ditemukan
      </div>
    );
  }

  const {
    title,
    title_indonesian,
    image,
    synopsis,
    metadata,
    genres = [],
    chapters = [],
  } = data;

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
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-8">

        {/* HERO PAPER */}
        <section className="relative mb-8">

          {/* LEFT NOTE */}
          <div
            onClick={() => setMoveLeftNote((prev) => !prev)}
            className={`
              absolute
              left-[-12px]
              sm:left-[-35px]
              top-[40px]
              sm:top-[90px]
              w-[110px]
              sm:w-[150px]
              rotate-[-8deg]
              bg-[#fff6d9]
              border
              border-black/10
              shadow-[8px_8px_0px_rgba(0,0,0,.12)]
              p-3
              z-20
              transition-all
              duration-700
              cursor-pointer
              ${
                moveLeftNote
                  ? "-translate-x-[95px] rotate-[-18deg] opacity-40"
                  : ""
              }
            `}
          >

            <p className="text-[8px] tracking-[0.25em] uppercase opacity-50">
              Archive Note
            </p>

            <h3 className="mt-2 text-[11px] font-black">
              Manga Detail
            </h3>

            <div className="my-2 h-[1px] bg-black/10" />

            <p className="text-[9px] leading-relaxed opacity-70">
              Character sheets, draft pages and serialized chapter records.
            </p>

          </div>

          {/* RIGHT NOTE */}
          <div
            onClick={() => setMoveRightNote((prev) => !prev)}
            className={`
              absolute
              right-[-5px]
              sm:right-[-25px]
              top-[65px]
              sm:top-[120px]
              w-[78px]
              sm:w-[100px]
              h-[78px]
              sm:h-[100px]
              rotate-[8deg]
              bg-[#ffe97a]
              border
              border-black/10
              shadow-[7px_7px_0px_rgba(0,0,0,.14)]
              flex
              items-center
              justify-center
              text-center
              p-2
              z-20
              transition-all
              duration-700
              cursor-pointer
              ${
                moveRightNote
                  ? "translate-x-[90px] rotate-[18deg] opacity-40"
                  : ""
              }
            `}
          >

            <p className="text-[8px] sm:text-[10px] font-black leading-snug">
              MANGA
              <br />
              ARCHIVE
            </p>

          </div>

          {/* MAIN PAPER */}
          <div
            className="
              relative
              bg-[#f8f1de]
              border
              border-black/10
              shadow-[14px_14px_0px_rgba(0,0,0,.16)]
              rotate-[-1deg]
              overflow-hidden
            "
          >

            {/* PAPER TEXTURE */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply paper-noise" />

            {/* TAPE */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[110px] h-[24px] rotate-[-4deg] bg-[#fff6b3]/80 border border-black/10 z-20" />

            <div className="grid lg:grid-cols-[280px_1fr] gap-5 p-4 sm:p-6 lg:p-8">

              {/* COVER */}
              <div className="relative">

                <div className="absolute inset-4 bg-black/20 blur-2xl rotate-[4deg]" />

                <div className="relative bg-white p-3 rotate-[-2deg] shadow-[0_12px_25px_rgba(0,0,0,.2)]">

                  <img
                    src={image}
                    alt={title}
                    className="w-full aspect-[3/4] object-cover"
                  />

                  <div className="pt-3 flex justify-between text-[9px] uppercase tracking-[0.25em] opacity-45">
                    <span>Draft Cover</span>
                    <span>01</span>
                  </div>

                </div>

              </div>

              {/* INFO */}
              <div className="flex flex-col">

                <p className="text-[10px] tracking-[0.35em] uppercase opacity-45">
                  Manga File
                </p>

                <h1 className="mt-3 text-2xl sm:text-4xl font-black leading-tight">
                  {title}
                </h1>

                <p className="mt-2 text-xs sm:text-sm opacity-60">
                  {title_indonesian}
                </p>

                {/* META */}
                <div className="grid grid-cols-2 gap-3 mt-6">

                  {[
                    ["Type", metadata?.type],
                    ["Status", metadata?.status],
                    ["Author", metadata?.author],
                    ["Age", metadata?.age_rating],
                  ].map(([label, value], i) => (
                    <div
                      key={i}
                      className="
                        bg-[#efe3ca]
                        border
                        border-black/10
                        p-3
                        rotate-[-1deg]
                      "
                    >
                      <p className="text-[9px] uppercase tracking-[0.25em] opacity-45">
                        {label}
                      </p>

                      <p className="mt-1 text-xs sm:text-sm font-bold">
                        {value || "-"}
                      </p>
                    </div>
                  ))}

                </div>

                {/* GENRES */}
                <div className="flex flex-wrap gap-2 mt-6">

                  {genres.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(`/genre/${g.slug}`)}
                      className="
                        px-3
                        py-2
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        bg-black
                        text-white
                        hover:rotate-[-2deg]
                        transition-all
                      "
                    >
                      {g.name}
                    </button>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SYNOPSIS */}
        <section
          className="
            relative
            bg-[#f8f1de]
            border
            border-black/10
            shadow-[10px_10px_0px_rgba(0,0,0,.14)]
            rotate-[1deg]
            p-5
            sm:p-7
            mb-8
          "
        >

          <div className="absolute top-3 right-3 w-[45px] h-[12px] bg-white/40 rotate-[25deg]" />

          <p className="text-[10px] tracking-[0.35em] uppercase opacity-45">
            Story Draft
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Synopsis
          </h2>

          <p className="mt-5 text-[13px] sm:text-[14px] leading-[2] opacity-75 whitespace-pre-line">
            {synopsis}
          </p>

        </section>

        {/* CHAPTERS */}
        <section className="relative">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-white text-[11px] tracking-[0.35em] uppercase">
              Chapter Archive
            </h2>

            <p className="text-white/50 text-[10px]">
              {chapters.length} Chapters
            </p>

          </div>

          <div className="space-y-3">

            {chapters.map((ch, i) => (
              <article
                key={i}
                onClick={() => navigate(`/chapter/${ch.link}`)}
                className="
                  group
                  relative
                  bg-[#f8f1de]
                  border
                  border-black/10
                  p-4
                  shadow-[8px_8px_0px_rgba(0,0,0,.12)]
                  hover:translate-y-[-2px]
                  transition-all
                  cursor-pointer
                  overflow-hidden
                "
              >

                <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply paper-noise" />

                <div className="relative flex items-center justify-between gap-4">

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                      Draft Chapter
                    </p>

                    <h3 className="mt-2 text-sm sm:text-base font-black">
                      {ch.chapter}
                    </h3>

                  </div>

                  <p className="text-[10px] sm:text-xs opacity-45 shrink-0">
                    {ch.date}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}