'use strict';

const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.resolve(__dirname, '../data/playlist-cache');
const CACHE_EXPIRY = 60 * 60 * 1000; // 1小时过期

// 确保缓存目录存在
fs.mkdirSync(CACHE_DIR, { recursive: true });

// 获取缓存的歌单
function getCachedPlaylist(theme) {
  const cacheFile = path.join(CACHE_DIR, `${theme.toLowerCase().replace(/\s+/g, '-')}.json`);
  if (!fs.existsSync(cacheFile)) return null;

  try {
    const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    if (Date.now() - cacheData.timestamp < CACHE_EXPIRY) {
      return cacheData;
    } else {
      // 缓存过期，删除
      fs.unlinkSync(cacheFile);
      return null;
    }
  } catch (error) {
    console.error('读取缓存失败:', error);
    return null;
  }
}

// 缓存歌单
function cachePlaylist(theme, playlistData) {
  const cacheFile = path.join(CACHE_DIR, `${theme.toLowerCase().replace(/\s+/g, '-')}.json`);
  const cacheData = {
    ...playlistData,
    timestamp: Date.now()
  };
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('缓存歌单失败:', error);
    return false;
  }
}

module.exports = {
  getCachedPlaylist,
  cachePlaylist
};
