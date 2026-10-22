---
title: 歌词比歌曲快或慢
---

Lyricify Mobile 中显示的歌词比歌曲快了或者慢了。

## 使用 Spotify 播放源时

### 导致原因
Spotify API 提供的播放进度不准，这是由多个原因导致的。
1. Spotify 客户端向 Spotify 服务器发送进度有误差或延迟。
2. Lyricify Mobile 向 Spotify 服务器发送进度请求有误差或延迟。
3. Spotify 本身进度不准。  
由一系列原因，造成歌词显示时间轴不准确。

### 解决方案
±2s 内的延迟属于正常范围。  
Android 用户可尝试开启 Spotify 的 Media Session 增强，以改善本机播放进度同步。

## 使用 Apple Music 或 Media Session 播放源时

先检查音乐应用是否提供了准确的播放进度，以及当前歌词时间轴是否匹配歌曲版本。iOS 的 Apple Music 播放源还可使用设备延迟管理。

如果只有某一首歌出现偏移，可尝试更换歌词来源或调整歌词延迟。
