# Hand Line Company – Website

Modern, multilingual website for Hand Line Company, an Italian manufacturer of industrial safety gloves. Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Firebase (authentication), Supabase (data), Resend (email), and Google Maps for contact and location features.

We speak SAFETY. Design is clear, just like our mission. We protect your hands – evolution, not revolution.

## Tech stack

- Next.js (App Router) and React with TypeScript
- Tailwind CSS and shadcn/ui
- Firebase Authentication and optional Firebase Admin SDK
- Supabase (PostgreSQL) for structured data
- Resend for transactional emails (contact, partnerships, distribution, product enquiries)
- Google Maps JavaScript & Static Maps APIs for the contact map
- Deployed to Vercel

## Getting started

1. Ensure you have Node.js LTS installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` at the project root and populate the environment variables below.
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment variables (.env.local)

Set the following variables for local development and in your Vercel project settings for production. Never expose server-only secrets (e.g. service role keys) to the client.

### Firebase Admin (server-only)

Used when initialising `firebase-admin` for server-side tasks.

```bash
# JSON string of your Firebase service account
FIREBASE_ADMIN_SDK={"type":"service_account","project_id":"your-project-id","private_key":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk@your-project-id.iam.gserviceaccount.com"}
```

### Firebase client config (recommended)

If you prefer not to hard-code the Firebase web config, move it to environment variables and update `components/firebase-providers.tsx` to read from these variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
# Optional
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Supabase

The client uses the public URL and anon key. The service role key is optional for server-side admin tasks only.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Server-only (never expose to the browser)
SUPABASE_SERVICE_ROLE_KEY=
```

### Google Maps API

Required for the contact map (`components/website/contact/contact-info-1.tsx`).

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

### Resend API (emails)

Used for contact, partnership, distribution, and product enquiry forms handled via server routes.

```bash
RESEND_API_KEY=
```

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Lint the codebase
```

## Notes

- Keep server-only secrets (`FIREBASE_ADMIN_SDK`, `SUPABASE_SERVICE_ROLE_KEY`, etc.) off the client. Do not prefix them with `NEXT_PUBLIC_`.
- Ensure rate limiting and validation on API routes handling form submissions.
- For production, configure the same environment variables in Vercel.

---

Created by [Jack Oliver Dev](https://jackodev.vercel.app/)
