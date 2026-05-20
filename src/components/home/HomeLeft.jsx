import { Flame, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import carmen from "../../assets/carmen.jpeg";
import dinda from "../../assets/dinda.jpeg";
import jiwoo from "../../assets/jiwoo.jpeg";
import jun from "../../assets/jun.jpeg";
import nandut from "../../assets/nandut.jpeg";
import rei from "../../assets/rei.jpeg";
import somin from "../../assets/somin.jpeg";

export default function HomeLeft() {

  return (
    <section className="space-y-4 order-2 xl:order-1">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-white/70 text-[10px] tracking-[0.35em] uppercase">
        <Flame size={11} />
        Example art
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 gap-5">


            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={carmen}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  carmen
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  CARMEN HEART2HEART
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
            
            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={dinda}
                  className="w-full h-full  -rotate-90 object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  dinda
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  DINDA
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
            
            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={jiwoo}
                  className="w-full h-full rotate-90 object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  jiwoo
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  JIWOO HEART2HEART
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
            
            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={jun}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  jun
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  JUN HEART2HEART
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
            
            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={nandut}
                  className="w-full h-full rotate-90 object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  nandut
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  NANDUT
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
            
            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={rei}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  REI
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  REI IVE
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
            
            <article
              className={`
                relative paper-card paper-hover paper-edge paper-clip
                group cursor-pointer overflow-hidden bg-[#f8f1de]
              `}
            >

              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={somin}
                  className="w-full h-full object-cover -rotate-90 transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ffed8a] border border-black/10 text-[9px] font-black tracking-[0.2em] flex items-center gap-1">
                  <TrendingUp size={10} />
                  Baek So Min
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] font-bold line-clamp-1">
                  </p>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="text-[11px] sm:text-[12px] font-black line-clamp-2 leading-snug">
                  Baek So Min
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.25em] opacity-45">
                    
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] bg-black text-white px-2 py-1">
                    Pesan
                  </span>
                </div>
              </div>

            </article>
          );

      </div>

    </section>
  );
}
