'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, FileText, LineChart, DollarSign, Upload, Search, FileCheck, Car, Calculator } from 'lucide-react';

export default function VariantB() {
  const [miles, setMiles] = useState<string>('');
  const [missedAmount, setMissedAmount] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  // IRS rate for 2025 is 67 cents per mile
  const IRS_RATE = 0.67;
  const MISSED_PERCENTAGE = 0.40; // 40% of miles are typically missed

  useEffect(() => {
    const numMiles = parseFloat(miles) || 0;
    if (numMiles > 0) {
      const missed = numMiles * MISSED_PERCENTAGE * IRS_RATE;
      setMissedAmount(missed);
      setHasCalculated(true);
    } else {
      setMissedAmount(0);
      setHasCalculated(false);
    }
  }, [miles]);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    window.location.href = '/upload';
  };

  // Calculate days until April 15
  const today = new Date();
  const taxDeadline = new Date(today.getFullYear(), 3, 15);
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

      {/* Hero Section - Calculator First */}
      <section className="relative py-10 md:py-14 lg:py-16 overflow-hidden">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            
            <div className="badge badge-success mb-4 text-base px-4 py-2">
              <Calculator className="w-4 h-4" />
              Free calculator — no signup required
            </div>

            <h1 className="text-display text-foreground mb-4">
              How much are you
              <span className="text-gradient-accent block">leaving on the table?</span>
            </h1>

            {/* Interactive Calculator */}
            <Card variant="elevated" padding="lg" className="max-w-md mx-auto mb-8 border-accent border-2">
              <div className="space-y-4">
                <label className="block text-left">
                  <span className="text-sm font-medium text-foreground-muted">
                    How many miles did you drive for gig work in 2025?
                  </span>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      value={miles}
                      onChange={(e) => setMiles(e.target.value)}
                      placeholder="e.g. 15000"
                      className="input text-xl font-semibold text-center pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-subtle">
                      miles
                    </span>
                  </div>
                </label>

                {hasCalculated && (
                  <div className="bg-success-muted rounded-lg p-4 animate-fade-up">
                    <p className="text-sm text-success mb-1">You could be missing:</p>
                    <p className="text-4xl md:text-5xl font-bold text-success">
                      ${missedAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-foreground-muted mt-2">
                      Based on 40% missed miles × ${IRS_RATE}/mile IRS rate
                    </p>
                  </div>
                )}

                <Link href="#try-it">
                  <Button size="lg" className="w-full text-base">
                    Find My Hidden Miles
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Key stats inline */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-6 text-center">
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-accent">40%</div>
                <p className="text-xs text-foreground-subtle">Miles apps miss</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-success">$5,360</div>
                <p className="text-xs text-foreground-subtle">Avg found/year</p>
              </div>
              <div className="bg-card rounded-lg p-3 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-warning">67¢</div>
                <p className="text-xs text-foreground-subtle">Per mile deduction</p>
              </div>
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

      {/* The Money Math Section */}
      <section className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              The math doesn&apos;t lie
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Uber, Lyft, and DoorDash only track <strong>active trip</strong> miles. 
              The 40% you drive between pickups? That&apos;s money you&apos;re not claiming.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="text-center">
              <div className="text-4xl font-bold text-error mb-2">❌</div>
              <CardTitle className="text-lg mb-2">What Apps Report</CardTitle>
              <p className="text-foreground-muted text-sm">
                Only miles with passenger/order in car. 
                <strong className="text-foreground"> ~60% of your driving.</strong>
              </p>
            </Card>
            
            <Card className="border-success border-2 text-center">
              <div className="text-4xl font-bold text-success mb-2">✓</div>
              <CardTitle className="text-lg mb-2">What You Can Actually Claim</CardTitle>
              <p className="text-foreground-muted text-sm">
                ALL business driving including deadhead miles, surge chasing, repositioning.
                <strong className="text-success"> 100% of your driving.</strong>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              Get your money in 3 steps
            </h2>
            <p className="text-foreground-muted">
              No signup. No app download. Just cash.
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
                <h3 className="font-semibold text-foreground">We find your money</h3>
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
                <DollarSign className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-foreground">Claim it on taxes</h3>
              </div>
              <p className="text-sm text-foreground-muted">
                Download IRS-ready reports. Works with TurboTax, H&R Block, or your CPA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Now CTA */}
      <section id="try-it" className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center border-accent border-2">
            <div className="max-w-xl mx-auto">
              <div className="badge badge-accent mb-4">
                <DollarSign className="w-3 h-3" />
                Free instant analysis
              </div>
              
              <h3 className="text-headline text-foreground mb-2">
                Upload and see your real number
              </h3>
              <p className="text-foreground-muted mb-6">
                {hasCalculated ? (
                  <>That <strong className="text-success">${missedAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong> estimate? Let&apos;s verify it with your actual data.</>
                ) : (
                  <>Upload your trip export. <strong>See your hidden miles in 30 seconds.</strong> No account needed.</>
                )}
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

      {/* 3 Core Features */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-headline text-foreground mb-2">
              Built for multi-appers and 1099 grinders
            </h2>
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

      {/* Final CTA */}
      <section className="py-10 md:py-14 bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {hasCalculated ? (
              <>Stop leaving ${missedAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} on the table</>
            ) : (
              <>Stop leaving thousands on the table</>
            )}
          </h2>
          <p className="text-accent-foreground/80 mb-6 max-w-lg mx-auto">
            Tax deadline: {daysUntilDeadline} days away. See your missing miles now — it takes 30 seconds.
          </p>
          <Link href="#try-it">
            <Button size="lg" variant="secondary" className="text-base">
              Find My Hidden Miles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
