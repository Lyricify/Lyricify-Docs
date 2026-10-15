---
title: 授权成功后无反应或手动授权失败
---

浏览器提示授权成功后，Lyricify 没有继续登录，或通过左下角 `登录时遇到问题？` → `手动输入授权回调链接` 进行手动授权时提示出错。

### 导致原因

浏览器授权完成后，Lyricify 还需要连接 Spotify 服务器完成登录。网络、代理或证书校验错误可能使登录失败。与 Lyricify 无关。

### 解决方案

如果提示 `The SSL connection could not be established, see inner exception.` 或 `SSL 连接无法被建立。`，可参考[登录 Spotify 时出现 SSL 连接错误](../spotify-ssl-error/)中的排查步骤。

尝试更换网络，或切换代理节点后重试。使用代理时，请在代理工具中检查以下两个域名的分流规则和连接记录：

```text
accounts.spotify.com
api.spotify.com
```

如果你在中国大陆地区，且没有使用代理，则可以尝试开启代理后再试。  

Lyricify 可以保证的是，Lyricify 本身没有问题，本问题为用户侧网络或系统环境问题。
