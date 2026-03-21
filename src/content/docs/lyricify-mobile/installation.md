---
title: 安装与登录
description: Lyricify Mobile 的安装与登录说明。
---

# 安装 Lyricify Mobile
你可以在 Android、iPhone、iPad、Mac、Windows 设备上安装和使用 Lyricify Mobile。

## 在 Android 设备上安装
下载 `.apk` 安装包，打开后点击安装即可。  

## 在 iPhone 或 iPad 上安装
目前 Lyricify Mobile 并未上架 App Store，具体原因可参见[iOS 版是否会上架 App Store](../faq/ios-app-store/)。  
你可以在下载 `.ipa` 安装包后，采用自签的方式安装，具体步骤可参见 [Apple 设备自签教程](../ios-ipa-guide/)。   

## 在 Mac 上安装
直接下载 `macOS.pkg` 安装即可。（推荐）  
你也可以下载 `.macOS.zip`，将压缩包中的 Lyricify Mobile for macOS.app 拖入 `应用程序` 文件夹，即可完成安装。  

## 在 Windows 上使用
Lyricify Mobile for Windows 为测试性质，不建议日常使用，建议使用具有完整功能的 Lyricify 4。  
Lyricify Mobile for Windows 下载 `.Windows.zip` 后，解压后运行 `Lyricify Mobile.WPF.exe` 即可。

# 使用 Lyricify Mobile
在正式开始使用 Lyricify Mobile 前，你需要在 Lyricify Mobile 中完成 Spotify 账户的登录授权。  
对于大部分设备，直接在弹出的登录网页中完成登录即可。对于部分设备，可能需要额外的配置。

## 在 Mac 设备上完成登录
Lyricify Mobile for macOS 仅支持 `内嵌网页登录`，如果你在直接登录的过程中遇到问题，可尝试借助其他平台的设备辅助完成登录。  
目前可借助其他平台的设备通过以下方法完成授权。

### 借助 Windows 设备
你可以借助 Windows 设备完成 Lyricify Mobile for macOS 的登录授权。具体步骤如下。
1. 在 Windows 设备上安装 Lyricify 4 并完成登录授权。
2. 打开 Lyricify 4 主菜单（左上角 `···`），找到 `高级`，点击 `复制 Refresh Token`。
3. 此时授权信息已复制到你的 Windows 剪切板中，你可以通过其他软件将此信息传递到你的 Mac 设备。
4. 在 Mac 设备上打开 Lyricify Mobile for macOS，点击左上角 `返回` 按钮，这时你能看到 3 个文本框，请在第 3 个（Spotify Refresh Token）中粘贴授权信息。
5. 点击 `继续` 按钮，即可完成登录授权。

### 借助 iPhone、iPad 或 Android 设备
你可以借助 iPhone、iPad 或 Android 设备完成 Lyricify Mobile for macOS 的登录授权。具体步骤如下。
1. 在 iPhone、iPad 或 Android 设备上安装 Lyricify Mobile 并完成登录授权后，关闭 Lyricify Mobile。
2. 打开 Lyricify Mobile，出现 `登录中` 页面时，点击下方的 `取消` 按钮，此时你能看到 3 个文本框。
3. 在 Mac 设备上打开 Lyricify Mobile for macOS，点击左上角 `返回` 按钮，这时你能看到相同的 3 个文本框。
4. 将 iPhone、iPad 或 Android 设备上文本框中的内容一一对应地复制到 Mac 设备上。
5. 点击 `继续` 按钮，即可完成登录授权。

## 在 Windows 设备上完成登录
Lyricify Mobile for Windows 不支持网页登录，需要手动输入 Token。类似情况下，可参见[在 Mac 设备上完成登录](#在-mac-设备上完成登录)。

## 登录中可能遇到的常见问题

### 无法登录
红框提示：糟糕！出了点问题。

#### 导致原因
网络问题。

#### 解决方案
科学上网。

### 登录时提示 INVALID_CLIENT: Invalid Redirect URI
检查你的 Redirect URI 是否正确填写。确保[自定义 Spotify API Client 配置教程](./custom-api-client/)中的两条 Redirect URI 均已正确填写。  
请确保你使用的是 1.5.0 或更新版本的 Lyricify Mobile，且使用的是 `跳转浏览器登录`。由于 Spotify 的调整，`内嵌网页登录` 仅在 1.5.1 或更新版本的 Lyricify Mobile 上支持。

### 无法正常进入歌词界面
**提示 connection closed：** 检查你的网络  
**提示 invalid_grant：** 重新登录
