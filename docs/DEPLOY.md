# 🚀 部署指南

## 前置准备

1. 你需要有：
   - 一个运行中的 OpenClaw 实例
   - 一个本地音乐库，所有歌曲文件存储在本地磁盘
   - 已将歌曲元数据索引导入到 SQLite 数据库
   - 一个静态文件web服务器用于提供歌单访问
   - （可选）Tailscale 内网穿透，用于外网访问
   - （可选）Embedding API 用于语义向量搜索（如 OpenAI、Azure、ARK 等提供的 embedding 服务）

2. 环境变量配置：

在你的 OpenClaw 运行环境中配置以下环境变量：

```bash
MUSIC_PROJECT_DIR=/path/to/your/music-project  # 你的音乐项目根目录
PLAYLIST_BASE_URL=https://your-domain-or-ip:port  # 你的音乐服务基础URL
FEISHU_CHAT_TARGET=chat:your-chat-id  # （仅飞书使用）你的飞书聊天ID
ENABLE_LEGACY_FEISHU=false  # 默认禁用旧版飞书链路
EMBEDDING_API_KEY=your-embedding-api-key  # （可选）Embedding API 密钥，用于语义向量搜索
```

## 安装步骤

1. 克隆skill到你的 OpenClaw skills 目录：

```bash
cd ~/.openclaw/skills
git clone https://github.com/your-username/music-playlist-generator.git
```

2. 配置你的音乐项目：

在 `MUSIC_PROJECT_DIR` 中确保你已经：
- 导入了歌曲索引数据库
- 配置好了web服务器，端口一般为 3000
- 测试了歌单生成脚本可以正常运行

3. 在 OpenClaw 中启用该技能即可使用

## 验证安装

运行测试命令验证：

```bash
cd ${MUSIC_PROJECT_DIR}
node scripts/generate-playlist.js "random" 5
```

应该输出：
- 状态信息
- 歌曲数量
- 可访问的歌单URL
- 歌曲列表

## 向量搜索配置（可选）

语义向量搜索可以大幅提升主题匹配的准确度。不配置时系统会自动使用关键词匹配，功能不受影响。

### 1. 配置 config.json

在 `config.json` 中添加 embedding 相关配置：

```json
{
  "playlist": {
    "useVectorSearch": true
  },
  "embedding": {
    "model": "your-embedding-model-id",
    "endpoint": "https://your-embedding-api-endpoint",
    "dim": 2048
  }
}
```

- `model`：你的 embedding 模型 ID（从 embedding 服务商获取）
- `endpoint`：embedding API 的请求地址（需兼容 OpenAI embedding API 格式）
- `dim`：向量维度（需与模型输出维度一致，常见值：1536、2048）

### 2. 设置环境变量

```bash
export EMBEDDING_API_KEY=your-embedding-api-key
```

### 3. 初始化向量数据库

```bash
cd ${MUSIC_PROJECT_DIR}
node scripts/init-embeddings-db.js
```

这会在 SQLite 数据库中创建 `tracks_embeddings` 表和 `embedding_jobs` 元数据表。

### 4. 生成歌曲向量

```bash
node scripts/generate-embeddings.js
```

支持的参数：
- `--batch N`：每批发送 N 首到 embedding API（默认 32）
- `--concurrency N`：同时并发 N 个批次请求（默认 3）
- `--resume`：跳过已有向量的歌曲（默认开启）
- `--no-resume`：重新生成所有向量
- `--limit N`：只处理前 N 首（调试用）
- `--dry-run`：只打印待处理数量，不实际调用 API

首次运行会为所有歌曲生成向量，后续运行会自动跳过未变化的歌曲。

### 5. 验证向量搜索

```bash
node scripts/generate-playlist.js "雨天发呆" 10 --vector
```

### 智能降级

当向量搜索不可用时（未配置 embedding、向量库为空、API 调用失败等），系统会自动降级到关键词匹配，不影响正常使用。

## 局域网访问

系统支持局域网设备免登录直接访问播放。当 `auth.enabled` 为 `true` 时：

- **局域网 IP**（如 `192.168.x.x`、`10.x.x.x`、`172.16.x.x` - `172.31.x.x`）自动免登录
- **localhost / 127.0.0.1** 自动免登录
- **公网 IP** 需要正常登录认证

这意味着家庭网络中的所有设备（手机、平板、电脑）可以直接打开歌单链接播放，无需额外登录。

## 常见问题

**Q: 生成的歌单链接打不开？**
A: 检查 `PLAYLIST_BASE_URL` 是否配置正确，web服务器是否正常运行，防火墙是否开放端口。

**Q: 找不到歌曲？**
A: 确认你的歌曲索引数据库已经正确导入，路径配置正确。

**Q: 向量搜索没有生效？**
A: 检查以下几点：
1. `config.json` 中 `playlist.useVectorSearch` 是否为 `true`
2. `embedding` 配置是否完整（model、endpoint、dim）
3. 环境变量 `EMBEDDING_API_KEY` 是否已设置
4. 是否已运行 `generate-embeddings.js` 生成向量
5. 可以用 `--vector` 参数强制使用向量搜索来排查问题
