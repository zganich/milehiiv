'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Car, Truck, Layers, Check } from 'lucide-react';

export default function Drivers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <h1 className="text-display mb-6">
              Built for drivers who take this seriously.
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              Whether you&apos;re driving full-time or supplementing income, MileHiiv helps you capture every deductible mile.
            </p>
          </div>
        </div>
      </section>

      {/* Uber Drivers */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Car className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-headline">Uber drivers</h2>
                </div>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  Uber only tracks miles when you have a passenger in the car. Every time you drive to pick someone up, drive to a surge area, or head home after your last ride — those miles aren&apos;t recorded.
                </p>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  MileHiiv analyzes your Uber trip history to find these deadhead miles and document them properly for your taxes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Works with Uber&apos;s &quot;Download my data&quot; export
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Identifies miles between rides
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Documents repositioning to surge zones
                  </li>
                </ul>
                <Link href="/uber-mileage">
                  <Button variant="secondary">
                    Learn more for Uber
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Typical Uber driver findings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Uber-tracked miles</span>
                    <span className="font-medium">8,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Deadhead miles found</span>
                    <span className="font-medium text-accent">+3,100</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
                    <span>Total deductible</span>
                    <span>11,300</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lyft Drivers */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 bg-card border border-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Typical Lyft driver findings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Lyft-tracked miles</span>
                    <span className="font-medium">6,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Deadhead miles found</span>
                    <span className="font-medium text-accent">+2,600</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
                    <span>Total deductible</span>
                    <span>9,100</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Car className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-headline">Lyft drivers</h2>
                </div>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  Like Uber, Lyft only records miles during active rides. The miles you drive to reach passengers, reposition for better pickups, or head home after your shift go untracked.
                </p>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  MileHiiv reads your Lyft data export and calculates all the missing miles between your recorded trips.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Works with Lyft&apos;s personal data export
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Calculates drive-to-pickup distance
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Catches between-shift repositioning
                  </li>
                </ul>
                <Link href="/lyft-mileage">
                  <Button variant="secondary">
                    Learn more for Lyft
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DoorDash Drivers */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Truck className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-headline">DoorDash drivers</h2>
                </div>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  Delivery apps often have even larger gaps than rideshare. You drive to the restaurant, wait, drive to the customer, then drive to the next restaurant — but only part of that gets tracked.
                </p>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  MileHiiv processes your DoorDash delivery history and identifies every mile you drove for work, not just the delivery portion.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Works with DoorDash earning statements
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Tracks drive-to-restaurant miles
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Documents waiting/repositioning time
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Typical DoorDash driver findings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Delivery miles tracked</span>
                    <span className="font-medium">5,400</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Missing miles found</span>
                    <span className="font-medium text-accent">+2,800</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
                    <span>Total deductible</span>
                    <span>8,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-app Drivers */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 bg-card border border-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Multi-app driver example</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Uber miles</span>
                    <span className="font-medium">4,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Lyft miles</span>
                    <span className="font-medium">3,100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">DoorDash miles</span>
                    <span className="font-medium">2,800</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Cross-platform gaps</span>
                    <span className="font-medium text-accent">+4,100</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
                    <span>Total deductible</span>
                    <span>14,200</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Layers className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-headline">Multi-app workflows</h2>
                </div>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  Running multiple apps means even more gaps. When you switch from Uber to DoorDash mid-shift, neither app tracks that transition. When you reposition between platforms, that&apos;s invisible.
                </p>
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  MileHiiv can analyze data from multiple platforms together, finding cross-platform gaps that no single app can see.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Combine Uber + Lyft + DoorDash data
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Identify platform-switching gaps
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Check className="w-4 h-4 text-accent" />
                    Single unified report for taxes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">Ready to capture your missing miles?</h2>
            <p className="text-foreground-muted mb-8">
              Upload your trip data from any platform and see what you&apos;ve been missing.
            </p>
            <Link href="/upload">
              <Button size="lg">
                Start with your platform
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
