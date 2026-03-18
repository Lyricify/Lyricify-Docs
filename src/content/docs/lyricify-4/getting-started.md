---
title: 快速开始
description: Lyricify 4 快速开始教程。
---

## 运行 Lyricify 4

如果你想使用 Lyricify 4，请确保你的系统中安装了 `.NET Desktop Runtime 6.0`。如果启动时提示未安装，则需要先下载安装：
点击下载 `.NET Desktop Runtime 6.0.16` [x86](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-6.0.16-windows-x86-installer) [x64](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-6.0.16-windows-x64-installer) [Arm64](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-6.0.16-windows-arm64-installer)  
[点击转到 .NET 6.0 官方下载地址](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0)

## 初次使用前应了解

进入主界面的时候，如果当前没有正在播放的歌曲，请不要尝试点击播放按钮，因为这是没有作用的。Lyricify 是歌词软件，不是播放器，不在 Spotify 播放音乐就不会显示歌词。

### Spotify Premium 独占功能
1. Lyricify 智能引擎
2. 任意点歌（点击播放按钮，或双击歌单、专辑中的歌曲）
3. 控制播放（调整进度、播放、暂停、上一曲、下一曲、循环、随机）
4. 控制音量
5. 添加到播放列表
6. 使用 Lyricify 内置播放

注：免费账户在 Media Session 连接正常的情况下也可以控制播放。

## 欢迎窗口

### 基本设置
首次打开 Lyricify 4 时，会出现一些基础设置。
- **语言：** Lyricify 显示语言及 Spotify 内容语言。与 Spotify 的设置保持一致时可以获得最佳 Media Session 体验。如果你听华语偏多，建议将显示语言设置为中文，这样可以提高歌词自动搜索的准确度。
- **中文翻译：** 是否在歌词有中文翻译时显示。
- **颜色模式：** `深色主题` 或 `浅色主题`。如果你想自行制作配色主题，可继续阅读 [自定义配色主题](./settings/custom-themes/)。
- **预设配置：** 一般情况下设置为默认即可。如果你的设备性能较差，可以设置为 `更好的性能`；如果你的设备性能很强，则可以尝试设置为 `更好的质量`。
  - *默认：* 推荐的设置。
  - *更好的性能：* 关闭部分功能和特效，以保证流畅的歌词体验。
  - *更好的质量：* 开启所有特效，这可能会导致在部分设备上歌词滚动时卡顿，尤其是 `Apple Music 歌词` 界面。

完成上述设置后点击继续即可。

### 登录到 Spotify
Lyricify 4 仅支持 Spotify，所以你必须完成 Spotify 授权才可以正常使用 Lyricify 4。  
此步骤将自动在你的网页浏览器中打开 Spotify 授权网页，你需要在该网页中完成 Spotify 的授权。完成授权后，网页会出现如下提示：

```text
成功！
Spotify 授权成功。你现在可以关闭这个标签页并回到 Lyricify。
```

此时回到 Lyricify 的欢迎界面，应该出现 `成功连接 Spotify` 的提示。如果出现 `Spotify 授权完成，请再等待几秒`，则说明 Spotify 授权已经完成，正在进行 Lyricify 服务器注册，等待几秒即可。  
最后，点击 `继续` 按钮即可开启全新 Lyricify 体验。

## 主界面与播放

如果你正在任何登录了该 Spotify 账号的设备上播放音乐，不出意外的话该曲目的歌词会显示在 Lyricify 的 `歌词` 界面。  
![img002](img/img002.png)  
如果你没有在 Spotify 播放音乐，则会出现 `Lyricify 主页`。如果你正在 `歌词` 界面，也可以通过右下方控制区域的第一个麦克风图标来隐藏 `歌词` 界面，隐藏后将显示 `Lyricify 主页`。  
![img003](img/img003.png)

如果你没有正在播放的音乐，并且当前无在线的 Spotify 设备，那么点击下方的播放按钮或 `Lyricify 主页` 中的播放按钮是不会有效果的。如果你想脱离 Spotify 直接使用 Lyricify 来播放音乐，可以参考 [使用 Lyricify 内置播放](./tools/built-in-playback/)。

### 按键及功能
下面是 `Lyricify 4 主界面` 中的按键及功能介绍。
- **主菜单：** 点击窗口左上角的 `···` 按钮即可打开 Lyricify 主菜单，主菜单中包含了 Lyricify 的各类功能入口和基础设置。
- **导航栏：** 左侧的导航栏提供了一些快捷方式。
  - *主页：* Lyricify 主页。
  - *搜索：* Lyricify 搜索页，其中包含 `Spotify 搜索`、`歌词搜索（暂不可用）` 和 [可用性查询](./tools/availability-check/)。
  - *音乐库：* Spotify 音乐库，内容与 Spotify 音乐库基本一致。
  - *已点赞的歌曲：* Spotify 音乐库中的歌曲，与 Spotify 保持一致。
  - *快捷访问：* 你可以在这里固定一些快捷访问项目，目前支持 `歌单`、`专辑` 和 `艺人`。你可以通过右击这些项目并点击 `固定到快捷访问` 来固定。
- **用户组件：** 右上角的用户组件，包含当前登录用户的信息，以及 `设置`、`关于` 和 `登出` 的入口。如果开启了 `Media Session 增强` 功能，这里会显示 Media Session 的连接状态。
- **歌曲信息区：** 左下角的歌曲信息区。
  - *专辑图片：* 点击可以打开 `歌曲信息`，`音频特性` 也包含在 `歌曲信息` 中。
  - *歌名：* 点击或右击歌名可显示菜单，该菜单中包含部分跳转，`曲目管理` 也可以在此菜单中打开。
  - *艺人：* 点击艺人即可跳转至该艺人主页。
- **播放控制区：** 下方中间区域。注意：Lyricify 的控制功能需要 Spotify Premium 订阅。但在 Media Session 启用后，则可以控制 Spotify Free 账户的播放（必须是本设备上的客户端）。
- **功能控制区：** 右下方的按钮区域。
  - *歌词：* 麦克风按钮，点击即可打开或关闭 `歌词` 界面。
  - *Apple Music 歌词：* 第二个按钮，点击即可进入 `Apple Music 歌词` 界面。
  - *Spotify Connect：* 第三个按钮，点击即可管理 Spotify Connect，与 Spotify 客户端的操作类似。
  - *音量控制：* 控制音量。注意：该功能需要 Spotify Premium 订阅。
  - *全屏：* 点击即可进入 `Lyricify 全屏` 界面，右击可进入 `移动端 UI 全屏` 界面。

### 竖屏样式
当你将窗口缩小为竖屏模式时，Lyricify 会自动调整为 `竖屏样式`，类似于 `Spotify 移动端样式`。
