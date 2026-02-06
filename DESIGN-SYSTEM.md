# MileHiiv Design System

## Overview

MileHiiv uses a minimal, trust-forward design system built for compliance, clarity, and conversion. The system prioritizes calm confidence over hype — no neon gradients, no crypto vibes. Designed for gig drivers who care about accuracy, deductions, and audit readiness.

## Design Principles

### 1. Trust-First
- **Calm confidence**: Professional, not salesy
- **Compliance-forward**: Language that holds up to scrutiny
- **Plain English**: No jargon, no exaggerated claims

### 2. Conversion-Oriented
- **Outcome-driven hero**: Leads with loss prevention
- **Strong CTAs**: Verb-led, high contrast
- **Multiple upload entry points**: Funnel toward upload on every key page

### 3. Minimal and Legitimate
- **Clean typography**: Inter, Geist, or system sans
- **Soft shadows, rounded corners**: Signals quality without gimmicks
- **Subtle motion only**: Hover, scroll fade — no flashy animations

## Color System

### Primary Palette
```css
--accent: #2563eb;        /* Trust blue */
--accent-hover: #1e40af;  /* Darker blue for hover */
```

### Neutral Colors
```css
--bg: #f8fafc;           /* Off-white / light gray background */
--card: #ffffff;          /* White cards */
--muted: #f1f5f9;         /* Muted backgrounds */
--text: #0f172a;          /* Near-black text */
--text-secondary: #475569;/* Secondary text */
--text-muted: #64748b;    /* Muted text */
--border: #e2e8f0;        /* Light borders */
```

### Semantic Colors
```css
--success: #16a34a;
--warning: #d97706;
--danger: #dc2626;
```

### Dark Mode
Automatically adapts via `prefers-color-scheme: dark`.

## Typography

### Font Stack
- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Fallback**: Geist Sans where available

### Hierarchy
- **h1**: clamp(2.5rem, 4vw, 3.5rem), font-weight 600
- **h2**: clamp(2rem, 3vw, 2.6rem)
- **h3**: 1.25rem
- **Body**: 1rem, line-height 1.6, max-width 60ch

## Spacing and Radius

```css
--radius-sm: 10px;
--radius: 14px;
--radius-lg: 20px;
--shadow-sm: 0 4px 10px rgba(15, 23, 42, 0.06);
--shadow-md: 0 10px 30px rgba(15, 23, 42, 0.08);
```

## Components

### Buttons
- **Primary**: Solid accent background, white text
- **Secondary**: Outline/ghost, border only
- Always verb-led: "Upload", "View", "Download"

### Cards
- White background, subtle border, soft shadow
- Hover: translateY(-4px), elevated shadow
- Used for step cards, audience cards, stat cards

### CTAs
- Primary: "Upload your driving data"
- Secondary: "See how it works", "Download a sample report"

## Implementation

All design tokens live in `src/app/globals.css`. Use existing components: Button, Sidebar, StatCard, Table, UploadZone, EmptyState, MarketingHeader, Footer.

## Accessibility

- WCAG 2.1 AA compliance
- Respects `prefers-reduced-motion`
- Semantic HTML, proper heading hierarchy
