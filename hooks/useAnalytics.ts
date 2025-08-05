import { useCallback } from 'react';
import { event } from '@/lib/analytics';

export const useAnalytics = () => {
  // Track page views (automatically handled by GoogleAnalytics component)
  const trackPageView = useCallback((url: string) => {
    // This is handled automatically by the GoogleAnalytics component
    // but can be called manually if needed
  }, []);

  // Track custom events
  const trackEvent = useCallback((action: string, parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }) => {
    event(action, parameters);
  }, []);

  // Specific tracking functions for common events
  const trackProductView = useCallback((productName: string, productId: string) => {
    trackEvent('view_item', {
      event_category: 'ecommerce',
      event_label: productName,
      item_id: productId,
      item_name: productName,
    });
  }, [trackEvent]);

  const trackSampleRequest = useCallback((productName: string) => {
    trackEvent('request_sample', {
      event_category: 'engagement',
      event_label: productName,
    });
  }, [trackEvent]);

  const trackContactSubmission = useCallback((formType: string) => {
    trackEvent('form_submission', {
      event_category: 'contact',
      event_label: formType,
    });
  }, [trackEvent]);

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackEvent('file_download', {
      event_category: 'engagement',
      event_label: fileName,
      file_type: fileType,
    });
  }, [trackEvent]);

  const trackSearch = useCallback((searchTerm: string, resultCount: number) => {
    trackEvent('search', {
      event_category: 'engagement',
      search_term: searchTerm,
      result_count: resultCount,
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackProductView,
    trackSampleRequest,
    trackContactSubmission,
    trackDownload,
    trackSearch,
  };
}; 