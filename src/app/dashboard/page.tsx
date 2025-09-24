'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';

export default function DashboardPage() {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      // Show success message or redirect to results
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
              <Button variant="ghost">
                Profile
              </Button>
              <Button variant="ghost">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's your mileage overview for this month</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="solid" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-gray-600">Total Miles</div>
            </CardContent>
          </Card>

          <Card variant="solid" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">2,156</div>
              <div className="text-gray-600">Business Miles</div>
            </CardContent>
          </Card>

          <Card variant="solid" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {formatCurrency(1412)}
              </div>
              <div className="text-gray-600">Tax Deduction</div>
            </CardContent>
          </Card>

          <Card variant="solid" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">Gaps Found</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card variant="glass" padding="lg" className="sticky top-8">
              <CardHeader>
                <CardTitle>Upload New PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileSelect={handleFileUpload}
                  accept=".pdf"
                  maxSize={10}
                  disabled={uploading}
                />
                
                {uploading && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-gray-600">Processing...</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Uploads
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gap Alerts */}
            <Card variant="elevated" className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Gap Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">January 15, 2025</div>
                        <div className="text-sm text-gray-600">Missing 180 miles</div>
                        <div className="text-sm text-orange-600">Potential deduction: {formatCurrency(118)}</div>
                      </div>
                      <Button size="sm" variant="primary">
                        Review
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">January 12, 2025</div>
                        <div className="text-sm text-gray-600">Missing 220 miles</div>
                        <div className="text-sm text-orange-600">Potential deduction: {formatCurrency(144)}</div>
                      </div>
                      <Button size="sm" variant="primary">
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card variant="glass" padding="lg">
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                    <div>
                      <div className="font-medium">Uber_Statement_Jan_2025.pdf</div>
                      <div className="text-sm text-gray-600">Uploaded 2 hours ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">1,247 miles</div>
                      <div className="text-sm text-gray-600">{formatCurrency(817)} deduction</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                    <div>
                      <div className="font-medium">Lyft_Summary_Dec_2024.pdf</div>
                      <div className="text-sm text-gray-600">Uploaded 1 day ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">1,600 miles</div>
                      <div className="text-sm text-gray-600">{formatCurrency(1048)} deduction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="glass" padding="lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="secondary" className="h-16 flex flex-col items-center justify-center">
                    <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Report
                  </Button>
                  
                  <Button variant="secondary" className="h-16 flex flex-col items-center justify-center">
                    <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    Manage Trips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
