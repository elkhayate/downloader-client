export interface Video {
  id: string;
  user_id: string;
  title: string;
  url: string;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  file_path: string | null;
  error_message: string | null;
}

export interface CreateVideoData {
  url: string;
}

export interface UpdateVideoData {
  title?: string;
  status?: Video['status'];
  error_message?: string;
} 