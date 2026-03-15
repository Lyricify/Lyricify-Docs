---
title: 启动 Lyricify 后弹出消息框
description: 启动 Lyricify 后弹出消息框。
---

**注意：** 本问题仅在 4.2.11 或更早版本中出现。

打开 Lyricify 后弹出消息框，出现下列提示之一：
- The SSL connection could not be established, see inner exception.
- 由于目标计算机积极拒绝，无法连接。
- 请求的名称有效，但是找不到请求的类型的数据。
- 由于连接方在一段时间后没有正确答复或链接的主机没有反应，连接尝试失败。

在确认/关闭消息框后，Lyricify 关闭。
### 导致原因
网络连接状态不好，导致无法完成自动更新。
### 解决方案
- 使用 [Microsoft Store 版本](https://apps.microsoft.com/store/detail/9P4WB75RHWCH?launch=true&mode=full)，其自动更新由 Microsoft 负责和管理，比 Lyricify 自带的更新更方便稳定，故强烈推荐使用。
- 先手动更新至最新版，然后在 `设置` `高级` `更新` `更新来源` 中切换更新源至 `GitHub`。再下次更新发布后（建议开启网络代理），若可正常更新，则可正常使用；若仍然无法正常更新，则建议使用 [Microsoft Store 版本](https://apps.microsoft.com/store/detail/9P4WB75RHWCH?launch=true&mode=full)。
