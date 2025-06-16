import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 mt-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:gap-0 sm:px-6 lg:px-8">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Video Downloader. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/merdashi/downloader-client"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
} 