export type PromoType = 'percent' | 'rub' | 'days' | 'gift' | 'text';

export interface Promo {
  id: string;
  discount: string;       // e.g. "50%", "400₽", "50 дней", "ролл", ""
  discountType: PromoType;
  company: string;
  description: string;
  code: string;
  isLink?: boolean;       // true if code opens a link instead of copying
  link?: string;
  city?: string;          // optional city tag
  logo?: string;          // emoji or image key
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  promos: Promo[];
}

const initialCategories: Category[] = [
  {
    id: 'popular',
    label: 'Популярное',
    emoji: '🔥',
    promos: [
      { id: 'p1', discount: '50%', discountType: 'percent', company: 'Самокат', description: 'На первый заказ от 700₽. Не суммируется с другими скидками на товары.', code: 'SMLXUSL' },
      { id: 'p2', discount: '400₽', discountType: 'rub', company: 'Самокат', description: 'На первый заказ от 900₽. СУММИРУЕТСЯ с другими скидками на товары.', code: 'PFF79ES' },
      { id: 'p3', discount: '50%', discountType: 'percent', company: 'Яндекс Лавка', description: 'На первый заказ от 800₽.', code: '50PFB5' },
      { id: 'p4', discount: '40%', discountType: 'percent', company: 'Яндекс Лавка', description: 'На заказ от 800₽, если заказов не было более года.', code: '40APF2497' },
      { id: 'p5', discount: '36%', discountType: 'percent', company: 'Магнит Доставка', description: 'На первый заказ от 1.200₽ в разделе «Экспресс». Не распространяются на товары из разделов: «М.Косметик», «Магнит Гипермаркет», «Аптека» и «Финальная цена».', code: 'PE3QTBEA' },
      { id: 'p6', discount: '51%', discountType: 'percent', company: 'Магнит Доставка', description: 'На первый заказ от 1.000₽ в разделе Мигом. Не распространяется на товары с пометкой «финальная цена».', code: 'FM51NTQTX' },
      { id: 'p7', discount: '1000₽', discountType: 'rub', company: 'Перекрёсток Доставка', description: 'На первый заказ от 3.000₽.', code: '41LQLTD2' },
      { id: 'p8', discount: '450₽', discountType: 'rub', company: 'Перекрёсток Доставка', description: 'На первые ДВА заказа от 1.800₽.', code: '16WZRKN8' },
      { id: 'p9', discount: '21%', discountType: 'percent', company: 'Магнит Доставка', description: 'На повторный заказ от 1.700₽ в разделе «Мигом». Бонусы суммируются со скидками.', code: '21DSFIRGDD' },
    ],
  },
  {
    id: 'food',
    label: 'Еда',
    emoji: '🍔',
    promos: [
      { id: 'f1', discount: '50%', discountType: 'percent', company: 'Самокат', description: 'На первый заказ от 700₽. Не суммируется с другими скидками на товары.', code: 'SMLXUSL' },
      { id: 'f2', discount: '400₽', discountType: 'rub', company: 'Самокат', description: 'На первый заказ от 900₽. СУММИРУЕТСЯ с другими скидками на товары.', code: 'KUSHI400' },
      { id: 'f3', discount: '50%', discountType: 'percent', company: 'Яндекс Лавка', description: 'На первый заказ от 800₽.', code: '50PFB5' },
      { id: 'f4', discount: '40%', discountType: 'percent', company: 'Яндекс Лавка', description: 'На заказ от 800₽, если заказов не было более года.', code: '40APF2497' },
      { id: 'f5', discount: '36%', discountType: 'percent', company: 'Магнит Доставка', description: 'На первый заказ от 1.200₽ в разделе «Экспресс». Не распространяются на товары из разделов: «М.Косметик», «Магнит Гипермаркет», «Аптека» и «Финальная цена».', code: 'PE3QTBEA' },
      { id: 'f6', discount: '1000₽', discountType: 'rub', company: 'Перекрёсток Доставка', description: 'На первый заказ от 3.000₽.', code: '41LQLTD2' },
      { id: 'f7', discount: '450₽', discountType: 'rub', company: 'Перекрёсток Доставка', description: 'На первые ДВА заказа от 1.800₽.', code: '16WZRKN8' },
      { id: 'f8', discount: '15%', discountType: 'percent', company: 'Важная рыба', description: 'При каждом заказе от 3.999₽.', code: 'SPTB170', city: 'Санкт-Петербург, Пушкин' },
      { id: 'f9', discount: 'Ролл', discountType: 'gift', company: 'Важная рыба', description: 'Ролл Филадельфия 8 шт. в подарок на первый заказ от 2.999₽.', code: 'MYFILA170', city: 'Санкт-Петербург' },
      { id: 'f10', discount: '200₽', discountType: 'rub', company: 'ВкусВилл', description: 'На первый заказ от 1.000₽.', code: 'VS3YM49' },
      { id: 'f11', discount: '250₽', discountType: 'rub', company: 'ВкусВилл', description: 'На первый заказ от 1.250₽.', code: 'VS8K2GY' },
      { id: 'f12', discount: '300₽', discountType: 'rub', company: 'ВкусВилл', description: 'На первый заказ от 1.500₽.', code: '30V86SR1' },
      { id: 'f13', discount: '350₽', discountType: 'rub', company: 'ВкусВилл', description: 'На первый заказ от 2.500₽.', code: '35VY14RN' },
      { id: 'f14', discount: '40%', discountType: 'percent', company: 'Elementaree', description: 'На первый заказ от 3.000₽ или 12% на все повторные заказы от 3.000₽.', code: 'limb3' },
      { id: 'f15', discount: '25%', discountType: 'percent', company: 'Додо Пицца', description: 'На первый заказ.', code: '5V88E' },
      { id: 'f16', discount: '20%', discountType: 'percent', company: 'Додо Пицца', description: 'При каждом заказе от 1.599₽.', code: '9LGP7' },
      { id: 'f17', discount: 'Пицца 25см', discountType: 'gift', company: 'Додо Пицца', description: 'Пицца "Ветчина и сыр" 25 см за 1₽ при каждом заказе от 1.399₽ на доставку, самовывоз и в ресторане.', code: 'ZPT1N4', city: 'Воронеж, Ростов-на-Дону, Таганрог, Сочи, Лазаревское, Адлер, Эсто-Садок, Красная Поляна' },
      { id: 'f18', discount: '35%', discountType: 'percent', company: 'FoodBand', description: 'На всё меню. Заказ от 745₽.', code: 'DJC159' },
      { id: 'f19', discount: 'Сет за 990₽', discountType: 'gift', company: 'FoodBand', description: 'Сет Горячие роллы 24шт.', code: 'DJL76' },
      { id: 'f20', discount: 'Пицца', discountType: 'gift', company: 'FoodBand', description: 'Пицца BBQ в подарок при заказе от 1.290₽.', code: 'DJT76' },
      { id: 'f21', discount: '51%', discountType: 'percent', company: 'Магнит Доставка', description: 'На первый заказ от 1.000₽ в разделе Мигом. Скидка по промокоду распространяется только на товары из раздела «Мигом», не распространяется на товары с пометкой «финальная цена».', code: 'FM51NTQTX' },
      { id: 'f22', discount: '21%', discountType: 'percent', company: 'Магнит Доставка', description: 'На повторный заказ от 1.700₽ в разделе «Мигом». Бонусы суммируются со скидками.', code: '21DSFIRGDD' },
      { id: 'f23', discount: '20%', discountType: 'percent', company: 'Ёбидоёби', description: 'На первый заказ от 1.800₽.', code: 'BL0413PF' },
      { id: 'f24', discount: '15%', discountType: 'percent', company: 'Farfor', description: 'На первый заказ от 1.500₽. Не распространяется на акционные сеты и пиццу месяца.', code: 'YBH47958' },
      { id: 'f25', discount: 'Ролл', discountType: 'gift', company: 'Farfor', description: 'Ролл Темпурный Цезарь в подарок на любой заказ от 1.490₽.', code: 'FVY81318' },
    ],
  },
  {
    id: 'services',
    label: 'Сервисы',
    emoji: '🌐',
    promos: [
      { id: 's1', discount: '10%', discountType: 'percent', company: 'Яндекс Афиша', description: 'На первую и все повторные покупки билетов от 3.000₽.', code: 'DI176512' },
      { id: 's2', discount: '300₽', discountType: 'rub', company: 'Яндекс Афиша', description: 'На первую покупку билетов от 2.000₽.', code: 'F07142' },
      { id: 's3', discount: '400₽', discountType: 'rub', company: 'Яндекс Афиша', description: 'На первую покупку билетов от 3.000₽.', code: 'F23134' },
      { id: 's4', discount: '750₽', discountType: 'rub', company: 'Яндекс Афиша', description: 'На первую покупку билетов от 5.000₽. Не действует на подарочные сертификаты, билеты в кино и при оплате Пушкинской картой. Не суммируется с акциями, картой лояльности и специальными предложениями.', code: 'F19324' },
      { id: 's5', discount: '50 дней', discountType: 'days', company: 'PREMIER', description: '50 дней доступа к сервисам RUTUBE + PREMIER за 1₽ для пользователей без активной подписки более полугода. Или подписка на один месяц за 200₽ для неактивных пользователей менее полугода.', code: '27er77jr' },
      { id: 's6', discount: '45 дней', discountType: 'days', company: 'Кинопоиск', description: 'Бесплатный доступ на 45 дней для новых пользователей или 30 дней за 1₽ для пользователей, чья мультиподписка закончилась более 14 дней назад. Возрастное ограничение 18+.', code: '5WGWZV4MLV' },
      { id: 's7', discount: '45 дней', discountType: 'days', company: 'Яндекс Плюс', description: 'Бесплатный доступ на 45 дней для новых пользователей или 30 дней за 1₽, если мультиподписка была неактивна уже более 30 дней. Возрастное ограничение 18+.', code: '69MSZGMH66' },
      { id: 's8', discount: '45 дней', discountType: 'days', company: 'Яндекс Музыка', description: 'Бесплатный доступ на 45 дней для новых пользователей и 30 дней за 1₽ для тех, у кого мультиподписка закончилась более месяца назад. Возрастное ограничение 18+.', code: '5CW93YVG95' },
      { id: 's9', discount: '45 дней', discountType: 'days', company: 'Яндекс Книги', description: 'Бесплатный доступ на 45 дней для новых пользователей или 30 дней за 1₽ для тех, у кого мультиподписка закончилась более месяца назад. Возрастное ограничение 18+.', code: '43BLXBM9Q3' },
      { id: 's10', discount: '30 дней', discountType: 'days', company: 'START', description: '30 дней доступа к подписке на START за 0₽ для новых пользователей.', code: 'pf3m0xxpg8' },
      { id: 's11', discount: '1000₽', discountType: 'rub', company: 'Плати по миру', description: 'На выпуск Премиальной карты + кешбэк 5$ после её оформления.', code: 'PREPQ4B35H' },
      { id: 's12', discount: '500₽', discountType: 'rub', company: 'Плати по миру', description: 'На выпуск карт для путешествий и подписок + кешбэк 5$ после её оформления.', code: 'F7K4MV' },
      { id: 's13', discount: '60 дней', discountType: 'days', company: 'Okko', description: '60 дней доступа к подписке за 1₽, далее 399₽/месяц для новых пользователей и тех, у кого нет активной подписки СберПрайм по всей России.', code: '289734237831' },
      { id: 's14', discount: '50%', discountType: 'percent', company: 'Онлайн-кинотеатр 24тв', description: 'На тариф "Премиум", к сервису можно подключить 5 устройств.', code: 'WBNWHPZF' },
      { id: 's15', discount: '35 дней', discountType: 'days', company: 'Онлайн-кинотеатр 24тв', description: '35 дней бесплатного доступа по тарифу "Оптимум+". Действует только для новых пользователей.', code: 'B5MZJR3F' },
    ],
  },
  {
    id: 'cosmetics',
    label: 'Косметика',
    emoji: '💄',
    promos: [
      { id: 'c1', discount: '36%', discountType: 'percent', company: 'М. Косметик', description: 'На первый заказ от 1.200₽. Промокод действует только на товары в разделе М.Косметик, не действует на товары с пометкой "Финальная цена". Только на доставку.', code: 'PK3M6A0G' },
      { id: 'c2', discount: '15-35%', discountType: 'percent', company: 'ЛЭТУАЛЬ', description: 'Скидка на каждый заказ в зависимости от суммы: 15% от 4.000₽, 25% от 7.000₽, 35% от 12.000₽. При оформлении вводи промокод "БЛЕСК".', code: 'БЛЕСК', isLink: true, link: 'https://www.letu.ru/' },
      { id: 'c3', discount: '2500₽', discountType: 'rub', company: 'ЛЭТУАЛЬ', description: 'На каждый заказ от 6.000₽. При оформлении вводи промокод "ШАНС".', code: 'ШАНС', isLink: true, link: 'https://www.letu.ru/' },
      { id: 'c4', discount: '10%', discountType: 'percent', company: 'RANDEWOO', description: 'На каждый заказ от 4.500₽. Суммируются с акциями на сайте.', code: 'RND0-v3TRzvUX' },
    ],
  },
  {
    id: 'travel',
    label: 'Путешествия',
    emoji: '🌴',
    promos: [
      { id: 't1', discount: '1000₽', discountType: 'rub', company: 'Яндекс Путешествия', description: 'На одно бронирование отеля от 10.000₽.', code: 'PF-ALLIOOO-A432U' },
      { id: 't2', discount: '1500₽', discountType: 'rub', company: 'Яндекс Путешествия', description: 'На одно бронирование отеля от 15.000₽.', code: 'PF-ALLI5OO-DUUGF' },
    ],
  },
  {
    id: 'jewelry',
    label: 'Ювелирка',
    emoji: '💍',
    promos: [
      { id: 'j1', discount: 'Подвеска', discountType: 'gift', company: 'SOKOLOV', description: 'Воспользоваться можно один раз. Забирай код и покажи на кассе для получения подарка.', code: 'T45P4D44', isLink: true, link: 'https://sokolov.ru/' },
    ],
  },
  {
    id: 'home',
    label: 'Для дома',
    emoji: '🏠',
    promos: [
      { id: 'h1', discount: '10%', discountType: 'percent', company: 'OZON', description: 'На ассортимент брендов Carte Blanche и GALA. На каждый заказ, суммируется с акциями.', code: 'SZHM93427848' },
      { id: 'h2', discount: '10%', discountType: 'percent', company: 'OZON', description: 'На ассортимент бренда Cozy Home. На каждый заказ от 1.000₽, суммируется с акциями.', code: 'SZHM60330E11' },
    ],
  },
  {
    id: 'sport',
    label: 'Спорт',
    emoji: '💪',
    promos: [
      { id: 'sp1', discount: '66%', discountType: 'percent', company: 'DDX Fitness', description: 'На вступительный платёж по тарифам Infinity и Infinity Plus. Не суммируется с другими акциями и скидками.', code: 'DDXPE422V' },
    ],
  },
];

export const ADMIN_PASSWORD = 'admin2026secure';

const STORAGE_KEY = 'promo_categories_v1';

export function getCategories(): Category[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return initialCategories;
}

export function saveCategories(cats: Category[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cats));
}

export function resetCategories(): void {
  localStorage.removeItem(STORAGE_KEY);
}
