import { useState, useRef, useEffect } from "react";
import { categories, promoCodes } from "./data/promocodes";
import PromoCard from "./components/PromoCard";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("hype");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-cat");
            if (id) setActiveCategory(id);
          }
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );

    const timeout = setTimeout(() => {
      Object.entries(sectionRefs.current).forEach(([id, el]) => {
        if (el) {
          el.setAttribute("data-cat", id);
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = sectionRefs.current[categoryId];
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50">
      {/* ===== HEADER ===== */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center text-lg shadow-sm">
                🎟️
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
                  Скидостан
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Актуальные скидки каждый день</p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 flex-wrap justify-end">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-yellow-400 text-gray-900 shadow-sm"
                      : "text-gray-500 hover:bg-yellow-50 hover:text-gray-800"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2 mt-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-yellow-400 text-gray-900 shadow-sm"
                    : "text-gray-600 bg-gray-100 hover:bg-yellow-50"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full mb-5 border border-yellow-200">
          <span>🔥</span>
          <span>Самые актуальные промокоды</span>
          <span>🔥</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Экономьте на{" "}
          <span className="relative inline-block">
            <span className="relative z-10">каждом заказе</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300 -z-10 rounded" />
          </span>
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
          Нажмите на промокод, чтобы скопировать его. Используйте при оформлении заказа!
        </p>

        {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
    <div className="text-center">
    </div>
  </div>
</div>
        
      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        {categories.map((category) => {
          const cards = promoCodes.filter((p) => p.category === category.id);
          if (cards.length === 0) return null;

          const countLabel =
            cards.length === 1
              ? "1 промокод"
              : cards.length < 5
              ? `${cards.length} промокода`
              : `${cards.length} промокодов`;

          return (
            <section
              key={category.id}
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[category.id] = el;
              }}
              className="mb-14"
            >
              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{category.emoji}</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">{category.label}</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                <span className="text-xs sm:text-sm text-gray-400 font-semibold bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm flex-shrink-0">
                  {countLabel}
                </span>
              </div>

              {/* Cards grid — uniform-height cards via flex-col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cards.map((promo) => (
                  <PromoCard key={promo.id} promo={promo} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center">
              🎟️
            </div>
            <span className="font-extrabold text-gray-800 text-lg">Скидостан</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Реклама. ООО "Яндекс.Лавка", ИНН 9718101499. erid: 2RanymtBSfc
            Реклама. ООО "Умный Ритейл", ИНН 7811657720. erid: 2RanykW87Na
            Реклама. АО "Тандер", ИНН 2310031475. erid: 2RanynSprGr
            Реклама. ООО "ИКС 5 ДИДЖИТАЛ", ИНН 9722010808 erid: 2RanykWAoJS
            Реклама. ООО «КЕЙТЕРИНГ-РЕНТ», ИНН 7804597213. erid: 2RanymxhSHp
            Реклама. АО ВкусВилл, ОГРН 1217700253671. Подробности на сайте vkusvill.ru erid: 2Ranym9Eppz
          </p>
          <p className="text-gray-300 text-xs mt-3">
            ⚠️ Промокоды могут иметь ограниченный срок действия. Всегда проверяйте актуальность.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            {categories.map((cat) => (
              <span key={cat.id} className="text-xs text-gray-400 flex items-center gap-1">
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
