# zhangzeyu2002.github.io

个人主页仓库（React + Vite）。

## 目录说明

- `client/`：前端页面源码（个人信息页面主要在这里）
- `server/`：服务端入口与构建相关代码
- `.github/workflows/`：自动部署流程配置
- `docs/`：维护与操作文档

## 常用修改入口

- 页面内容：`client/public/profile.json`
- 头像：`client/public/avatar.png`

## 发布流程

1. 本地修改并测试
2. 推送到 `main`
3. GitHub Actions 自动构建并部署到 GitHub Pages

## 文档入口

- `docs/HOMEPAGE_UPDATE_GUIDE_zh.md`：中文更新与同步指南
- `docs/LOCAL_WORKFLOW.md`：本地开发工作流
- `docs/GITHUB_ACTIONS_SETUP.md`：GitHub Actions 与 Pages 配置说明
