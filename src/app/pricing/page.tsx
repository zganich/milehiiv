'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Check, X, Zap, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Get started with basic mileage tracking',
      cta: 'Get started',
      ctaVariant: 'secondary' as const,
      features: [
        { text: '100 trips per year', included: true },
        { text: 'Manual trip logging', included: true },
        { text: 'Basic CSV import', included: true },
        { text: 'Mileage summary', included: true },
        { text: 'Screenshot OCR', included: false },
        { text: 'Deadhead calculation', included: false },
        { text: 'Gap detection alerts', included: false },
        { text: 'IRS-ready reports', included: false }
      ]
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      annual: '$79/year (save 34%)',
      description: 'For active gig drivers who want maximum deductions',
      cta: 'Start free trial',
      ctaVariant: 'primary' as const,
      popular: true,
      features: [
        { text: 'Unlimited trips', included: true },
        { text: 'AI-powered screenshot OCR', included: true },
        { text: 'Google Timeline import', included: true },
        { text: 'Automatic deadhead calculation', included: true },
        { text: 'Smart gap detection', included: true },
        { text: 'IRS-ready tax reports', included: true },
        { text: 'Multi-platform support', included: true },
        { text: 'Priority support', included: true }
      ]
    }
  ];

  const faqs = [
    {
      q: "What's deadhead mileage?",
      a: "Miles you drive without a passenger or delivery — like driving to your first pickup, between rides, or heading home. These are 100% tax deductible but gig apps don't track them."
    },
    {
      q: "How does Screenshot OCR work?",
      a: "Snap a photo of your earnings screen in any gig app. Our AI extracts the dates, trips, and miles automatically — no manual data entry needed."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes! No contracts, no commitments. Cancel anytime and keep access until the end of your billing period."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We use bank-level encryption and never share your data with third parties. Your mileage records are stored securely and only you can access them."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="container relative">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-display text-foreground mb-4">
                Simple, transparent pricing
              </h1>
              <p className="text-lg text-foreground-muted">
                Start free, upgrade when you need more. Every mile you track could save you money at tax time.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name}
                  variant={plan.popular ? 'elevated' : 'default'}
                  className={plan.popular ? 'relative border-accent/50' : ''}
                  padding="lg"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="badge badge-accent">
                        <Zap className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl md:text-5xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-foreground-muted">{plan.period}</span>
                    </div>
                    {plan.annual && (
                      <p className="text-sm text-foreground-subtle mt-1">{plan.annual}</p>
                    )}
                  </CardHeader>

                  <CardContent className="pt-6">
                    <p className="text-foreground-muted text-center mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          {feature.included ? (
                            <div className="w-5 h-5 rounded-full bg-success-muted flex items-center justify-center">
                              <Check className="w-3 h-3 text-success" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-card flex items-center justify-center">
                              <X className="w-3 h-3 text-foreground-subtle" />
                            </div>
                          )}
                          <span className={feature.included ? 'text-foreground' : 'text-foreground-subtle'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href={plan.name === 'Pro' ? '/register?plan=pro' : '/register'} className="block">
                      <Button variant={plan.ctaVariant} size="lg" className="w-full">
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    
                    {plan.popular && (
                      <p className="text-xs text-center text-foreground-subtle mt-3">
                        No credit card required • 7-day free trial
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Value Calculator */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <div className="container">
            <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 rounded-xl bg-success-muted flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              
              <h3 className="text-headline text-foreground mb-2">
                How much could you save?
              </h3>
              <p className="text-foreground-muted mb-6">
                Average gig driver drives 20,000 miles/year. With 40% deadhead miles:
              </p>
              
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="text-4xl md:text-5xl font-bold text-success mb-2">
                  $5,360
                </div>
                <p className="text-foreground-muted">
                  in additional deductions at $0.67/mile (2026 IRS rate)
                </p>
                <p className="text-sm text-foreground-subtle mt-2">
                  That&apos;s <span className="font-semibold text-foreground">$1,340+ back in your pocket</span> at a 25% tax bracket
                </p>
              </div>
              
              <p className="text-sm text-foreground-subtle mt-6">
                Pro pays for itself in just 1 day of driving
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-headline text-foreground text-center mb-12">
              Frequently asked questions
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i} padding="md">
                  <h4 className="font-semibold text-foreground">{faq.q}</h4>
                  <p className="text-foreground-muted mt-2">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <div className="container text-center">
            <h2 className="text-headline text-foreground mb-4">
              Ready to maximize your deductions?
            </h2>
            <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
              Join thousands of gig drivers who are tracking every mile and saving more on taxes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg">
                  Start tracking free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
