---
title: 常见问题
description: Lyricify Lite 常见问题。
---

**注意：** 如需反馈或提问，对于 Lyricify 功能，请使用[官方认定的正确的名称](/lyricify-lite/appendix/)来描述。

## Microsoft Store 版本与 GitHub 版本有什么区别
*注：下文中的 GitHub 版本指 Microsoft Store 版本外的其他分发方式分发的版本，含群聊、网盘等分发渠道。*
### 主要区别
1. 发布新版本时，Microsoft Store 版本通常会提前 1-3 天更新，您可以提前体验新功能。
2. Microsoft Store 版本的自动更新由 Microsoft 负责和管理，体验更好。
   GitHub 版本的更新由 Lyricify 负责，更新源为 GitHub 服务器，在部分地区体验不如 Microsoft Store 版本。
3. 部分功能为 Microsoft Store 版本独享功能。

### Microsoft Store 独享功能
为了提升用户体验，促进开发良性循环，部分功能是作为 Microsoft Store 独享功能开发的。  
目前 Microsoft Store 版本有以下独享功能：
1. 灵动词岛的自定义字体功能。
2. 桌面歌词的自定义字体功能。
3. 任务栏歌词的自定义字体功能。
4. 独享中国大陆加速服务器。
5. 其他歌词界面的自定义字体功能。
  
在 Microsoft Store 购买 Lyricify 是对 Lyricify 开发者的一种支持和信任，感谢所有购买或打赏过 Lyricify 的用户！也欢迎各位用户给出 5 星好评和评语，这对我有很大帮助！  

### 更多信息
Lyricify Lite 是免费软件，仅部分个性化设置为商店版独享。如果你觉得 Lyricify Lite 做的不错，则可以通过以下渠道支持：
- 在软件中，菜单-关于页里有打赏方式
- 在 [Microsoft Store](https://apps.microsoft.com/store/detail/9NLTPSV395K2?launch=true&mode=full) 中购买

如果您在 Microsoft Store 购买过程中遇到困难，可以考虑通过打赏的方式支持 Lyricify。  

如果你发现有人在非法销售本软件 (只有 Microsoft Store 中的 Lyricify 是官方发布)，请联系我们！感谢你的支持！

## Self-contained 版本特殊说明
Self-contained 版本包含 .NET 8.0 Desktop Runtime 运行时，仅建议那些因某些原因无法正常安装 .NET 8.0 运行时的用户使用。其他用户建议选择 Microsoft Store 版本或标准安装版（即不包含 .NET 运行时的版本）。  
请注意：Self-contained 版本不支持自动更新。在发布新版本后，用户需要手动下载并安装更新。Lyricify 默认开启自动更新，尽管 self-contained 版本仍会尝试下载并安装更新，但由于更新内容为标准版本，即不包含 .NET 运行时，更新后 Lyricify 应用将无法启动。  

## 无法检测到播放器
Lyricify Lite 无法检测到你正在使用的音乐软件的播放状态。
### 导致原因
你使用的软件可能并不支持 SMTC，或是没有正确配置 SMTC。
### 解决方案
如果你使用的软件在 [App 支持列表](/lyricify-lite/guide/) 中列出，请查看[逐应用常见问题](/lyricify-lite/app-faq/)。

## Microsoft Store 版创建快捷方式
1. 打开 `开始菜单`，点击右上角的 `所有应用`。
2. 找到 `Lyricify Lite`，按住拖动到想要创建快捷方式的地方即可完成创建。

## 桌面歌词 或 灵动词岛 异常消失
打开 `桌面歌词` 或 `灵动词岛` 后，闪一下就消失了，或是在最小化所有窗口后消失。
### 导致原因
有全屏窗口处于前台。
### 解决方案
想办法关闭该全屏窗口 (如动态壁纸等)，或在设置中关闭 `全屏隐藏` 选项。

## 桌面歌词如何调整字号
纵向调整桌面歌词大小即可调整字号。

## 使用 OBS 捕获桌面歌词
因为这个功能的特殊性，所以没有在 `设置` 页面中提供修改选项，目前需要手动修改配置文件。
打开 `设置`，找到 `高级` `设置文件` `打开`，然后找到 `enable_obs_capture` 属性 (在 187 行附近)，将 `false` 修改为 `true` 后保存文件，然后点击 `加载` 即可。

## 自定义字体
Lyricify Lite 有着强大的自定义字体功能，您可以为 `灵动词岛` 和 `桌面歌词` 设置自定义字体。
如果您想要自定义字体，则可以通过以下步骤实现：
1. 设置中找到对应界面的 `字体家族` 设置，点击 `自定义` 按钮。
2. 这时会打开 `字体选择工具` 窗口，左侧为已安装字体列表，右侧为自定义字体列表。
3. 在左侧找到你想设置的字体，选中后点击 `添加到列表` 或直接双击该字体，即可添加至右侧自定义字体列表。
4. 点击确定即可保存。在保存之前，您可以在 `预览` 文本框中测试自定义字体效果。
5. 如果您想为中西文设置不同字体，可以自行了解 `字体回退机制`，Lyricify Lite 自带的 `字体选择工具` 支持 `字体回退 (Font Fallback)`。

**如果您想使用某字体的加粗版本，您可以这样设置：**  
1. 首先在 `字体选择工具` 中设置好字体（步骤在上方）。
2. 点击 `设置` 窗口 `高级` 页 `设置文件` 的 `打开` 按钮。
3. 在打开的文件中找到对应的字体配置。
   - 桌面歌词: `desktop_lyrics` `font_family`
4. 修改字体名，在字体名后加上 ` Bold`，如 `Microsoft YaHei` 修改后为 `Microsoft YaHei Bold`。

**注意：**  
1. 并非所有字体都支持这种修改为加粗版本的方式。
2. 如果有不理解的地方，您可以自行搜索和学习 `JSON 文件` 的相关知识。

## 自动更新
Lyricify Lite 支持自动更新，其策略如下。
### Microsoft Store 版本
Microsoft Store 版本的自动更新由 Microsoft 负责。  
Lyricify Lite 的默认策略是在启动时自动检查更新，有更新时会请求 Microsoft Store 进行静默更新，并在用户关闭 Lyricify Lite 或重启后完成更新。  
你可以在 Lyricify Lite 的设置中修改该策略。
### 非 Microsoft Store 版本 (GitHub 版本)
非 Microsoft Store 版本的自动更新由 Lyricify Lite 负责。  
Lyricify Lite 会在启动时自动检查更新，有更新时会立即下载更新并完成安装，更新过程会自动重启 Lyricify Lite。  
Lyricify Lite 默认开启自动更新，你可以在设置中修改该策略以停用普通更新。需要注意的是，版本过低时的强制更新不受该设置影响。

## 配置文件迁移
如果你原先在另一台设备上使用 Lyricify Lite，现在想要将配置文件迁移至新的设备，则可通过以下方法实现。
### 从源设备上获取配置文件
如果你使用的是非商店版（即普通安装版或绿色版），或是在使用商店版之前曾在这台设备上使用过非商店版，则可以在以下路径中找到 Lyricify Lite 的配置文件：  
```
%AppData%\Lyricify\Lyricify Lite
```
如果你一直使用的是商店版，则可以在以下路径中找到 Lyricify Lite 的配置文件：  
```
%LocalAppData%\Packages\63265WXRIW.193470E81A0DE_8ybqz4qm5hwha\LocalCache\Roaming\Lyricify\Lyricify Lite
```
如果你使用的是便携版，则可以在以下路径中找到 Lyricify Lite 的配置文件：  
```
\Data
```
### 将文件复制到目标设备
如果你想在目标设备上使用非商店版，你可以直接将配置文件复制到以下路径：  
```
%AppData%\Lyricify\Lyricify Lite
```
如果你想在目标设备上使用商店版，且在复制前没有在目标设备上运行过 Lyricify Lite 商店版，则可以将配置文件复制到上方路径。你也可以将配置文件复制到以下路径（如果在复制前曾运行过 Lyricify Lite 商店版，则必须将配置文件复制到以下路径）：  
```
%LocalAppData%\Packages\63265WXRIW.193470E81A0DE_8ybqz4qm5hwha\LocalCache\Roaming\Lyricify\Lyricify Lite
```
### 应当复制哪些文件
条件允许的情况下，建议复制配置文件路径下的全部文件及文件夹至目标设备路径。  
如果你想在迁移配置文件的同时，丢弃日志文件及缓存文件，则可以仅复制以下文件或文件夹：  
```
Settings.json   // 设置文件
```
