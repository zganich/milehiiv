'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Download, FileText, Check } from 'lucide-react';

export default function Reports() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <h1 className="text-display mb-6">
              Reports you can file with confidence.
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              Every report includes what the IRS requires — dates, destinations, business purposes, and mileage. Nothing more, nothing less.
            </p>
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Report mockup */}
              <div className="lg:col-span-3 bg-card border border-border rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-background-secondary border-b border-border px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-foreground">Mileage Report — 2025</span>
                    </div>
                    <span className="text-xs bg-accent-muted text-accent px-2 py-1 rounded-full font-medium">
                      IRS-Ready
                    </span>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="px-6 py-4 border-b border-border">
                  <h4 className="text-xs text-foreground-subtle uppercase tracking-wide mb-3">Summary</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">18,500</p>
                      <p className="text-xs text-foreground-muted">Total Miles</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">6,050</p>
                      <p className="text-xs text-foreground-muted">Recovered Miles</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">$12,210</p>
                      <p className="text-xs text-foreground-muted">@ $0.66/mi</p>
                    </div>
                  </div>
                </div>

                {/* Trip details preview */}
                <div className="px-6 py-4">
                  <h4 className="text-xs text-foreground-subtle uppercase tracking-wide mb-3">Trip Details (Sample)</h4>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-12 gap-2 text-xs text-foreground-subtle font-medium border-b border-border pb-2">
                      <div className="col-span-2">Date</div>
                      <div className="col-span-4">Route</div>
                      <div className="col-span-3">Purpose</div>
                      <div className="col-span-2 text-right">Miles</div>
                      <div className="col-span-1 text-right">Type</div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2 text-xs py-1">
                      <div className="col-span-2 text-foreground-muted">03/15/25</div>
                      <div className="col-span-4 text-foreground-muted">123 Main → 456 Oak St</div>
                      <div className="col-span-3 text-foreground-muted">Rideshare pickup</div>
                      <div className="col-span-2 text-right font-medium">8.4</div>
                      <div className="col-span-1 text-right text-accent text-xs">DH</div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2 text-xs py-1">
                      <div className="col-span-2 text-foreground-muted">03/15/25</div>
                      <div className="col-span-4 text-foreground-muted">456 Oak → 789 Pine Ave</div>
                      <div className="col-span-3 text-foreground-muted">Uber trip #1842</div>
                      <div className="col-span-2 text-right font-medium">12.1</div>
                      <div className="col-span-1 text-right text-foreground-subtle text-xs">TR</div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2 text-xs py-1">
                      <div className="col-span-2 text-foreground-muted">03/15/25</div>
                      <div className="col-span-4 text-foreground-muted">789 Pine → Downtown</div>
                      <div className="col-span-3 text-foreground-muted">Reposition to surge</div>
                      <div className="col-span-2 text-right font-medium">5.2</div>
                      <div className="col-span-1 text-right text-accent text-xs">DH</div>
                    </div>
                    
                    <div className="text-xs text-foreground-subtle pt-2 border-t border-border">
                      ... and 847 more entries
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend / explanation */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-title mb-4">Report fields</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-xs bg-foreground-subtle text-white px-1.5 py-0.5 rounded font-mono">TR</span>
                      <span className="text-sm text-foreground-muted">Active trip miles (app-tracked)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-mono">DH</span>
                      <span className="text-sm text-foreground-muted">Deadhead miles (recovered)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-xs bg-foreground-subtle text-white px-1.5 py-0.5 rounded font-mono">GP</span>
                      <span className="text-sm text-foreground-muted">Gap miles (repositioning)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-title mb-4">Each entry includes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      Date and time
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      Start and end location
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      Business purpose
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      Miles driven
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      Trip type classification
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">Works with your workflow</h2>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Schedule C</h3>
                <p className="text-sm text-foreground-muted">
                  Summary totals ready to enter directly into Part II, Line 9 of Schedule C.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                  <Download className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">TurboTax / H&R Block</h3>
                <p className="text-sm text-foreground-muted">
                  Import-ready totals and supporting documentation for any tax software.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">CPA-ready</h3>
                <p className="text-sm text-foreground-muted">
                  Professional formatting your accountant will appreciate. PDF and CSV exports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IRS Requirements */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline mb-6 text-center">Meeting IRS requirements</h2>
            <p className="text-foreground-muted text-center mb-8 leading-relaxed">
              The IRS requires a &quot;contemporaneous&quot; mileage log with specific information. MileHiiv reports include everything they ask for:
            </p>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Date of each trip</h4>
                    <p className="text-sm text-foreground-muted">Timestamps from your app data</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Destination</h4>
                    <p className="text-sm text-foreground-muted">Start and end locations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Business purpose</h4>
                    <p className="text-sm text-foreground-muted">Rideshare, delivery, repositioning</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Miles driven</h4>
                    <p className="text-sm text-foreground-muted">Calculated from location data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">See what your report will look like</h2>
            <p className="text-foreground-muted mb-8">
              Download a sample report to see exactly what you&apos;ll get.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Download className="w-4 h-4" />
                Download sample PDF
              </Button>
              <Link href="/upload">
                <Button size="lg">
                  Upload your data
                  <ArrowRight className="w-4 h-4" />
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
