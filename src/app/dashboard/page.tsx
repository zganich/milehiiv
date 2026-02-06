'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { Nav } from '@/components/layout/Nav';
import { 
  Plus, 
  Upload, 
  FileText, 
  AlertTriangle, 
  TrendingUp,
  Car,
  DollarSign,
  Calendar,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

export default function DashboardPage() {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
  };

  const stats = [
    { 
      label: 'Total Miles', 
      value: '2,847', 
      change: '+12%', 
      trend: 'up',
      icon: Car,
      color: 'accent'
    },
    { 
      label: 'Business Miles', 
      value: '2,156', 
      change: '+8%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'success'
    },
    { 
      label: 'Tax Deduction', 
      value: formatCurrency(1412), 
      change: '+$180', 
      trend: 'up',
      icon: DollarSign,
      color: 'warning'
    },
    { 
      label: 'Gaps Found', 
      value: '3', 
      change: 'Action needed', 
      trend: 'alert',
      icon: AlertTriangle,
      color: 'error'
    }
  ];

  const gaps = [
    { date: 'Jan 15, 2026', miles: 180, deduction: 118 },
    { date: 'Jan 12, 2026', miles: 220, deduction: 144 },
    { date: 'Jan 8, 2026', miles: 95, deduction: 62 }
  ];

  const recentUploads = [
    { name: 'Uber_Statement_Jan_2026.pdf', date: '2 hours ago', miles: 1247, deduction: 817 },
    { name: 'Lyft_Summary_Dec_2025.pdf', date: '1 day ago', miles: 1600, deduction: 1048 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Nav showAuth={false} showDashboardNav />

      <main className="container py-6 md:py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-headline text-foreground">Dashboard</h1>
            <p className="text-foreground-muted mt-1">January 2026 overview</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/import">
              <Button variant="secondary" icon={<Upload className="w-4 h-4" />}>
                Import
              </Button>
            </Link>
            <Button icon={<Plus className="w-4 h-4" />}>
              Log trip
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="relative overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div className={`w-9 h-9 rounded-lg bg-${stat.color}-muted flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  {stat.trend === 'up' && (
                    <span className="text-xs font-medium text-success">{stat.change}</span>
                  )}
                  {stat.trend === 'alert' && (
                    <span className="badge badge-error text-xs">{stat.change}</span>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-foreground-muted mt-1">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gaps Alert */}
            {gaps.length > 0 && (
              <Card className="border-warning/30 bg-warning-muted/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning-muted flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground">Mileage Gaps Found</CardTitle>
                      <CardDescription>
                        {gaps.length} potential deductions worth {formatCurrency(gaps.reduce((a, g) => a + g.deduction, 0))}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View all</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gaps.slice(0, 2).map((gap, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-4 rounded-lg bg-background border border-border hover:border-border-hover transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-foreground-subtle" />
                          <div>
                            <div className="font-medium text-foreground">{gap.date}</div>
                            <div className="text-sm text-foreground-muted">{gap.miles} miles missing</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium text-success">{formatCurrency(gap.deduction)}</div>
                            <div className="text-xs text-foreground-subtle">deduction</div>
                          </div>
                          <Button size="sm">Review</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Uploads</CardTitle>
                <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />}>
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUploads.map((upload, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-lg bg-card-hover hover:bg-card border border-transparent hover:border-border transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center">
                          <FileText className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm md:text-base truncate max-w-[180px] md:max-w-none">
                            {upload.name}
                          </div>
                          <div className="text-sm text-foreground-subtle">{upload.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="font-medium text-success">{upload.miles.toLocaleString()} mi</div>
                          <div className="text-xs text-foreground-subtle">{formatCurrency(upload.deduction)} deduction</div>
                        </div>
                        <button className="p-2 rounded-md hover:bg-card text-foreground-subtle hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card interactive className="cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="font-medium text-foreground">Export Report</div>
                  <div className="text-sm text-foreground-muted">IRS-ready PDF</div>
                </CardContent>
              </Card>
              
              <Card interactive className="cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-success-muted flex items-center justify-center mb-3">
                    <Car className="w-6 h-6 text-success" />
                  </div>
                  <div className="font-medium text-foreground">Manage Trips</div>
                  <div className="text-sm text-foreground-muted">Edit & categorize</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Upload */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Quick Upload</CardTitle>
                <CardDescription>
                  Drop a file or screenshot to import
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileSelect={handleFileUpload}
                  accept=".pdf,.csv,.png,.jpg,.jpeg"
                  maxSize={10}
                  disabled={uploading}
                />
                
                {uploading && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground-muted">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                )}
              </CardContent>
            </Card>

            {/* This Month Summary */}
            <Card>
              <CardHeader>
                <CardTitle>January Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">Uber miles</span>
                    <span className="font-medium text-foreground">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">Lyft miles</span>
                    <span className="font-medium text-foreground">908</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">Deadhead (detected)</span>
                    <span className="font-medium text-success">+495</span>
                  </div>
                  <hr className="divider" />
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">Total deductible</span>
                    <span className="font-bold text-foreground">2,650</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">@ $0.67/mi</span>
                    <span className="font-bold text-success">{formatCurrency(1775)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tip */}
            <Card className="bg-accent-muted/50 border-accent/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Pro Tip</div>
                    <p className="text-sm text-foreground-muted mt-1">
                      Connect Google Timeline to automatically detect miles between app trips.
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                      Connect now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
