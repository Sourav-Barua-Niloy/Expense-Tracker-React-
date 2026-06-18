// ─── src/utils/validation.ts ───
import { z } from 'zod'

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