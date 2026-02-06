import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm text-foreground-muted">
              © 2026 MileHiiv. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link href="/tax-strategy" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Tax Strategy
            </Link>
            <Link href="/already-filed" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Already Filed?
            </Link>
            <Link href="/pricing" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
