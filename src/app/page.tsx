'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, FileText, LineChart, DollarSign, Upload, Search, FileCheck, Car } from 'lucide-react';

export default function Home() {
  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    window.location.href = '/upload';
  };

  // Calculate days until April 15
  const today = new Date();
  const taxDeadline = new Date(today.getFullYear(), 3, 15); // April 15
  if (today > taxDeadline) {
    taxDeadline.setFullYear(taxDeadline.getFullYear() + 1);
  }
  const daysUntilDeadline = Math.ceil((taxDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Urgency Banner */}
      <div className="bg-warning text-warning-foreground py-2 px-4 text-center text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          ⏰ Tax deadline in <strong>{daysUntilDeadline} days</strong> — Don&apos;t file without your full mileage deduction
        </span>
      </div>

      <Nav />

      {/* Hero Section */}
      <section className="relative py-10 md:py-14 lg:py-16 overflow-hidden">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            {/* Lead with the money stat */}
            <div className="badge badge-warning mb-4 text-base px-4 py-2">
              <DollarSign className="w-4 h-4" />
              Gig drivers are missing $5,360/year on average
            </div>
            
            <h1 className="text-display text-foreground mb-4">
              You&apos;re leaving money
              <span className="text-gradient-accent block">on the table.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground-muted mb-6 max-w-2xl mx-auto">
              Uber, Lyft, and DoorDash only track <em>active trip</em> miles. 
              <strong> The 40% you drive between pickups?</strong> That&apos;s money you&apos;re not claiming.
            </p>

            {/* Key stats inline */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8 text-center">
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-accent">40%</div>
                <p className="text-xs text-foreground-subtle">Miles apps miss</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-success">$5,360</div>
                <p className="text-xs text-foreground-subtle">Avg found/year</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-warning">30 sec</div>
                <p className="text-xs text-foreground-subtle">To see yours</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#try-it">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Find my hidden miles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Platform logos instead of fake avatars */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-subtle">
              <span>Works with:</span>
              <div className="flex items-center gap-3 font-medium">
                <span className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border">
                  <Car className="w-4 h-4" /> Uber
                </span>
                <span className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border">
                  <Car className="w-4 h-4" /> Lyft
                </span>
                <span className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-full border border-border">
                  <Car className="w-4 h-4" /> DoorDash
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              See your missing miles in 3 steps
            </h2>
            <p className="text-foreground-muted">
              No signup. No app download. Just answers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Upload your CSV</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Export your trip history from Uber, Lyft, or DoorDash. Takes 30 seconds.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-success text-success-foreground flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-success" />
                <h3 className="font-semibold text-foreground">We find the gaps</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Our AI spots every deadhead mile — the drives between pickups you&apos;re not tracking.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-warning text-warning-foreground flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-foreground">Get your money</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Download IRS-ready reports. Works with TurboTax, H&R Block, or your CPA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Features */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              Built for multi-appers and 1099 grinders
            </h2>
            <p className="text-foreground-muted max-w-xl mx-auto">
              We know you&apos;re running 3 apps at once and switching between rides and deliveries. 
              MileHiiv handles the chaos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <Card interactive className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Smart Import</CardTitle>
                <CardDescription>
                  Drop your Uber, Lyft, or DoorDash CSV and we parse it instantly. 
                  Screenshot works too — AI reads it.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-success-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <LineChart className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Gap Detection</CardTitle>
                <CardDescription>
                  Every deadhead mile between trips. Every drive to a surge zone. 
                  Every &quot;going home&quot; leg. <strong>All deductible. All found.</strong>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card interactive className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-warning-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
                <CardTitle>Tax-Ready Reports</CardTitle>
                <CardDescription>
                  One-click IRS mileage log. Timestamps, addresses, purpose — 
                  everything auditors want, nothing they don&apos;t.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Try It Now CTA - Main Conversion Point */}
      <section id="try-it" className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center border-accent border-2">
            <div className="max-w-xl mx-auto">
              <div className="badge badge-accent mb-4">
                <DollarSign className="w-3 h-3" />
                Free instant analysis
              </div>
              
              <h3 className="text-headline text-foreground mb-2">
                See what you&apos;re missing
              </h3>
              <p className="text-foreground-muted mb-6">
                Upload your Uber, Lyft, or DoorDash trip export. 
                <strong> See your hidden miles in 30 seconds.</strong> No account needed.
              </p>
              
              <FileUpload
                onFileSelect={handleFileUpload}
                accept=".pdf,.csv,.png,.jpg,.jpeg"
                maxSize={10}
                className="max-w-md mx-auto"
              />
              
              <p className="text-xs text-foreground-subtle mt-4">
                Accepts CSV exports, PDFs, or screenshots. Your data stays private.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick FAQ / Objection Handling */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-headline text-foreground text-center mb-8">
              Questions drivers ask
            </h2>
            
            <div className="space-y-4">
              <details className="group bg-card rounded-lg border border-border p-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  &quot;Wait, I can deduct miles BETWEEN trips?&quot;
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm">
                  Yes! The IRS allows you to deduct <em>all</em> business-related driving — including deadhead miles 
                  (driving to pickup), repositioning to surge areas, and driving between platforms. 
                  Apps only track when you have a passenger/order. The rest is on you.
                </p>
              </details>

              <details className="group bg-card rounded-lg border border-border p-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  &quot;How do I get my trip data from Uber/Lyft?&quot;
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm">
                  Each app has a &quot;Download my data&quot; option in settings. For Uber: Settings → Privacy → Download your data. 
                  For Lyft: Settings → Personal info → Request your data. We&apos;ll walk you through it.
                </p>
              </details>

              <details className="group bg-card rounded-lg border border-border p-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  &quot;Is this IRS legit?&quot;
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm">
                  100%. The IRS requires a contemporaneous log with date, destination, business purpose, and miles. 
                  That&apos;s exactly what MileHiiv generates. Our reports are used by thousands of drivers at tax time.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-14 bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Tax deadline: {daysUntilDeadline} days away
          </h2>
          <p className="text-accent-foreground/80 mb-6 max-w-lg mx-auto">
            Don&apos;t leave thousands on the table. See your missing miles now — it takes 30 seconds.
          </p>
          <Link href="#try-it">
            <Button size="lg" variant="secondary" className="text-base">
              Find my hidden miles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
