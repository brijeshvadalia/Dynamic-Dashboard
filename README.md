# 📈 Portfolio Dashboard

A full-stack **Portfolio Dashboard** that displays stock information, current market prices (CMP), P/E ratios, sector summaries, and visual charts using **Next.js**, **Node.js**, **Redis caching**, and **WebSockets** for real-time updates.

---

## 🚀 Features

- Real-time stock data updates via WebSockets.
- Sector-wise investment summary.
- Interactive charts with **Recharts**.
- Redis caching for performance optimization.
- Clean UI styled with **Tailwind CSS**.
- Modular and scalable TypeScript codebase.

---

## 📦 Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS, Recharts
- **Backend:** Express.js, TypeScript, Socket.IO
- **Cache:** Redis (Cloud / Local)
- **Data Source:** Yahoo Finance API, Google Finance (P/E, earnings)
- **State Management:** React Hooks
- **Visualization:** Recharts
- **WebSockets:** Socket.IO for live data sync

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js >= 18.x
- Redis Cloud or local Redis
- npm or yarn

### Clone the repository

```bash
git clone url
cd folder name
Enter your redis url in server .env file
```
# Install dependencies

- Install server dependencies
```cd server
npm install
npm start
```
- Install client dependencies
```cd ../client
npm install
npm run dev
```

- Start Redis Server

- Visit http://localhost:3000 to view the dashboard.

