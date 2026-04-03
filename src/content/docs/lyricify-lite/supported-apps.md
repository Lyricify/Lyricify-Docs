---
title: App 支持列表
description: Lyricify Lite 支持的 App 列表。
---

已知支持 Lyricify Lite 的 App 如下表所示。

| 名称 | SMTC 支持情况 | 曲目匹配 | 备注 |
| - | - | - | - |
| HyPlayer | 完美 | 完美 |  |
| LyricEase | 完美 | 完美 |  |
| Spotify | 完美 | 较好 | 建议使用 [Lyricify 4](https://apps.microsoft.com/store/detail/9P4WB75RHWCH?launch=true&mode=full) |
| Apple Music | 时间轴精度低；曲目信息不全 | 一般 | 可优化时间轴<sup><a href="#ref5">5</a></sup> |
| Tidal | 完美 | 较好 |  |
| QQ 音乐 | 完美 | 较好 | 可由[插件](https://github.com/apoint123/QQMusic-ID-Injector)实现完美匹配 |
| QQ 音乐 UWP | 一般，信息提供不稳定 | 较好 |  |
| 网易云音乐 | 完美 | 完美 | 需安装额外的[插件](https://github.com/apoint123/inflink-rs/) |
| 网易云音乐 UWP | 无时间轴信息 | 较好 |  |
| 酷狗音乐 | 无时间轴信息 | 较好 |  |
| 汽水音乐 | 完美 | 较好 |  |
| FocalSonic | 完美 | 较好 | 可实现完美匹配 |
| Media Player | 时间轴完美；曲目信息取决于具体曲目 | 一般，取决于具体文件 | 原 Groove Music |
| Foobar 2000 | 无时间轴信息；曲目信息取决于具体曲目 | 一般，取决于具体文件 | 时间轴可由[插件](https://github.com/ungive/foo_mediacontrol)提供 |
| PotPlayer | 时间轴完美；曲目信息取决于具体文件名 | 较差，取决于文件名 |  |
| AIMP | 无时间轴信息；曲目信息取决于具体曲目 |  一般，取决于具体文件 | 需安装额外的[插件](https://www.aimp.ru/?do=catalog&rec_id=1097) |
| Salt Player for Windows | 时间轴完美；曲目信息取决于具体曲目 |  一般，取决于具体文件 |  |
| LX Music | 时间轴完美；曲目信息取决于具体曲目 |  一般，取决于具体文件 |  |
| MusicPlayer2 | 时间轴完美；曲目信息取决于具体曲目 |  一般，取决于具体文件 |  |
| BetterLyrics | 时间轴完美；曲目信息取决于具体曲目 |  一般，取决于具体文件 |  |
| Google Chrome | 时间轴较好；曲目信息取决于具体播放内容 | 一般，取决于具体内容 | 默认不启用 |
| Microsoft Edge | 时间轴较好；曲目信息取决于具体播放内容 | 一般，取决于具体内容 | 默认不启用 |

**注意：**
1. 请确保相关 App 已更新至最新版本，部分旧版本可能并不支持 SMTC。Spotify 用户建议使用 Lyricify 4，不建议使用 Lyricify Lite，点击查看[具体原因](../app-faq/spotify/)。
2. 对于 SMTC 无时间轴信息的 App，Lyricify Lite 将使用内置定时器更新歌词进度，所以在手动修改播放进度后，Lyricify Lite 无法更新播放进度，歌词会发生前后错位。
3. 曲目匹配“完美”指 Lyricify Lite 可以完美匹配当前播放的曲目。其它匹配程度指 Lyricify Lite 需要通过对曲目信息进行搜索来匹配对应曲目，所以匹配可能不精准或匹配不到。
4. 所有接入 SMTC 的应用均支持 Lyricify Lite，未在上表中列出的 App 并不代表不支持 Lyricify Lite。
5. <span id="ref5">Apple Music 的时间轴传递不稳定，借助 Lyricify 智能引擎，Lyricify Lite 在 Microsoft Store 商店购买版中添加了“Apple Music 时间轴稳定器”功能，且默认开启。具体可参考[常见问题](../app-faq/apple-music/)。</span>
