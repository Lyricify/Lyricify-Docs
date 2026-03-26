---
title: 非 Spotify Premium 用户启动 Lyricify 4 时报错
---

如果你在启动 Lyricify 4 时看到以下提示：

> 出了一些问题，请检查你的互联网连接或联系开发者  
> Lyricify 将被关闭

并且你之前配置过自定义 API Client，那么常见原因是当前账号没有 Spotify Premium 订阅。

可按以下三种方式处理。

### 方案一：订阅 Spotify Premium

订阅后无需额外操作，重新启动 Lyricify 即可继续使用之前配置好的自定义 API Client。

### 方案二：改用公共 Client

这种方式需要删除当前登录信息，然后重新完成登录授权。

#### 删除登录信息

如果你使用的是非商店版（普通安装版或绿色版），或者在使用商店版之前曾在这台设备上使用过非商店版，可在以下路径找到 Lyricify 4 的配置文件：

```text
%AppData%\Lyricify\Lyricify for Spotify
```

如果你一直使用的是商店版，则配置文件位于：

```text
%LocalAppData%\Packages\63265WXRIW.Lyricify_8ybqz4qm5hwha\LocalCache\Roaming\Lyricify\Lyricify for Spotify
```

:::tip[如何打开这些路径]
可以先复制上面的路径，然后任选以下方式之一打开：

- 在文件资源管理器地址栏中粘贴路径并回车
- 按 `Win + R`，粘贴路径后回车
:::

打开对应文件夹后，删除 `Account.json`，然后重新启动 Lyricify 并完成登录授权。

**注意：** 重新登录后，不要再次配置自定义 API Client。

### 方案三：使用他人的 Client 信息

如果你的朋友订阅了 Spotify Premium，也可以使用对方账户下创建的 Client。一个 Client 最多可供 5 位用户使用。

你需要让对方在 Spotify Developer Dashboard 中将你的 Spotify 账户添加到允许名单，然后在自己的 Lyricify 中填入对方提供的 Client 信息。

具体操作步骤后续会在使用指南中补充。
