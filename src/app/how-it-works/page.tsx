'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Upload, FileText, Search, Check, X } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <h1 className="text-display mb-6">
              How MileHiiv works
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              MileHiiv works with the data you already have — nothing more.
            </p>
          </div>
        </div>
      </section>

      {/* What data we use */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">What data we use</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-title">Trip history exports</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  CSV files from Uber, Lyft, DoorDash, Instacart, or other gig platforms. These contain your trip timestamps, pickup/dropoff locations, and recorded miles.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Upload className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-title">Mileage tracker exports</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  If you use a separate mileage tracking app like Everlance, Stride, or MileIQ, you can import that data too. We&apos;ll cross-reference and find gaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we don't access */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">What we don&apos;t access</h2>
            
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-error-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-error" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No GPS tracking</h4>
                    <p className="text-sm text-foreground-muted">We never track your location in real-time. We only analyze data you provide.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-error-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-error" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No bank account access</h4>
                    <p className="text-sm text-foreground-muted">We don&apos;t connect to your financial accounts or see your earnings.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-error-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-error" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No app integrations</h4>
                    <p className="text-sm text-foreground-muted">We don&apos;t connect directly to Uber, Lyft, or any other platform.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-error-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-error" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">No personal data resale</h4>
                    <p className="text-sm text-foreground-muted">Your data is yours. We don&apos;t sell it to anyone, ever.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How analysis works */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">How the analysis works</h2>
            
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-title mb-2">Parse your trip data</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      We read the CSV you upload and extract trip timestamps, start/end locations, and recorded mileage for each trip.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-title mb-2">Identify deadhead miles</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      For each trip, we calculate the distance between where you dropped off your last passenger and where you picked up your next one. This is &quot;deadhead&quot; mileage that apps don&apos;t track.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-title mb-2">Find gaps and anomalies</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      We look for time gaps between trips where you were likely repositioning or waiting in a different area. These &quot;working hours&quot; miles are deductible too.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="text-title mb-2">Generate documented totals</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      Everything is compiled into a clean report with timestamps, locations, and business purposes — exactly what the IRS requires.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What reports include */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">What reports include</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Trip-by-trip breakdown</h4>
                  <p className="text-sm text-foreground-muted">Every trip with date, times, and mileage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Deadhead mile itemization</h4>
                  <p className="text-sm text-foreground-muted">Each gap identified with start/end points.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Business purpose documentation</h4>
                  <p className="text-sm text-foreground-muted">Categorized as rideshare, delivery, or repositioning.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Summary totals</h4>
                  <p className="text-sm text-foreground-muted">Ready to drop into Schedule C or TurboTax.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">PDF and CSV exports</h4>
                  <p className="text-sm text-foreground-muted">Share with your CPA or import into tax software.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Audit-ready formatting</h4>
                  <p className="text-sm text-foreground-muted">Meets IRS contemporaneous record requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">Ready to find your missing miles?</h2>
            <p className="text-foreground-muted mb-8">
              Upload your trip history and see what you&apos;ve been missing.
            </p>
            <Link href="/upload">
              <Button size="lg">
                Upload your file
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
