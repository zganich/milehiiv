'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    vehicleType: '',
    businessType: ''
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Save profile and redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card variant="glass" padding="xl">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to MileHiiv!</h1>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  Let&apos;s set up your account so you can start tracking your mileage and saving money on taxes.
                </p>
              </div>

              <Button size="lg" onClick={handleNext} className="w-full sm:w-auto">
                Get Started
              </Button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                <p className="text-gray-600">This helps us personalize your experience</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!profile.name || !profile.email}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle & Business */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you drive?</h2>
                <p className="text-gray-600">This helps us calculate accurate deductions</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['Rideshare (Uber/Lyft)', 'Delivery (DoorDash/UberEats)', 'Taxi', 'Other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProfile({...profile, businessType: type})}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      profile.businessType === type 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{type}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!profile.businessType}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Ready to Go */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">You&apos;re all set!</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your account is ready. Let&apos;s upload your first PDF and start tracking your mileage.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-3">What&apos;s next?</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Upload your mileage PDFs
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Review detected gaps
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Track your tax savings
                  </li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Link href="/dashboard">
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              Skip setup for now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
