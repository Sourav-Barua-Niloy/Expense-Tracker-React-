# 💰 Spendly — Expense Tracker

A modern, full-stack expense tracker built with React, TypeScript, and Firebase. Track income and expenses, visualize spending with interactive charts, and manage everything through a clean, responsive dashboard with dark mode.

![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tech](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)
![Tech](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tech](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)
![Tech](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

---

## ✨ Features

- **Authentication** — Email/password sign-up & login, Google sign-in, password reset, persistent sessions, and protected routes
- **Dashboard** — Total balance, income, expenses, and savings at a glance, with monthly overview and category charts
- **Transaction management** — Add, edit, delete, and view transactions with title, amount, type, category, note, and date
- **Analytics** — Income vs expense comparison, monthly expense chart, cumulative balance trend, category breakdown, and a ranked category list
- **Search & filters** — Live search by title plus filters by type, category, and date range
- **Profile settings** — Update your name, change your password, toggle dark mode, and log out
- **Modern UI** — SaaS-style design, fully responsive (desktop / tablet / mobile), dark mode, loading skeletons, and empty/error states
- **Real-time sync** — Transactions update instantly via Firestore live subscriptions

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Auth & Database | Firebase Authentication + Cloud Firestore |
| Hosting | Firebase Hosting |

---

## 📁 Project Structure

```
src/
├── assets/              # Images and static files
├── components/
│   ├── ui/              # Reusable primitives (Button, Input, Card, Modal, etc.)
│   ├── forms/           # TransactionForm, ProfileForm, FilterBar, etc.
│   ├── charts/          # Recharts wrappers (Monthly, Category, Trend, Expense)
│   └── layout/          # Sidebar, Topbar, DashboardLayout, AuthLayout
├── pages/               # Dashboard, Transactions, Analytics, Profile, auth pages
├── routes/              # AppRouter, ProtectedRoute, PublicRoute
├── hooks/               # useTransactions, useStats, useTransactionFilters
├── services/            # authService, transactionService (Firebase calls)
├── context/             # AuthContext, ThemeContext
├── firebase/            # Firebase initialization
├── types/               # TypeScript interfaces
├── utils/               # Formatters, calculations, validation schemas
└── constants/           # Categories, routes, currency, nav items
```

**Architecture principle:** components call hooks, hooks call services, services call Firebase. Only the `services/` folder touches the database directly, which keeps the codebase clean and maintainable.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS version)
- A [Firebase](https://console.firebase.google.com) account

### 1. Clone and install

```bash
git clone https://github.com/YOUR-USERNAME/expense-tracker.git
cd expense-tracker
npm install
```

### 2. Set up Firebase

1. Create a project at the [Firebase Console](https://console.firebase.google.com).
2. Add a **Web app** and copy its config values.
3. Enable **Authentication → Sign-in method → Email/Password** and **Google**.
4. Create a **Cloud Firestore** database (start in production mode).

### 3. Configure environment variables

Copy the example file and fill in your Firebase config:

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit your `.env` file — it's already in `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## 🗄️ Firestore Data Structure

```
users/{uid}
  displayName: string
  email: string
  photoURL: string | null
  createdAt: timestamp

transactions/{transactionId}
  userId: string
  title: string
  amount: number          // always positive; `type` decides income vs expense
  type: "income" | "expense"
  category: string
  note: string
  date: timestamp
  createdAt: timestamp
```

### Categories

Food · Transport · Shopping · Bills · Entertainment · Health · Education · Salary · Freelancing · Investment · Others

---

## 🔒 Security

Firestore security rules ensure users can only read and write their own data:

```
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

match /transactions/{transactionId} {
  allow read, delete: if request.auth != null
                      && resource.data.userId == request.auth.uid;
  allow create: if request.auth != null
                && request.resource.data.userId == request.auth.uid;
  allow update: if request.auth != null
                && resource.data.userId == request.auth.uid
                && request.resource.data.userId == request.auth.uid;
}
```

> Firebase web API keys are public by design — they identify the project but don't grant data access. The security boundary is enforced entirely by these Firestore rules.

---

## 🌐 Deployment (Firebase Hosting)

### One-time setup

```bash
npm install -g firebase-tools
firebase login
firebase init      # Select Firestore + Hosting; public directory: dist; SPA: Yes
```

### Deploy

```bash
npm run build
firebase deploy
```

Firebase prints your live public URL (e.g. `https://your-project.web.app`).

> After deploying, add your hosting domain under **Authentication → Settings → Authorized domains** so Google sign-in works in production.

### Redeploy workflow

```bash
npm run build
firebase deploy --only hosting
```

---

## 🧭 Roadmap / Ideas

- [ ] Budgets and spending limits per category
- [ ] Recurring transactions
- [ ] CSV export
- [ ] Multi-currency support
- [ ] PWA / installable app

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Sourav**

Built as a full-stack learning project with React, TypeScript, and Firebase.
