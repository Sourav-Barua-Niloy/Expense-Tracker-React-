// ─── src/pages/Profile.tsx ───
import { useNavigate } from 'react-router-dom'
import { Moon, Sun, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import { SettingsSection } from '../components/SettingsSection'
import { ProfileForm } from '../components/forms/ProfileForm'
import { ChangePasswordForm } from '../components/forms/ChangePasswordForm'
import { Button } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { ROUTES } from '../constants'

export function Profile() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const initial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase()

  // A user who signed up with email/password has 'password' in their provider
  // list. Google users don't — they have no password in our app, so the
  // change-password form doesn't apply to them.
  const isPasswordUser = user?.providerData.some((p) => p.providerId === 'password')

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out')
      navigate(ROUTES.LOGIN)
    } catch {
      toast.error('Failed to log out')
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Identity header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
          {initial}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {user?.displayName || 'User'}
          </h2>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>

      {/* Profile details */}
      <SettingsSection title="Profile" description="Update your account details">
        <ProfileForm />
      </SettingsSection>

      {/* Appearance / theme */}
      <SettingsSection title="Appearance" description="Customize how the app looks">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Dark mode
              </p>
              <p className="text-xs text-slate-500">
                {theme === 'dark' ? 'On' : 'Off'}
              </p>
            </div>
          </div>

          {/* a simple toggle switch */}
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle dark mode"
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-brand-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                theme === 'dark' ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </SettingsSection>

      {/* Security — only for email/password users. Google users manage their
          password through their Google account, so we show a note instead. */}
      {isPasswordUser ? (
        <SettingsSection title="Security" description="Change your password">
          <ChangePasswordForm />
        </SettingsSection>
      ) : (
        <SettingsSection title="Security" description="How you sign in">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You're signed in with Google. Manage your password and security
            settings from your Google account.
          </p>
        </SettingsSection>
      )}

      {/* Logout */}
      <SettingsSection title="Account" description="Manage your session">
        <Button variant="danger" leftIcon={<LogOut className="h-4 w-4" />} onClick={handleLogout}>
          Log out
        </Button>
      </SettingsSection>
    </div>
  )
}