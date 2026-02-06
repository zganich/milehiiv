'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Calculator, DollarSign, AlertTriangle, ArrowRight, FileText, TrendingUp } from 'lucide-react';

export default function AlreadyFiledPage() {
  const [milesClaimed, setMilesClaimed] = useState<string>('');
  const [hoursPerWeek, setHoursPerWeek] = useState<string>('');
  const [monthsDriving, setMonthsDriving] = useState<string>('');

  // Constants
  const AVG_SPEED_MPH = 22; // Average gig driving speed including stops, traffic
  const MILEAGE_RATE = 0.67; // 2024 IRS rate
  const AVG_TAX_BRACKET = 0.22; // Average effective rate for self-employed

  const calculations = useMemo(() => {
    const claimed = parseFloat(milesClaimed) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const months = parseFloat(monthsDriving) || 0;

    if (claimed === 0 && hours === 0 && months === 0) {
      return null;
    }

    // Estimated actual miles: hours/week × avg speed × weeks driven
    const weeksPerMonth = 4.33;
    const totalWeeks = months * weeksPerMonth;
    const estimatedActualMiles = hours * AVG_SPEED_MPH * totalWeeks;

    // Gap calculation
    const gap = Math.max(0, estimatedActualMiles - claimed);

    // Missing deduction
    const missingDeduction = gap * MILEAGE_RATE;

    // Tax refund potential
    const taxRefundPotential = missingDeduction * AVG_TAX_BRACKET;

    return {
      estimatedActualMiles: Math.round(estimatedActualMiles),
      claimed,
      gap: Math.round(gap),
      missingDeduction: Math.round(missingDeduction),
      taxRefundPotential: Math.round(taxRefundPotential),
      hasGap: gap > 0
    };
  }, [milesClaimed, hoursPerWeek, monthsDriving]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="badge badge-warning mb-4">
              <AlertTriangle className="w-3 h-3" />
              Already filed your 2025 taxes?
            </div>
            
            <h1 className="text-display text-foreground mb-4">
              Did you leave money
              <span className="text-gradient-accent block">on the IRS&apos;s table?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground-muted mb-6 max-w-2xl mx-auto">
              Most gig drivers miss <strong>40% of their deductible miles</strong>. 
              Use this calculator to see what you might have missed — and how to get it back.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 md:py-12 bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card variant="elevated" padding="lg" className="border-accent/30 border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-accent-muted flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Missed Mileage Calculator</CardTitle>
                    <CardDescription>See if you&apos;re owed money from the IRS</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Miles Claimed Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      How many miles did you claim?
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="e.g., 8,000"
                      value={milesClaimed}
                      onChange={(e) => setMilesClaimed(e.target.value)}
                    />
                    <p className="text-xs text-foreground-subtle mt-1">
                      From your Schedule C or mileage log
                    </p>
                  </div>

                  {/* Hours Per Week Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Hours per week driving?
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="e.g., 30"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                    />
                    <p className="text-xs text-foreground-subtle mt-1">
                      Total time online/working
                    </p>
                  </div>

                  {/* Months Driving Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      How many months did you drive?
                    </label>
                    <input
                      type="number"
                      className="input"
                      placeholder="e.g., 12"
                      min="1"
                      max="12"
                      value={monthsDriving}
                      onChange={(e) => setMonthsDriving(e.target.value)}
                    />
                    <p className="text-xs text-foreground-subtle mt-1">
                      In the tax year (1-12)
                    </p>
                  </div>
                </div>

                {/* Results */}
                {calculations && (
                  <div className="animate-fade-up">
                    <hr className="divider mb-6" />
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="stat-card">
                        <span className="stat-label">Estimated Actual Miles</span>
                        <span className="stat-value text-foreground">
                          {formatNumber(calculations.estimatedActualMiles)}
                        </span>
                      </div>
                      
                      <div className="stat-card">
                        <span className="stat-label">Miles You Claimed</span>
                        <span className="stat-value text-foreground-muted">
                          {formatNumber(calculations.claimed)}
                        </span>
                      </div>
                      
                      <div className="stat-card border-warning">
                        <span className="stat-label">Miles You Missed</span>
                        <span className="stat-value text-warning">
                          {formatNumber(calculations.gap)}
                        </span>
                      </div>
                      
                      <div className="stat-card border-success">
                        <span className="stat-label">Missing Deduction</span>
                        <span className="stat-value text-success">
                          {formatCurrency(calculations.missingDeduction)}
                        </span>
                      </div>
                    </div>

                    {calculations.hasGap && calculations.gap > 100 && (
                      <Card className="bg-success-muted border-success/30 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-5 h-5 text-success" />
                              <span className="font-semibold text-foreground">
                                You likely missed {formatCurrency(calculations.missingDeduction)} in deductions
                              </span>
                            </div>
                            <p className="text-foreground-muted">
                              That&apos;s approximately <strong className="text-success">{formatCurrency(calculations.taxRefundPotential)}</strong> back in your pocket
                              <span className="text-foreground-subtle"> (based on 22% avg tax bracket)</span>
                            </p>
                          </div>
                          <TrendingUp className="w-12 h-12 text-success/50 hidden md:block" />
                        </div>
                      </Card>
                    )}

                    {calculations.hasGap && calculations.gap > 500 && (
                      <Card className="bg-accent-muted border-accent/30">
                        <div className="flex items-start gap-4">
                          <FileText className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">
                              You can file an amended return (Form 1040-X)
                            </h4>
                            <p className="text-sm text-foreground-muted mb-3">
                              The IRS allows you to amend your taxes for up to <strong>3 years</strong> after the original filing date. 
                              If you missed significant mileage deductions, it may be worth filing an amended return.
                            </p>
                            <ul className="text-sm text-foreground-muted space-y-1">
                              <li>• 2024 taxes can be amended until April 15, 2028</li>
                              <li>• 2023 taxes can be amended until April 15, 2027</li>
                              <li>• 2022 taxes can be amended until April 15, 2026</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    )}

                    {!calculations.hasGap && (
                      <Card className="bg-success-muted border-success/30">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🎉</span>
                          <div>
                            <h4 className="font-semibold text-foreground">Great job!</h4>
                            <p className="text-sm text-foreground-muted">
                              Based on your inputs, it looks like you claimed all or most of your miles. Nice work!
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                )}

                {!calculations && (
                  <div className="text-center py-8 text-foreground-muted">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Enter your information above to see your results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-14">
        <div className="container">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center border-accent border-2">
            <div className="badge badge-accent mb-4">
              <DollarSign className="w-3 h-3" />
              Get exact numbers
            </div>
            
            <h3 className="text-headline text-foreground mb-3">
              Want the real numbers?
            </h3>
            <p className="text-foreground-muted mb-6 max-w-lg mx-auto">
              This calculator gives you an estimate. Upload your actual trip data 
              and we&apos;ll show you <strong>exactly</strong> how many miles you missed 
              and the precise dollar amount.
            </p>
            
            <Link href="/#try-it">
              <Button size="lg">
                Upload your trip data
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <p className="text-xs text-foreground-subtle mt-4">
              Free instant analysis • No account required • IRS-ready reports
            </p>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-background-secondary">
        <div className="container">
          <p className="text-xs text-foreground-subtle text-center max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This calculator provides estimates only and is not tax advice. 
            The actual IRS mileage rate for 2024 is $0.67/mile. Consult a qualified tax professional 
            for advice specific to your situation before filing an amended return.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
