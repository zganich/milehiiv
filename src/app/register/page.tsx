'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      window.location.href = '/onboarding';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Track unlimited miles',
    'Detect missed deductions',
    'Export IRS-ready reports'
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-foreground">MileHiiv</span>
        </Link>

        <Card variant="elevated" padding="lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>Start tracking your miles for free</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Benefits */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {benefits.map((benefit, i) => (
                <span key={i} className="badge badge-success">
                  <Check className="w-3 h-3" />
                  {benefit}
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-error-muted text-error text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Full name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="At least 8 characters"
                required
              />

              <Button type="submit" className="w-full" loading={loading}>
                Create account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-foreground-subtle">
              By signing up, you agree to our{' '}
              <Link href="#" className="text-accent hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
            </p>

            <div className="mt-6 text-center text-sm text-foreground-muted">
              Already have an account?{' '}
              <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
