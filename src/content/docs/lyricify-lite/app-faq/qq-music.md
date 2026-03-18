---
title: QQ 音乐
description: Lyricify Lite 常见问题（逐应用）。
---

## 实现曲目精确匹配

### 适用场景
匹配到的曲目不准确，或希望实现更稳定的完美匹配。

### 解决方案
安装 [QQMusic-ID-Injector 插件](https://github.com/apoint123/QQMusic-ID-Injector)。  
安装完成后，重启 QQ 音乐和 Lyricify Lite 即可。

## 使用 QQ 音乐时没有时间轴
在使用 QQ 音乐时，手动修改播放进度后，Lyricify Lite 无法更新播放进度，歌词发生前后错位。

### 导致原因
没有更新至支持 SMTC 时间轴的 QQ 音乐版本。

### 解决方案
更新 QQ 音乐至最新版，确保其版本号不低于 21.10.2962。

## 无法检测到 QQ 音乐

### 导致原因
QQ 音乐不是最新版，或未开启 SMTC。

### 解决方案
更新 QQ 音乐至最新版，并确保 SMTC 已启用（位置：`设置->常规设置->通知->显示系统媒体传输控件（SMTC）`）。
