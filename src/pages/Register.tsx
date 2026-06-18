// ─── src/pages/Register.tsx ───
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock } from "lucide-react";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Button, Input } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { registerSchema, type RegisterValues } from "../utils/validation";
import { getAuthErrorMessage } from "../services/authService";
import { ROUTES } from "../constants";
import type { FirebaseError } from "firebase/app";

export function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      await registerUser(data.displayName, data.email, data.password);
      toast.success("Account created!");
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const code = (err as FirebaseError).code ?? "";
      toast.error(getAuthErrorMessage(code));
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start tracking your expenses">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="displayName"
          label="Full name"
          placeholder="Jane Doe"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.displayName?.message}
          {...register("displayName")}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="At least 6 characters"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
