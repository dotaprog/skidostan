import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Lock, LogOut, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Category, Promo, PromoType, getCategories, saveCategories, resetCategories, ADMIN_PASSWORD } from '../data/promos';

const ADMIN_SESSION_KEY = 'admin_session_v1';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const PROMO_TYPES: { value: PromoType; label: string }[] = [
  { value: 'percent', label: 'Процент (%)' },
  { value: 'rub', label: 'Рубли (₽)' },
  { value: 'days', label: 'Дни' },
  { value: 'gift', label: 'Подарок' },
  { value: 'text', label: 'Текст' },
];

const DEFAULT_PROMO: Omit<Promo, 'id'> = {
  discount: '',
  discountType: 'percent',
  company: '',
  description: '',
  code: '',
  isLink: false,
  link: '',
  city: '',
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [editingPromo, setEditingPromo] = useState<{ catId: string; promo: Promo } | null>(null);
  const [addingPromo, setAddingPromo] = useState<{ catId: string; form: Omit<Promo, 'id'> } | null>(null);
  const [editingCat, setEditingCat] = useState<{ id: string; label: string; emoji: string } | null>(null);
  const [addingCat, setAddingCat] = useState(false);
  const [newCat, setNewCat] = useState({ id: '', label: '', emoji: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session === 'true') setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setCategories(getCategories());
    }
  }, [isLoggedIn]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setLoginError('');
    } else {
      setLoginError('Неверный пароль');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const persist = (cats: Category[]) => {
    setCategories(cats);
    saveCategories(cats);
  };

  // --- PROMO CRUD ---
  const startEditPromo = (catId: string, promo: Promo) => {
    setEditingPromo({ catId, promo: { ...promo } });
    setAddingPromo(null);
  };

  const saveEditPromo = () => {
    if (!editingPromo) return;
    const updated = categories.map(cat =>
      cat.id === editingPromo.catId
        ? { ...cat, promos: cat.promos.map(p => p.id === editingPromo.promo.id ? editingPromo.promo : p) }
        : cat
    );
    persist(updated);
    setEditingPromo(null);
    showSuccess('Промокод обновлён!');
  };

  const deletePromo = (catId: string, promoId: string) => {
    if (!confirm('Удалить этот промокод?')) return;
    const updated = categories.map(cat =>
      cat.id === catId ? { ...cat, promos: cat.promos.filter(p => p.id !== promoId) } : cat
    );
    persist(updated);
    showSuccess('Промокод удалён!');
  };

  const startAddPromo = (catId: string) => {
    setAddingPromo({ catId, form: { ...DEFAULT_PROMO } });
    setEditingPromo(null);
  };

  const saveAddPromo = () => {
    if (!addingPromo) return;
    const newPromo: Promo = { ...addingPromo.form, id: generateId() };
    const updated = categories.map(cat =>
      cat.id === addingPromo.catId ? { ...cat, promos: [...cat.promos, newPromo] } : cat
    );
    persist(updated);
    setAddingPromo(null);
    showSuccess('Промокод добавлен!');
  };

  // --- CATEGORY CRUD ---
  const startEditCat = (cat: Category) => {
    setEditingCat({ id: cat.id, label: cat.label, emoji: cat.emoji });
  };

  const saveEditCat = () => {
    if (!editingCat) return;
    const updated = categories.map(cat =>
      cat.id === editingCat.id ? { ...cat, label: editingCat.label, emoji: editingCat.emoji } : cat
    );
    persist(updated);
    setEditingCat(null);
    showSuccess('Категория обновлена!');
  };

  const deleteCat = (catId: string) => {
    if (!confirm('Удалить категорию вместе со всеми промокодами?')) return;
    const updated = categories.filter(cat => cat.id !== catId);
    persist(updated);
    showSuccess('Категория удалена!');
  };

  const saveAddCat = () => {
    if (!newCat.label.trim() || !newCat.id.trim()) return;
    const cat: Category = {
      id: newCat.id.trim().toLowerCase().replace(/\s+/g, '_'),
      label: newCat.label.trim(),
      emoji: newCat.emoji || '📁',
      promos: [],
    };
    persist([...categories, cat]);
    setAddingCat(false);
    setNewCat({ id: '', label: '', emoji: '' });
    showSuccess('Категория добавлена!');
  };

  const handleReset = () => {
    if (!confirm('Сбросить все промокоды к исходным данным?')) return;
    resetCategories();
    setCategories(getCategories());
    showSuccess('Данные сброшены!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-indigo-600 p-4 rounded-full mb-3">
              <Lock size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Панель администратора</h1>
            <p className="text-gray-500 text-sm mt-1">Введите пароль для доступа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Войти
            </button>
          </form>
          <a href="/" className="block text-center mt-4 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            ← Вернуться на сайт
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Lock size={18} className="text-indigo-400" />
          <span className="font-bold text-lg">Панель администратора</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">Просмотр сайта →</a>
          <button onClick={handleReset} className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 text-sm transition-colors">
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Сброс</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
            <LogOut size={14} />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-16 right-4 bg-green-500 text-white px-5 py-3 rounded-xl shadow-xl z-50 font-semibold animate-pulse">
          ✅ {successMsg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-gray-900">Категории и промокоды</h2>
          <button
            onClick={() => setAddingCat(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <Plus size={16} />
            Добавить категорию
          </button>
        </div>

        {/* Add category form */}
        {addingCat && (
          <div className="bg-white rounded-2xl shadow-md p-5 mb-6 border-2 border-indigo-300">
            <h3 className="font-bold text-gray-900 mb-4">Новая категория</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                className="border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="ID (англ., без пробелов)"
                value={newCat.id}
                onChange={e => setNewCat(p => ({ ...p, id: e.target.value }))}
              />
              <input
                className="border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Название"
                value={newCat.label}
                onChange={e => setNewCat(p => ({ ...p, label: e.target.value }))}
              />
              <input
                className="border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Эмодзи"
                value={newCat.emoji}
                onChange={e => setNewCat(p => ({ ...p, emoji: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={saveAddCat} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors">
                <Save size={14} /> Сохранить
              </button>
              <button onClick={() => setAddingCat(false)} className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm transition-colors">
                <X size={14} /> Отмена
              </button>
            </div>
          </div>
        )}

        {/* Categories list */}
        <div className="space-y-4">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-100">
                {editingCat?.id === cat.id ? (
                  <>
                    <input
                      className="border-2 border-gray-200 rounded-lg px-2 py-1 w-14 text-center text-xl focus:outline-none focus:border-indigo-500"
                      value={editingCat.emoji}
                      onChange={e => setEditingCat(p => p ? { ...p, emoji: e.target.value } : p)}
                    />
                    <input
                      className="border-2 border-gray-200 rounded-lg px-2 py-1 flex-1 font-bold focus:outline-none focus:border-indigo-500"
                      value={editingCat.label}
                      onChange={e => setEditingCat(p => p ? { ...p, label: e.target.value } : p)}
                    />
                    <button onClick={saveEditCat} className="text-green-600 hover:text-green-700"><Save size={18} /></button>
                    <button onClick={() => setEditingCat(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="font-extrabold text-gray-900 flex-1">{cat.label}</span>
                    <span className="text-sm text-gray-500">{cat.promos.length} промокодов</span>
                    <button onClick={() => startEditCat(cat)} className="text-gray-400 hover:text-indigo-600 transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => deleteCat(cat.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    <button
                      onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                      className="text-gray-400 hover:text-gray-700 transition-colors ml-1"
                    >
                      {expandedCat === cat.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </>
                )}
              </div>

              {/* Promos list */}
              {expandedCat === cat.id && (
                <div className="p-4 space-y-3">
                  {cat.promos.map(promo => (
                    <div key={promo.id} className="border border-gray-100 rounded-xl overflow-hidden">
                      {editingPromo?.catId === cat.id && editingPromo?.promo.id === promo.id ? (
                        // Edit form
                        <div className="p-4 bg-indigo-50 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Скидка (напр. 50% или 400₽)</label>
                              <input
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                value={editingPromo.promo.discount}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, discount: e.target.value } } : p)}
                                placeholder="50%, 400₽, 30 дней..."
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Тип скидки</label>
                              <select
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                value={editingPromo.promo.discountType}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, discountType: e.target.value as PromoType } } : p)}
                              >
                                {PROMO_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Компания</label>
                              <input
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                value={editingPromo.promo.company}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, company: e.target.value } } : p)}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Промокод</label>
                              <input
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-indigo-500"
                                value={editingPromo.promo.code}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, code: e.target.value } } : p)}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Описание</label>
                              <textarea
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                                rows={3}
                                value={editingPromo.promo.description}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, description: e.target.value } } : p)}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Город (необязательно)</label>
                              <input
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                value={editingPromo.promo.city || ''}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, city: e.target.value } } : p)}
                                placeholder="Москва, СПб..."
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">Ссылка (если кнопка-ссылка)</label>
                              <input
                                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                                value={editingPromo.promo.link || ''}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, link: e.target.value } } : p)}
                                placeholder="https://..."
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`isLink-${promo.id}`}
                                checked={!!editingPromo.promo.isLink}
                                onChange={e => setEditingPromo(p => p ? { ...p, promo: { ...p.promo, isLink: e.target.checked } } : p)}
                                className="w-4 h-4 accent-indigo-600"
                              />
                              <label htmlFor={`isLink-${promo.id}`} className="text-sm text-gray-700">Кнопка-ссылка (Открыть →)</label>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button onClick={saveEditPromo} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                              <Save size={14} /> Сохранить
                            </button>
                            <button onClick={() => setEditingPromo(null)} className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                              <X size={14} /> Отмена
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Promo row
                        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors">
                          <div className="bg-yellow-400 text-gray-900 font-extrabold text-xs px-2 py-1 rounded-lg flex-shrink-0 min-w-[52px] text-center">
                            {promo.discount || '—'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 text-sm">{promo.company}</div>
                            <div className="text-gray-500 text-xs line-clamp-1">{promo.description}</div>
                            <div className="font-mono text-xs text-indigo-600 mt-0.5">{promo.code}</div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => startEditPromo(cat.id, promo)} className="text-gray-400 hover:text-indigo-600 transition-colors"><Edit2 size={15} /></button>
                            <button onClick={() => deletePromo(cat.id, promo.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add promo form */}
                  {addingPromo?.catId === cat.id ? (
                    <div className="border-2 border-dashed border-indigo-300 rounded-xl p-4 bg-indigo-50 space-y-3">
                      <h4 className="font-bold text-gray-900 text-sm">Новый промокод</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Скидка (напр. 50% или 400₽)</label>
                          <input
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                            value={addingPromo.form.discount}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, discount: e.target.value } } : p)}
                            placeholder="50%, 400₽, 30 дней..."
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Тип скидки</label>
                          <select
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                            value={addingPromo.form.discountType}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, discountType: e.target.value as PromoType } } : p)}
                          >
                            {PROMO_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Компания</label>
                          <input
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                            value={addingPromo.form.company}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, company: e.target.value } } : p)}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Промокод</label>
                          <input
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-indigo-500"
                            value={addingPromo.form.code}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, code: e.target.value } } : p)}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Описание</label>
                          <textarea
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                            rows={3}
                            value={addingPromo.form.description}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, description: e.target.value } } : p)}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Город (необязательно)</label>
                          <input
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                            value={addingPromo.form.city || ''}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, city: e.target.value } } : p)}
                            placeholder="Москва, СПб..."
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Ссылка (если кнопка-ссылка)</label>
                          <input
                            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                            value={addingPromo.form.link || ''}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, link: e.target.value } } : p)}
                            placeholder="https://..."
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="isLinkNew"
                            checked={!!addingPromo.form.isLink}
                            onChange={e => setAddingPromo(p => p ? { ...p, form: { ...p.form, isLink: e.target.checked } } : p)}
                            className="w-4 h-4 accent-indigo-600"
                          />
                          <label htmlFor="isLinkNew" className="text-sm text-gray-700">Кнопка-ссылка (Открыть →)</label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveAddPromo} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                          <Save size={14} /> Добавить
                        </button>
                        <button onClick={() => setAddingPromo(null)} className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                          <X size={14} /> Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => startAddPromo(cat.id)}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-indigo-400 text-gray-400 hover:text-indigo-600 rounded-xl py-3 transition-colors font-semibold text-sm"
                    >
                      <Plus size={16} />
                      Добавить промокод
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-400 text-xs">
          Все изменения сохраняются в LocalStorage браузера
        </div>
      </div>
    </div>
  );
}
