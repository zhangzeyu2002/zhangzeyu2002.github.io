# GitHub Actions 自动部署配置

由于 GitHub App 权限限制，你需要手动在 GitHub 网页上创建 workflow 文件。按照以下步骤操作：

## 步骤 1：打开 GitHub 仓库

访问：https://github.com/zhangzeyu2002/zhangzeyu2002.github.io

## 步骤 2：创建 Workflow 文件

1. 点击 **"Add file"** → **"Create new file"**
2. 文件路径输入：`.github/workflows/build-and-deploy.yml`
3. 复制以下内容到编辑框：

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build project
        run: pnpm build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

4. 点击 **"Commit changes"**
5. 输入提交信息：`Add GitHub Actions workflow for auto-deployment`
6. 点击 **"Commit"**

## 步骤 3：配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. 在 **Source** 部分，选择：
   - **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
3. 点击 **Save**

## 步骤 4：验证部署

1. 回到仓库主页
2. 点击 **Actions** 标签
3. 查看 workflow 是否在运行
4. 等待构建完成（通常 1-2 分钟）
5. 访问 `https://zhangzeyu2002.github.io` 查看网站

## 工作流说明

现在你的工作流是：

```
修改源代码
    ↓
git push origin main
    ↓
GitHub Actions 自动构建
    ↓
部署到 gh-pages 分支
    ↓
GitHub Pages 自动更新网站
```

## 后续工作

完成配置后，你只需要：

```bash
# 在本地修改代码
# 然后推送
git add -A
git commit -m "Update content"
git push origin main

# GitHub Actions 会自动构建和部署
# 1-2 分钟后访问网站查看更新
```

## 如果遇到问题

### 问题 1：Workflow 没有运行

- 检查 `.github/workflows/build-and-deploy.yml` 文件是否存在
- 查看 **Actions** 标签中是否有错误日志

### 问题 2：部署失败

- 查看 **Actions** 中的构建日志
- 确保 `pnpm build` 命令能成功运行

### 问题 3：网站还是显示 README

- 检查 GitHub Pages 配置是否指向 `gh-pages` 分支
- 等待 1-2 分钟让 GitHub Pages 重新部署

## 需要帮助？

如果你遇到任何问题，可以：
1. 查看 GitHub Actions 的构建日志
2. 检查 GitHub Pages 的配置
3. 告诉我错误信息，我会帮你解决
