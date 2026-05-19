import { BookOpen, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function HomeCenter({ hero, heroMini = [] }) {
  const navigate = useNavigate();

  const createSlug = useCallback(
    (link) => link?.replace("/manga/", "").replaceAll("/", ""),
    []
  );

  const go = useCallback(
    (link) => navigate(`/manga/${createSlug(link)}`),
    [navigate, createSlug]
  );

  return (
    <section className="flex flex-col gap-5 order-1 xl:order-2">

      {/* HERO */}
      {hero && (
        <div
          onClick={() => go(hero.link)}
          className="paper-card paper-hover paper-edge paper-clip paper-clip-yellow paper-scatter-hero group relative overflow-hidden cursor-pointer bg-[#f8f1de] min-h-[420px] xl:h-[360px]"
        >
          <div className="grid xl:grid-cols-[1fr_320px] h-full">

            <div className="p-5 md:p-7 flex flex-col justify-between relative z-10">

              <div>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase opacity-60">
                  <BookOpen size={11} />
                  Featured Draft
                </div>

                <h2 className="mt-5 text-2xl lg:text-[42px] font-black leading-[1.05] line-clamp-4">
                  {hero.title}
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black text-white text-[10px] uppercase tracking-[0.25em]">
                    {hero.chapter}
                  </span>

                  <span className="px-3 py-1 bg-[#ffe680] text-[10px] uppercase tracking-[0.25em] border border-black/10">
                    {hero.timeframe}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] opacity-60">
                  <Flame size={14} />
                  Trending Score {hero.trending_score}
                </div>

                <div className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                  Featured
                </div>
              </div>

            </div>

            <div className="relative h-[250px] xl:h-full overflow-hidden">
              <img
                src={hero.image}
                alt={hero.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

          </div>
        </div>
      )}

      {/* MINI */}
      <div className="grid md:grid-cols-2 gap-5">

        {heroMini.map((item, i) => {
          const goLink = () => go(item.link);

          const miniScatter = i % 2 ? "paper-scatter-3" : "paper-scatter-2";
          const clipColor = ["paper-clip-blue","paper-clip-yellow","paper-clip-red","paper-clip-green"][i & 3];
          const clipPosition = ["paper-clip-rt","paper-clip-lt","paper-clip-rb","paper-clip-lb"][i & 3];

          return (
            <article
              key={item.link}
              onClick={goLink}
              className={`paper-card paper-hover paper-edge paper-clip ${clipColor} ${clipPosition} ${miniScatter} group cursor-pointer overflow-hidden bg-[#f8f1de]`}
            >

              <div className="flex gap-3 p-3">

                <div className="w-[85px] aspect-[3/4] overflow-hidden shrink-0 bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex flex-col justify-between">

                  <div>
                    <h3 className="text-sm font-black line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] opacity-65">
                      {item.chapter}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-45">
                      {item.timeframe}
                    </span>

                    <span className="text-[9px] px-2 py-1 bg-black text-white uppercase tracking-[0.2em]">
                      #{item.trending_score}
                    </span>
                  </div>

                </div>

              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
}