# 🚀 部署指南

## 前置准备

1. 你需要有：
   - 一个运行中的 OpenClaw 实例
   - 一个本地音乐库，所有歌曲文件存储在本地磁盘
   - 已将歌曲元数据索引导入到 SQLite 数据库
   - 一个静态文件web服务器用于提供歌单访问
   - （可选）Tailscale 内网穿透，用于外网访问

2. 环境变量配置：

在你的 OpenClaw 运行环境中配置以下环境变量：

```bash
MUSIC_PROJECT_DIR=/path/to/your/music-project  # 你的音乐项目根目录
PLAYLIST_BASE_URL=https://your-domain-or-ip:port  # 你的音乐服务基础URL
FEISHU_CHAT_TARGET=chat:your-chat-id  # （仅飞书使用）你的飞书聊天ID
ENABLE_LEGACY_FEISHU=false  # 默认禁用旧版飞书链路
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

## 常见问题

**Q: 生成的歌单链接打不开？**
A: 检查 `PLAYLIST_BASE_URL` 是否配置正确，web服务器是否正常运行，防火墙是否开放端口。

**Q: 找不到歌曲？**
A: 确认你的歌曲索引数据库已经正确导入，路径配置正确。
