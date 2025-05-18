import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';

export function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    try {
      const serviceAccountStr = process.env.FIREBASE_ADMIN_SDK;
      if (!serviceAccountStr) {
        throw new Error('FIREBASE_ADMIN_SDK environment variable is not set');
      }

      // Parse the service account string
      let serviceAccount: ServiceAccount;
      try {
        // First try parsing it directly
        serviceAccount = JSON.parse(serviceAccountStr) as ServiceAccount;
      } catch (parseError) {
        // If direct parsing fails, try cleaning the string
        const cleanedStr = serviceAccountStr
          // Replace escaped newlines with actual newlines
          .replace(/\\n/g, '\n')
          // Remove any unexpected control characters
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
          // Fix any double-escaped quotes
          .replace(/\\"/g, '"')
          // Remove any trailing commas in objects and arrays
          .replace(/,([\s\r\n]*[}\]])/g, '$1');

        try {
          serviceAccount = JSON.parse(cleanedStr) as ServiceAccount;
        } catch (error) {
          const parseError = error instanceof Error ? error.message : 'Unknown parsing error';
          throw new Error(`Failed to parse FIREBASE_ADMIN_SDK: ${parseError}`);
        }
      }

      // Validate the required fields
      if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
        throw new Error('FIREBASE_ADMIN_SDK is missing required fields');
      }

      initializeApp({
        credential: cert(serviceAccount)
      });
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      throw error;
    }
  }
}
