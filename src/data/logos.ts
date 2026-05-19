// Company logo colors and initials for generated badges
export interface LogoConfig {
  bg: string;
  text: string;
  initial: string;
  emoji?: string;
}

export const companyLogos: Record<string, LogoConfig> = {
  'Самокат': { bg: '#FF5722', text: '#fff', initial: 'С', emoji: '🛵' },
  'Яндекс Лавка': { bg: '#FFCC00', text: '#000', initial: 'Я', emoji: '🛒' },
  'Магнит Доставка': { bg: '#D50000', text: '#fff', initial: 'М', emoji: '🧲' },
  'Перекрёсток Доставка': { bg: '#00897B', text: '#fff', initial: 'П', emoji: '🛍' },
  'Важная рыба': { bg: '#1565C0', text: '#fff', initial: 'В', emoji: '🐟' },
  'ВкусВилл': { bg: '#43A047', text: '#fff', initial: 'В', emoji: '🥦' },
  'Elementaree': { bg: '#F57F17', text: '#fff', initial: 'E', emoji: '🍳' },
  'Додо Пицца': { bg: '#FF6F00', text: '#fff', initial: 'Д', emoji: '🍕' },
  'FoodBand': { bg: '#6A1B9A', text: '#fff', initial: 'F', emoji: '🍱' },
  'Ёбидоёби': { bg: '#C62828', text: '#fff', initial: 'Ё', emoji: '🍣' },
  'Farfor': { bg: '#00838F', text: '#fff', initial: 'F', emoji: '🥢' },
  'Яндекс Афиша': { bg: '#FF1744', text: '#fff', initial: 'А', emoji: '🎭' },
  'PREMIER': { bg: '#212121', text: '#fff', initial: 'P', emoji: '🎬' },
  'Кинопоиск': { bg: '#F4511E', text: '#fff', initial: 'К', emoji: '🎥' },
  'Яндекс Плюс': { bg: '#FFCC00', text: '#000', initial: 'Я', emoji: '⭐' },
  'Яндекс Музыка': { bg: '#FFCC00', text: '#000', initial: 'Я', emoji: '🎵' },
  'Яндекс Книги': { bg: '#FFCC00', text: '#000', initial: 'Я', emoji: '📚' },
  'START': { bg: '#1A237E', text: '#fff', initial: 'S', emoji: '▶️' },
  'Плати по миру': { bg: '#00695C', text: '#fff', initial: 'П', emoji: '💳' },
  'Okko': { bg: '#E91E63', text: '#fff', initial: 'O', emoji: '📺' },
  'Онлайн-кинотеатр 24тв': { bg: '#37474F', text: '#fff', initial: '2', emoji: '📡' },
  'М. Косметик': { bg: '#D50000', text: '#fff', initial: 'М', emoji: '💅' },
  'ЛЭТУАЛЬ': { bg: '#880E4F', text: '#fff', initial: 'Л', emoji: '💋' },
  'RANDEWOO': { bg: '#4A148C', text: '#fff', initial: 'R', emoji: '✨' },
  'Яндекс Путешествия': { bg: '#FFCC00', text: '#000', initial: 'Я', emoji: '✈️' },
  'SOKOLOV': { bg: '#B8860B', text: '#fff', initial: 'S', emoji: '💎' },
  'OZON': { bg: '#005BFF', text: '#fff', initial: 'O', emoji: '📦' },
  'DDX Fitness': { bg: '#B71C1C', text: '#fff', initial: 'D', emoji: '💪' },
};

export function getLogo(company: string): LogoConfig {
  return companyLogos[company] || { bg: '#607D8B', text: '#fff', initial: company.charAt(0).toUpperCase() };
}
