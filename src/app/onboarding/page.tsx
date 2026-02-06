'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Check, ChevronRight, ChevronLeft, Car, Truck, Bike, Package } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    businessType: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    window.location.href = '/dashboard';
  };

  const businessTypes = [
    { id: 'rideshare', label: 'Rideshare', desc: 'Uber, Lyft', icon: Car },
    { id: 'delivery', label: 'Delivery', desc: 'DoorDash, UberEats', icon: Package },
    { id: 'taxi', label: 'Taxi', desc: 'Traditional taxi', icon: Truck },
    { id: 'other', label: 'Other', desc: 'Courier, etc.', icon: Bike }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground-muted">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-foreground-subtle">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-card rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card variant="elevated" padding="lg">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-6 animate-fade-up">
              <div className="w-14 h-14 rounded-2xl bg-accent-muted flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 text-accent" />
              </div>
              
              <div>
                <h1 className="text-headline text-foreground mb-3">
                  Welcome to MileHiiv
                </h1>
                <p className="text-foreground-muted">
                  Let&apos;s set up your account so you can start tracking your mileage and saving money on taxes.
                </p>
              </div>

              <Button size="lg" onClick={handleNext} className="w-full sm:w-auto">
                Get started
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-up">
              <div className="text-center">
                <h2 className="text-title text-foreground mb-2">Tell us about yourself</h2>
                <p className="text-foreground-muted text-sm">This helps us personalize your experience</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="John Smith"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!profile.name || !profile.email}>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Business Type */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-up">
              <div className="text-center">
                <h2 className="text-title text-foreground mb-2">What type of driving do you do?</h2>
                <p className="text-foreground-muted text-sm">Select the option that best describes your work</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = profile.businessType === type.id;
                  
                  return (
                    <button
                      key={type.id}
                      onClick={() => setProfile({...profile, businessType: type.id})}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected 
                          ? 'border-accent bg-accent-muted' 
                          : 'border-border hover:border-border-hover bg-card'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-accent' : 'text-foreground-muted'}`} />
                      <div className={`font-medium ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                        {type.label}
                      </div>
                      <div className="text-xs text-foreground-subtle">{type.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!profile.businessType}>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="text-center space-y-6 animate-fade-up">
              <div className="w-14 h-14 rounded-2xl bg-success-muted flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 text-success" />
              </div>
              
              <div>
                <h2 className="text-title text-foreground mb-3">You&apos;re all set!</h2>
                <p className="text-foreground-muted">
                  Your account is ready. Let&apos;s upload your first file and start tracking.
                </p>
              </div>

              <Card className="bg-accent-muted/30 border-accent/20 text-left" padding="md">
                <h3 className="font-medium text-foreground mb-3">What&apos;s next?</h3>
                <ul className="space-y-2">
                  {[
                    'Upload your mileage files (CSV or screenshot)',
                    'Review any detected mileage gaps',
                    'Track your tax savings in real-time'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground-muted">
                      <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={handleBack}>
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleComplete}>
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Skip Link */}
        <div className="text-center mt-6">
          <Link 
            href="/dashboard"
            className="text-sm text-foreground-subtle hover:text-foreground-muted transition-colors"
          >
            Skip setup for now
          </Link>
        </div>
      </div>
    </div>
  );
}
