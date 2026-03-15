# 个人主页更新与同步指南

本文档用于说明：
- 如何把本地仓库绑定到你的 GitHub 远程仓库
- 如何修改个人主页信息
- 如何把修改同步到 GitHub，并发布到个人主页

## 1. 当前绑定状态

已在本地仓库中确认：
- 目录：`/workspace/zhangzeyu2002.github.io`
- 当前远程：`origin = https://github.com/zhangzeyu2002/zhangzeyu2002.github.io.git`
- 当前分支：`main`

如果你以后要切换到另一个 GitHub 仓库，执行：

```bash
cd /workspace/zhangzeyu2002.github.io
git remote set-url origin <你的仓库地址>
git remote -v
```

例如（HTTPS）：

```bash
git remote set-url origin https://github.com/<你的用户名>/<你的仓库名>.git
```

例如（SSH）：

```bash
git remote set-url origin git@github.com:<你的用户名>/<你的仓库名>.git
```

## 2. 你最常改的文件

这个站点是 React + Vite 项目，核心信息主要在：

- `client/public/profile.json`
- `client/public/avatar.png`

现在推荐只改 `client/public/profile.json`，常见字段：
- `basic`：姓名、学校、邮箱、GitHub、地址、头像路径、页脚日期
- `about`：个人简介段落（字符串数组）
- `researchInterests`：研究兴趣
- `news`：新闻动态
- `publications`：论文列表

`client/src/pages/Home.tsx` 已改为自动读取该 JSON。你通常不再需要改代码。

头像替换：
- 直接替换 `client/public/avatar.png`
- 保持文件名不变，页面会自动使用新头像

## 3. 本地修改与预览

首次或依赖变化后：

```bash
cd /workspace/zhangzeyu2002.github.io
pnpm install
```

本地开发预览：

```bash
pnpm dev
```

浏览器打开开发地址（通常是 `http://localhost:5173`）。

构建检查：

```bash
pnpm build
```

## 4. 同步到 GitHub 仓库

修改完成后执行：

```bash
cd /workspace/zhangzeyu2002.github.io
git status
git add -A
git commit -m "update homepage content"
git push origin main
```

如果是第一次在这台机器提交，先设置 Git 身份：

```bash
git config user.name "你的名字"
git config user.email "你的邮箱"
```

## 5. 同步到个人主页（GitHub Pages）

本仓库已使用 GitHub Actions 自动部署。流程是：

1. 你推送到 `main`
2. Actions 执行构建
3. 产物部署到 `gh-pages`
4. GitHub Pages 更新网站

你可以在 GitHub 网页查看：
- `Actions` 标签页中的 `build-and-deploy` 工作流
- 仓库 `Settings -> Pages` 是否指向 `gh-pages` 分支

个人主页地址：

```text
https://zhangzeyu2002.github.io
```

通常在 push 后 1-3 分钟生效。

## 6. 常见问题

### 6.1 push 失败（权限问题）

- HTTPS 方式：确认你已登录 GitHub，并使用可用的 Token
- SSH 方式：确认本机 SSH Key 已添加到 GitHub

可用以下命令检查：

```bash
git remote -v
git branch --show-current
```

### 6.2 页面没更新

- 先看 Actions 是否成功
- 再看 Pages 配置是否正确
- 等待缓存刷新 1-3 分钟后再访问

### 6.3 本地能跑，线上报错

- 本地先执行 `pnpm build`
- 确认构建无报错后再 push

## 7. 最短工作流（推荐记住）

```bash
cd /workspace/zhangzeyu2002.github.io
pnpm dev
# 修改 client/public/profile.json 和/或 client/public/avatar.png
pnpm build
git add -A
git commit -m "update homepage"
git push origin main
```

完成后去 `Actions` 看是否成功，然后打开个人主页确认更新。
