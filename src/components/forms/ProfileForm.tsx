// ─── src/components/forms/ProfileForm.tsx ───
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button, Input } from '../ui'
import { useAuth } from '../../context/AuthContext'
import { profileSchema, type ProfileValues } from '../../utils/validation'

export function ProfileForm() {
  const { user, updateName } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName: user?.displayName ?? '' },
  })

  const onSubmit = async (data: ProfileValues) => {
    try {
      await updateName(data.displayName)
      toast.success('Profile updated')
    } catch {
      toast.error('Could not update profile')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="displayName"
        label="Display name"
        leftIcon={<User className="h-4 w-4" />}
        error={errors.displayName?.message}
        {...register('displayName')}
      />

      {/* Email is read-only — changing auth email needs re-verification flows
          that are out of scope here. */}
      <Input
        id="email"
        label="Email"
        leftIcon={<Mail className="h-4 w-4" />}
        value={user?.email ?? ''}
        disabled
        className="cursor-not-allowed opacity-60"
      />

      <div className="flex justify-end">
        {/* disabled until the name actually changes */}
        <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
          Save changes
        </Button>
      </div>
    </form>
  )
}