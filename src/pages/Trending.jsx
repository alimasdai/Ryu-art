import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";
import { getTrending } from "../utils/api";

export default function Trending() {
  const [data, setData] = useState(null);

  const [moveLeftNote, setMoveLeftNote] = useState(false);
  const [moveRightNote, setMoveRightNote] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTrending();
        setData(res);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

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
      opacity: 0.15 + Math.random() * 0.45,
    }));
  }, []);

  // LOADING
  if (!data) {
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

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 animate-pulse">

          <div className="h-12 w-52 bg-[#f8f1de] mb-8" />

          <div className="space-y-5">

            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[120px] bg-[#f8f1de]"
              />
            ))}

          </div>

        </div>

      </main>
    );
  }

  const trending = (data.trending || []).filter(
    (item) => !item.title.toLowerCase().includes("apk")
  );

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
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-5 py-6 sm:py-10">

        {/* HERO */}
        <section className="relative mb-10">

          {/* LEFT NOTE */}
          <div
            onClick={() => setMoveLeftNote((prev) => !prev)}
            className={`
              absolute
              left-[-10px]
              sm:left-[-60px]
              top-[30px]
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
              Hot List
            </p>

            <h3 className="mt-2 text-[11px] font-black">
              Trending Board
            </h3>

            <div className="my-2 h-[1px] bg-black/10" />

            <p className="text-[9px] leading-relaxed opacity-70">
              Manga titles currently exploding in popularity today.
            </p>

          </div>

          {/* RIGHT STICKY */}
          <div
            onClick={() => setMoveRightNote((prev) => !prev)}
            className={`
              absolute
              right-[-5px]
              sm:right-[-40px]
              top-[70px]
              sm:top-[130px]
              w-[80px]
              sm:w-[100px]
              h-[80px]
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
              DAILY
              <br />
              TREND
            </p>

          </div>

          {/* HERO PAPER */}
          <div
            className="
              relative
              bg-[#f8f1de]
              border
              border-black/10
              shadow-[14px_14px_0px_rgba(0,0,0,.16)]
              rotate-[-1deg]
              overflow-hidden
              p-5
              sm:p-8
            "
          >

            <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply paper-noise" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[110px] h-[24px] rotate-[-4deg] bg-[#fff6b3]/80 border border-black/10 z-20" />

            <div className="relative z-10 text-center">

              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                  <Flame size={28} />
                </div>
              </div>

              <p className="text-[10px] tracking-[0.35em] uppercase opacity-45">
                Manga Popularity Archive
              </p>

              <h1 className="mt-4 text-3xl sm:text-5xl font-black">
                Trending Today
              </h1>

              <p className="mt-5 max-w-xl mx-auto text-[12px] sm:text-[14px] leading-[2] opacity-70">
                Curated collection of manga currently dominating reader activity,
                discussions, and chapter traffic.
              </p>

            </div>

          </div>

        </section>

        {/* LIST */}
        <section className="space-y-5">

          {trending.map((item, i) => {

            const scatter = [
              "rotate-[-1deg]",
              "rotate-[1deg]",
              "rotate-[-0.5deg]",
              "rotate-[0.8deg]",
            ][i % 4];

            return (
              <article
                key={i}
                onClick={() => navigate(`/manga/${getSlug(item.link)}`)}
                className={`
                  group
                  relative
                  bg-[#f8f1de]
                  border
                  border-black/10
                  shadow-[10px_10px_0px_rgba(0,0,0,.14)]
                  overflow-hidden
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:translate-y-[-3px]
                  ${scatter}
                `}
              >

                {/* PAPER TEXTURE */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply paper-noise" />

                {/* TAPE */}
                <div className="absolute top-3 left-6 w-[60px] h-[16px] bg-[#fff6b3]/80 rotate-[-8deg] border border-black/10 z-20" />

                <div className="relative z-10 flex gap-4 sm:gap-6 p-4 sm:p-5">

                  {/* RANK */}
                  <div className="flex flex-col items-center justify-center shrink-0 w-[40px]">

                    <span className="text-2xl sm:text-3xl font-black opacity-70">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                  </div>

                  {/* IMAGE */}
                  <div className="relative shrink-0">

                    <div className="absolute inset-2 bg-black/20 blur-xl rotate-[4deg]" />

                    <div className="relative bg-white p-2 rotate-[-2deg] shadow-[0_8px_18px_rgba(0,0,0,.18)]">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="
                          w-[90px]
                          h-[120px]
                          sm:w-[120px]
                          sm:h-[155px]
                          object-cover
                        "
                      />

                    </div>

                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1 flex flex-col justify-between">

                    <div>

                      <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                        Trending Manga
                      </p>

                      <h2 className="mt-3 text-lg sm:text-2xl font-black leading-tight line-clamp-2">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-xs sm:text-sm opacity-60">
                        {item.chapter}
                      </p>

                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-5">

                      <div className="flex gap-2 flex-wrap">

                        <span className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] bg-black text-white">
                          #{i + 1}
                        </span>

                        <span className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] bg-black/10">
                          {item.timeframe || "today"}
                        </span>

                      </div>

                      <div className="text-[10px] opacity-40">
                        Score {item.trending_score || 0}
                      </div>

                    </div>

                  </div>

                </div>

              </article>
            );
          })}

        </section>

      </div>

    </main>
  );
}