# Google Analytics Implementation

This project includes a comprehensive Google Analytics setup for tracking user interactions and page views.

## Files Created

- `lib/analytics.ts` - Core Google Analytics functions
- `components/analytics/GoogleAnalytics.tsx` - React component for GA scripts and page tracking
- `hooks/useAnalytics.ts` - Custom hook for easy event tracking

## Setup

The Google Analytics tracking ID is configured in `lib/analytics.ts`:
```typescript
export const GA_TRACKING_ID = 'G-PWXEKNTCM4';
```

## Automatic Tracking

### Page Views
- Automatically tracked on all page navigation
- Handled by the `GoogleAnalytics` component in the root layout

## Manual Event Tracking

Use the `useAnalytics` hook in any component:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { trackEvent, trackProductView, trackSampleRequest } = useAnalytics();

  const handleButtonClick = () => {
    trackEvent('button_click', {
      event_category: 'engagement',
      event_label: 'header_cta'
    });
  };

  return <button onClick={handleButtonClick}>Click me</button>;
};
```

## Available Tracking Functions

- `trackEvent(action, parameters)` - Generic event tracking
- `trackProductView(productName, productId)` - Product page views
- `trackSampleRequest(productName)` - Sample requests
- `trackContactSubmission(formType)` - Contact form submissions
- `trackDownload(fileName, fileType)` - File downloads
- `trackSearch(searchTerm, resultCount)` - Search queries

## Current Implementation

The following pages/components already have GA tracking:

### Product Detail Pages
- Product views (automatic on page load)
- Sample requests (button clicks)
- Contact form submissions (button clicks)
- Document downloads (all download buttons)

## Adding More Tracking

To add tracking to other components:

1. Import the hook: `import { useAnalytics } from '@/hooks/useAnalytics';`
2. Use the hook: `const { trackEvent } = useAnalytics();`
3. Call tracking functions on user interactions

Example for search tracking:
```typescript
const handleSearch = (query: string, results: number) => {
  trackSearch(query, results);
};
```

## Analytics Dashboard

Visit [Google Analytics](https://analytics.google.com/) to view your data with measurement ID: `G-PWXEKNTCM4` 