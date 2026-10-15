---
title: 登录 Spotify 时出现 SSL 连接错误
description: Spotify 登录或启动时出现 SSL 连接错误的排查方法。
---

登录 Spotify、手动授权或启动 Lyricify 时，如果出现以下提示，可按本页步骤排查：

```text
The SSL connection could not be established, see inner exception.
SSL 连接无法被建立。
```

网络或代理异常、系统时间不正确、证书校验失败等，都可能导致这类错误。

## 先检查网络和系统设置

1. **更换网络或代理节点。** 使用代理时，先换一个节点重试；也可以换用手机热点，检查是否与当前网络有关。
2. **检查代理配置。** 确认代理程序正在运行，Windows 系统代理的地址、端口与代理软件一致，并检查 `accounts.spotify.com` 和 `api.spotify.com` 的分流规则。浏览器代理插件通常只作用于浏览器。
3. **同步系统时间。** 在 Windows 设置中检查日期、时间和时区，并同步时间后重试。
4. **检查 HTTPS 扫描或解密。** 如果代理软件或安全软件开启了这些功能，可临时关闭该功能后重试，测试后恢复设置。公司网络可联系管理员检查。

## 仍然无法登录时

更新 Lyricify 后重新尝试登录，再查看出错时间附近的日志。能进入主界面时，在 `设置` → `高级` → `日志` 中点击 `打开`。

如果无法进入主界面，可参考[配置文件迁移](../config-migration/)找到配置文件夹，打开其中的 `Logs\Log.txt`。便携版的日志位于便携包中的 `Data\Logs\Log.txt`。

## 日志提示 TLS 或证书错误时

- **协议版本或加密算法协商失败：** 更新 Windows 和代理软件。如果曾手动修改 TLS 设置，可撤销这些修改后重试。
- **证书过期或域名不匹配：** 检查系统时间，以及代理或安全软件的 HTTPS 扫描、解密功能。
- **根证书不受信任（`UntrustedRoot`）：** 检查 Windows 根证书自动更新是否被禁用。如果曾通过系统优化工具关闭此功能，请在该工具中重新启用；组织管理的设备可联系管理员处理。可参见 [Microsoft 的证书更新说明](https://learn.microsoft.com/en-us/windows-server/identity/ad-cs/certificate-trust)。
- **证书链不完整（`PartialChain`）：** 尝试更换网络或代理节点，以便 Windows 下载所需的中间证书。
- **吊销状态检查失败：** 检查证书中列出的吊销信息查询地址能否访问，可切换网络或代理节点后重试。

### 补充缺失的根证书

如果已确认 Windows 缺少 Spotify 证书链所需的 `Certainly Root R1`，可按以下步骤安装：

1. 从 [Certainly 官方证书库](https://www.certainly.com/repository/index.html)的 `Root CA Certificates` 部分下载 `Certainly Root R1`，文件名为 `Certainly_Root_R1.pem`。
2. 以管理员身份打开 PowerShell，切换到下载目录后执行：

   ```powershell
   certutil -addstore Root ".\Certainly_Root_R1.pem"
   ```

3. 完全退出 Lyricify，再重新打开并登录 Spotify。

注意：下载并导入的是根证书，不要将站点证书或中间证书导入“受信任的根证书颁发机构”存储。

