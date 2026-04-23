---
title: 切歌后反应迟钝
---

切歌后 Lyricify 需要过较长时间才能显示新的歌曲信息或歌词。

## 切歌后歌曲信息仍是上一首
若切歌后 Lyricify 中的歌曲信息仍是上一首，这大概率是 429 问题导致的。

### 对于 Spotify Premium 用户
1. 如果是上一曲放完自动切到下一首，或是手动点击下一首按钮进行切歌的，且是在运行 Lyricify 的设备上使用 Spotify 播放的
   1. 检查 Media Session 是否连接 (点击 Lyricify 右上角用户组件即可查看)。
   2. 如果已连接，则检查设置中 `Lyricify 智能引擎` 是否启用。
   3. 如果未连接，则需先修复 [Media Session 连接问题](../media-session-not-connected/)。
2. 仍无法解决的，或是不是上述情况的，参见[总是提示出现 429 错误](../error-429/)，可通过配置[自定义 API Client](../../custom-api-client/) 来解决。

### 对于非 Spotify Premium 用户
可通过订阅 Spotify Premium 来优化体验。  
在非 Premium 账户中，Lyricify 智能引擎无法正常工作，也无法主动创建[自定义 API Client](../../custom-api-client/) 来解决 429 问题 (但可借助其他 Premium 用户的 Client，详见[教程](../../custom-api-client/#借用朋友的-client-信息))。

:::caution[注意]
需要注意的是，这是 Spotify API 的限制，并非 Lyricify 侧的问题。感谢你的理解与支持。  
我们也已经在 Spotify 开发者官方论坛多次[反馈](https://community.spotify.com/t5/Spotify-for-Developers/Severe-429-Errors-in-Apps-with-Granted-Quota-Extension/m-p/7340780)，但目前官方仍未做出调整。
:::

## 若切歌后歌曲信息已更新
若切歌后 Lyricify 中的歌曲信息已经更新，但歌词空白的时间较长，请完成[歌词标记](../../lyrics-and-track-management/#歌词标记及导入)，这样可以提高歌词获取效率。
