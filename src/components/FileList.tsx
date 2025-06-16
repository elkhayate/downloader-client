import { format } from 'date-fns';
import {  Eye, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Video } from '@/types/video';

interface FileListProps {
  files: Video[];
  onDelete?: (id: string) => void;
}

export function FileList({ files, onDelete }: FileListProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {files.map((file) => (
        <Card key={file.id} className="overflow-hidden shadow-lg rounded-xl">
          {file.status === 'completed' && file.file_path && (
            <div className="mb-2">
              <video
                src={file.file_path}
                controls
                className="w-full h-48 sm:h-56 xl:h-64 object-cover rounded-md"
                title={file.title}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-2 text-lg xl:text-xl font-semibold">
              {file.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm xl:text-base text-muted-foreground">
                <span>
                  {format(new Date(file.created_at), 'MMM d, yyyy HH:mm')}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs xl:text-sm ${
                    file.status === 'completed'
                      ? 'bg-green-500/10 text-green-500'
                      : file.status === 'failed'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}
                >
                  {file.status}
                </span>
              </div>

              {file.error_message && (
                <p className="text-sm text-destructive">{file.error_message}</p>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => file.file_path && window.open(file.file_path, '_blank')}
                  disabled={file.status !== 'completed'}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Open
                </Button>
                {onDelete && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 