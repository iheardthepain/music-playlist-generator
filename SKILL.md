# Music Playlist Generator Skill (Shared Edition)

## Purpose

Generate theme-based playlists from a local music library and return a Feishu-ready single message.

Core idea:
- user gives a theme
- system composes tracks with lightweight semantic constraints
- system returns one clickable playlist link plus concise intro and ordered summary

## Public Sharing Policy

This file is safe for public sharing only if all placeholders are kept generic and deployment-specific values are injected at runtime.

Do not hardcode:
- personal usernames
- local absolute paths
- private IP addresses
- fixed chat IDs
- tokens or secrets

Use placeholders and environment variables instead.

## Entrypoint Contract

Single production entrypoint:
- node scripts/generate-playlist.js "{theme}" [count]

Execution template:
- Set-Location {PROJECT_DIR}; node scripts/generate-playlist.js "{theme}" [count]

Return policy:
- Return stdout directly as one final user-facing message
- Do not prepend extra chatter

## OpenClaw Flow (Recommended)

1. Immediate acknowledgement
2. Schedule isolated background run
3. Announce final stdout to target chat

Acknowledge example:
- 🎵 收到！正在为你生成「{theme}」歌单，大约需要30秒～

## Message Output Contract

Expected output blocks:
1. status line
2. track count line
3. playlist URL line
4. short intro
5. compact ordered track summary

## Theme Understanding Strategy

Use low-cost local intelligence by default:
- semantic keyword weighting
- intent constraints (region/language/decade)
- controlled fallback when strict filters are too narrow

Examples:
- 欧美流行歌曲 -> western/english preference
- 90年代华语流行 -> 1990s + chinese preference
- 相声/小品 -> spoken-comedy preference

## Configuration Expectations

Important config keys:
- playlist.defaultCount
- playlist.summaryCount
- playlist.messageSummaryCount
- playlist.maxCount

Recommended environment variables:
- MUSIC_PROJECT_DIR
- PLAYLIST_BASE_URL
- FEISHU_CHAT_TARGET
- ENABLE_LEGACY_FEISHU (default false)

## Legacy Isolation

Legacy scripts should remain disabled by default:
- scripts/feishu-handler.js
- scripts/feishu-worker.js
- scripts/queue-playlist-job.js
- scripts/notify-feishu.js

Temporary rollback only:
- ENABLE_LEGACY_FEISHU=true

## Security and Privacy

- never output tokens, secrets, cookies, webhook signatures
- never expose private machine details unless explicitly intended
- mask sensitive fields in logs
- use secret manager or environment variables for credentials

## Copyright and Compliance

- only use authorized local music assets or licensed metadata
- do not output full lyrics or long copyrighted excerpts
- do not scrape and redistribute unlicensed images
- keep generated summaries metadata-level only (title/artist/style)

## Quick Validation

- node scripts/generate-playlist.js "欧美流行歌曲" 20
- node scripts/generate-playlist.js "90年代华语流行" 20
- node scripts/generate-playlist.js "random" 20

Checklist:
- output contains one valid playlist URL
- output does not leak sensitive information
- output follows single-message contract

## Version

Shared Edition 2026-03-15
