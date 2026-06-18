// ─── src/App.tsx ───
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { AppRouter } from './routes/AppRouter'

function App() {
  return (
    // Providers wrap the whole app so any component can use auth + theme.
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        {/* Toaster styled to match our theme via CSS variables */}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              'dark:!bg-slate-800 dark:!text-slate-100 !rounded-xl !text-sm',
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App