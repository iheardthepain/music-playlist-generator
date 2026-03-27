'use strict';

/**
 * init-embeddings-db.js
 * 初始化语义向量存储表（tracks_embeddings）
 *
 * SQLite 不原生支持向量搜索，但可以把 float32 向量序列化为 BLOB 存入，
 * 再在 JS 层做余弦相似度计算。对于大量歌曲，向量维度 2048 时内存约
 * N × 2048 × 4 bytes，实测可接受（分批加载更优）。
 * 后续如需升级到 sqlite-vec / faiss，BLOB 格式天然兼容迁移。
 *
 * 用法：
 *   node scripts/init-embeddings-db.js
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../config.json');

const DB_PATH = path.resolve(__dirname, '../', config.database.path);

function initEmbeddingsTable() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) return reject(err);
    });

    db.serialize(() => {
      // 设置 busy_timeout 防止与其他进程的锁冲突
      db.run('PRAGMA busy_timeout = 30000');
      db.run('PRAGMA journal_mode = WAL');
      // 向量存储表：每首歌一行，embedding 以 Float32Array→Buffer 存 BLOB
      db.run(`
        CREATE TABLE IF NOT EXISTS tracks_embeddings (
          track_id    INTEGER PRIMARY KEY,
          model       TEXT NOT NULL DEFAULT 'your-embedding-model',
          dim         INTEGER NOT NULL,
          embedding   BLOB NOT NULL,
          text_hash   TEXT,          -- 用于检测文本变化，避免重复生成
          created_at  TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at  TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (track_id) REFERENCES tracks(id)
        )
      `, (err) => {
        if (err) { db.close(); return reject(err); }
      });

      // 索引：按 model 筛选（未来可能有多模型）
      db.run(`CREATE INDEX IF NOT EXISTS idx_te_model ON tracks_embeddings(model)`, (err) => {
        if (err) { db.close(); return reject(err); }
      });

      // 元数据表：记录批次进度
      db.run(`
        CREATE TABLE IF NOT EXISTS embedding_jobs (
          id           INTEGER PRIMARY KEY AUTOINCREMENT,
          started_at   TEXT,
          finished_at  TEXT,
          total        INTEGER DEFAULT 0,
          done         INTEGER DEFAULT 0,
          failed       INTEGER DEFAULT 0,
          model        TEXT,
          status       TEXT DEFAULT 'running'  -- running | done | failed
        )
      `, (err) => {
        if (err) { db.close(); return reject(err); }
        db.close((e2) => {
          if (e2) return reject(e2);
          resolve();
        });
      });
    });
  });
}

if (require.main === module) {
  initEmbeddingsTable()
    .then(() => {
      console.log('[init-embeddings-db] tracks_embeddings 表初始化完成');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[init-embeddings-db] 初始化失败:', err.message);
      process.exit(1);
    });
}

module.exports = { initEmbeddingsTable };
