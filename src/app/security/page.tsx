'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Shield, Lock, Trash2, Eye, Server, FileText } from 'lucide-react';

export default function Security() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="w-16 h-16 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-display mb-6">
              Your data stays yours.
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
              We built MileHiiv with privacy-first principles. We only access what you give us, we don&apos;t sell your data, and you can delete everything anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Lock className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-title">Encryption in transit and at rest</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  All data is encrypted using TLS 1.3 during transfer and AES-256 when stored. Your trip information is protected at every step.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Eye className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-title">No data resale, ever</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  We will never sell, rent, or share your personal data with third parties for advertising or marketing. Your data is used only to generate your reports.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-title">Delete anytime</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  You can delete all your uploaded data at any time with one click. We don&apos;t retain copies after deletion. Your data, your choice.
                </p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center">
                    <Server className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-title">Minimal data retention</h3>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  We keep your data only as long as needed to provide our service. After you download your reports, we don&apos;t need to keep the original files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we access vs don't */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-headline mb-8 text-center">Plain-English privacy</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* What we access */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-title mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  What we access
                </h3>
                <ul className="space-y-3 text-sm text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Files you explicitly upload (CSV, PDF)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Trip timestamps and locations from those files
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Your email address for account access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Payment information (processed by Stripe)
                  </li>
                </ul>
              </div>

              {/* What we don't access */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-title mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-error-muted flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  What we don&apos;t access
                </h3>
                <ul className="space-y-3 text-sm text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-error">•</span>
                    Your real-time GPS location
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error">•</span>
                    Your bank accounts or earnings
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error">•</span>
                    Direct connections to Uber, Lyft, etc.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error">•</span>
                    Your contacts, photos, or other phone data
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-sm bg-background-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-headline mb-6">Compliance & standards</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">TLS 1.3</h4>
                <p className="text-xs text-foreground-muted">Encrypted connections</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">AES-256</h4>
                <p className="text-xs text-foreground-muted">Data at rest</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">CCPA ready</h4>
                <p className="text-xs text-foreground-muted">California compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline mb-8 text-center">Common questions</h2>
            
            <div className="space-y-4">
              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  What happens to my data after I download my report?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  Your uploaded files remain in your account so you can re-generate reports or add more data. You can delete them at any time from your dashboard. We don&apos;t share or use your data for anything other than generating your reports.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  Do you track my location?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  No. We never track your real-time location. We only analyze historical trip data that you explicitly upload from your gig apps. We have no access to your phone&apos;s GPS.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  Can I delete all my data?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  Yes. You can delete your account and all associated data at any time from your account settings. Deletion is permanent and immediate — we don&apos;t keep backups of deleted user data.
                </p>
              </details>

              <details className="group bg-card border border-border rounded-lg p-5">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-foreground">
                  Do you sell data to advertisers?
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-foreground-muted text-sm leading-relaxed">
                  Never. We do not sell, rent, or share your personal information with any third parties for advertising or marketing purposes. Our business model is simple: you pay for reports, not with your data.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">Ready to get started?</h2>
            <p className="text-foreground-muted mb-8">
              Upload your trip data securely and see what you&apos;ve been missing.
            </p>
            <Link href="/upload">
              <Button size="lg">
                Upload safely
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
