---
title: 启动 Lyricify 时提示错误
---

启动 Lyricify 时提示超时或 HTTP 错误，并自动关闭。

### 导致原因

网络、代理、系统时间或证书校验等问题都可能导致连接 Spotify 服务器失败。与 Lyricify 无关。

### 解决方案

如果提示 `The SSL connection could not be established, see inner exception.` 或 `SSL 连接无法被建立。`，可参考[登录 Spotify 时出现 SSL 连接错误](../spotify-ssl-error/)中的排查步骤。

尝试更换网络，或切换代理节点后重试。使用代理时，请在代理工具中检查以下两个域名的分流规则和连接记录：

```text
accounts.spotify.com
api.spotify.com
```

如果你在中国大陆地区，且没有使用代理，则可以尝试开启代理后再试。  

Lyricify 可以保证的是，Lyricify 本身没有问题，本问题为用户侧网络或系统环境问题。

:::caution[注意]
对于以下报错内容：
> 出了一些问题，请检查你的互联网连接或联系开发者  
> Lyricify 将被关闭

如果你使用的是 4.3.48 或更早的版本，配置了自定义 API Client，且当前账号没有 Spotify Premium 订阅，可参考：[非 Spotify Premium 用户启动 Lyricify 4 时报错](../non-premium-custom-client/)。
:::
