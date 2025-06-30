# 🧠 Personal Knowledge Base (Notion-like)

A full-stack notes app inspired by Notion — featuring a clean UI, markdown-style notes, and support for tagging, searching, and dark mode. Built with Angular, Express, and SQLite.

---

## 🚀 Live Demo

**Frontend:** [View on GitHub Pages](https://apmquiros.github.io/my-notes-app/)  
**Backend API:** [View API Root](https://my-notes-app.up.railway.app/api/notes)

---

## 🩺 API Health
[Check Health](https://my-notes-app.up.railway.app/api/health)

---

## 🚀 Features

- ✅ Create, edit, and delete notes
- 🏷️ Tag-based filtering
- 🔍 Real-time search
- 🌙 Light/Dark theme toggle
- 💾 Persistent filters via localStorage
- 💡 Built with Angular Standalone APIs
- 📦 No database setup needed — uses SQLite

---

## 🧱 Tech Stack

| Frontend   | Backend       | Database | Styling    |
|------------|---------------|----------|------------|
| Angular 17 | Express.js    | SQLite3  | SCSS + CSS |

---

## 📁 Project Structure

my-notes-app/
├── client/ # Angular frontend
├── server/ # Express backend with SQLite
├── .gitignore
├── README.md

---

## 🔧 Setup Instructions

### 1. Clone the repo
```
git clone https://github.com/your-username/my-notes-app.git
cd my-notes-app
```
### 2. Install backend (Express + SQLite)
```
cd server
npm install
node server.js

Server runs at: http://localhost:3000
```
### 3. Install frontend (Angular)
```
cd ../client
npm install
ng serve

Frontend runs at: http://localhost:4200
```

---

## 🛠️ Future Enhancements
 - Markdown support
 - Rich text editor (Quill.js or Angular Material)
 - Auth (Login/Register)
 - Sync with cloud storage (optional)

---

## 📄 License
MIT — feel free to use and adapt this project.

---

## 🙌 Credits
Made by apmquiros
Inspired by Notion, Obsidian, and Bear Notes.
