import { Flame, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeLeft({ trendingList = [] }) {
  const navigate = useNavigate();

  const clipColors = ["paper-clip-yellow", "paper-clip-blue", "paper-clip-red", "paper-clip-green"];
  const scatter = ["paper-scatter-1", "paper-scatter-2", "paper-scatter-3", "paper-scatter-4"];

  const getSlug = (link = "") => link.replace("/manga/", "").replaceAll("/", "");

  return (
    <section className="space-y-4 order-2 xl:order-1">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-white/70 text-[10px] tracking-[0.35em] uppercase">
        <Flame size={11} />
        Trending Archive
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 gap-5">

        {trendingList.map((item, i) => {
          const clipColor = clipColors[i % 4];
          const scatterClass = scatter[i % 4];

          return (
            <article
              key={item.link}
              onClick={() => navigate(`/manga/${getSlug(item.link)}`)}
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                ${clipColor} ${scatterClass}
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  {item.trending_score}
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                    {item.chapter}
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  {item.title}
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    {item.timeframe}
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Trending
                  </span>
                </div>
              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
}