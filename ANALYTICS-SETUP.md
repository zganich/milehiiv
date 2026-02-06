# Analytics Setup for MileHiIV

## Recommended: PostHog (Free Tier)

PostHog free tier includes:
- 1M events/month
- Session recordings
- Feature flags
- Funnels
- No data limits on free tier

### Setup Steps:

1. **Create account:** [posthog.com](https://posthog.com) → Sign up free

2. **Get your project API key** (looks like `phc_xxxxx`)

3. **Add to Vercel env vars:**
```bash
vercel env add NEXT_PUBLIC_POSTHOG_KEY
vercel env add NEXT_PUBLIC_POSTHOG_HOST
```

4. **Install package:**
```bash
cd /Users/jamesknight/GitHub/milehiiv
pnpm add posthog-js
```

5. **Create provider** (`src/app/providers.tsx`):
```tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
  })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

6. **Wrap app** in `src/app/layout.tsx`:
```tsx
import { PHProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  )
}
```

---

## Key Events to Track

```tsx
import { usePostHog } from 'posthog-js/react'

const posthog = usePostHog()

// Track these events:
posthog.capture('file_uploaded', { type: 'csv', platform: 'uber' })
posthog.capture('analysis_complete', { miles_found: 8400, value: 5628 })
posthog.capture('signup_started')
posthog.capture('signup_complete')
posthog.capture('payment_started', { plan: 'season_pass', price: 29 })
posthog.capture('payment_complete', { plan: 'season_pass', price: 29 })
posthog.capture('report_downloaded')
```

---

## Conversion Funnel

Set up this funnel in PostHog:

1. `$pageview` (homepage)
2. `file_uploaded`
3. `analysis_complete`
4. `signup_complete`
5. `payment_complete`

---

## Alternative: Google Analytics 4

If you prefer GA4:

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (`G-XXXXXXX`)
3. Add to Vercel: `NEXT_PUBLIC_GA_ID=G-XXXXXXX`
4. Install: `pnpm add @next/third-parties`
5. Add to layout:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
```

---

## Quick Start (Do This Now)

1. Go to posthog.com, sign up
2. Copy your project API key
3. Run:
```bash
cd /Users/jamesknight/GitHub/milehiiv
vercel env add NEXT_PUBLIC_POSTHOG_KEY production
# paste: phc_your_key_here

vercel env add NEXT_PUBLIC_POSTHOG_HOST production  
# paste: https://app.posthog.com
```

Then I'll wire it into the app.
