import { Download } from 'lucide-react';
import { useState } from 'react';
import { DownloadForm } from '@/components/DownloadForm';
import { useCreateVideo, useStartDownload } from '@/api/videos/mutations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

export function DownloadPage() {
  const [loading, setLoading] = useState(false);
  const createVideo = useCreateVideo();
  const startDownload = useStartDownload();

  const handleDownload = async (url: string) => {
    setLoading(true);
    try {
      // Create the video entry first
      const video = await createVideo.mutateAsync({ url });
      // Then start the download
      await startDownload.mutateAsync(video.id);
      toast.success('Download started!');
    } catch (error) {
      toast.error('Failed to start download');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex flex-col items-center gap-2">
            <Download className="h-10 w-10 text-primary mb-1 animate-bounce-slow" />
            <CardTitle className="text-3xl font-bold">Download Video</CardTitle>
            <CardDescription className="text-base mt-1">
              Paste a video URL below to start your download instantly.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DownloadForm onDownload={handleDownload} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}

// Add this to your global CSS or tailwind.config.js for the bounce animation:
// .animate-bounce-slow { animation: bounce 2s infinite; } 