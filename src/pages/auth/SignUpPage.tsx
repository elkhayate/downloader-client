import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const schema = z
  .object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof schema>;

export function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data.email, data.password);
      toast.success('Account created! Please check your email to verify your account.');
    } catch (err) {
      setError('Failed to create account');
      console.error(err);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Sign up for Video Downloader</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className={cn(errors.email && 'border-destructive')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register('password')}
                  type={isVisible ? 'text' : 'password'}
                  placeholder="Create a password"
                  className={cn('pr-10', errors.password && 'border-destructive')}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register('confirmPassword')}
                  type={isVisible ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={cn('pr-10', errors.confirmPassword && 'border-destructive')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
} 