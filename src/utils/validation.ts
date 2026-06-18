// ─── src/utils/validation.ts ───
import { z } from 'zod'
import { CATEGORY_NAMES } from '../constants'

// Each schema describes the shape AND rules for a form's data.
// z.infer<> then gives us a matching TypeScript type for free.

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
export type LoginValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    displayName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  // .refine adds a cross-field rule: the two passwords must match
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // attach the error to this field
  })
export type RegisterValues = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

// ─── Transaction form (Phase 6) ───
export const transactionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(80, 'Title is too long'),
  // Amount comes from an <input>, which gives a string. We accept string or
  // number, convert with Number(), then require a positive result. This avoids
  // z.coerce's typing quirks in Zod 4 (which left `amount` inferred as unknown).
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => Number(v) > 0, 'Amount must be greater than 0'),
  type: z.enum(['income', 'expense'], { message: 'Select a type' }),
  category: z
    .string()
    .min(1, 'Select a category')
    .refine((c) => CATEGORY_NAMES.includes(c), 'Invalid category'),
  note: z.string().max(300, 'Note is too long').optional().or(z.literal('')),
  // Date input gives "YYYY-MM-DD"; we just require it's present here and
  // convert to a Date in the form's submit handler.
  date: z.string().min(1, 'Date is required'),
})
export type TransactionFormValues = z.infer<typeof transactionSchema>

// ─── Profile settings (Phase 10) ───
export const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
})
export type ProfileValues = z.infer<typeof profileSchema>

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>