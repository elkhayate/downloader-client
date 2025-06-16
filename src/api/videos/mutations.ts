import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api';
import type { CreateVideoData } from '@/types/video';

export function useCreateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateVideoData) => {
      const response = await axios.post('/api/videos', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useStartDownload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoId: string) => {
      const response = await axios.post(`/api/videos/${videoId}/download`);
      return response.data;
    },
    onSuccess: (_, videoId) => {
      queryClient.invalidateQueries({ queryKey: ['videos', videoId] });
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoId: string) => {
      const response = await axios.delete(`/api/videos/${videoId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
} 