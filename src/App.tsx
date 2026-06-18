import { auth } from "./firebase/config"

function App() {
  console.log('Firebase auth ready:', auth.app.name)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-brand-600 dark:text-brand-50">
        Tailwind v4 is working 🎉
      </h1>
    </div>
  )
}

export default App