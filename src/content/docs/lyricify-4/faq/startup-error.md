---
title: 启动 Lyricify 时提示错误
description: 启动 Lyricify 时提示错误。
---

启动 Lyricify 时提示出错（超时错误或 Http 错误），并自动关闭。

### 导致原因
网络连接状态不好，导致无法连接到 Spotify 服务器。与 Lyricify 无关。 
### 解决方案
更换网络环境，如果你在使用代理，可尝试更换节点或服务提供商。  
请确保在你的网络下，这两个 Spotify 域名可以 Ping 连通：  
```
accounts.spotify.com
api.spotify.com
```
如果可以连通，但仍然无法启动 Lyricify，请继续更换你的网络连接或服务提供商，直到可以连通为止。  
如果你在中国大陆地区，且没有使用代理，则可以尝试开启代理后再试。  
Lyricify 可以保证的是，Lyricify 本身没有问题，本问题为用户侧网络问题。
