'use strict';

/**
 * scan-library.js — 扫描指定目录的音频文件，自动建立 SQLite 索引数据库
 * 
 * 用法：node scripts/scan-library.js
 * 
 * 读取 config.json 中的 musicLibrary.paths 配置，递归扫描所有音频文件，
 * 从目录结构和文件名智能解析元数据（歌名、歌手、专辑、流派），
 * 自动创建数据库表并导入。支持增量模式，已存在的文件自动跳过。
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const config = require('../config.json');
const DB_PATH = path.resolve(__dirname, '../', config.database.path);
const AUDIO_EXTENSIONS = ['.mp3', '.flac', '.m4a', '.wav', '.aac', '.ogg', '.wma', '.ape'];

// 初始化数据库表
function initDatabase(db) {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS tracks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_path TEXT UNIQUE NOT NULL,
      title TEXT,
      artist TEXT,
      album TEXT,
      genre TEXT,
      mood TEXT,
      era TEXT,
      language TEXT,
      duration_sec INTEGER,
      play_uri TEXT,
      source_confidence TEXT,
      cover_url TEXT,
      artist_bio TEXT,
      track_intro TEXT,
      lyrics_preview TEXT,
      musicbrainz_id TEXT,
      play_count INTEGER DEFAULT 0,
      avg_rating REAL DEFAULT 0,
      rating_count INTEGER DEFAULT 0,
      last_recommended TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * 从文件路径智能解析元数据
 * 
 * 支持的目录结构：
 *   genre/artist/album/track.mp3  → 解析出 genre, artist, album
 *   artist/album/track.mp3        → 解析出 artist, album
 *   artist/track.mp3              → 解析出 artist
 *   track.mp3                     → 仅从文件名解析
 * 
 * 支持的文件名模式：
 *   "歌手 - 歌名.mp3"             → 解析出 artist, title
 *   "01. 歌名.mp3"                → 去除序号，解析 title
 *   "歌名.mp3"                    → 直接作为 title
 */
function parseMetadata(filePath, libraryRoot) {
  const relativePath = path.relative(libraryRoot, filePath);
  const parts = relativePath.split(path.sep);
  const fileName = path.basename(filePath, path.extname(filePath));
  
  let genre = null, artist = null, album = null, title = fileName;
  
  // 目录层级推断
  if (parts.length >= 4) {
    genre = parts[0];
    artist = parts[1];
    album = parts[2];
  } else if (parts.length === 3) {
    artist = parts[0];
    album = parts[1];
  } else if (parts.length === 2) {
    artist = parts[0];
  }
  
  // 文件名模式：歌手 - 歌名
  const dashMatch = fileName.match(/^(.+?)\s*[-–—]\s*(.+)$/);
  if (dashMatch) {
    if (!artist) artist = dashMatch[1].trim();
    title = dashMatch[2].trim();
  }
  
  // 去除序号：01. 歌名、01 歌名
  title = title.replace(/^\d+[\.\s]+/, '');
  
  return { title, artist, album, genre };
}

// 递归扫描目录
function* scanDirectory(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`⚠️  无法访问目录: ${dir} (${err.code})`);
    return;
  }
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      yield* scanDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (AUDIO_EXTENSIONS.includes(ext)) {
        yield fullPath;
      }
    }
  }
}

// 插入 track（已存在则跳过）
function insertTrack(db, filePath, metadata) {
  return new Promise((resolve, reject) => {
    const playUri = `file:///${filePath.replace(/\\/g, '/')}`;
    
    db.run(`INSERT OR IGNORE INTO tracks 
      (file_path, title, artist, album, genre, play_uri, source_confidence)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [filePath, metadata.title, metadata.artist, metadata.album,
       metadata.genre, playUri, 'medium'],
      function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  });
}

async function main() {
  const libraryPaths = config.musicLibrary?.paths || [];
  
  if (libraryPaths.length === 0) {
    console.error('❌ 错误：config.json 中未配置 musicLibrary.paths');
    console.error('');
    console.error('请在 config.json 中添加你的音乐目录，例如：');
    console.error('  "musicLibrary": {');
    console.error('    "paths": ["/path/to/your/music", "/another/music/dir"]');
    console.error('  }');
    process.exit(1);
  }
  
  // 确保数据库目录存在
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  console.log('🎵 开始扫描音乐库...\n');
  console.log(`   数据库: ${DB_PATH}`);
  console.log(`   音频格式: ${AUDIO_EXTENSIONS.join(', ')}\n`);
  
  const db = new sqlite3.Database(DB_PATH);
  
  try {
    await initDatabase(db);
    
    let totalScanned = 0;
    let totalInserted = 0;
    const startTime = Date.now();
    
    for (const libraryPath of libraryPaths) {
      if (!fs.existsSync(libraryPath)) {
        console.warn(`⚠️  路径不存在，跳过: ${libraryPath}`);
        continue;
      }
      
      console.log(`📂 扫描: ${libraryPath}`);
      
      for (const filePath of scanDirectory(libraryPath)) {
        totalScanned++;
        const metadata = parseMetadata(filePath, libraryPath);
        const changes = await insertTrack(db, filePath, metadata);
        
        if (changes > 0) {
          totalInserted++;
          if (totalInserted % 500 === 0) {
            console.log(`   已导入 ${totalInserted} 首...`);
          }
        }
      }
    }
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log(`\n✅ 扫描完成！ (${elapsed}s)`);
    console.log(`   总扫描: ${totalScanned} 个音频文件`);
    console.log(`   新导入: ${totalInserted} 首歌曲`);
    console.log(`   已存在: ${totalScanned - totalInserted} 首（跳过）`);
    
    if (totalInserted > 0) {
      console.log(`\n💡 下一步:`);
      console.log(`   1. 启动服务: npm start`);
      console.log(`   2. 生成歌单: node scripts/generate-playlist.js "你的主题" 20`);
      if (config.playlist?.useVectorSearch) {
        console.log(`   3. 生成向量(可选): node scripts/generate-embeddings.js`);
      }
    }
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  } finally {
    db.close();
  }
}

main();
