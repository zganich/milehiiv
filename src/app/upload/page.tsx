'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';

export default function UploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setProcessing(true);
    
    // Simulate PDF processing
    setTimeout(() => {
      setResults({
        fileName: file.name,
        totalMiles: 1247,
        businessMiles: 892,
        personalMiles: 355,
        trips: [
          { date: '2025-01-15', start: 45230, end: 45480, miles: 250, business: true },
          { date: '2025-01-14', start: 44980, end: 45230, miles: 250, business: true },
          { date: '2025-01-13', start: 44730, end: 44980, miles: 250, business: true },
          { date: '2025-01-12', start: 44480, end: 44730, miles: 250, business: false },
        ],
        gaps: [
          { date: '2025-01-11', expectedMiles: 250, actualMiles: 0, gap: 250 }
        ]
      });
      setProcessing(false);
    }, 3000);
  };

  const formatCurrency = (miles: number) => {
    const rate = 0.655; // 2024 IRS rate
    return (miles * rate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MileHiiv</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload Your PDF
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your mileage PDF and see your results in seconds. No account required to try.
          </p>
        </div>

        {/* Upload Section */}
        <Card variant="glass" padding="xl" className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Drop Your PDF Here</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFileSelect={handleFileUpload}
              accept=".pdf"
              maxSize={10}
              disabled={processing}
            />
            
            {processing && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Processing your PDF...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-8 fade-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="solid" className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {results.totalMiles.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Miles</div>
                </CardContent>
              </Card>

              <Card variant="solid" className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {results.businessMiles.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Business Miles</div>
                </CardContent>
              </Card>

              <Card variant="solid" className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {formatCurrency(results.businessMiles)}
                  </div>
                  <div className="text-gray-600">Tax Deduction</div>
                </CardContent>
              </Card>
            </div>

            {/* Gap Detection */}
            {results.gaps.length > 0 && (
              <Card variant="elevated" className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Gap Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700 mb-4">
                    We found a potential gap in your mileage records. This could mean you're missing deductible miles!
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{results.gaps[0].date}</div>
                        <div className="text-sm text-gray-600">Missing {results.gaps[0].gap} miles</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          +{formatCurrency(results.gaps[0].gap)}
                        </div>
                        <div className="text-sm text-gray-600">Additional deduction</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Trips */}
            <Card variant="glass" padding="lg">
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.trips.map((trip: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <div className="font-medium">{trip.date}</div>
                        <div className="text-sm text-gray-600">
                          {trip.start.toLocaleString()} → {trip.end.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{trip.miles} miles</div>
                        <div className={`text-sm ${trip.business ? 'text-green-600' : 'text-gray-500'}`}>
                          {trip.business ? 'Business' : 'Personal'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Results CTA */}
            <Card variant="elevated" className="text-center">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Save Your Results
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Create a free account to save these results, track more trips, and never miss a tax deduction again.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Create Free Account
                    </Button>
                  </Link>
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                    Download Report
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Join 10,000+ drivers who save thousands on taxes
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Demo Section */}
        {!uploadedFile && !processing && (
          <Card variant="glass" padding="lg" className="mt-8">
            <CardHeader>
              <CardTitle className="text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="font-semibold mb-2">1. Upload PDF</h3>
                  <p className="text-sm text-gray-600">Upload your mileage PDF from any app or platform</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="font-semibold mb-2">2. AI Processing</h3>
                  <p className="text-sm text-gray-600">Our AI extracts mileage data and detects gaps</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold mb-2">3. Save Money</h3>
                  <p className="text-sm text-gray-600">Never miss a deductible mile again</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
