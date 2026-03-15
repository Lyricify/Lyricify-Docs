---
title: 配置文件迁移
description: 配置文件迁移。
---

如果你原先在另一台设备上使用 Lyricify 4，现在想要将配置文件迁移至新的设备，则可通过以下方法实现。

### 从源设备上获取配置文件
如果你使用的是非商店版（即普通安装版或绿色版），或是在使用商店版之前曾在这台设备上使用过非商店版，则可以在以下路径中找到 Lyricify 4 的配置文件：  
```
%AppData%\Lyricify\Lyricify for Spotify
```
如果你一直使用的是商店版，则可以在以下路径中找到 Lyricify 4 的配置文件：  
```
%LocalAppData%\Packages\63265WXRIW.Lyricify_8ybqz4qm5hwha\LocalCache\Roaming\Lyricify\Lyricify for Spotify
```
如果你使用的是便携版，则可以在以下路径中找到 Lyricify 4 的配置文件：  
```
\Data
```
### 将文件复制到目标设备
如果你想在目标设备上使用非商店版，你可以直接将配置文件复制到以下路径：  
```
%AppData%\Lyricify\Lyricify for Spotify
```
如果你想在目标设备上使用商店版，且在复制前没有在目标设备上运行过 Lyricify 4 商店版，则可以将配置文件复制到上方路径。你也可以将配置文件复制到以下路径（如果在复制前曾运行过 Lyricify 4 商店版，则必须将配置文件复制到以下路径）：  
```
%LocalAppData%\Packages\63265WXRIW.Lyricify_8ybqz4qm5hwha\LocalCache\Roaming\Lyricify\Lyricify for Spotify
```
### 应当复制哪些文件
条件允许的情况下，建议复制配置文件路径下的全部文件及文件夹至目标设备路径。  
如果你想在迁移配置文件的同时，丢弃日志文件、缓存文件及自动备份文件，则可以仅复制以下文件或文件夹：  
```
Custom          // 自定义配置 (自定义配置管理器中加载的相关配置)
Local           // 本地文件配置 (本地文件管理器中本地曲目的图片关联配置)
Pins            // 快捷访问配置 (Lyricify 主界面左侧快捷访问区的相关配置)
Account.json    // 账户信息
HotKey.json     // 热键配置
Settings.json   // 设置文件
```
