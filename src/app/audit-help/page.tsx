'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Shield, FileText, Check, AlertTriangle } from 'lucide-react';

export default function AuditHelp() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="w-16 h-16 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-display mb-6">
              Filing or being audited? Don&apos;t guess.
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed mb-8">
              Whether you&apos;re preparing for tax season or responding to an IRS audit, you need documentation that stands up. MileHiiv generates the records the IRS requires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  Generate audit-ready reports
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The risk */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h3 className="text-title">Without proper documentation</h3>
                </div>
                <ul className="space-y-3 text-sm text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    IRS can deny your entire mileage deduction
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    You owe back taxes plus interest
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    Potential penalties of 20-75% of underpaid taxes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    Stressful correspondence with the IRS
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-accent rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-accent" />
                  <h3 className="text-title">With MileHiiv reports</h3>
                </div>
                <ul className="space-y-3 text-sm text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Complete trip-by-trip documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Dates, destinations, and business purposes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Meets IRS &quot;contemporaneous record&quot; standard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Professional formatting CPAs trust
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What IRS requires */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline mb-6 text-center">What the IRS requires</h2>
            <p className="text-foreground-muted text-center mb-8 leading-relaxed">
              According to IRS Publication 463, your mileage records must include:
            </p>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Date of each trip</h4>
                    <p className="text-sm text-foreground-muted">✓ MileHiiv includes timestamps</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Your destination</h4>
                    <p className="text-sm text-foreground-muted">✓ MileHiiv includes addresses</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Business purpose</h4>
                    <p className="text-sm text-foreground-muted">✓ MileHiiv categorizes each trip</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Miles driven</h4>
                    <p className="text-sm text-foreground-muted">✓ MileHiiv calculates from data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">Common scenarios we help with</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-accent" />
                  <h3 className="text-title">Preparing to file</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Generate complete mileage documentation before you file. Don&apos;t estimate — prove your deduction with real data.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-accent" />
                  <h3 className="text-title">Received an audit notice</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  If the IRS questions your mileage deduction, MileHiiv reports provide the documentation they need to see.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-accent" />
                  <h3 className="text-title">Amending past returns</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  If you under-claimed mileage in previous years, generate reports to support an amended return and get your refund.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-accent" />
                  <h3 className="text-title">Working with a CPA</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Give your accountant professional-grade documentation they can trust. Export PDF or CSV in formats they expect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">Get the documentation you need</h2>
            <p className="text-foreground-muted mb-8">
              Upload your trip data and generate IRS-ready reports in minutes.
            </p>
            <Link href="/upload">
              <Button size="lg">
                Generate audit-ready reports
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
