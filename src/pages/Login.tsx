// ─── src/pages/Login.tsx ───
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Mail, Lock } from 'lucide-react'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button, Input } from '../components/ui'
import { GoogleButton } from '../components/GoogleButton'
import { useAuth } from '../context/AuthContext'
import { loginSchema, type LoginValues } from '../utils/validation'
import { getAuthErrorMessage } from '../services/authService'
import { ROUTES } from '../constants'
import type { FirebaseError } from 'firebase/app'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  // register = wires inputs to the form; handleSubmit = runs validation first;
  // formState gives us errors and the submitting flag.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema), // run our Zod rules
  })

  const onSubmit = async (data: LoginValues) => {
    try {
      await login(data.email, data.password)
      toast.success('Welcome back!')
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const code = (err as FirebaseError).code ?? ''
      toast.error(getAuthErrorMessage(code))
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your account">
      {/* handleSubmit validates, then calls onSubmit only if valid */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end">
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Log in
        </Button>
      </form>

      {/* divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs text-slate-400">or</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <GoogleButton label="Sign in with Google" />

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}