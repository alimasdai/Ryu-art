import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Home, Flame, Clock, List, Star, Search, Tag, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Hubungi Kami", icon: Tag, path: "https://wa.me/6283895647675" },
];

export default function HomeHeader() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <>
      {/* HEADER */}
      <header className="paper-card paper-edge paper-scatter-header relative flex items-center justify-between gap-3 bg-white px-3 sm:px-4 py-3 mb-5 z-30">

        {/* LEFT */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer min-w-0"
          >
            <img src="/logo.png" alt="logo" className="w-7 h-7 object-contain" />

            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase opacity-50 truncate">
                Manga Archive
              </p>
              <h1 className="text-xs sm:text-sm font-black truncate">
                Ryu Art
              </h1>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 shrink-0">

          <button className="md:hidden w-9 h-9 flex items-center justify-center border border-black/10 bg-black/[0.03]">
            <Search size={15} />
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center border border-black/10 bg-black/[0.03]"
          >
            <Menu size={16} />
          </button>

        </div>
      </header>

      {/* MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[60] transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-black/10">
          <div>
            <p className="text-[8px] tracking-[0.25em] uppercase opacity-50">
              Navigation
            </p>
            <h2 className="text-sm font-black mt-1">Manga Notes</h2>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center border border-black/10"
          >
            <X size={16} />
          </button>
        </div>

{/* ITEMS */}
<div className="p-4 flex flex-col">

  {NAV_ITEMS.map(({ label, icon: Icon, path }, i) => (
    <a  href={path} target="_blank" rel="noopener noreferrer"
>
    <div key={path} className="relative">

      <button
        className="
          w-full
          flex
          items-center
          gap-3
          px-3
          py-3
          text-sm
          font-medium
          text-black/80
          hover:bg-black/[0.04]
          transition
        "
      >

        {/* ICON BOX (biar sejajar semua) */}
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <Icon size={16} />
        </div>

        {/* LABEL */}
        <span className="leading-none">
          {label}
        </span>

      </button>

      {/* DIVIDER LINE */}
      {i !== NAV_ITEMS.length - 1 && (
        <div className="absolute left-3 right-3 bottom-0 h-[1px] bg-black/5" />
      )}

    </div>
    </a>
  ))}

</div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
        />
      )}
    </>
  );
}