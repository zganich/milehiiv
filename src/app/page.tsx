'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, FileText, LineChart, Zap, Shield, Clock, DollarSign } from 'lucide-react';

export default function Home() {
  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    // Redirect to upload page with file
    window.location.href = '/upload';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background glow */}
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="badge badge-accent mb-6">
              <Zap className="w-3 h-3" />
              Now with AI-powered screenshot import
            </div>
            
            <h1 className="text-display text-foreground mb-6">
              Track every mile.
              <span className="text-gradient-accent block">Save more on taxes.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground-muted mb-10 max-w-2xl mx-auto">
              The smart mileage tracker for gig drivers. Import from any platform, 
              detect missed deductions, and export IRS-ready reports in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start tracking free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View pricing
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-subtle">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full bg-card border-2 border-background" />
                  ))}
                </div>
                <span>2,000+ drivers</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">4.9 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-headline text-foreground mb-4">
              Everything you need to maximize deductions
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Stop leaving money on the table. MileHiiv captures every deductible mile 
              that gig apps miss.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card interactive className="group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Smart Import</CardTitle>
                <CardDescription>
                  Import from Uber, Lyft, DoorDash CSVs or just snap a screenshot. Our AI handles the rest.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-success-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <LineChart className="w-5 h-5 text-success" />
                </div>
                <CardTitle>Gap Detection</CardTitle>
                <CardDescription>
                  Automatically find the "deadhead" miles between trips that apps don&apos;t track but are 100% deductible.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-warning-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-5 h-5 text-warning" />
                </div>
                <CardTitle>Tax Reports</CardTitle>
                <CardDescription>
                  Generate IRS-ready mileage logs with one click. Works with TurboTax, H&R Block, and your CPA.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <CardTitle>Quick Log</CardTitle>
                <CardDescription>
                  Start/stop tracking with one tap. Perfect for multi-app drivers who switch platforms.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-success-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-success" />
                </div>
                <CardTitle>Google Timeline</CardTitle>
                <CardDescription>
                  Connect your Google Timeline for automatic trip detection and mileage calculation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-warning-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-warning" />
                </div>
                <CardTitle>Audit-Ready</CardTitle>
                <CardDescription>
                  Every trip is timestamped and stored securely. If the IRS asks, you&apos;re prepared.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card variant="elevated" padding="lg" className="max-w-3xl mx-auto text-center">
            <div className="max-w-xl mx-auto">
              <h3 className="text-headline text-foreground mb-3">
                Try it now — no account needed
              </h3>
              <p className="text-foreground-muted mb-8">
                Upload a CSV or screenshot and see your mileage summary in seconds. 
                Create an account later to save your data.
              </p>
              
              <FileUpload
                onFileSelect={handleFileUpload}
                accept=".pdf,.csv,.png,.jpg,.jpeg"
                maxSize={10}
                className="max-w-md mx-auto"
              />
              
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-foreground-subtle">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free to try
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No signup required
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant results
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-background-secondary">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">$5,360</div>
              <p className="text-foreground-muted">Average additional deductions found per driver</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-success mb-2">40%</div>
              <p className="text-foreground-muted">Of miles are "deadhead" that apps don&apos;t track</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-warning mb-2">30 sec</div>
              <p className="text-foreground-muted">Average time to import and analyze your trips</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
