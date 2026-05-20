import { useState } from "react";
import { PromoCode } from "../data/promocodes";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackCopy(company: string, code: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "copy_promo_code", {
      event_category: "PromoCode",
      event_label: `${company} — ${code}`,
      value: 1,
    });
  }
}

type PromoCardProps = {
  promo: PromoCode;
};

export default function PromoCard({ promo }: PromoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      trackCopy(promo.company, promo.code);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = promo.code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      trackCopy(promo.company, promo.code);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
      {/* Top: Logo + Discount */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={promo.logo}
            alt={promo.company}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base font-semibold text-gray-700 truncate">{promo.company}</p>
          <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-extrabold px-2 py-0.5 rounded-lg mt-0.5 leading-tight">
            {promo.discount}
          </span>
        </div>
      </div>

      {/* Description — flex-1 pushes button to bottom */}
      <div className="px-4 pb-3 flex-1">
        <p className="text-gray-600 text-sm leading-relaxed">{promo.description}</p>
      </div>

      {/* Bottom: Code + Copy Button — always at bottom */}
      <div className="px-4 pb-4 mt-auto">
        {promo.isLink ? (
          <div className="flex flex-col gap-2">
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl px-3 py-2 text-center">
              <span className="font-mono font-bold text-gray-800 text-sm tracking-widest select-all">
                {promo.code}
              </span>
            </div>
            <div className="flex gap-2">
              <a
                href={promo.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-3 rounded-xl transition-colors duration-200"
              >
                {promo.linkText}
              </a>
              <button
                onClick={handleCopy}
                className={`flex-1 text-sm font-semibold py-2 px-3 rounded-xl transition-all duration-200 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                }`}
              >
                {copied ? "✓ Скопирован!" : "Копировать"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer group/btn ${
              copied
                ? "bg-green-500 border-green-500 text-white"
                : "bg-gray-50 border-dashed border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
            }`}
          >
            <span
              className={`font-mono font-bold text-sm tracking-widest flex-1 text-center ${
                copied ? "text-white" : "text-gray-800"
              }`}
            >
              {copied ? "✓ Скопирован!" : promo.code}
            </span>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                copied ? "text-white" : "text-gray-400 group-hover/btn:text-yellow-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              )}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
