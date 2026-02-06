'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { 
  Calculator, DollarSign, ArrowRight, Car, Smartphone, ShoppingBag, 
  Heart, Home, PiggyBank, Receipt, Building2, FileText, CalendarClock,
  AlertTriangle, CheckCircle, ExternalLink, TrendingUp, ChevronDown, ChevronUp
} from 'lucide-react';

interface DeductionCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  typicalRange: string;
  details: string[];
  calculatorFields?: {
    label: string;
    placeholder: string;
    id: string;
    multiplier?: number;
  }[];
}

const deductionCategories: DeductionCategory[] = [
  {
    id: 'mileage',
    title: 'Mileage (Your Biggest Deduction)',
    icon: <Car className="w-6 h-6" />,
    description: '67¢ per mile for 2024. Most drivers miss 40% of eligible miles.',
    typicalRange: '$3,000 - $8,000/year',
    details: [
      'Deadhead miles (to pickup location)',
      'Miles between trips',
      'Driving home after last trip',
      'Repositioning to surge zones',
      'App-hopping between Uber, Lyft, DoorDash'
    ],
    calculatorFields: [
      { label: 'Estimated missed miles/year', placeholder: 'e.g., 5000', id: 'missedMiles', multiplier: 0.67 }
    ]
  },
  {
    id: 'phone',
    title: 'Phone & Service',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Your phone is essential. Deduct the business use percentage.',
    typicalRange: '$500 - $1,200/year',
    details: [
      'Monthly phone bill × business use %',
      'Phone purchase (Section 179 or depreciate)',
      'Phone accessories (chargers, mounts)',
      'Data plan upgrades for work'
    ],
    calculatorFields: [
      { label: 'Monthly phone bill ($)', placeholder: 'e.g., 80', id: 'phoneBill' },
      { label: 'Business use percentage', placeholder: 'e.g., 70', id: 'phonePercent' }
    ]
  },
  {
    id: 'supplies',
    title: 'Supplies & Equipment',
    icon: <ShoppingBag className="w-6 h-6" />,
    description: 'All the stuff that keeps you running — it adds up fast.',
    typicalRange: '$200 - $500/year',
    details: [
      'Phone mounts and chargers',
      'Cleaning supplies (interior/exterior)',
      'Snacks and water for passengers',
      'Barf bags, tissues, sanitizer',
      'Dash cam (safety + tax write-off)',
      'Cooler bags for delivery'
    ]
  },
  {
    id: 'health',
    title: 'Health Insurance',
    icon: <Heart className="w-6 h-6" />,
    description: 'Self-employed health insurance is 100% deductible.',
    typicalRange: '$3,000 - $12,000/year',
    details: [
      '100% of premiums if you qualify',
      'Covers you, spouse, and dependents',
      'Cannot exceed your net self-employment income',
      'Deducted on Form 1040, not Schedule C'
    ],
    calculatorFields: [
      { label: 'Monthly premium ($)', placeholder: 'e.g., 400', id: 'healthPremium' }
    ]
  },
  {
    id: 'homeOffice',
    title: 'Home Office',
    icon: <Home className="w-6 h-6" />,
    description: 'If you do admin work at home, you can deduct it.',
    typicalRange: '$500 - $1,500/year',
    details: [
      'Simplified method: $5/sq ft, up to 300 sq ft = $1,500 max',
      'Regular method: actual expenses × business %',
      'Must be used regularly and exclusively for business',
      'Great for tracking expenses, scheduling, admin'
    ],
    calculatorFields: [
      { label: 'Home office square feet', placeholder: 'e.g., 100', id: 'sqft', multiplier: 5 }
    ]
  },
  {
    id: 'retirement',
    title: 'Retirement Contributions',
    icon: <PiggyBank className="w-6 h-6" />,
    description: 'Save for retirement AND reduce your taxes. Win-win.',
    typicalRange: '$2,000 - $23,000+/year',
    details: [
      'SEP-IRA: up to 25% of net self-employment income',
      'Solo 401(k): up to $23,000 (2024) + 25% of net',
      'Traditional IRA: up to $7,000 (2024)',
      'Contributions reduce taxable income dollar-for-dollar'
    ],
    calculatorFields: [
      { label: 'Planned retirement contribution ($)', placeholder: 'e.g., 5000', id: 'retirement' }
    ]
  },
  {
    id: 'tolls',
    title: 'Tolls & Parking',
    icon: <Receipt className="w-6 h-6" />,
    description: '100% deductible when incurred for business.',
    typicalRange: '$200 - $1,000/year',
    details: [
      'Toll roads during gig work',
      'Parking while waiting for rides',
      'Airport parking/fees',
      'Keep receipts or use toll transponder records'
    ]
  }
];

export default function TaxStrategyPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('mileage');
  const [calculatorInputs, setCalculatorInputs] = useState<Record<string, string>>({});
  const [annualProfit, setAnnualProfit] = useState<string>('');

  const handleInputChange = (id: string, value: string) => {
    setCalculatorInputs(prev => ({ ...prev, [id]: value }));
  };

  const calculateCategoryDeduction = (category: DeductionCategory): number => {
    if (!category.calculatorFields) return 0;
    
    let total = 0;
    
    if (category.id === 'mileage') {
      const miles = parseFloat(calculatorInputs['missedMiles']) || 0;
      total = miles * 0.67;
    } else if (category.id === 'phone') {
      const bill = parseFloat(calculatorInputs['phoneBill']) || 0;
      const percent = parseFloat(calculatorInputs['phonePercent']) || 0;
      total = bill * 12 * (percent / 100);
    } else if (category.id === 'health') {
      const premium = parseFloat(calculatorInputs['healthPremium']) || 0;
      total = premium * 12;
    } else if (category.id === 'homeOffice') {
      const sqft = Math.min(parseFloat(calculatorInputs['sqft']) || 0, 300);
      total = sqft * 5;
    } else if (category.id === 'retirement') {
      total = parseFloat(calculatorInputs['retirement']) || 0;
    }
    
    return total;
  };

  // Business structure calculations
  const structureCalcs = useMemo(() => {
    const profit = parseFloat(annualProfit) || 0;
    if (profit === 0) return null;

    const SE_TAX_RATE = 0.153;
    const TAXABLE_SE_PORTION = 0.9235;

    // Sole Prop / Default LLC
    const soleProprietorSETax = profit * TAXABLE_SE_PORTION * SE_TAX_RATE;

    // S-Corp with 50% salary
    const reasonableSalary = profit * 0.5;
    const sCorpSETax = reasonableSalary * SE_TAX_RATE;
    const sCorpSavings = soleProprietorSETax - sCorpSETax;

    return {
      profit,
      soleProprietorSETax: Math.round(soleProprietorSETax),
      sCorpSalary: Math.round(reasonableSalary),
      sCorpSETax: Math.round(sCorpSETax),
      sCorpSavings: Math.round(sCorpSavings)
    };
  }, [annualProfit]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="badge badge-accent mb-4">
              <DollarSign className="w-3 h-3" />
              Complete Tax Strategy Guide
            </div>
            
            <h1 className="text-display text-foreground mb-4">
              Every deduction.
              <span className="text-gradient-accent block">Every strategy.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground-muted mb-6 max-w-2xl mx-auto">
              The complete guide to minimizing your tax bill as a gig driver. 
              From basic write-offs to advanced business structures.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: All Write-Offs */}
      <section className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-headline text-foreground mb-2">
                All Gig Driver Write-Offs
              </h2>
              <p className="text-foreground-muted">
                Everything you can legally deduct. Click each category for details and calculators.
              </p>
            </div>

            <div className="space-y-4">
              {deductionCategories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const deductionAmount = calculateCategoryDeduction(category);
                
                return (
                  <Card key={category.id} className={isExpanded ? 'border-accent/50' : ''}>
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-accent-muted flex items-center justify-center text-accent flex-shrink-0">
                            {category.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{category.title}</h3>
                            <p className="text-sm text-foreground-muted">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-success hidden sm:block">
                            {category.typicalRange}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-foreground-muted" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-foreground-muted" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-border animate-fade-up">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-foreground mb-3">What you can deduct:</h4>
                            <ul className="space-y-2">
                              {category.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {category.calculatorFields && (
                            <div className="bg-background-tertiary rounded-lg p-4">
                              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-accent" />
                                Quick Calculator
                              </h4>
                              <div className="space-y-3">
                                {category.calculatorFields.map((field) => (
                                  <div key={field.id}>
                                    <label className="block text-xs font-medium text-foreground-muted mb-1">
                                      {field.label}
                                    </label>
                                    <input
                                      type="number"
                                      className="input py-2 text-sm"
                                      placeholder={field.placeholder}
                                      value={calculatorInputs[field.id] || ''}
                                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                ))}
                                {deductionAmount > 0 && (
                                  <div className="mt-4 p-3 bg-success-muted rounded-lg">
                                    <span className="text-sm text-foreground-muted">Estimated deduction: </span>
                                    <span className="text-lg font-bold text-success">
                                      {formatCurrency(deductionAmount)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Business Structure */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-headline text-foreground mb-2">
                Structure for Maximum Tax Advantage
              </h2>
              <p className="text-foreground-muted">
                &quot;Own Nothing, Control Everything&quot; — The smart driver&apos;s playbook
              </p>
            </div>

            {/* Structure Levels */}
            <div className="space-y-6 mb-8">
              {/* Level 1 */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground-subtle/20 flex items-center justify-center text-foreground font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Sole Proprietor (Default)</h3>
                    <p className="text-sm text-foreground-muted mb-3">
                      This is where you start if you haven&apos;t set up any business entity.
                    </p>
                    <ul className="text-sm text-foreground-muted space-y-1">
                      <li>• Report income/expenses on Schedule C</li>
                      <li>• Pay self-employment tax (15.3%) on all profit</li>
                      <li>• Simplest to set up and maintain</li>
                      <li className="text-warning">• Most taxes, no liability protection</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Level 2 */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center text-accent font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Single-Member LLC</h3>
                    <p className="text-sm text-foreground-muted mb-3">
                      Adds liability protection without changing your taxes (yet).
                    </p>
                    <ul className="text-sm text-foreground-muted space-y-1">
                      <li>• Separates personal assets from business</li>
                      <li>• Still taxed as sole proprietor by default</li>
                      <li>• Can elect S-Corp treatment (see Level 3)</li>
                      <li>• Costs ~$50-500 to set up depending on state</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Level 3 - Highlighted */}
              <Card className="border-success border-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">S-Corp Election</h3>
                      <span className="badge badge-success text-xs">Sweet Spot</span>
                    </div>
                    <p className="text-sm text-foreground-muted mb-3">
                      The strategy that saves serious money when you&apos;re earning $50K+.
                    </p>
                    <ul className="text-sm text-foreground-muted space-y-1 mb-4">
                      <li>• Pay yourself a &quot;reasonable salary&quot;</li>
                      <li>• Remaining profit = distributions (no SE tax!)</li>
                      <li>• Can save thousands per year</li>
                      <li>• Requires payroll, more paperwork</li>
                    </ul>
                    
                    <div className="bg-background-secondary rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-success" />
                        S-Corp Savings Calculator
                      </h4>
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-foreground-muted mb-1">
                          Your annual gig profit (after expenses)
                        </label>
                        <input
                          type="number"
                          className="input py-2"
                          placeholder="e.g., 60000"
                          value={annualProfit}
                          onChange={(e) => setAnnualProfit(e.target.value)}
                        />
                      </div>
                      
                      {structureCalcs && (
                        <div className="space-y-3 animate-fade-up">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-background-tertiary rounded-lg p-3">
                              <span className="text-xs text-foreground-subtle block mb-1">Sole Prop SE Tax</span>
                              <span className="text-lg font-bold text-warning">
                                {formatCurrency(structureCalcs.soleProprietorSETax)}
                              </span>
                            </div>
                            <div className="bg-background-tertiary rounded-lg p-3">
                              <span className="text-xs text-foreground-subtle block mb-1">S-Corp SE Tax</span>
                              <span className="text-lg font-bold text-success">
                                {formatCurrency(structureCalcs.sCorpSETax)}
                              </span>
                            </div>
                          </div>
                          <div className="bg-success-muted rounded-lg p-3 text-center">
                            <span className="text-sm text-foreground-muted">Annual savings: </span>
                            <span className="text-xl font-bold text-success">
                              {formatCurrency(structureCalcs.sCorpSavings)}
                            </span>
                            <p className="text-xs text-foreground-subtle mt-1">
                              Based on paying yourself {formatCurrency(structureCalcs.sCorpSalary)} salary (50%)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Level 4 */}
              <Card className="border-dashed">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground-subtle/20 flex items-center justify-center text-foreground font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">Advanced Structures</h3>
                      <span className="badge text-xs">For High Earners</span>
                    </div>
                    <p className="text-sm text-foreground-muted mb-3">
                      For those earning $100K+ with assets to protect.
                    </p>
                    <ul className="text-sm text-foreground-muted space-y-1">
                      <li>• Holding company owns vehicle, leases to S-Corp</li>
                      <li>• Separates liability further</li>
                      <li>• Additional write-offs on &quot;rent&quot; paid</li>
                      <li>• Requires tax professional to set up properly</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Quarterly Taxes */}
      <section className="py-10 md:py-14 bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-headline text-foreground mb-2">
                Quarterly Estimated Taxes
              </h2>
              <p className="text-foreground-muted">
                Don&apos;t get hit with penalties — pay as you earn
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CalendarClock className="w-8 h-8 text-accent" />
                    <div>
                      <CardTitle>Due Dates</CardTitle>
                      <CardDescription>Mark your calendar</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: 'April 15', period: 'Q1 (Jan-Mar)' },
                      { date: 'June 15', period: 'Q2 (Apr-May)' },
                      { date: 'September 15', period: 'Q3 (Jun-Aug)' },
                      { date: 'January 15', period: 'Q4 (Sep-Dec)' }
                    ].map((q, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg">
                        <span className="font-medium text-foreground">{q.date}</span>
                        <span className="text-sm text-foreground-muted">{q.period}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-warning" />
                    <div>
                      <CardTitle>Why It Matters</CardTitle>
                      <CardDescription>Avoid IRS penalties</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-foreground-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-warning">•</span>
                      If you&apos;ll owe $1,000+ in taxes, quarterly payments are required
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning">•</span>
                      Underpayment penalty is ~8% annualized (2024)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning">•</span>
                      Safe harbor: Pay 100% of last year&apos;s tax (or 110% if income &gt;$150K)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">•</span>
                      Rule of thumb: Set aside 25-30% of profit each quarter
                    </li>
                  </ul>
                  
                  <a 
                    href="https://www.irs.gov/payments/direct-pay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 text-sm text-accent hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Pay at IRS Direct Pay
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-14">
        <div className="container">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center border-accent border-2">
            <div className="badge badge-accent mb-4">
              <TrendingUp className="w-3 h-3" />
              Free Analysis
            </div>
            
            <h3 className="text-headline text-foreground mb-3">
              Want help maximizing your deductions?
            </h3>
            <p className="text-foreground-muted mb-6 max-w-lg mx-auto">
              Upload your trip data and we&apos;ll calculate your exact missed mileage, 
              generate IRS-ready reports, and show you exactly how much you can save.
            </p>
            
            <Link href="/#try-it">
              <Button size="lg">
                Analyze my data for free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <p className="text-xs text-foreground-subtle mt-4">
              No credit card • Instant results • Works with Uber, Lyft, DoorDash
            </p>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-background-secondary">
        <div className="container">
          <p className="text-xs text-foreground-subtle text-center max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This information is for educational purposes only and is not tax, legal, 
            or financial advice. Tax laws are complex and change frequently. Always consult a qualified CPA or 
            tax professional for advice specific to your situation before making tax-related decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
