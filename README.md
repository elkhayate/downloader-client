# Video Downloader Client

Video Downloader is a modern, professional web application for downloading and managing videos from a wide range of platforms. It provides a user-friendly interface for users to fetch, preview, and manage their downloaded videos, all stored securely in the cloud and available for download to any device.

## Features

- **Universal Video Downloading**: Download videos from YouTube, Vimeo, Facebook, Twitter, TikTok, Instagram, and 1000+ more platforms.
- **Cloud Storage**: All your videos are safely stored in the cloud and can be downloaded to your device anytime, anywhere.
- **Video Previews**: Instantly preview completed videos directly in the dashboard.
- **History & Management**: View your download history, open or delete files, and track download status.
- **Authentication**: Secure sign up, login, password reset, and forgot password flows.
- **Responsive UI**: Beautiful, mobile-friendly design with dark mode support.
- **Error Handling**: Friendly error messages and loading states throughout the app.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, lucide-react
- **State/Data**: React Query, React Hook Form, Zod
- **Backend**: Supabase (auth, storage, API)
- **Notifications**: sonner
- **Routing**: React Router

## Project Structure

- `src/pages/` — Main pages (Landing, Download, History, Auth)
- `src/components/` — UI and layout components (Navbar, Footer, FileList, DownloadForm, etc.)
- `src/context/` — Authentication context
- `src/api/` — API hooks for videos and authentication
- `src/lib/` — Utility functions and Supabase client

## Who is it for?

- Anyone who wants to download and manage videos from multiple platforms
- Users who want secure, cloud-based video storage with easy device downloads
- Teams or individuals looking for a modern, open-source video downloader

