# 思维小岛

思维小岛是一个面向一年级孩子的开源数学思维锻炼项目。它借鉴 Duolingo 式短关卡、即时反馈、连续学习和经验值机制，让孩子在轻量练习里建立数感、规律观察、比较推理、应用题理解和空间意识。

项目地址：<https://github.com/FreeWindTyler/thinking-island>

在线演示：<https://freewindtyler.github.io/thinking-island/>

当前版本是无需安装依赖的静态 Web 应用，适合作为家庭、老师和社区教育者自托管或二次开发的第一版。

## 功能

- 5 个思维关卡：数感热身、规律侦探、比较高手、故事算一算、空间观察
- 每关 5 道一年级友好的题目
- 即时反馈和解题说明
- 错题复习模式，答错题目只保存在本机浏览器中
- 颜色和图形提示会自动渲染成更直观的视觉 token
- 经验值、星星、连续天数
- 本地浏览器保存学习进度
- 适配桌面和手机屏幕

## 本地运行

直接用浏览器打开 `index.html` 即可。

也可以安装 Node.js 后运行项目自带的本地静态服务：

```powershell
npm run serve
```

然后访问 `http://localhost:8080`。

项目当前没有外部运行依赖；检查、测试和本地预览都只需要 Node.js。

## 检查项目

```powershell
npm run check
```

这个命令会检查 JavaScript 语法、文本完整性和题库结构，例如每道题是否有题干、选项、正确答案和解释。它也会做基础内容质量检查，例如题干长度、选项数量、空白视觉提示、重复选项和题目 ID 唯一性。

```powershell
npm test
```

这个命令会模拟核心学习流程，确认答错题目会进入本地错题记录，并且复习答对后会从错题中清除。

如果 Windows PowerShell 拦截 `npm.ps1`，可以改用：

```powershell
npm.cmd run check
npm.cmd test
```

发布或申请前还可以运行：

```powershell
npm run release:audit
npm run application:preflight
```

## 题库维护

题库位于 `data/lessons.js`。每道题需要包含：

- `id`：稳定题目标识，使用小写英文 slug，并在同一关卡内唯一
- `type`：题目类型
- `prompt`：孩子看到的题干
- `visual`：辅助观察的短提示
- `choices`：可选答案
- `answer`：正确答案，必须存在于 `choices`
- `explain`：答题后的解释

为了保护低年级孩子的阅读体验，题干、解释、选项和视觉提示都有长度限制。修改题库后请运行 `npm run check`。

如果你想贡献新题目，建议先阅读 [题目作者指南](docs/QUESTION_AUTHOR_GUIDE.md)。

## 项目原则

- 儿童隐私优先：默认不登录、不上传学习数据
- 低压力学习：不用排名、惩罚或失败羞辱
- 思维优先：不只训练机械计算
- 开源可扩展：题库、功能和学习报告都应方便社区维护

## 后续方向

见 [ROADMAP.md](ROADMAP.md)。

## 参与贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)。

如果你需要反馈问题或了解支持范围，见 [SUPPORT.md](SUPPORT.md)。

项目治理规则见 [GOVERNANCE.md](GOVERNANCE.md)。

## 开源协议

本项目使用 MIT License。
