import { useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Shield, Zap, Youtube, Facebook, Twitter, Video, Music2, Globe, PlaySquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pb-16">
        <div className="mx-auto max-w-3xl px-6 pt-16 text-center flex flex-col items-center">
          <a href="#" className="inline-flex space-x-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
              What's new
            </span>
            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
              <span>Just shipped v1.0</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Download Videos from Anywhere
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Fast, secure, and easy-to-use video downloader. Download videos from all your favorite platforms in multiple formats with just a few clicks.<br />
            <span className="text-foreground font-semibold">All your videos are safely stored in the cloud and can be downloaded to your device anytime, anywhere.</span>
          </p>
          <div className="mt-8 flex flex-col gap-4 w-full sm:flex-row sm:justify-center">
            {user ? (
              <Button onClick={() => navigate('/download')} size="lg">
                Go to Downloader
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} size="lg">
                  Sign in
                </Button>
                <Button onClick={() => navigate('/signup')} variant="outline" size="lg">
                  Sign up
                </Button>
              </>
            )}
          </div>
          {/* Supported Platforms */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Supports all major platforms:</h3>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <span className="flex items-center gap-2 text-muted-foreground"><Youtube className="h-7 w-7 text-[#FF0000]" />YouTube</span>
              <span className="flex items-center gap-2 text-muted-foreground"><Video className="h-7 w-7 text-[#1ab7ea]" />Vimeo</span>
              <span className="flex items-center gap-2 text-muted-foreground"><Facebook className="h-7 w-7 text-[#1877f3]" />Facebook</span>
              <span className="flex items-center gap-2 text-muted-foreground"><Twitter className="h-7 w-7 text-[#1da1f2]" />Twitter</span>
              <span className="flex items-center gap-2 text-muted-foreground"><Music2 className="h-7 w-7 text-[#ff0050]" />TikTok</span>
              <span className="flex items-center gap-2 text-muted-foreground"><PlaySquare className="h-7 w-7 text-[#ff0000]" />Instagram</span>
              <span className="flex items-center gap-2 text-muted-foreground"><Globe className="h-7 w-7 text-primary" />and more... (+1005)</span>
            </div>
          </div>
          {/* Screenshot Image */}
          <div className="mt-16 w-full flex justify-center relative">
            <img
              src="/hero-image.png"
              alt="App screenshot"
              className="max-w-3xl w-full rounded-2xl shadow-2xl ring-1 ring-white/10 border border-border bg-white/5"
              style={{ objectFit: 'cover' }}
            />
            {/* Optional: Gradient fade at the bottom */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent rounded-b-2xl" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Faster Downloads</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to download videos
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform provides a seamless experience for downloading videos from various sources.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-2xl text-center mt-24">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to start downloading?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Join thousands of users who are already downloading videos with ease.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {user ? (
            <Button onClick={() => navigate('/download')} size="lg">
              Go to Downloader
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} size="lg">
                Sign in
              </Button>
              <Button onClick={() => navigate('/signup')} variant="outline" size="lg">
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const features = [
  {
    name: 'Multiple Formats',
    description: 'Download videos in various formats and qualities to suit your needs.',
    icon: Download,
  },
  {
    name: 'Fast Downloads',
    description: 'Experience lightning-fast downloads with our optimized servers.',
    icon: Zap,
  },
  {
    name: 'Secure Platform',
    description: 'Your downloads are secure and private with our platform.',
    icon: Shield,
  },
]; 