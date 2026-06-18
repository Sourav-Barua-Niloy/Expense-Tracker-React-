// ─── src/components/forms/ChangePasswordForm.tsx ───
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button, Input } from '../ui'
import { useAuth } from '../../context/AuthContext'
import { changePasswordSchema, type ChangePasswordValues } from '../../utils/validation'
import { getAuthErrorMessage } from '../../services/authService'
import type { FirebaseError } from 'firebase/app'

export function ChangePasswordForm() {
  const { changePassword } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      await changePassword(data.currentPassword, data.newPassword)
      toast.success('Password changed')
      reset() // clear the fields after success
    } catch (err) {
      const code = (err as FirebaseError).code ?? ''
      toast.error(getAuthErrorMessage(code))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="currentPassword"
        type="password"
        label="Current password"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />
      <Input
        id="newPassword"
        type="password"
        label="New password"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm new password"
        leftIcon={<Lock className="h-4 w-4" />}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Change password
        </Button>
      </div>
    </form>
  )
}