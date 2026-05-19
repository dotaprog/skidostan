import { useState, useEffect, useRef } from 'react';
import { Tag, ChevronUp } from 'lucide-react';
import { getCategories, Category } from '../data/promos';
import CategorySection from '../components/CategorySection';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Determine active section
      const sections = categories.map(c => c.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Tag size={28} className="text-yellow-300" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">ПромоКоды 2026</h1>
          </div>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Актуальные промокоды, скидки, акции и купоны 2026.<br className="hidden sm:block" />
            По разным городам России. Смотри какие сервисы есть в твоём городе и пользуйся! 🎉
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-yellow-200 font-semibold text-sm sm:text-base">
            <span>НАЖМИ на промокод 👇</span>
            <span className="text-white/60">|</span>
            <span>Он скопируется ✅</span>
          </div>
        </div>
      </header>

      {/* Sticky nav */}
      <div ref={navRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-2">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeSection === cat.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden xs:inline sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-14">
        {categories.map(cat => (
          <CategorySection key={cat.id} category={cat} />
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 px-4 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Tag size={18} className="text-indigo-400" />
            <span className="font-bold text-white">ПромоКоды 2026</span>
          </div>
          <p className="text-sm">Все промокоды актуальны на момент публикации. Скидки зависят от условий сервисов.</p>
          <p className="text-xs mt-2 text-gray-600">© 2026 ПромоКоды. Все права защищены.</p>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 z-50"
          aria-label="Наверх"
        >
          <ChevronUp size={22} />
        </button>
      )}
    </div>
  );
}
