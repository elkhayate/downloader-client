import { toast } from 'sonner';
import { useGetVideos } from '@/api/videos/queries';
import { useDeleteVideo } from '@/api/videos/mutations';
import { FileList } from '@/components/FileList';
import { LoadingFallback } from '@/components/LoadingFallback';

export function HistoryPage() {
  const { data: videos, isLoading } = useGetVideos();
  const deleteVideo = useDeleteVideo();

  const handleDelete = async (videoId: string) => {
    try {
      await deleteVideo.mutateAsync(videoId);
      toast.success('Video deleted successfully');
    } catch (error) {
      toast.error('Failed to delete video');
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingFallback message="Loading videos..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold">Download History</h1>
      {videos?.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No videos in history
        </p>
      ) : (
        <FileList files={videos || []} onDelete={handleDelete} />
      )}
    </div>
  );
}