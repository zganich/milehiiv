'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <h1 className="text-display mb-6">
              Simple pricing. No surprises.
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              Pay per report or go monthly for unlimited analysis. Either way, you only pay for what you need.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pay per report */}
              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-title mb-2">Pay per report</h3>
                  <p className="text-sm text-foreground-muted">
                    Best for occasional use or first-time users
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">$19</span>
                    <span className="text-foreground-muted">/ report</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Full mileage analysis
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Deadhead mile detection
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    IRS-ready PDF report
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    CSV export for tax software
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Multi-platform support
                  </li>
                </ul>

                <Link href="/upload">
                  <Button variant="secondary" size="lg" className="w-full">
                    Get started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Monthly */}
              <div className="bg-card border-2 border-accent rounded-xl p-8 shadow-md relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Best value
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-title mb-2">Monthly</h3>
                  <p className="text-sm text-foreground-muted">
                    Best for active drivers who want ongoing tracking
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">$9</span>
                    <span className="text-foreground-muted">/ month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <strong className="text-foreground">Unlimited reports</strong>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Full mileage analysis
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Deadhead mile detection
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    IRS-ready PDF reports
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    CSV exports for tax software
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Multi-platform support
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Priority support
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    Cancel anytime
                  </li>
                </ul>

                <Link href="/upload">
                  <Button size="lg" className="w-full">
                    Start monthly
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline mb-8 text-center">Questions about pricing</h2>
            
            <div className="space-y-4">
              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  What counts as one &quot;report&quot;?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  A report is a complete analysis of one or more data files for a tax period (typically a year). If you upload your Uber, Lyft, and DoorDash files for 2024, that&apos;s one report. You can re-download and access it anytime.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  Can I try before I pay?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  Yes! You can upload your data and see a summary of your miles before paying. You only pay when you want to download the full IRS-ready report.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  What payment methods do you accept?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through Stripe. All payments are processed securely.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  Can I cancel my monthly subscription?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  Yes, you can cancel anytime from your account settings. You&apos;ll keep access until the end of your billing period. No cancellation fees.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  Do you offer refunds?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  If you&apos;re not satisfied with your report, contact us within 7 days and we&apos;ll work with you to make it right or issue a refund.
                </p>
              </details>
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
              Upload your trip data and see how much you&apos;ve been leaving on the table.
            </p>
            <Link href="/upload">
              <Button size="lg">
                Get started
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
