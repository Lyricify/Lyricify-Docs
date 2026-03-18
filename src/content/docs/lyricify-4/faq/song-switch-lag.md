---
title: 切歌后反应迟钝
description: 切歌后反应迟钝。
---

切歌后 Lyricify 需要过较长时间才能显示新的歌曲信息。

**请判断导致原因：**  
1. 若切歌后 Lyricify 中的歌曲信息仍是上一首。
   1. 如果您是 Spotify Premium 用户，且是上一曲放完自动切到下一首，或是您手动点击下一首按钮进行切歌的，且是在运行 Lyricify 的设备上使用 Spotify 播放的
      1. 检查 Media Session 是否连接 (点击 Lyricify 右上角用户组件即可查看)。
      2. 如果已连接，则检查设置中 `Lyricify 智能引擎` 是否启用。
      3. 如果未连接，则需先修复 [Media Session 连接问题](../media-session-not-connected/)。
   2. 仍无法解决的，或是不是上述情况的，参见[总是提示出现 429 错误](../error-429/)。
   3. 如果您不是 Spotify Premium 用户，则可尝试通过购买 Spotify Premium 来优化体验。在非 Premium 账户中，Lyricify 智能引擎无法正常工作。
2. 若切歌后 Lyricify 中的歌曲信息已经更新，但歌词空白的时间较长，请完成[歌词标记](../../basic/)，这样可以提高歌词获取效率。
