import { useEffect, useMemo, useState } from "react";
import { Clock3, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeRight({ latest = [] }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const total = latest.length;

  const paperStyle = useMemo(
    () => ["rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[2deg]"],
    []
  );

  const clipColor = useMemo(
    () => ["paper-clip-yellow", "paper-clip-blue", "paper-clip-red", "paper-clip-green"],
    []
  );

  const clipPosition = useMemo(
    () => ["paper-clip-rt", "paper-clip-lt", "paper-clip-rb", "paper-clip-lb"],
    []
  );

  const getSlug = (link = "") => link.replace("/manga/", "").replaceAll("/", "");

  useEffect(() => {
    if (!autoSlide || total <= 1) return;

    const id = setInterval(() => {
      setPage((p) => (p + 1) % total);
    }, 3500);

    return () => clearInterval(id);
  }, [autoSlide, total]);

  const item = latest[page];
  if (!item) return null;

  return (
    <section className="space-y-4 order-3">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/70 text-[10px] tracking-[0.35em] uppercase">
          <Clock3 size={11} />
          Latest Draft
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => {
              setAutoSlide(false);
              setPage((p) => (p - 1 + total) % total);
            }}
            className="w-8 h-8 flex items-center justify-center bg-white/10 border border-white/10 text-white backdrop-blur-sm"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={() => {
              setAutoSlide(false);
              setPage((p) => (p + 1) % total);
            }}
            className="w-8 h-8 flex items-center justify-center bg-white/10 border border-white/10 text-white backdrop-blur-sm"
          >
            <ChevronRight size={14} />
          </button>

        </div>
      </div>

      {/* PAPER AREA */}
      <div className="relative h-[420px] sm:h-[500px] md:h-[560px] flex items-center justify-center px-2 sm:px-5">

        {/* STACK */}
        <div className="absolute w-[88%] sm:w-[82%] max-w-[340px] h-[88%] bg-[#b9b09e] rotate-[-10deg] rounded-[6px] shadow-[0_18px_35px_rgba(0,0,0,0.35)] border border-black/10" />
        <div className="absolute w-[90%] sm:w-[84%] max-w-[350px] h-[90%] bg-[#d7ccb6] rotate-[7deg] rounded-[6px] shadow-[0_16px_30px_rgba(0,0,0,0.28)] border border-black/10" />
        <div className="absolute w-[92%] sm:w-[87%] max-w-[360px] h-[93%] bg-[#efe3ca] rotate-[-4deg] rounded-[6px] shadow-[0_15px_28px_rgba(0,0,0,0.24)] border border-black/10" />
        <div className="absolute w-[94%] sm:w-[90%] max-w-[370px] h-[96%] bg-[#f7ecd4] rotate-[2deg] rounded-[6px] shadow-[0_14px_25px_rgba(0,0,0,0.18)] border border-black/10" />

        {/* MAIN PAPER */}
        <article
          onClick={() => navigate(`/manga/${getSlug(item.link)}`)}
          className={`
            relative w-full max-w-[380px] h-full bg-[#f8f1de] cursor-pointer
            overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.35)]
            transition-all duration-500 rounded-[6px]
            ${paperStyle[page % 4]}
            paper-edge paper-clip
            ${clipColor[page % 4]}
            ${clipPosition[page % 4]}
          `}
        >

          {/* TEXTURE */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
            }}
          />

          {/* TAPE */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] sm:w-[110px] h-[20px] rotate-[-3deg] bg-[#fff6b3]/80 border border-black/10 backdrop-blur-sm z-30" />

          {/* PAGE */}
          <div className="absolute top-5 right-4 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase opacity-40 z-20">
            Page {(page + 1).toString().padStart(2, "0")}
          </div>

          {/* IMAGE */}
          <div className="relative h-[56%] sm:h-[60%] overflow-hidden p-4 sm:p-5">
            <div className="absolute inset-x-8 top-8 bottom-6 bg-black/20 blur-xl rotate-[2deg]" />

            <div className="relative w-full h-full bg-white p-2 sm:p-3 rotate-[-2deg] shadow-[0_12px_25px_rgba(0,0,0,0.25)]">

              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <div className="pt-2 px-1 flex items-center justify-between">
                <p className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase opacity-45">
                  Latest Update
                </p>
                <p className="text-[8px] opacity-40">#{page + 1}</p>
              </div>

            </div>
          </div>

          {/* CONTENT */}
          <div className="px-4 sm:px-5 pb-5 flex flex-col justify-between h-[44%] sm:h-[40%] relative z-10">

            <div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase opacity-45">
                Manga Draft
              </p>

              <h3 className="mt-3 text-[18px] sm:text-[24px] font-black leading-tight line-clamp-3">
                {item.title}
              </h3>

              <p className="mt-3 text-[12px] sm:text-[13px] opacity-70 font-medium">
                {item.chapter}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5 gap-3">

              <div className="flex flex-wrap gap-2">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-black text-white">
                  Latest
                </span>

                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-black/10">
                  {item.time_ago}
                </span>
              </div>

              <div className="text-[10px] opacity-40 shrink-0">
                #{page + 1}
              </div>

            </div>

          </div>

          <div className="absolute bottom-[-10px] left-[10%] w-[80%] h-[25px] bg-black/15 blur-xl rounded-full" />
        </article>
      </div>

      {/* INDICATOR */}
      <div className="flex items-center justify-center gap-2">
        {latest.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAutoSlide(false);
              setPage(i);
            }}
            className={`transition-all duration-300 ${
              page === i ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30"
            }`}
          />
        ))}
      </div>

    </section>
  );
}