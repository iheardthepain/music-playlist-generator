# 🎵 Music Playlist Generator v2.0 - OpenClaw 私人音乐库智能歌单生成技能

---

### 🇨🇳 中文介绍

你是否是音乐爱好者，有自己的音乐库，有通过各种途径搜集的音乐作品和专辑，数量众多，但是因为忙碌却很少仔细打理，很多精彩的歌曲藏在你的磁盘目录下，你却几乎从没听过，甚至不知道它们的存在。

这是一个 OpenClaw 技能插件，让OpenClaw来帮你打理你的私人音乐库。你可以简单描述你的需求和心情，它会理解并生成一个主题，如果你没有要求，它也可以智能地自动生成主题。然后从你的私人音乐库中生成一个歌单，直接在飞书/聊天中获取可点击播放的链接，随时随地享受你自己的音乐时光，发现自己音乐库中的遗珠宝藏。它会自动关联本地音乐库中的歌曲信息和封面图片，生成一个经典唱片和CD样式的歌单，点击播放就可以开始聆听。

---

### 🇬🇧 English Introduction

Are you a music lover with your own personal music library, filled with countless music albums and tracks you've collected through various channels, but rarely have time to organize them properly? Many wonderful songs are hidden deep in your disk directories that you've almost never listened to, or don't even know exist.

This is an OpenClaw skill plugin that helps you manage your personal music library. You can simply describe your needs and mood, and it will understand and generate a matching theme for you. If you don't specify a theme, it can also intelligently generate one automatically. It then creates a playlist from your personal music library, and provides a clickable playback link directly in Feishu/chat. Enjoy your personal music time anywhere, discover hidden treasures in your music library. It automatically matches song information and cover images from your local music library, generates a beautiful playlist in classic record/CD style, just click play to start listening.

---

### 🇷🇺 Русское введение

Вы любитель музыки и у вас есть собственная музыкальная библиотека с множеством альбомов и треков, собранных разными способами, но у вас редко есть время правильно их упорядочить? Многие замечательные песни скрыты глубоко в каталогах вашего диска, которые вы почти никогда не слушали или даже не подозреваете об их существовании.

Это плагин-навык для OpenClaw, который помогает вам управлять вашей личной музыкальной библиотекой. Вы можете просто описать свои потребности и настроение, и он поймет и создаст подходящую тему для вас. Если вы не указали тему, он также может автоматически создать ее интеллектуально. Затем он создает плейлист из вашей личной музыкальной библиотеки и предоставляет ссылку для воспроизведения одним кликом прямо в Feishu/чате. Наслаждайтесь личным музыкальным временем в любом месте, открывайте скрытые сокровища в вашей музыкальной библиотеке. Он автоматически сопоставляет информацию о песнях и обложки из вашей локальной музыкальной библиотеки, создает красивый плейлист в стиле классических пластинок/CD — просто нажмите воспроизведение, чтобы начать прослушивание.

---

## ✨ 功能特点 | ✨ Features | ✨ Особенности

### 🇨🇳 中文
- 🔍 **语义向量搜索**：使用语义向量嵌入（支持自定义 Embedding API），根据主题语义匹配歌曲，而非简单关键词
- 🏠 **局域网免登录**：局域网设备自动免登录直接播放，公网访问保持安全认证
- ⚙️ **智能降级**：向量搜索不可用时自动降级到关键词匹配，保证稳定性
- 🧠 **智能主题匹配**：语义理解你的需求，根据心情、场景、年代、风格自动筛选匹配歌曲
- 🎨 **高颜值唱片UI**：生成黑胶唱片风格的可视化网页歌单，播放时自动旋转，沉浸式体验
- 🔗 **随处访问**：配合 Tailscale 内网穿透，在外网也能随时访问你的私人音乐库
- ⚡ **快速生成**：本地数据库索引，30秒内即可生成歌单
- 📱 **移动端友好**：生成的网页自适应手机屏幕，随时收听
- 💾 **离线缓存**：支持 IndexedDB 本地缓存，缓存后无需网络也能播放
- 📊 **缓存进度条**：可视化显示缓存进度，支持边播放边缓存
- 🔒 **锁屏控制**：Media Session API 支持手机锁屏时控制播放
- 🔄 **断点续播**：记住播放位置，下次打开自动恢复
- 🛡️ **错误恢复**：网络中断自动重试，播放更稳定

### 🇬🇧 English
- 🔍 **Semantic Vector Search**: Uses semantic vector embeddings (supports custom Embedding API) to match songs by theme meaning, not just keywords
- 🏠 **LAN Auto-Access**: LAN devices automatically bypass login for direct playback, while public network access remains secured
- ⚙️ **Smart Fallback**: Automatically falls back to keyword matching when vector search is unavailable, ensuring stability
- 🧠 **Smart Theme Matching**: Semantically understands your request, automatically filters and matches songs based on mood, scene, decade, and style
- 🎨 **Beautiful Record UI**: Generates a visual web playlist in vinyl record style, automatically rotates during playback for an immersive experience
- 🔗 **Access Anywhere**: Works with Tailscale for penetration, you can access your personal music library from anywhere on the internet
- ⚡ **Fast Generation**: Local database indexing, generates a playlist within 30 seconds
- 📱 **Mobile Friendly**: Generated web page automatically adapts to mobile screens, listen anytime anywhere
- 💾 **Offline Cache**: Supports IndexedDB local caching, play without network after cached
- 📊 **Cache Progress Bar**: Visual cache progress display, supports play while caching
- 🔒 **Lock Screen Control**: Media Session API supports playback control when phone is locked
- 🔄 **Resume Playback**: Remembers playback position, auto-resumes next time
- 🛡️ **Error Recovery**: Auto-retry on network interruption, more stable playback

### 🇷🇺 Русский
- 🔍 **Семантический векторный поиск**: Использует семантические векторные вложения (поддержка пользовательского Embedding API) для сопоставления песен по смыслу темы, а не только по ключевым словам
- 🏠 **Авто-доступ из локальной сети**: Устройства в локальной сети автоматически обходят авторизацию для прямого воспроизведения, при этом доступ из интернета остается защищенным
- ⚙️ **Умный откат**: Автоматически переключается на поиск по ключевым словам при недоступности векторного поиска, обеспечивая стабильность
- 🧠 **Умное подбор темы**: Семантически понимает ваш запрос, автоматически фильтрует и подбирает песни по настроению, сцене, десятилетию и стилю
- 🎨 **Красивый интерфейс пластинки**: Создает визуальный веб-плейлист в стиле виниловой пластинки, автоматически вращается во время воспроизведения для погружения
- 🔗 **Доступ отовсюду**: Работает с Tailscale для туннелирования, вы можете получить доступ к своей личной музыкальной библиотеке из любой точки интернета
- ⚡ **Быстрая генерация**: Локальная индексация базы данных, плейлист создается за 30 секунд
- 📱 **Удобство для мобильных**: Сгенерированная веб-страница автоматически адаптируется к экранам мобильных устройств, слушайте где угодно
- 💾 **Офлайн-кэш**: Поддержка локального кэширования IndexedDB, воспроизведение без сети после кэширования
- 📊 **Индикатор кэширования**: Визуальное отображение прогресса кэширования, воспроизведение во время кэширования
- 🔒 **Управление с заблокированного экрана**: Media Session API поддерживает управление воспроизведением при заблокированном телефоне
- 🔄 **Возобновление воспроизведения**: Запоминает позицию воспроизведения, автоматически возобновляет в следующий раз
- 🛡️ **Восстановление после ошибок**: Автоматический повтор при прерывании сети, более стабильное воспроизведение

---

## 📋 前置要求 | 📋 Prerequisites | 📋 Предварительные требования

### 🇨🇳 中文
- 你需要有一个本地音乐库（歌曲文件储存在本地磁盘，不需要整理，工具会自动扫描建库）
- OpenClaw 运行环境
- 可选：Tailscale 内网穿透，实现外网访问
- 可选：Embedding API 用于语义向量搜索（如 OpenAI、Azure、ARK 等提供的 embedding 服务）

### 🇬🇧 English
- You need to have a local music library (song files stored on local disk — no manual organization needed, the tool auto-scans and indexes)
- OpenClaw runtime environment
- Optional: Tailscale penetration for external network access
- Optional: Embedding API for semantic vector search (e.g., OpenAI, Azure, ARK or other embedding services)

### 🇷🇺 Русский
- Вам нужна локальная музыкальная библиотека (файлы песен на локальном диске — ручная организация не требуется, инструмент автоматически сканирует и индексирует)
- Среда выполнения OpenClaw
- Опционально: Туннелирование Tailscale для доступа из внешней сети
- Опционально: Embedding API для семантического векторного поиска (например, OpenAI, Azure, ARK или другие embedding-сервисы)

---

## 🚀 部署步骤 | 🚀 Deployment Steps | 🚀 Шаги развертывания

### 🇨🇳 中文
1. 将本skill克隆到你的 OpenClaw skills 目录
2. 复制 `config.json.example` 为 `config.json`，填入你的音乐目录路径
3. 扫描建库：`node scripts/scan-library.js`（自动扫描音乐目录，创建索引数据库）
4. 启动音乐服务：`npm start`
5. 在聊天中发送「生成歌单 主题」即可使用
6. （可选）生成语义向量：`node scripts/generate-embeddings.js`（需配置 Embedding API）

### 🇬🇧 English
1. Clone this skill to your OpenClaw skills directory
2. Copy `config.json.example` to `config.json`, fill in your music directory paths
3. Scan and index: `node scripts/scan-library.js` (auto-scans music directories, creates index database)
4. Start music service: `npm start`
5. Send "Generate playlist [theme]" in chat to use
6. (Optional) Generate embeddings: `node scripts/generate-embeddings.js` (requires Embedding API config)

### 🇷🇺 Русский
1. Клонируйте этот навык в каталог навыков OpenClaw
2. Скопируйте `config.json.example` в `config.json`, укажите пути к музыкальным каталогам
3. Сканирование и индексация: `node scripts/scan-library.js` (автоматически сканирует каталоги и создает базу данных)
4. Запустите музыкальный сервис: `npm start`
5. Отправьте «Сгенерировать плейлист [тема]» в чате для использования
6. (Опционально) Генерация векторов: `node scripts/generate-embeddings.js` (требуется настройка Embedding API)

---

## 📖 使用示例 | 📖 Usage Examples | 📖 Примеры использования

### 🇨🇳 中文
- 生成献给爱人的歌单吧
- 生成周末晚上的歌单吧
- 生成90年代欧美流行歌曲歌单
- 新的革命浪潮到来了，生成一个应景的歌单吧
- 今天是父亲的生日，能生成合适的歌单吗
- 生成歌单 欧美流行 30（指定歌曲数量，默认20首）

### 🇬🇧 English
- Generate a playlist for my lover
- Generate a playlist for a Saturday night
- Generate a playlist of 90s European and American pop songs
- A new wave of revolution is coming, generate a fitting playlist
- Today is my father's birthday, can you generate a suitable playlist?
- Generate playlist "pop music" 30 (specify number of songs, default 20)

### 🇷🇺 Русский
- Создайте плейлист для любимого человека
- Создайте плейлист для субботнего вечера
- Создайте плейлист поп-музыки 90-х из Европы и Америки
- Новая волна революции пришла, создайте подходящий плейлист
- Сегодня день рождения моего отца, можете ли вы создать подходящий плейлист?
- Сгенерируйте плейлист "поп-музыка" 30 (укажите количество песен, по умолчанию 20)

---

## ⚖️ 合规说明 | ⚖️ Compliance Statement | ⚖️ Заявление о соответствии

### 🇨🇳 中文
- 本工具仅用于个人整理和播放你合法拥有版权的音乐
- 工具本身不提供任何音乐文件下载
- 使用者需自行确保使用内容符合所在地区法律法规
- 不会自动抓取或分发受版权保护的第三方内容

### 🇬🇧 English
- This tool is only for personal organization and playback of music you legally own the copyright to
- The tool itself does not provide any music file downloads
- Users must ensure that the content used complies with the laws and regulations of their region
- It does not automatically scrape or distribute copyrighted third-party content

### 🇷🇺 Русский
- Этот инструмент предназначен только для личной организации и воспроизведения музыки, на которую вы законно владеете авторскими правами
- Сам инструмент не предоставляет загрузку музыкальных файлов
- Пользователи должны гарантировать, что используемый контент соответствует законам и правилам их региона
- Он автоматически не собирает и не распространяет контент третьих лиц, защищенный авторским правом

---

## 💖 支持开发 | 💖 Support Development | 💖 Поддержка разработки

### 🇨🇳 中文
如果你觉得这个工具对你有用，欢迎赞助支持我们继续开发更好的功能：

<!-- 在这里添加你的赞助链接 -->
- [爱发电](https://afdian.net/your-id)
- [Buy Me a Coffee](https://www.buymeacoffee.com/your-id)

### 🇬🇧 English
If you find this tool useful, welcome to sponsor us to continue developing better features:

<!-- Add your sponsor link here -->
- [AfDian (for China)](https://afdian.net/your-id)
- [Buy Me a Coffee](https://www.buymeacoffee.com/your-id)

### 🇷🇺 Русский
Если вы считаете этот инструмент полезным, приветствуется спонсорская поддержка, чтобы мы могли продолжать разрабатывать лучшие функции:

<!-- Добавьте свою ссылку для спонсирования здесь -->
- [AfDian (для Китая)](https://afdian.net/your-id)
- [Buy Me a Coffee](https://www.buymeacoffee.com/your-id)

---

## 📄 许可证 | 📄 License | 📄 Лицензия

MIT License
