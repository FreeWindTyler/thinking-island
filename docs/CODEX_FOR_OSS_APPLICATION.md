# Codex for Open Source 申请准备

官方申请入口： https://openai.com/form/codex-for-oss/

项目仓库： https://github.com/FreeWindTyler/thinking-island

## 官方关注点

- 申请人应是活跃开源项目的 primary 或 core maintainer
- 仓库和 GitHub 个人资料需要公开
- OpenAI 会看仓库使用量、生态重要性、活跃维护证据、维护者角色或权限
- 入选不保证，OpenAI 可能要求验证身份、维护者身份或仓库控制权

## 申请前检查清单

- [ ] GitHub 个人资料设为公开
- [x] 仓库设为公开
- [x] README 说明项目目标、运行方式和路线图
- [x] 有 MIT License
- [x] 有 CONTRIBUTING.md
- [x] 有 SUPPORT.md
- [x] 有 GOVERNANCE.md
- [x] 有 ROADMAP.md
- [x] 有 SECURITY.md
- [x] 有 CHANGELOG.md
- [x] 有 CODEOWNERS 标记 primary maintainer
- [x] 有 GitHub issue templates 和 PR template
- [x] 有自动化检查脚本和 GitHub Actions workflow
- [x] 有错题复习核心流程自动化测试
- [x] 有 GitHub Pages 自动部署 workflow
- [x] 题库已拆分到独立数据文件，方便社区维护
- [x] 本地开发和 CI 不依赖额外 npm 包
- [x] 有更严格的题库质量校验规则
- [x] 有 v0.1.0 release audit 和发布说明草稿
- [x] 有 GitHub 网页上传指南和申请证据包
- [x] 有公开发布运行手册和申请预检脚本
- [x] 每道题已有稳定 ID，支持错题复习和学习报告演进
- [x] 已实现本地错题复习模式
- [x] 已增强颜色和图形题目的视觉提示
- [x] 有题目作者指南，方便家长、老师和贡献者扩展题库
- [x] 有首批 issue 草稿和短期维护计划
- [ ] 至少发布一个可访问的在线演示页面
- [ ] 至少有几个真实 issue 或 PR，体现维护活动
- [ ] 至少发布 v0.1.0 release
- [ ] 准备 OpenAI Organization ID

## 当前项目的现实判断

这个项目目前是早期原型，教育目标清晰，已经有公开仓库和基本维护文件。它仍然缺少公开使用量、社区贡献、issue/PR 维护记录、在线演示和 release 记录。可以申请，但更强的策略是先公开维护一段时间，形成可验证证据后再提交。

## 表单字段草稿

### Describe your role

Primary maintainer. I created and maintain the project, own the repository, review changes, manage releases, define the roadmap, and ensure the content remains safe, age-appropriate, and useful for elementary math thinking practice, with the current route focused on grade 1 foundations and grades 1-3 expansion.

### Why does this repository qualify?

Thinking Island is an open-source elementary math-thinking practice tool, designed for families, teachers, and community educators who need a free, self-hostable learning app. It currently focuses on grade 1 foundations while preparing for grades 1-3 expansion across number sense, patterns, comparison, word-problem modeling, and spatial reasoning, with child-safe UX and privacy-first local progress storage.

### How will you use API credits for your project?

API credits would support maintainer workflows: generating and reviewing age-appropriate exercise drafts, checking explanations for clarity and safety, automating PR review for question data quality, creating release notes, and building optional teacher-facing tools while keeping child data private and human-reviewed.

### Anything else we should know?

The project is early but intentionally open, privacy-first, and education-focused. The goal is to build a community-maintained, free alternative for short daily math thinking practice, especially for parents and teachers who want lightweight learning without advertising, tracking, or paid content gates.

## 需要你提供的信息

- First name
- Last name
- ChatGPT account email
- GitHub username
- Public GitHub repository URL: https://github.com/FreeWindTyler/thinking-island
- OpenAI Organization ID
