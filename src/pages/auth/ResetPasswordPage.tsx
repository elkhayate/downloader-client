import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof schema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: data.password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register('password')}
                    type={isVisible ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className={cn(errors.password && 'border-destructive')}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsVisible((v) => !v)}
                  >
                    {isVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register('confirmPassword')}
                    type={isConfirmVisible ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className={cn(errors.confirmPassword && 'border-destructive')}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsConfirmVisible((v) => !v)}
                  >
                    {isConfirmVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {success && (
                <p className="text-sm text-green-600">
                  Password has been reset successfully. Redirecting to login...
                </p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
} 