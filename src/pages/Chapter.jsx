import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ScrollText,
} from "lucide-react";

import { getChapter } from "../utils/api";

export default function Chapter() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    async function fetchFirst() {
      try {
        setLoading(true);

        const res = await getChapter(slug);

        setChapters([res]);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    fetchFirst();
  }, [slug]);

  /* ================================================= */
  /* LOADING */
  /* ================================================= */
  if (loading) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-[#183153]">

        {/* BG */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">

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

        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-3 py-5 flex flex-col gap-5">

          {/* HEADER */}
          <div className="paper-card bg-[#f8f1de] border border-black/10 p-4 rotate-[-1deg] animate-pulse">

            <div className="h-4 w-1/2 bg-black/10 rounded" />
            <div className="h-3 w-1/3 bg-black/10 rounded mt-2" />

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-9 rounded-lg bg-black/10"
                />
              ))}
            </div>

          </div>

          {/* IMAGE */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="
                w-full
                aspect-[0.72]
                bg-[#efe4c5]
                border border-black/10
                animate-pulse
              "
            />
          ))}

        </div>

      </main>
    );
  }

  const first = chapters[0];

  const isFirst = !first?.navigation?.previousChapter;
  const isLast = !first?.navigation?.nextChapter;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#183153] text-[#1e1e1e]">

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
      {/* CONTENT */}
      {/* ================================================= */}
      <div className="relative z-10">

        {/* ================================================= */}
        {/* TOP BAR */}
        {/* ================================================= */}
        <div className="sticky top-0 z-50 px-2 sm:px-4 pt-2">

          <div
            className="
              max-w-4xl
              mx-auto
              bg-[#f8f1de]/95
              backdrop-blur-md
              border
              border-black/10
              shadow-[8px_8px_0px_rgba(0,0,0,.14)]
              rotate-[-1deg]
              overflow-hidden
            "
          >

            {/* TAPE */}
            <div className="absolute top-2 right-3 w-[60px] h-[14px] bg-white/40 rotate-[20deg]" />

            <div className="p-3 sm:p-4">

              {/* TOP */}
              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <div className="flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase opacity-60">

                    <BookOpen size={11} />

                    Reader Draft

                  </div>

                  <h1 className="mt-2 text-sm sm:text-base font-black line-clamp-1">
                    {first?.manga_title}
                  </h1>

                  <p className="text-[10px] sm:text-xs opacity-60 mt-1 line-clamp-1">
                    {first?.chapter_title}
                  </p>

                </div>

                <div
                  className="
                    hidden
                    sm:flex
                    items-center
                    justify-center
                    w-[58px]
                    h-[58px]
                    bg-[#fff1a8]
                    border
                    border-black/10
                    rotate-[8deg]
                    shrink-0
                    shadow-[4px_4px_0px_rgba(0,0,0,.12)]
                  "
                >

                  <ScrollText size={20} />

                </div>

              </div>

              {/* INFO */}
              <div className="mt-3 text-[10px] text-center opacity-60">

                {isFirst && "This is the first chapter"}

                {!isFirst && !isLast && "Reading manga archive"}

                {isLast && "Latest available chapter"}

              </div>

              {/* NAV */}
              <div className="grid grid-cols-3 gap-2 mt-4">

                {/* PREV */}
                <button
                  disabled={isFirst}
                  onClick={() =>
                    navigate(
                      `/chapter/${first.navigation.previousChapter}`
                    )
                  }
                  className={`
                    flex items-center justify-center gap-2
                    py-2 rounded-lg text-[11px] font-semibold
                    transition-all duration-300
                    ${
                      isFirst
                        ? "bg-black/10 text-black/30 cursor-not-allowed"
                        : `
                          bg-white
                          border border-black/10
                          hover:translate-y-[-2px]
                          hover:bg-[#fff5d9]
                        `
                    }
                  `}
                >

                  <ChevronLeft size={14} />

                  Prev

                </button>

                {/* LIST */}
                <button
                  onClick={() =>
                    navigate(`/manga/${first.navigation.chapterList}`)
                  }
                  className="
                    py-2 rounded-lg text-[11px] font-black
                    bg-[#183153]
                    text-white
                    hover:opacity-90
                    transition-all duration-300
                  "
                >
                  Chapters
                </button>

                {/* NEXT */}
                <button
                  disabled={isLast}
                  onClick={() =>
                    navigate(
                      `/chapter/${first.navigation.nextChapter}`
                    )
                  }
                  className={`
                    flex items-center justify-center gap-2
                    py-2 rounded-lg text-[11px] font-semibold
                    transition-all duration-300
                    ${
                      isLast
                        ? "bg-black/10 text-black/30 cursor-not-allowed"
                        : `
                          bg-white
                          border border-black/10
                          hover:translate-y-[-2px]
                          hover:bg-[#fff5d9]
                        `
                    }
                  `}
                >

                  Next

                  <ChevronRight size={14} />

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* READER */}
        {/* ================================================= */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4 pt-5 pb-14">

          {chapters.map((ch, ci) => (
            <div key={ci}>

              {/* CHAPTER LABEL */}
              <div className="flex justify-center mb-5">

                <div
                  className="
                    bg-[#f8edd1]
                    border border-black/10
                    px-4 py-2
                    rotate-[-2deg]
                    shadow-[5px_5px_0px_rgba(0,0,0,.12)]
                  "
                >

                  <p className="text-[10px] tracking-[0.25em] uppercase opacity-60 text-center">
                    {ch.chapter_title}
                  </p>

                </div>

              </div>

              {/* IMAGES */}
              <div className="flex flex-col gap-0">

                {ch.images.map((img, i) => (
                  <div
                    key={i}
                    className="
                      relative
                      bg-[#f7f1df]
                      border-x
                      border-black/10
                    "
                  >

                    <img
                      src={img}
                      loading="lazy"
                      alt={`page-${i}`}
                      className="
                        w-full
                        object-cover
                      "
                    />

                    {/* PAGE NUMBER */}
                    <div
                      className="
                        absolute
                        bottom-3
                        right-3
                        bg-[#fff5d9]
                        border
                        border-black/10
                        px-2
                        py-1
                        text-[9px]
                        font-bold
                        rotate-[2deg]
                        shadow-[3px_3px_0px_rgba(0,0,0,.10)]
                      "
                    >
                      {i + 1}
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

          {/* BOTTOM NAV */}
          <div className="mt-8">

            <div
              className="
                bg-[#f8f1de]
                border border-black/10
                shadow-[8px_8px_0px_rgba(0,0,0,.14)]
                p-4
                rotate-[1deg]
              "
            >

              <div className="grid grid-cols-3 gap-2">

                <button
                  disabled={isFirst}
                  onClick={() =>
                    navigate(
                      `/chapter/${first.navigation.previousChapter}`
                    )
                  }
                  className={`
                    py-2 rounded-lg text-[11px]
                    transition-all duration-300
                    ${
                      isFirst
                        ? "bg-black/10 text-black/30"
                        : "bg-white border border-black/10 hover:bg-[#fff5d9]"
                    }
                  `}
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    navigate(`/manga/${first.navigation.chapterList}`)
                  }
                  className="
                    py-2 rounded-lg text-[11px]
                    bg-[#183153]
                    text-white
                    font-bold
                  "
                >
                  Chapter List
                </button>

                <button
                  disabled={isLast}
                  onClick={() =>
                    navigate(
                      `/chapter/${first.navigation.nextChapter}`
                    )
                  }
                  className={`
                    py-2 rounded-lg text-[11px]
                    transition-all duration-300
                    ${
                      isLast
                        ? "bg-black/10 text-black/30"
                        : "bg-white border border-black/10 hover:bg-[#fff5d9]"
                    }
                  `}
                >
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}