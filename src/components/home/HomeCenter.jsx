import { BookOpen, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Stela from "../../assets/stela.png";

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
    
        <div
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
                  JASA BIKIN ART 
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-black text-white text-[10px] uppercase tracking-[0.25em]">
                  </span>

                  <span className="px-3 py-1 bg-[#ffe680] text-[10px] uppercase tracking-[0.25em] border border-black/10">
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] opacity-60">
                  <Flame size={14} />
                  Trending Score
                </div>

                <div className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                  Featured
                </div>
              </div>

            </div>

            <div className="relative h-[250px] xl:h-full overflow-hidden">
              <img
                src={Stela}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

          </div>
        </div>
  

      {/* MINI */}
      <div className="grid md:grid-cols-2 gap-5">

         

           <a href="https://www.instagram.com/apocalypsiy?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer"> <article
              className={`paper-card paper-hover paper-edge paper-clip group cursor-pointer overflow-hidden bg-[#f8f1de]`}
            >

              <div className="flex gap-3 p-3">

                <div className="w-[85px] aspect-[3/4] overflow-hidden shrink-0 bg-white">
                  <img
                    src="https://download.logo.wine/logo/Instagram/Instagram-Logo.wine.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex flex-col justify-between">

                  <div>
                    <h3 className="text-3xl font-black line-clamp-2 leading-snug">
                      Instagram : @apocalypsiy
                    </h3>
                    <p className="mt-2 text-[11px] opacity-65">
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-45">
                    </span>

                    <span className="text-[9px] px-2 py-1 bg-black text-white uppercase tracking-[0.2em]">
                    </span>
                  </div>

                </div>

              </div>

            </article>
            </a>
              
                       <a href="https://www.tiktok.com/@fans_btsku" target="_blank" rel="noopener noreferrer">
            <article
              className={`paper-card paper-hover paper-edge paper-clip group cursor-pointer overflow-hidden bg-[#f8f1de]`}
            >

              <div className="flex gap-3 p-3">

                <div className="w-[85px] aspect-[3/4] overflow-hidden shrink-0 bg-white">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/018/930/574/small/tiktok-logo-tikok-icon-transparent-tikok-app-logo-free-png.png"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex flex-col justify-between">

                  <div>
                    <h3 className="text-3xl font-black line-clamp-2 leading-snug">
                      TikTok : <br /> @fans_btsku
                    </h3>
                    <p className="mt-2 text-[11px] opacity-65">
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-45">
                    </span>

                    <span className="text-[9px] px-2 py-1 bg-black text-white uppercase tracking-[0.2em]">
                    </span>
                  </div>

                </div>

              </div>

            </article>
            </a>
          );

      </div>

    </section>
  )
}