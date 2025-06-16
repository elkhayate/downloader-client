import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';

const downloadSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
});

type DownloadFormData = z.infer<typeof downloadSchema>;

interface DownloadFormProps {
  onDownload: (url: string) => void;
  loading?: boolean;
}

export function DownloadForm({ onDownload, loading }: DownloadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
  });

  const onSubmit = (data: DownloadFormData) => {
    onDownload(data.url);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="url" className="block text-base font-medium mb-1">
          Video URL
        </label>
        <Input
          {...register('url')}
          type="url"
          id="url"
          placeholder="https://www.youtube.com/watch?v=..."
          disabled={loading}
        />
        {errors.url && (
          <p className="mt-1 text-sm text-destructive">{errors.url.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Starting Download...' : 'Start Download'}
      </Button>
    </form>
  );
} 