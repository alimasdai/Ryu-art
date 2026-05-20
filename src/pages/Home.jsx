import { useEffect, useMemo, useState } from "react";

import HomeLeft from "../components/home/HomeLeft";
import HomeCenter from "../components/home/HomeCenter";
import HomeRight from "../components/home/HomeRight";

export default function HomeContent() {


  const [moveLeftNote, setMoveLeftNote] = useState(false);
  const [moveRightNote, setMoveRightNote] = useState(false);




  // FIXED random objects (biar tidak regen tiap render -> ini besar impact perf)
  const objects = useMemo(() => {
    const types = [
      "desk-clip",
      "desk-tape",
      "desk-ring",
      "desk-staple",
      "desk-doodle",
      "paper-piece",
    ];

    return Array.from({ length: 34 }, (_, i) => {
      const type = types[i % types.length];

      return {
        id: i,
        type,
        top: (i * 7.3) % 92,
        left: (i * 11.7) % 94,
        rotate: (i * 37) % 360,
        scale: 0.7 + ((i % 5) * 0.1),
        opacity: 0.2 + ((i % 6) * 0.06),
      };
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-[#1e1e1e]">

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#183153]" />

        <div className="absolute inset-0 opacity-[0.28]" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)`,
          backgroundSize: "34px 34px",
        }} />

        <div className="absolute inset-0 opacity-[0.10]" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }} />

        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at top left, rgba(255,255,255,.08), transparent 30%),
                       radial-gradient(circle at bottom right, rgba(0,0,0,.35), transparent 45%)`,
        }} />
      </div>

      {/* RANDOM OBJECTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
        {objects.map((item) => (
          <div
            key={item.id}
            className={item.type}
            style={{
              position: "absolute",
              top: item.top + "%",
              left: item.left + "%",
              transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
              opacity: item.opacity,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="max-w-[1450px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">

          {/* HERO */}
          <section className="relative  md:-mt-20 md:scale-95">
            <div className="max-w-[980px] mx-auto relative">

              {/* LEFT NOTE */}
              <div
                onClick={() => setMoveLeftNote(v => !v)}
                className={`absolute left-[-15px] sm:left-[-25px] xl:left-[-120px] top-[60px] sm:top-[100px] xl:top-[120px] w-[115px] sm:w-[130px] xl:w-[160px] rotate-[-7deg] bg-[#fff6d9] border border-black/10 shadow-[8px_8px_0px_rgba(0,0,0,.12)] p-3 sm:p-4 z-20 transition-all duration-700 ease-out select-none cursor-pointer sm:translate-x-0 ${
                  moveLeftNote ? "-translate-x-[95px] rotate-[-18deg] opacity-40" : ""
                }`}
              >
                <p className="text-[7px] sm:text-[9px] tracking-[0.25em] uppercase opacity-50">
                  Editor Memo
                </p>
                <h3 className="mt-2 text-[11px] sm:text-sm font-black leading-tight">
                  Manga Workspace
                </h3>
                <div className="my-2 sm:my-3 h-[1px] bg-black/10" />
                <p className="text-[9px] sm:text-[11px] leading-relaxed opacity-70">
                  Inspired by manga editor desks, clipped drafts and messy archive boards.
                </p>
              </div>

              {/* RIGHT NOTE */}
              <div
                onClick={() => setMoveRightNote(v => !v)}
                className={`absolute right-[-8px] sm:right-[-20px] xl:right-[-70px] top-[90px] sm:top-[120px] w-[80px] sm:w-[90px] xl:w-[100px] h-[80px] sm:h-[90px] xl:h-[100px] rotate-[8deg] bg-[#ffe97a] border border-black/10 shadow-[7px_7px_0px_rgba(0,0,0,.14)] flex items-center justify-center text-center p-2 sm:p-3 z-20 transition-all duration-700 ease-out select-none cursor-pointer ${
                  moveRightNote ? "translate-x-[90px] rotate-[18deg] opacity-40" : ""
                }`}
              >
                <p className="text-[8px] sm:text-[10px] font-black leading-snug">
                  NEW<br/>UPDATE<br/>BOARD
                </p>
              </div>

              {/* MINI NOTE */}
              <div className="absolute left-[8px] sm:left-[30px] bottom-[-20px] sm:bottom-[-10px] rotate-[-10deg] bg-[#f8edd1] border border-black/10 px-3 py-2 shadow-[5px_5px_0px_rgba(0,0,0,.12)] z-20">
                <p className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase opacity-60">
                  serialized drafts
                </p>
              </div>

              <div className="scale-[0.93] sm:scale-100 origin-top">
                <HomeCenter/>
              </div>

            </div>
          </section>

          {/* BOTTOM */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_220px_1fr] gap-4 sm:gap-5 xl:gap-7 items-start">

            <div className="order-1 relative">
 
              <div className="scale-[0.96] sm:scale-100 origin-top">
                <HomeLeft/>
              </div>
            </div>

            <div className="order-3 lg:order-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[90px] h-[26px] rotate-[-4deg] bg-[#fff6b3]/70 border border-black/10 backdrop-blur-sm z-20" />

              <div className="relative bg-[#f8f1de] border-2 border-black/10 min-h-[320px] sm:min-h-[420px] rotate-[-2deg] shadow-[10px_10px_0px_rgba(0,0,0,.14)] p-4 sm:p-5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply paper-noise" />

                <div className="relative z-10 text-center">
                  <div className="text-[38px] sm:text-[52px] font-black opacity-70">漫</div>
                  <p className="mt-3 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase opacity-50">
                    Desk Memo
                  </p>
                  <h3 className="mt-2 text-lg sm:text-xl font-black">
                    RYU art
                  </h3>
                                  <p className="mt-3 text-xl sm:text-xl tracking-[0.35em] font-bold opacity-50">
                    Art mulai Rp30.000.00 sampai Rp90.000,00
                  </p>

                </div>
              </div>
            </div>

            <div className="order-2 lg:order-3 relative">
 
              <div className="scale-[0.96] sm:scale-100 origin-top">
                <HomeRight/>
              </div>
            </div>

          </section>

          <footer className="py-6 text-center text-sm text-white/50">
            <p>&copy; 2026 DAMNDELION. All rights reserved.</p>
            <a href="https://wa.me/6285708952132 " target="_blank" rel="noopener noreferrer">Hubungi kami</a>
          </footer>

        </div>
      </div>
    </main>
  );
}