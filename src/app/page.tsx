'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Upload, Search, FileCheck, ArrowRight, Car, Truck, Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="stagger-children">
              <h1 className="text-display mb-6">
                Find the miles your apps don&apos;t track.
              </h1>
              
              <p className="text-lg md:text-xl text-foreground-muted mb-8 max-w-xl leading-relaxed">
                MileHiiv analyzes your driving data to uncover missed and deadhead miles — then generates clean, IRS-ready reports in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/upload">
                  <Button size="lg" className="w-full sm:w-auto">
                    Upload your driving data
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-foreground-subtle">
                No GPS tracking • No bank access • Delete your data anytime
              </p>
            </div>

            {/* Right: Abstract visual */}
            <div className="hidden lg:block">
              <div className="bg-background-secondary border border-border rounded-xl p-8 shadow-lg">
                {/* Mock report visual */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm font-medium text-foreground">Mileage Summary</span>
                    <span className="text-xs text-foreground-subtle">2025 Tax Year</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground-muted">App-tracked miles</span>
                      <span className="text-sm font-medium text-foreground">12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground-muted">Deadhead miles found</span>
                      <span className="text-sm font-medium text-accent">+4,820</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground-muted">Gap miles recovered</span>
                      <span className="text-sm font-medium text-accent">+1,230</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="text-sm font-semibold text-foreground">Total deductible</span>
                      <span className="text-sm font-bold text-foreground">18,500 mi</span>
                    </div>
                  </div>
                  <div className="bg-accent-muted rounded-lg p-4 mt-4">
                    <p className="text-sm text-accent font-medium">
                      +6,050 miles you would have missed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="text-center">
            <p className="text-foreground-muted mb-6">
              Built for real gig drivers. Works with real driving data.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 mb-4">
              <span className="text-foreground-subtle font-medium opacity-60 text-lg">Uber</span>
              <span className="text-foreground-subtle font-medium opacity-60 text-lg">Lyft</span>
              <span className="text-foreground-subtle font-medium opacity-60 text-lg">DoorDash</span>
              <span className="text-foreground-subtle font-medium opacity-60 text-lg">Instacart</span>
            </div>
            
            <p className="text-xs text-foreground-subtle">
              Supports data from
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-headline mb-4">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-5">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-title mb-3">Upload your trip history</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Import a CSV from Uber, Lyft, DoorDash, or your mileage tracker.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-5">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-title mb-3">We find what&apos;s missing</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                MileHiiv identifies deadhead miles, gaps, and underreported distance your apps ignore.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-5">
                <FileCheck className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-title mb-3">Download IRS-ready reports</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Clean summaries compatible with Schedule C, TurboTax, and CPA workflows.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/upload">
              <Button size="lg">
                Try it with your data
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline mb-6 text-center">Why it matters</h2>
            
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-title mb-3 text-foreground">The problem</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    Most mileage tools only track miles during active trips. That leaves repositioning, deadhead, and app gaps uncounted — which means less deduction and more risk.
                  </p>
                </div>
                
                <hr className="border-border" />
                
                <div>
                  <h3 className="text-title mb-3 text-foreground">The solution</h3>
                  <p className="text-foreground-muted leading-relaxed">
                    MileHiiv closes those gaps and gives you documentation you can actually stand behind.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/how-it-works">
                <Button variant="secondary" size="lg">
                  See what you&apos;re missing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section">
        <div className="container">
          <h2 className="text-headline mb-10 text-center">Who it&apos;s for</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                <Car className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Full-time gig drivers</h3>
              <p className="text-sm text-foreground-muted">
                Maximize your deductions when driving is your main income.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Multi-app drivers</h3>
              <p className="text-sm text-foreground-muted">
                Combine trips across Uber, Lyft, DoorDash, and more.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Drivers filing Schedule C</h3>
              <p className="text-sm text-foreground-muted">
                Get documentation that meets IRS requirements.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Audit-ready drivers</h3>
              <p className="text-sm text-foreground-muted">
                Sleep better knowing your mileage is documented properly.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/drivers">
              <Button variant="secondary">
                Is MileHiiv right for me?
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Output */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Report Preview */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="border-b border-border pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Mileage Report</h4>
                  <span className="text-xs bg-accent-muted text-accent px-2 py-1 rounded-full">IRS-Ready</span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground-muted">Business Miles (Active)</span>
                  <span className="font-medium">12,450</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground-muted">Deadhead Miles</span>
                  <span className="font-medium text-accent">+4,820</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground-muted">Gap Miles</span>
                  <span className="font-medium text-accent">+1,230</span>
                </div>
                <div className="flex justify-between py-3 font-semibold">
                  <span className="text-foreground">Total Deductible Miles</span>
                  <span>18,500</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-headline mb-6">What you&apos;ll get</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground-muted">Categorized mileage by trip type</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground-muted">Clear totals for Schedule C</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground-muted">Audit-friendly formatting with timestamps</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground-muted">CPA-ready exports (PDF, CSV)</span>
                </li>
              </ul>
              <Link href="/reports">
                <Button variant="secondary">
                  Download a sample report
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">
              Don&apos;t guess your mileage. Prove it.
            </h2>
            <p className="text-foreground-muted mb-8">
              Get the documentation you need to maximize your deduction and stay audit-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  Upload your driving data
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Preview a sample report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
