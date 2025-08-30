import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';

export function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    try {
      const raw = process.env.FIREBASE_ADMIN_SDK;
      let parsed: any | undefined;

      if (raw) {
        // Try plain JSON
        try {
          parsed = JSON.parse(raw);
        } catch {
          // Try base64
          try {
            const decoded = Buffer.from(raw, 'base64').toString('utf8');
            parsed = JSON.parse(decoded);
          } catch {
            // Try newline-normalised JSON
            try {
              const normalised = raw.replace(/\\n/g, '\n');
              parsed = JSON.parse(normalised);
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Unknown parsing error';
              throw new Error(`Failed to parse FIREBASE_ADMIN_SDK: ${message}`);
            }
          }
        }
      }

      // Accept both underscore and camelCase keys, or separate env vars
      const projectId = parsed?.projectId || parsed?.project_id || process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      let privateKey = parsed?.privateKey || parsed?.private_key || process.env.FIREBASE_ADMIN_PRIVATE_KEY;
      const clientEmail = parsed?.clientEmail || parsed?.client_email || process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

      if (privateKey) {
        // Trim any accidental wrapping quotes/backticks
        privateKey = privateKey.replace(/^['"`]+|['"`]+$/g, '');
        // Convert escaped newlines to real newlines
        if (privateKey.includes('\\n')) {
          privateKey = privateKey.replace(/\\n/g, '\n');
        }
        // Normalise any stray carriage returns
        privateKey = privateKey.replace(/\r/g, '');
        // If the key looks base64-encoded, try to decode
        if (!privateKey.includes('BEGIN PRIVATE KEY') && /^[A-Za-z0-9+/=\r\n]+$/.test(privateKey)) {
          try {
            const decoded = Buffer.from(privateKey, 'base64').toString('utf8');
            if (decoded.includes('BEGIN PRIVATE KEY')) {
              privateKey = decoded;
            }
          } catch {}
        }
        // Support RSA PRIVATE KEY headers as well
        if (privateKey.includes('BEGIN RSA PRIVATE KEY')) {
          // Admin SDK accepts RSA as well; keep as-is
        }
      }

      const serviceAccount: ServiceAccount = {
        projectId,
        privateKey,
        clientEmail,
      } as ServiceAccount;

      if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
        throw new Error('Firebase Admin credentials are incomplete.');
      }

      initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      throw error;
    }
  }
}
