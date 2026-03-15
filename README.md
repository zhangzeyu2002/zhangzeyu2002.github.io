# Zeyu Zhang's Personal Homepage

A modern personal academic homepage built with React 19, Tailwind CSS 4, and deployed on GitHub Pages.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Build for production
pnpm build

# Preview the build
pnpm preview
```

## 📝 Editing Content

All content is in `client/src/pages/Home.tsx`:

- **Personal Info**: Lines 85-87 (name, school, email)
- **Bio**: Lines 99-107
- **Research Interests**: Lines 52-56
- **Publications**: Lines 20-35
- **News**: Lines 37-50

## 🖼️ Changing Avatar

Replace `client/public/avatar.png` with your new avatar image.

## 🚢 Deployment

Push to GitHub to automatically deploy:

```bash
git add -A
git commit -m "Update content"
git push origin main
```

GitHub Actions will automatically build and deploy to GitHub Pages.

## 📁 Project Structure

```
client/
├── public/              # Static files (favicon, avatar)
├── src/
│   ├── pages/
│   │   └── Home.tsx     # Main content (edit this)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── index.html

server/                 # Backend (not used)
shared/                 # Shared code (not used)
```

## 🛠️ Tech Stack

- React 19
- Tailwind CSS 4
- Vite
- TypeScript
- GitHub Pages

## 📄 License

MIT
