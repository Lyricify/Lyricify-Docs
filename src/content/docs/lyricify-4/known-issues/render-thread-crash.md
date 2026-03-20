---
title: 程序渲染线程崩溃
---

整个界面假死或纯白，画面完全不动，但是实际上可以操作（比如调整窗口大小，鼠标点击有反应，鼠标指针在不同地方不一样之类的反馈）。

日志中记录为 `System.Runtime.InteropServices.COMException: UCEERR_RENDERTHREADFAILURE` 或 `System.OutOfMemoryException: Insufficient memory to continue the execution of the program.`。  
该问题发现于 2022 年 12 月下旬，已于 2023 年 4 月初修复，并于 2023 年 5 月随 Lyricify 4.1 发布修复。
### 导致原因
~~未知。目前没有找到具体原因。可能是 WPF 本身的问题，也可能是 Media Session 导致的问题，还怀疑是 Windows 11 Mica 材质的问题。~~  
因为 32 位应用的可用内存较少，故容易在部分系统中崩溃。
### 解决方案
~~重新打开 Lyricify。~~  
使用 Lyricify 4.1 或更新版本的 64 位版本。
