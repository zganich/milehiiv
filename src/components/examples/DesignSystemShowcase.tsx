'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';

export function DesignSystemShowcase() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-display text-gray-900">Design System Showcase</h1>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            MileHiiv's Apple-inspired Liquid Glass design system with world-class UX best practices
          </p>
        </div>

        {/* Buttons Section */}
        <Card variant="glass" padding="xl">
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <h3 className="text-title">Primary Buttons</h3>
                <div className="space-y-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" size="xl">Extra Large</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-title">Secondary Buttons</h3>
                <div className="space-y-3">
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                  <Button variant="secondary" size="xl">Extra Large</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-title">Glass Buttons</h3>
                <div className="space-y-3">
                  <Button variant="glass" size="sm">Small</Button>
                  <Button variant="glass" size="md">Medium</Button>
                  <Button variant="glass" size="lg">Large</Button>
                  <Button variant="glass" size="xl">Extra Large</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-title">States</h3>
                <div className="space-y-3">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card variant="glass" padding="xl">
          <CardHeader>
            <CardTitle>Card Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass" hover padding="lg">
                <CardHeader>
                  <CardTitle>Liquid Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-gray-600">
                    Translucent background with backdrop blur effects. Hover to see the elevation change.
                  </p>
                </CardContent>
              </Card>

              <Card variant="solid" hover padding="lg">
                <CardHeader>
                  <CardTitle>Solid Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-gray-600">
                    Traditional solid background with subtle shadows and hover effects.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" hover padding="lg">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-gray-600">
                    High elevation with dramatic shadows for important content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card variant="glass" padding="xl">
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helper="We'll never share your email with anyone else."
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={error}
                />

                <Input
                  label="Disabled Input"
                  placeholder="This input is disabled"
                  disabled
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-title mb-4">File Upload</h3>
                  <FileUpload
                    onFileSelect={handleFileUpload}
                    accept=".pdf"
                    maxSize={10}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-title">Interactive Demo</h3>
                  <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    loading={loading}
                    className="w-full"
                  >
                    {loading ? 'Processing...' : 'Submit Form'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Section */}
        <Card variant="glass" padding="xl">
          <CardHeader>
            <CardTitle>Typography System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-display">Display Text (48px)</h1>
                <p className="text-caption">Hero text for main headlines</p>
              </div>

              <div className="space-y-2">
                <h2 className="text-headline">Headline Text (30px)</h2>
                <p className="text-caption">Large section headings</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-title">Title Text (20px)</h3>
                <p className="text-caption">Medium headings and card titles</p>
              </div>

              <div className="space-y-2">
                <p className="text-body">Body Text (16px)</p>
                <p className="text-caption">Regular content and descriptions</p>
              </div>

              <div className="space-y-2">
                <p className="text-caption">Caption Text (14px)</p>
                <p className="text-caption">Small text for labels and metadata</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Micro-interactions Demo */}
        <Card variant="glass" padding="xl">
          <CardHeader>
            <CardTitle>Micro-interactions & Animations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto micro-bounce">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-title">Micro-bounce</h3>
                <p className="text-caption">Subtle hover animations</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto pulse-glow">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-title">Pulse Glow</h3>
                <p className="text-caption">Attention-grabbing effects</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto scale-in">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-title">Scale In</h3>
                <p className="text-caption">Smooth entrance animations</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto fade-in">
                  <span className="text-2xl">💫</span>
                </div>
                <h3 className="text-title">Fade In</h3>
                <p className="text-caption">Elegant content reveals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card variant="solid" padding="xl">
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-title">WCAG 2.1 AA Compliance</h3>
                <ul className="space-y-2 text-body text-gray-600">
                  <li>✅ Proper color contrast ratios</li>
                  <li>✅ Keyboard navigation support</li>
                  <li>✅ Screen reader compatibility</li>
                  <li>✅ Focus management</li>
                  <li>✅ ARIA labels and descriptions</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-title">User Preferences</h3>
                <ul className="space-y-2 text-body text-gray-600">
                  <li>✅ Reduced motion support</li>
                  <li>✅ High contrast mode</li>
                  <li>✅ Dark mode compatibility</li>
                  <li>✅ Print-friendly styles</li>
                  <li>✅ Touch-friendly sizing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
