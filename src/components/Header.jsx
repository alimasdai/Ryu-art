import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Home, Flame, Clock, List, Star, Search, Tag, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Popular", icon: Flame, path: "/popular" },
  { label: "Latest", icon: Clock, path: "/latest" },
  { label: "List", icon: List, path: "/list" },
  { label: "Trending", icon: Star, path: "/trending" },
  { label: "Genres", icon: Tag, path: "/genres" },
];

export default function HomeHeader() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isTyping = query.length > 0;

  const handleSearch = useCallback(() => {
    const q = query.trim();
    if (q.length < 2) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setFocus(false);
    setMenuOpen(false);
  }, [query, navigate]);

  const go = useCallback((path) => {
    navigate(path);
    setMenuOpen(false);
  }, [navigate]);

  const clearSearch = useCallback(() => setQuery(""), []);

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
                Manga Field Notes
              </h1>
            </div>
          </div>

        </div>

        {/* SEARCH */}
        <div
          className={`hidden md:flex relative h-10 transition-all duration-300 ${
            focus ? "w-[320px]" : "w-[220px]"
          }`}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 120)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={isTyping ? "Press enter..." : "Search manga..."}
            className="w-full h-full pl-4 pr-11 border border-black/10 bg-black/[0.03] text-sm outline-none"
          />

          {!isTyping ? (
            <Search size={15} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50" />
          ) : (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
            >
              <X size={14} />
            </button>
          )}
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
    <div key={path} className="relative">

      <button
        onClick={() => go(path)}
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