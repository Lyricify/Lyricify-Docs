---
title: 常见问题（逐应用）
description: Lyricify Lite 常见问题（逐应用）。
---

## Spotify 用户应使用 Lyricify 4

对于 Spotify 用户，我们推荐使用 Lyricify 4，而不建议使用 Lyricify Lite。
### 具体原因
1. Lyricify 4 全称 Lyricify for Spotify，是专为 Spotify 研发的软件，针对 Spotify 提供了专门的优化，提升用户体验。
2. Lyricify 4 提供独立的词库，用户可以标记或上传准确的歌词，并对错误歌词进行修正。与之相比，Lyricify Lite 当前尚未接入 Lyricify 4 的词库，使用时体验较差。
3. Lyricify 4 不仅拥有更丰富的歌词展示界面，还包含诸如针对 Spotify 优化的全局快捷键、曲库查询、时间轴优化等更多实用功能。
### 更多信息
如果你仅使用 Lyricify Lite 的灵动词岛或桌面歌词功能配合 Spotify，仍然建议切换到 Lyricify 4。尽管它们在表面功能上相似，但在实际体验上，Lyricify 4 将为你提供更好的词库与功能支持。

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

## 无法检测到网易云音乐
### 导致原因
网易云音乐 Win32 原版并不支持 SMTC。
### 解决方案
安装由 apoint123 重构的 [InfLink 插件](https://github.com/apoint123/inflink-rs/)即可。  

## 使用网易云音乐时时间轴异常
在使用网易云音乐时，Lyricify Lite 歌词卡在曲目信息或第一句歌词，无法正常显示。
### 导致原因
InfinityLink 插件异常的传递了时间轴信息，导致 Lyricify Lite 获取到的 SMTC 信息错误，故产生异常行为。
### 解决方案（新）
安装由 apoint123 重构的 [InfLink 插件](https://github.com/apoint123/inflink-rs/)。
### 解决方案（旧）
联系 InfinityLink 插件作者进行反馈，等待修复，暂时更换其它播放器，或等待网易云官方支持 SMTC。  
你也可以尝试开启 `设置->逐应用配置->网易云音乐->修改->使用内置计时器`，以屏蔽时间轴信息。

## 无法检测到酷狗音乐
### 导致原因
酷狗音乐不是最新版，或未开启 SMTC。
### 解决方案
更新酷狗音乐至最新版，并确保 SMTC 已启用（位置：`设置->常规设置->播放->支持系统播放控件，如锁屏界面`）。

## 无法检测到 PotPlayer
### 导致原因
PotPlayer 不是最新版，没有 SMTC 功能。
### 解决方案
更新 PotPlayer 至最新版，最低版本要求 240618。

## Apple Music 时间轴不稳定
使用 Apple Music 时，时间轴不稳定，存在异常跳动现象。
### 导致原因
Apple Music 提供的时间轴精度很低，且上报不稳定。  
这个问题自 Apple Music Windows 发布以来就已存在，Lyricify Lite 已尽力优化。
### 解决方案（新）
你可以尝试使用 Lyricify 智能引擎提供的全新方案：Apple Music 时间轴稳定器。  

**注意：**
1. 本功能仅 [Microsoft Store 商店购买版](https://apps.microsoft.com/detail/9NLTPSV395K2)支持，且默认开启。
2. 设置项位置：设置 -> 逐应用配置 -> Apple Music -> 修改 -> Apple Music 时间轴稳定器。
3. 开启本功能后，Lyricify 将自动优化和调整 Apple Music 传入的时间轴，尽力提供一个稳定的进度输出。
4. 由于 Apple Music 存在延迟，建议将会话延迟调整为 -500 ms ~ -400 ms。

### 解决方案（旧）
与 Apple 取得联系，并向他们寻求帮助。或更换其他音乐 app，以提升你的 Lyricify 使用体验。
