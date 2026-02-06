'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Check, Upload } from 'lucide-react';

export default function LyftMileage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="badge badge-accent mb-4">For Lyft drivers</div>
            <h1 className="text-display mb-6">
              Deadhead miles add up fast.
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed mb-8">
              Every time you drive to a pickup, reposition for a better fare, or head home after a shift — those miles are deductible. Lyft doesn&apos;t track them, but you can claim them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  Find yours
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The numbers */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Typical Lyft driver findings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm border-b border-border pb-3">
                    <span className="text-foreground-muted">Lyft-tracked miles</span>
                    <span className="font-medium">6,500</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-border pb-3">
                    <span className="text-foreground-muted">Drive-to-pickup miles</span>
                    <span className="font-medium text-accent">+1,800</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-border pb-3">
                    <span className="text-foreground-muted">Gap/repositioning miles</span>
                    <span className="font-medium text-accent">+800</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 font-semibold">
                    <span>Total deductible</span>
                    <span>9,100 miles</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-accent-muted rounded-lg">
                  <p className="text-sm text-accent font-medium">
                    +40% more deductible miles found
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-headline mb-4">What counts as deadhead?</h2>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  &quot;Deadhead&quot; miles are any miles you drive for work that aren&apos;t during an active passenger trip. Lyft only counts miles with passengers — everything else is invisible.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    Driving to your first pickup
                  </li>
                  <li className="flex items-start gap-3 text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    Driving between passengers (empty car)
                  </li>
                  <li className="flex items-start gap-3 text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    Repositioning to busier areas
                  </li>
                  <li className="flex items-start gap-3 text-foreground-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    Driving home after your last ride
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to get data */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline mb-8 text-center">How to export your Lyft data</h2>
            
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-title mb-2">Request your Lyft data</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      In the Lyft app: Settings → Personal information → Request your data. Lyft will email you a download link within a few days.
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
                    <h3 className="text-title mb-2">Upload to MileHiiv</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      Upload your Lyft ride history CSV. We&apos;ll analyze every trip and calculate the deadhead miles between them.
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
                    <h3 className="text-title mb-2">Get your complete report</h3>
                    <p className="text-foreground-muted text-sm leading-relaxed">
                      Download an IRS-ready mileage log with all your deductible miles — including the ones Lyft never tracked.
                    </p>
                  </div>
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
            <h2 className="text-headline mb-4">Find your missing Lyft miles</h2>
            <p className="text-foreground-muted mb-8">
              Upload your Lyft ride history and see how much you can claim.
            </p>
            <Link href="/upload">
              <Button size="lg">
                <Upload className="w-4 h-4" />
                Upload your Lyft data
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
