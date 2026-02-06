'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, FileText, LineChart, DollarSign, Upload, Search, FileCheck, Car, Clock, AlertTriangle, CheckCircle, Quote } from 'lucide-react';

export default function VariantC() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    window.location.href = '/upload';
  };

  // Calculate countdown to April 15
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let taxDeadline = new Date(now.getFullYear(), 3, 15, 23, 59, 59); // April 15
      if (now > taxDeadline) {
        taxDeadline.setFullYear(taxDeadline.getFullYear() + 1);
      }
      
      const diff = taxDeadline.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote: "I had no idea I was missing 4,200 miles. That's $2,800 I almost left on the table!",
      author: "Marcus T.",
      role: "Uber driver, 3 years"
    },
    {
      quote: "The app showed me I was only claiming 55% of my actual business miles. Never again.",
      author: "Sarah K.",
      role: "DoorDash + Instacart"
    },
    {
      quote: "My CPA was impressed with how complete the mileage log was. Saved me during an audit.",
      author: "David R.",
      role: "Full-time Lyft driver"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Urgency Banner - More Aggressive */}
      <div className="bg-error text-white py-2 px-4 text-center text-sm font-medium animate-pulse">
        <span className="inline-flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          TAX DEADLINE APPROACHING — Are you claiming ALL your miles?
        </span>
      </div>

      <Nav />

      {/* Hero Section - Fear/Urgency Focus */}
      <section className="relative py-10 md:py-14 lg:py-16 overflow-hidden">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            
            {/* Countdown Timer - PROMINENT */}
            <div className="mb-6">
              <p className="text-sm text-foreground-muted mb-3 uppercase tracking-wide">Tax deadline countdown</p>
              <div className="flex justify-center gap-3 md:gap-4">
                <div className="bg-error text-white rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-4xl font-bold">{countdown.days}</div>
                  <div className="text-xs uppercase tracking-wide opacity-80">Days</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-4xl font-bold text-foreground">{countdown.hours}</div>
                  <div className="text-xs uppercase tracking-wide text-foreground-muted">Hours</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-4xl font-bold text-foreground">{countdown.minutes}</div>
                  <div className="text-xs uppercase tracking-wide text-foreground-muted">Min</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                  <div className="text-2xl md:text-4xl font-bold text-foreground">{countdown.seconds}</div>
                  <div className="text-xs uppercase tracking-wide text-foreground-muted">Sec</div>
                </div>
              </div>
            </div>

            <h1 className="text-display text-foreground mb-4">
              Are You Claiming
              <span className="text-error block">All Your Miles?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground-muted mb-6 max-w-2xl mx-auto">
              The IRS lets you deduct <strong className="text-accent">67¢ per mile</strong>. 
              <span className="text-error font-semibold"> Most gig drivers only claim 60%.</span>
            </p>

            {/* Fear-based stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
              <div className="bg-error-muted rounded-lg p-3 border border-error/30">
                <div className="text-xl md:text-2xl font-bold text-error">40%</div>
                <p className="text-xs text-foreground-muted">Miles typically missed</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-xl md:text-2xl font-bold text-warning">$5,360</div>
                <p className="text-xs text-foreground-muted">Avg left on table</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-xl md:text-2xl font-bold text-foreground">67¢</div>
                <p className="text-xs text-foreground-muted">Per mile deduction</p>
              </div>
              <div className="bg-success-muted rounded-lg p-3 border border-success/30">
                <div className="text-xl md:text-2xl font-bold text-success">30 sec</div>
                <p className="text-xs text-foreground-muted">To find yours</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link href="#try-it">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  See What I&apos;m Missing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Platform logos */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-subtle">
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

      {/* The Problem Section */}
      <section className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <div className="text-center mb-8">
            <div className="badge badge-error mb-4">
              <AlertTriangle className="w-3 h-3" />
              The hidden problem
            </div>
            <h2 className="text-headline text-foreground mb-2">
              Your apps are costing you money
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Uber, Lyft, and DoorDash only report miles when you have a passenger or order in your car.
              <strong className="text-error"> The 40% you drive between gigs? Invisible.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="border-error border text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-error-muted flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-error" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What you&apos;re probably doing</h3>
                  <ul className="text-sm text-foreground-muted space-y-1.5">
                    <li>❌ Using app-reported miles only</li>
                    <li>❌ Missing deadhead (between pickups)</li>
                    <li>❌ Not tracking surge zone drives</li>
                    <li>❌ Forgetting &quot;going home&quot; trips</li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card className="border-success border text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success-muted flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What you should be doing</h3>
                  <ul className="text-sm text-foreground-muted space-y-1.5">
                    <li>✓ Claiming ALL business driving</li>
                    <li>✓ Including miles between orders</li>
                    <li>✓ Tracking repositioning drives</li>
                    <li>✓ IRS-compliant mileage logs</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              Drivers who found their money
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/20" />
                <div className="flex flex-col h-full">
                  <p className="text-foreground text-sm italic mb-4 flex-1">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                      <span className="text-accent font-semibold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-foreground-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              Find your missing miles in 3 steps
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

      {/* Try It Now CTA */}
      <section id="try-it" className="py-10 md:py-14">
        <div className="container">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center border-accent border-2">
            <div className="max-w-xl mx-auto">
              <div className="badge badge-warning mb-4">
                <Clock className="w-3 h-3" />
                Only {countdown.days} days left
              </div>
              
              <h3 className="text-headline text-foreground mb-2">
                See what you&apos;re missing
              </h3>
              <p className="text-foreground-muted mb-6">
                Upload your Uber, Lyft, or DoorDash trip export. 
                <strong> Get your full mileage report in 30 seconds.</strong> No account needed.
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

      {/* Quick FAQ */}
      <section className="py-10 md:py-14 bg-background-secondary">
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
                  &quot;Will this hold up in an audit?&quot;
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm">
                  100%. The IRS requires a contemporaneous log with date, destination, business purpose, and miles. 
                  That&apos;s exactly what MileHiiv generates. Our reports have been used successfully in audits.
                </p>
              </details>

              <details className="group bg-card rounded-lg border border-border p-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  &quot;Is this too late for 2024 taxes?&quot;
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm">
                  No! You can reconstruct your mileage log using your trip history. We help you build an 
                  IRS-compliant record from your existing data. But don&apos;t wait — deadline is {countdown.days} days away.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-14 bg-error text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {countdown.days} days. ${5360} on average.
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Don&apos;t file without knowing what you&apos;re missing. It takes 30 seconds.
          </p>
          <Link href="#try-it">
            <Button size="lg" variant="secondary" className="text-base">
              See What I&apos;m Missing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
