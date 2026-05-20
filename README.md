# 🎟️ ПромоКоды — Сайт промокодов

Современный одностраничный сайт с промокодами, адаптированный для мобильных устройств.

---

## 🚀 Деплой на Ubuntu через GitHub Actions

### 1. Подготовка сервера Ubuntu

```bash
# Установка Nginx
sudo apt update
sudo apt install nginx -y

# Создание директории для сайта
sudo mkdir -p /var/www/promocodes
sudo chown -R $USER:$USER /var/www/promocodes

# Настройка Nginx
sudo nano /etc/nginx/sites-available/promocodes
```

Вставьте в файл конфигурацию Nginx:

```nginx
server {
    listen 80;
    server_name ВАШ_ДОМЕН.ru www.ВАШ_ДОМЕН.ru;  # замените на свой домен или IP

    root /var/www/promocodes;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

```bash
# Включение сайта
sudo ln -s /etc/nginx/sites-available/promocodes /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 2. Настройка SSH-ключа для GitHub Actions

```bash
# На вашем сервере — сгенерируйте SSH-ключ (если нет)
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github_deploy

# Добавьте публичный ключ в authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Выведите приватный ключ — он нужен для GitHub Secrets
cat ~/.ssh/github_deploy
```

---

### 3. Добавление Secrets в GitHub

Перейдите в репозиторий → **Settings → Secrets and variables → Actions → New repository secret**

Добавьте:

| Secret | Значение |
|--------|----------|
| `SSH_PRIVATE_KEY` | Приватный ключ из шага выше (весь текст файла `github_deploy`) |
| `SERVER_HOST` | IP-адрес вашего сервера |
| `SERVER_USER` | Пользователь SSH (например `ubuntu` или `root`) |
| `SERVER_PATH` | Путь на сервере: `/var/www/promocodes/` |

---

### 4. Автоматический деплой

После каждого `git push` в ветку `main`:
1. GitHub Actions собирает проект (`npm run build`)
2. Файлы из `dist/` копируются на сервер по SSH/rsync
3. Сайт обновляется автоматически ✅

---

## 📁 Загрузка логотипов

Логотипы компаний находятся в папке `public/logos/`.

Если хотите заменить SVG на настоящие PNG-логотипы:
1. Скачайте логотип нужной компании
2. Положите его в `public/logos/` с тем же именем файла (например `samokat.png`)
3. В файле `src/data/promocodes.ts` измените путь: `/logos/samokat.svg` → `/logos/samokat.png`

### Список логотипов:
- `samokat.svg` — Самокат
- `yandex-lavka.svg` — Яндекс Лавка
- `magnit.svg` — Магнит Доставка
- `perekrestok.svg` — Перекрёсток Доставка
- `yandex-afisha.svg` — Яндекс Афиша
- `yandex-plus.svg` — Яндекс Плюс
- `yandex-music.svg` — Яндекс Музыка
- `yandex-knigi.svg` — Яндекс Книги
- `yandex-travel.svg` — Яндекс Путешествия
- `kinopoisk.svg` — Кинопоиск
- `premier.svg` — PREMIER
- `start.svg` — START
- `okko.svg` — Okko
- `tv24.svg` — 24тв
- `platipo.svg` — Плати по миру
- `letual.svg` — ЛЭТУАЛЬ
- `randewoo.svg` — RANDEWOO
- `mkosmetic.svg` — М. Косметик
- `sokolov.svg` — SOKOLOV
- `ozon.svg` — OZON
- `ddx.svg` — DDX Fitness
- `vkusvill.svg` — ВкусВилл
- `elementaree.svg` — Elementaree
- `dodo.svg` — Додо Пицца
- `foodband.svg` — FoodBand
- `ebidoebi.svg` — Ëбидоёби
- `farfor.svg` — Farfor
- `vazhnaya-ryba.svg` — Важная рыба

---

## 🌐 Фавикон

Фавикон находится в `public/favicon.svg`.

**Чтобы загрузить свой фавикон:**
1. Подготовьте файл `favicon.ico` или `favicon.png` (рекомендуется 32×32 или 64×64 px)
2. Положите его в папку `public/`
3. Замените в `index.html`:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

---

## 📊 Google Analytics

В `index.html` уже встроен код Google Analytics. 

**Замените `G-XXXXXXXXXX`** на ваш реальный Measurement ID:
1. Зайдите на [analytics.google.com](https://analytics.google.com)
2. Создайте ресурс GA4
3. Получите Measurement ID (вид: `G-XXXXXXXXXX`)
4. Вставьте его в `index.html` в двух местах

### Что отслеживается:
- 👁️ Просмотры страниц (автоматически)
- 📋 Нажатия на промокоды (событие `copy_promo_code` с названием компании и кодом)

---

## 💻 Локальная разработка

```bash
npm install
npm run dev
```

---

## 🏗️ Сборка

```bash
npm run build
```
