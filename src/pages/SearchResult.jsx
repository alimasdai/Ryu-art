import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Search,
  Sparkles,
  BookOpen,
  FolderSearch,
} from "lucide-react";

import { getSearchResults } from "../utils/api";

export default function SearchResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const navigate = useNavigate();

  /* FETCH */
  useEffect(() => {
    if (!query) return;

    const delay = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await getSearchResults(query);
        setData(res);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const results = data?.data || [];

  const getId = (link) => {
    return link
      .replace("/detail-komik/", "")
      .replaceAll("/", "");
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

    return Array.from({ length: 28 }).map((_, i) => {
      const type =
        types[Math.floor(Math.random() * types.length)];

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

      {/* FLOATING OBJECTS */}
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
        <section className="max-w-5xl mx-auto mb-8 relative">

          {/* STICKY */}
          <div
            className="
              absolute
              right-2
              top-[-16px]
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
              SEARCH
              <br />
              RESULT
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
                <Search size={12} />
                Archive Search
              </div>

              <h1 className="mt-3 text-2xl sm:text-4xl font-black leading-tight break-words">
                "{query}"
              </h1>

              <div className="mt-4 flex items-center gap-2 text-[11px] sm:text-xs opacity-70">

                <Sparkles size={12} />

                <span>
                  {loading
                    ? "Searching manga archive..."
                    : `${results.length} archive results found`}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* RESULTS */}
        <section className="max-w-5xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* SKELETON */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="
                    bg-[#f8f1de]
                    border border-black/10
                    rounded-[26px]
                    overflow-hidden
                    animate-pulse
                    h-[170px]
                  "
                />
              ))}

            {/* RESULTS */}
            {!loading &&
              results.map((item, i) => {

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
                      navigate(`/manga/${getId(item.href)}`)
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

                    <div className="flex gap-3 p-3 sm:p-4">

                      {/* IMAGE */}
                      <div className="w-[110px] sm:w-[130px] aspect-[4/3] rounded-xl overflow-hidden shrink-0">

                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-[1.06]
                          "
                        />

                      </div>

                      {/* INFO */}
                      <div className="flex flex-col justify-between min-w-0 flex-1">

                        <div>

                          <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.25em] opacity-50 mb-2">

                            <BookOpen size={10} />
                            Manga File

                          </div>

                          <h3 className="text-sm sm:text-base font-black leading-snug line-clamp-2">
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-2 mt-2 flex-wrap">

                            <span className="text-[10px] opacity-60">
                              {item.type}
                            </span>

                            {item.genre && (
                              <span
                                className="
                                  text-[10px]
                                  px-2 py-1
                                  rounded-full
                                  bg-black/5
                                  border border-black/10
                                "
                              >
                                {item.genre}
                              </span>
                            )}

                          </div>

                          <p className="mt-3 text-[10px] sm:text-[11px] leading-relaxed opacity-70 line-clamp-3">
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </div>

                  </article>
                );
              })}
          </div>

          {/* EMPTY */}
          {!loading && results.length === 0 && (
            <div className="flex justify-center mt-14">

              <div
                className="
                  relative
                  bg-[#f8f1de]
                  border-2 border-black/10
                  shadow-[10px_10px_0px_rgba(0,0,0,.14)]
                  rotate-[-2deg]
                  px-8
                  py-10
                  text-center
                  max-w-md
                "
              >

                <div className="absolute inset-0 opacity-[0.05] paper-noise" />

                <div className="relative z-10 flex flex-col items-center">

                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
                    <FolderSearch size={28} />
                  </div>

                  <h3 className="text-xl font-black">
                    No Results Found
                  </h3>

                  <p className="mt-3 text-[11px] sm:text-xs leading-relaxed opacity-70">
                    We couldn't find any manga archive matching
                    your search keyword.
                  </p>

                </div>

              </div>

            </div>
          )}

        </section>

      </div>

    </main>
  );
}