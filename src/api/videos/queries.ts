import { useQuery } from '@tanstack/react-query';
import axios from '../api';
import type { Video } from '@/types/video';

export const useGetVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data } = await axios.get<Video[]>('/api/videos');
      return data;
    },
  });
};

export const useGetVideo = (videoId: string) => {
  return useQuery({
    queryKey: ['videos', videoId],
    queryFn: async () => {
      const { data } = await axios.get<Video>(`/api/videos/${videoId}`);
      return data;
    },
    enabled: !!videoId,
  });
}; 