---
title: 网易云音乐
---

## 无法检测到网易云音乐

### 导致原因
网易云音乐 Win32 原版并不支持 SMTC。

### 解决方案
安装由 apoint123 重构的 [InfLink-rs 插件](https://github.com/apoint123/inflink-rs/)即可。  

:::caution[注意]
InfLink 插件有两个版本，InfLink 和 InfLink-rs，请只安装 InfLink-rs，如果同时安装 InfLink 和 InfLink-rs，则可能导致其他异常。
:::

## 调整进度后时间轴不同步

### 导致原因
网易云自带的 SMTC 不提供时间轴，需要安装额外的插件以增强使用体验。

### 解决方案
安装由 apoint123 重构的 [InfLink-rs 插件](https://github.com/apoint123/inflink-rs/)即可。  

## 使用网易云音乐时时间轴异常
在使用网易云音乐时，Lyricify Lite 歌词卡在曲目信息或第一句歌词，无法正常显示。

### 导致原因
InfinityLink 插件异常的传递了时间轴信息，导致 Lyricify Lite 获取到的 SMTC 信息错误，故产生异常行为。

### 解决方案（新）
安装由 apoint123 重构的 [InfLink-rs 插件](https://github.com/apoint123/inflink-rs/)。

### 解决方案（旧）
联系 InfinityLink 插件作者进行反馈，等待修复，暂时更换其它播放器，或等待网易云官方支持 SMTC。  
你也可以尝试开启 `设置->逐应用配置->网易云音乐->修改->使用内置计时器`，以屏蔽时间轴信息。
