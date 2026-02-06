'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileUpload } from '@/components/ui/FileUpload';
import { Nav } from '@/components/layout/Nav';
import { 
  FileText, 
  Camera, 
  MapPin,
  Upload,
  Check,
  ArrowRight,
  Loader2
} from 'lucide-react';

type ImportMethod = 'csv' | 'screenshot' | 'timeline';

export default function ImportPage() {
  const [selectedMethod, setSelectedMethod] = useState<ImportMethod | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const importMethods = [
    {
      id: 'csv' as ImportMethod,
      title: 'CSV Import',
      description: 'Upload CSV exports from Uber, Lyft, DoorDash, and more',
      icon: FileText,
      badge: null,
      accepts: '.csv'
    },
    {
      id: 'screenshot' as ImportMethod,
      title: 'Screenshot OCR',
      description: 'Take a screenshot of your earnings - our AI extracts the data',
      icon: Camera,
      badge: 'Pro',
      accepts: '.png,.jpg,.jpeg,.webp'
    },
    {
      id: 'timeline' as ImportMethod,
      title: 'Google Timeline',
      description: 'Import your location history for automatic trip detection',
      icon: MapPin,
      badge: 'Pro',
      accepts: '.json'
    }
  ];

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploading(false);
    setUploadComplete(true);
  };

  const resetUpload = () => {
    setSelectedMethod(null);
    setUploadComplete(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav showAuth={false} showDashboardNav />

      <main className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-headline text-foreground mb-3">Import your data</h1>
            <p className="text-foreground-muted">
              Choose how you&apos;d like to import your mileage data
            </p>
          </div>

          {/* Success State */}
          {uploadComplete && (
            <Card variant="elevated" className="text-center animate-scale-in" padding="lg">
              <div className="w-14 h-14 rounded-2xl bg-success-muted flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-success" />
              </div>
              
              <CardTitle className="text-xl mb-2">Import successful!</CardTitle>
              <CardDescription className="mb-6">
                Your file has been processed and your trips have been imported.
              </CardDescription>

              <div className="bg-background-secondary rounded-xl p-4 mb-6 text-left">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">47</div>
                    <div className="text-xs text-foreground-muted">Trips imported</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">1,247</div>
                    <div className="text-xs text-foreground-muted">Miles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">$835</div>
                    <div className="text-xs text-foreground-muted">Deductions</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="secondary" onClick={resetUpload}>
                  Import more
                </Button>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  View dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}

          {/* Method Selection */}
          {!uploadComplete && !selectedMethod && (
            <div className="space-y-4 stagger-children">
              {importMethods.map((method) => {
                const Icon = method.icon;
                
                return (
                  <Card 
                    key={method.id}
                    interactive
                    className="cursor-pointer"
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{method.title}</h3>
                          {method.badge && (
                            <span className="badge badge-accent text-xs">{method.badge}</span>
                          )}
                        </div>
                        <p className="text-sm text-foreground-muted">{method.description}</p>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-foreground-subtle" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Upload View */}
          {!uploadComplete && selectedMethod && (
            <Card variant="elevated" className="animate-fade-up" padding="lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>
                  {importMethods.find(m => m.id === selectedMethod)?.title}
                </CardTitle>
                <CardDescription>
                  {importMethods.find(m => m.id === selectedMethod)?.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                {uploading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
                    <p className="text-foreground-muted">Processing your file...</p>
                    <p className="text-sm text-foreground-subtle mt-1">This may take a moment</p>
                  </div>
                ) : (
                  <FileUpload
                    onFileSelect={handleFileUpload}
                    accept={importMethods.find(m => m.id === selectedMethod)?.accepts}
                    maxSize={10}
                  />
                )}

                <div className="flex justify-center mt-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedMethod(null)}
                    disabled={uploading}
                  >
                    Choose different method
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Text */}
          {!uploadComplete && (
            <div className="mt-8 text-center">
              <p className="text-sm text-foreground-subtle">
                Need help?{' '}
                <a href="#" className="text-accent hover:underline">
                  View import guides
                </a>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
