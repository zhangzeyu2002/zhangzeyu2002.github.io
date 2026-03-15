# 本地工作流指南

## 新的仓库结构

现在你的 `zhangzeyu2002.github.io` 仓库包含了**源代码**和**配置文件**：

```
zhangzeyu2002.github.io/
├── client/                  # React 源代码
│   ├── public/              # 静态文件（头像、favicon）
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx     # 主要内容（修改这个文件）
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── package.json             # 项目配置
├── vite.config.ts           # Vite 构建配置
├── .gitignore               # Git 忽略规则
└── README.md                # 项目说明
```

## 工作流程

### 1️⃣ 克隆仓库到本地

```bash
git clone https://github.com/zhangzeyu2002/zhangzeyu2002.github.io.git
cd zhangzeyu2002.github.io
```

### 2️⃣ 安装依赖

```bash
pnpm install
```

### 3️⃣ 本地开发

```bash
# 启动开发服务器
pnpm dev

# 打开浏览器访问 http://localhost:5173
```

### 4️⃣ 修改内容

编辑 `client/src/pages/Home.tsx` 文件，修改会实时显示在浏览器中。

**常见修改位置：**
- 个人信息：第 85-87 行
- 个人简介：第 99-107 行
- 研究兴趣：第 52-56 行
- 论文列表：第 20-35 行
- 新闻列表：第 37-50 行

### 5️⃣ 修改头像

替换 `client/public/avatar.png` 文件为你的新头像。

### 6️⃣ 本地测试

```bash
# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

### 7️⃣ 推送到 GitHub

```bash
# 查看修改
git status

# 添加所有修改
git add -A

# 提交修改
git commit -m "Update content"

# 推送到 GitHub
git push origin main
```

推送后，网站会自动部署到 `https://zhangzeyu2002.github.io`（通常需要 1-2 分钟）。

## 常用命令速查表

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建项目 |
| `pnpm preview` | 预览构建结果 |
| `git status` | 查看修改状态 |
| `git diff` | 查看具体修改 |
| `git add -A` | 添加所有修改 |
| `git commit -m "message"` | 提交修改 |
| `git push origin main` | 推送到 GitHub |
| `git log` | 查看提交历史 |

## 修改示例

### 添加新论文

在 `client/src/pages/Home.tsx` 的 `publications` 数组中添加：

```typescript
{
  title: "Your Paper Title",
  authors: ["Your Name", "Co-author"],
  venue: "Conference Name",
  year: 2026,
  link: "https://doi.org/..."
}
```

### 添加新闻

在 `news` 数组中添加：

```typescript
{
  date: "Mar 15, 2026",
  content: "Your news content here"
}
```

### 修改研究兴趣

在 `researchInterests` 数组中添加或删除：

```typescript
const researchInterests = [
  "Machine Learning",
  "Computer Vision",
  "New Interest"
];
```

## 遇到问题？

### 问题：`pnpm: command not found`

```bash
npm install -g pnpm
```

### 问题：端口被占用

Vite 会自动使用下一个可用端口，查看终端输出找到正确的地址。

### 问题：修改后没有看到变化

- 检查文件是否保存
- 刷新浏览器（Ctrl+R 或 Cmd+R）
- 检查浏览器控制台是否有错误

### 问题：推送失败

```bash
# 配置 Git 用户名和邮箱
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 再次尝试推送
git push origin main
```

## 完整工作流示例

```bash
# 1. 克隆仓库
git clone https://github.com/zhangzeyu2002/zhangzeyu2002.github.io.git
cd zhangzeyu2002.github.io

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 在编辑器中修改 client/src/pages/Home.tsx
# （在浏览器中实时查看效果）

# 5. 修改完成后，构建项目
pnpm build

# 6. 推送到 GitHub
git add -A
git commit -m "Update personal info and add new paper"
git push origin main

# 7. 等待 1-2 分钟，访问 https://zhangzeyu2002.github.io 查看更新
```

## 下一步

现在你可以完全在本地工作了！只需要：
1. 修改源代码
2. 本地测试
3. `git push` 推送到 GitHub

GitHub 会自动部署你的网站。祝你开发愉快！
