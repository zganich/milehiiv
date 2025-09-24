# MileHiiv Design System

## Overview

MileHiiv uses a world-class design system inspired by Apple's Liquid Glass design language and the latest UI/UX best practices from top tech companies. This system ensures consistency, accessibility, and a premium user experience.

## Design Principles

### 1. Apple's Liquid Glass Design Language
- **Translucency**: Elements use glass-like backgrounds with backdrop blur
- **Depth**: Layered elements with proper shadows and elevation
- **Fluid Responsiveness**: Smooth animations and transitions
- **Unified Aesthetic**: Consistent visual language across all components

### 2. User-Centered Design
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile-First**: Responsive design for all screen sizes
- **Grandma Test**: Intuitive interface that anyone can use
- **Performance**: Optimized for speed and smooth interactions

### 3. Modern Best Practices
- **Micro-interactions**: Subtle feedback for user actions
- **Progressive Enhancement**: Works without JavaScript
- **Semantic HTML**: Proper markup for screen readers
- **Reduced Motion**: Respects user preferences

## Color System

### Primary Palette
```css
--primary: #007aff;        /* Apple Blue */
--primary-dark: #0056b3;   /* Darker blue for hover states */
--primary-light: #4da6ff;  /* Lighter blue for accents */
```

### Secondary Colors
```css
--secondary: #8e8e93;      /* Apple Gray */
--accent: #30d158;         /* Apple Green */
--accent-warm: #ff9500;    /* Apple Orange */
--accent-cold: #5ac8fa;    /* Apple Light Blue */
```

### Neutral Colors
```css
--background: #ffffff;     /* Pure white */
--foreground: #1d1d1f;     /* Dark text */
--border: #d2d2d7;         /* Light borders */
--muted: #f2f2f7;          /* Background accents */
```

### Dark Mode Support
All colors automatically adapt to dark mode using CSS custom properties and `prefers-color-scheme`.

## Typography System

### Font Stack
- **Primary**: Geist Sans (Apple San Francisco inspired)
- **Monospace**: Geist Mono
- **Fallback**: system-ui, -apple-system, sans-serif

### Type Scale
```css
--font-size-xs: 0.75rem;   /* 12px - Captions */
--font-size-sm: 0.875rem;  /* 14px - Small text */
--font-size-base: 1rem;    /* 16px - Body text */
--font-size-lg: 1.125rem;  /* 18px - Large body */
--font-size-xl: 1.25rem;   /* 20px - Small headings */
--font-size-2xl: 1.5rem;   /* 24px - Medium headings */
--font-size-3xl: 1.875rem; /* 30px - Large headings */
--font-size-4xl: 2.25rem;  /* 36px - Display text */
--font-size-5xl: 3rem;     /* 48px - Hero text */
```

### Typography Classes
- `.text-display` - Hero text (48px, bold)
- `.text-headline` - Large headings (30px, semibold)
- `.text-title` - Medium headings (20px, semibold)
- `.text-body` - Body text (16px, regular)
- `.text-caption` - Small text (14px, regular, muted)

## Spacing System

Based on an 8px grid system for consistent spacing:

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

## Border Radius System

Apple-inspired consistent rounding:

```css
--radius-sm: 0.375rem;  /* 6px - Small elements */
--radius-md: 0.5rem;    /* 8px - Buttons */
--radius-lg: 0.75rem;   /* 12px - Cards */
--radius-xl: 1rem;      /* 16px - Large cards */
--radius-2xl: 1.5rem;   /* 24px - Hero elements */
```

## Component Examples

### Buttons

```tsx
// Primary button with Apple-style shadow and hover effects
<Button variant="primary" size="lg">
  Get Started
</Button>

// Glass button with backdrop blur
<Button variant="glass" size="md">
  Learn More
</Button>

// Ghost button for secondary actions
<Button variant="ghost" size="sm">
  Cancel
</Button>
```

### Cards

```tsx
// Liquid glass card with hover effects
<Card variant="glass" hover padding="lg">
  <CardHeader>
    <CardTitle>PDF Processing</CardTitle>
  </CardHeader>
  <CardContent>
    Upload your mileage PDFs and automatically extract trip data.
  </CardContent>
</Card>

// Solid card for content sections
<Card variant="solid" padding="xl">
  <h3>Dashboard Overview</h3>
  <p>Your mileage statistics and insights</p>
</Card>
```

### File Upload

```tsx
// Enhanced file upload with drag & drop
<FileUpload
  onFileSelect={handleFileUpload}
  accept=".pdf"
  maxSize={10}
  className="mb-6"
/>
```

## Animation System

### Easing Functions
- **Standard**: `cubic-bezier(0.16, 1, 0.3, 1)` - Apple's preferred easing
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful interactions
- **Ease-out**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Quick exits

### Animation Classes
- `.fade-in` - Smooth entrance animation
- `.slide-up` - Slide up from bottom
- `.scale-in` - Scale in from center
- `.micro-bounce` - Subtle hover bounce
- `.pulse-glow` - Pulsing glow effect

### Duration Standards
- **Quick**: 200ms - Hover states, focus changes
- **Standard**: 300ms - Component transitions
- **Slow**: 500ms - Page transitions, complex animations

## Accessibility Features

### Focus Management
- Custom focus rings with proper contrast
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels and descriptions

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
  :root {
    --border: #000000;
    --primary: #0000ff;
    --background: #ffffff;
    --foreground: #000000;
  }
}
```

## Implementation Guidelines

### 1. Component Usage
- Always use the design system components
- Follow the established patterns
- Maintain consistency across pages
- Test with screen readers

### 2. Customization
- Use CSS custom properties for theming
- Extend components rather than modifying core styles
- Maintain accessibility standards
- Test across devices and browsers

### 3. Performance
- Use CSS transforms for animations
- Minimize repaints and reflows
- Optimize images and assets
- Implement lazy loading

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **CSS Features**: CSS Grid, Flexbox, Custom Properties, Backdrop Filter
- **Fallbacks**: Graceful degradation for older browsers

## Design Tokens

All design tokens are defined as CSS custom properties in `globals.css`:

```css
:root {
  /* Colors */
  --primary: #007aff;
  --secondary: #8e8e93;
  
  /* Typography */
  --font-size-base: 1rem;
  --font-weight-medium: 500;
  
  /* Spacing */
  --space-4: 1rem;
  
  /* Borders */
  --radius-lg: 0.75rem;
  
  /* Shadows */
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

This design system ensures MileHiiv delivers a premium, accessible, and consistent user experience that rivals the best apps from Apple and other top tech companies.
