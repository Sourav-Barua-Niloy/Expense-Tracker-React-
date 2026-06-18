// ─── src/pages/ForgotPassword.tsx ───
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Mail, CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button, Input } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { forgotPasswordSchema, type ForgotPasswordValues } from '../utils/validation'
import { getAuthErrorMessage } from '../services/authService'
import { ROUTES } from '../constants'
import type { FirebaseError } from 'firebase/app'

export function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      await forgotPassword(data.email)
      setSent(true) // swap the form for a success state
    } catch (err) {
      const code = (err as FirebaseError).code ?? ''
      toast.error(getAuthErrorMessage(code))
    }
  }

  // Success state — an empty/confirmation screen is its own UI moment
  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent you a reset link">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-success-500" />
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            Follow the link in the email to reset your password. It may take a minute to arrive.
          </p>
          <Link to={ROUTES.LOGIN} className="w-full">
            <Button variant="secondary" fullWidth>Back to login</Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset password" subtitle="Enter your email to get a reset link">
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
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Remember your password?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}