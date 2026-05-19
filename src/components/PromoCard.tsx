import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Promo } from '../data/promos';
import { getLogo } from '../data/logos';
import { trackPromoCopy } from '../utils/analytics';

interface PromoCardProps {
  promo: Promo;
  categoryLabel: string;
}

export default function PromoCard({ promo, categoryLabel }: PromoCardProps) {
  const [copied, setCopied] = useState(false);
  const logo = getLogo(promo.company);

  const discountColor =
    promo.discountType === 'percent' ? 'bg-yellow-400 text-gray-900' :
    promo.discountType === 'rub' ? 'bg-yellow-400 text-gray-900' :
    promo.discountType === 'days' ? 'bg-yellow-400 text-gray-900' :
    promo.discountType === 'gift' ? 'bg-yellow-400 text-gray-900' :
    'bg-yellow-400 text-gray-900';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      trackPromoCopy(promo.company, promo.code, categoryLabel);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = promo.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      trackPromoCopy(promo.company, promo.code, categoryLabel);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-50">
        {/* Logo badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 font-bold shadow-sm"
          style={{ backgroundColor: logo.bg }}
        >
          {logo.emoji ? (
            <span className="text-xl">{logo.emoji}</span>
          ) : (
            <span style={{ color: logo.text }} className="text-lg font-bold">{logo.initial}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 text-sm leading-tight truncate">{promo.company}</div>
          {promo.city && (
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <span>📍</span>
              <span className="truncate">{promo.city}</span>
            </div>
          )}
        </div>
        {promo.discount && (
          <span className={`${discountColor} font-extrabold text-sm px-2.5 py-1.5 rounded-xl flex-shrink-0 shadow-sm text-center leading-tight`}>
            {promo.discount}
          </span>
        )}
      </div>

      {/* Description - flex-grow to push button to bottom */}
      <div className="px-4 pt-3 pb-2 text-sm text-gray-600 leading-relaxed flex-grow">
        {promo.description}
      </div>

      {/* Code button - always at bottom */}
      <div className="px-4 pb-4 pt-2">
        {promo.isLink && promo.link ? (
          <a
            href={promo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-lg"
          >
            <ExternalLink size={16} />
            <span>Открыть →</span>
          </a>
        ) : (
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-between gap-2 py-3 px-4 rounded-xl font-mono font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg select-all ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 hover:bg-gray-700 text-white'
            }`}
            title="Нажми чтобы скопировать"
          >
            <span className="truncate">{promo.code}</span>
            {copied ? <Check size={16} className="flex-shrink-0" /> : <Copy size={16} className="flex-shrink-0" />}
          </button>
        )}
        {!promo.isLink && (
          <p className="text-center text-xs text-gray-400 mt-1.5">
            {copied ? '✅ Скопировано!' : '👆 Нажми чтобы скопировать'}
          </p>
        )}
      </div>
    </div>
  );
}
