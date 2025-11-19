# HandLine Company Website - Project Handover Document

## Project Overview

The HandLine Company website is a comprehensive B2B informational platform built for an Italian manufacturer of industrial safety gloves and PPE equipment. The site features a bilingual (English/Italian) product catalogue with advanced filtering, an admin dashboard for content management, a blog and case studies system, industry solutions pages, PPE standards resource hub, and a careers portal with job application functionality. The entire system is built using modern web technologies: Next.js 14 with the App Router, React 18, TypeScript, and Tailwind CSS for styling. The architecture follows a server-side rendering approach with API routes for backend operations, ensuring optimal performance and SEO. The design system uses HandLine's brand colours (Primary Orange #F28C38, Dark Grey #1E1E1E) with Montserrat for headings and Open Sans for body text, delivering a clean, professional B2B experience.

---

## Services & Infrastructure

### 1. **Supabase** (Database & Storage)

**Purpose**: Primary database (PostgreSQL) and file storage solution

**Usage**: Stores all product data, blog posts, case studies, career postings, industry solutions, PPE standards. Storage buckets for all image uploads (products, blog, case studies, industries).

**Integration**: Connected via `@supabase/supabase-js` library using environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Login Details:**
- **Project Name**: Handline-website
- **Project URL**: https://bsrdkfjapuvbzultcela.supabase.co
- **Dashboard URL**: https://supabase.com/dashboard/project/bsrdkfjapuvbzultcela
- **Organization**: Jack Oliver Dev (Free tier)
- **Admin Emails**: 
  - jackoliverdev@gmail.com (Owner)
  - enquiries@handlineco.com (Owner - Luca)
- **Project ID**: bsrdkfjapuvbzultcela
- **DB Password**: HandLine2504!
- **Anon Public Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcmRrZmphcHV2Ynp1bHRjZWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjQ4NzIsImV4cCI6MjA2MTI0MDg3Mn0.fctpamrmKmBhpUs5C85godGa1vyhUfeJ0K9zUXvEhI4
- **Service Role Secret** (admin only): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcmRrZmphcHV2Ynp1bHRjZWxhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTY2NDg3MiwiZXhwIjoyMDYxMjQwODcyfQ.V61Xj54p0tZyY4WuMvXLC_qeXHOTNHJnb8ABtoFNroU
- **JWT Secret**: TyVrvtlSeyECcQe38eZyxWEfBOQVJkygkiW0MhQ0ZIaW1nKU2XFi3GZCAFn4r+YxFmfvcCnfCJhfXjfvsHV9Rw== 

---

### 2. **Firebase** (Authentication)

**Purpose**: User authentication and authorization system for admin dashboard

**Usage**: Handles admin user login/logout, password resets, secures API routes and admin pages with token-based authentication.

**Integration**: Firebase Admin SDK for server-side auth verification, Firebase Client SDK for login UI

**Login Details:**
- **Console URL**: https://console.firebase.google.com
- **Project ID**: handline-website
- **API Key**: AIzaSyAFzQLmfuLX5s8F4_l3QCoYGZWl--yR9cs
- **Auth Domain**: handline-website.firebaseapp.com
- **Storage Bucket**: handline-website.firebasestorage.app
- **Messaging Sender ID**: 467777494418
- **App ID**: 1:467777494418:web:c63fd5b57bd81dd71ab54b
- **Service Account Email**: firebase-adminsdk-fb5vc@handline-website.iam.gserviceaccount.com
- **Private Key**: See `handoverenv.md` for full Firebase Admin Private Key

**Admin Users:**
- **jackoliverdev@gmail.com** (Owner)
  - Firebase UID: gTdicieVP0MbrIfcW1iwEvwtWOk2
- **enquiries@handlineco.com** (Owner - Luca)
  - Firebase UID: 1Kykqjgraye2W3g5euyRv1UOOQi1
  - Password: HandLine1611*

**Authorized Admin Emails (hardcoded in API routes):**
- jackoliverdev@gmail.com
- enquiries@handlineco.com

---

### 3. **Vercel** (Hosting & Deployment)

**Purpose**: Production hosting and continuous deployment platform

**Usage**: Hosts live site at handlineco.com, automatic deployments from GitHub main branch, manages environment variables, provides analytics.

**Integration**: Connected directly to GitHub repository, deploys Next.js build output automatically

**Login Details:**
- **Dashboard URL**: https://vercel.com/dashboard
- **Account Owner**: Luca Castronuovo
- **Account Email**: luca.castronuovo@handlineco.com
- **Project Name**: handline
- **Production URL**: https://handlineco.com
- **Git Repository**: https://github.com/jackoliverdev/handline2.git

**Note**: The Vercel account is set up under Luca's name and email (luca.castronuovo@handlineco.com) as this connects directly to the handlineco.com domain and manages hosting billing. All environment variables are configured in the Vercel dashboard under Project Settings → Environment Variables (see `handoverenv.md` for values). 

---

### 4. **GitHub** (Version Control)

**Purpose**: Source code repository and version history

**Usage**: Stores all codebase with git history, manages branches and releases, integrates with Vercel for automatic deployments.

**Login Details:**
- **Repository URL**: https://github.com/jackoliverdev/handline2.git
- **Organization/Owner**: jackoliverdev
- **Repository Name**: handline2
- **Main Branch**: main

**Collaborators:**
- **jackoliverdev@gmail.com** (Owner)
- **enquiries@handlineco.com** (Admin - Luca)

**Note**: Invitation sent to enquiries@handlineco.com. Luca will need to accept the invitation (may need to create a GitHub account with this email if one doesn't exist). Admin access allows full repository management and pushing code changes which trigger automatic Vercel deployments.

---

### 5. **Resend** (Email Service)

**Purpose**: Transactional email delivery for all website forms

**Usage**: Contact forms, job applications, partnership inquiries, distribution inquiries, product inquiries, password reset emails. All sent from `noreply@mail.handlineco.com` to `enquiries@handlineco.com`.

**Integration**: Resend API via environment variable `RESEND_API_KEY`, custom email functions in `lib/resend.ts`

**Login Details:**
- **Dashboard URL**: https://resend.com
- **Account Owner**: jackoliverdev@gmail.com
- **Verified Domain**: mail.handlineco.com
- **API Key**: re_2cfjnqb6_MMP2jYdC21iAY7RK6Vh6vZs1
- **Send From**: noreply@mail.handlineco.com
- **Send To**: enquiries@handlineco.com

**Team Members:**
- **jackoliverdev@gmail.com** (Admin)
- **enquiries@handlineco.com** (Admin - Luca)

**Note**: Luca has been added as Admin with full access to manage domains, emails, and API keys.

---

### 6. **Aruba** (DNS & Domain Management)

**Purpose**: DNS hosting for handlineco.com domain

**Usage**: Main domain DNS records pointing to Vercel, email DNS records (MX, TXT, DMARC) for Resend verification, subdomain mail.handlineco.com for email sending.

**Login Details:**
- **DNS Panel URL**: https://dns-panel.aruba.it
- **Account Owner**: Luca Castronuovo
- **Domain**: handlineco.com

**Key DNS Records:**
- A record → Vercel (for handlineco.com website)
- MX record (send.mail) → feedback-smtp.eu-west-1.amazonses.com
- TXT records → SPF, DKIM, DMARC for email verification (mail.handlineco.com)

**Note**: Luca already has full DNS access as he purchased the handlineco.com domain. All DNS records for Vercel hosting and Resend email are configured and verified.

## Code Structure Overview

### **`/app` Directory** (Next.js App Router)

- **`/app/(main)`**: Public website pages - product catalogue, about, contact, industries, blog, case studies, PPE standards hub, careers
- **`/app/admin`**: Admin dashboard - product management, blog editor, case studies, careers, industry solutions, PPE standards
- **`/app/api`**: API routes - contact, careers, partnership, distribution, product inquiry, password reset
- **`/app/dashboard`**: Client portal foundation (ready for future expansion - orders, documents, CRM/ERP integration)

### **`/components` Directory**

- **`/components/admins`**: Admin dashboard components - product forms, markdown editors, content management
- **`/components/website`**: Public website components - product cards, filtering, navigation, hero sections, forms
- **`/components/ui`**: Shadcn UI library - buttons, cards, dialogs, forms, inputs, badges

### **`/lib` Directory**

- **`/lib/*-service.ts`**: Data fetching services for Supabase
- **`/lib/resend.ts`**: Email sending functions
- **`/lib/firebase-admin.ts`**: Firebase Admin SDK
- **`/lib/supabase.ts`**: Supabase client
- **`/lib/translations`**: `en.json` and `it.json` for bilingual content
- **`/lib/context`**: React context providers (language switching)

### **`/docs` Directory**

Feature documentation and technical notes - reference for in-depth understanding of complex features, database schemas, implementation decisions.

### **`/public` Directory**

Static assets - hero images, product placeholders, icons, logos, brand assets.

---

## Environment Variables

All environment variables are configured in Vercel production settings. For local development, create a `.env.local` file.

**Complete environment configuration with all API keys and secrets is documented in `handoverenv.md`.**

This includes:
- Supabase connection strings and API keys
- Firebase configuration and admin private key
- Resend API key for email delivery
- Google Maps API key
- Site URL configuration

---

## Admin Dashboard Access

**URL**: https://handlineco.com/admin

**Authorized Admin Email**: enquiries@handlineco.com

**Admin Login Credentials:**
- **Email**: enquiries@handlineco.com
- **Password**: HandLine1611*
- **Firebase UID**: 1Kykqjgraye2W3g5euyRv1UOOQi1 

---

## Future Development Opportunities

The dashboard structure (`/app/dashboard`) is ready for expansion into a full customer portal. Future development could integrate with HandLine's CRM/ERP/logistics systems to provide:
- Real-time order tracking and history
- Invoice downloads and payment management
- Custom product catalogues and pricing
- Quotation requests and approval workflows
- Document library (safety certificates, product specs)

---

## Support & Bug Tracking

**Bug Tracker**: https://docs.google.com/spreadsheets/d/1L9Yv4YlfDuEPTTkvk7ju7-my2exfzsf5Zxv8LjOMln8/edit?gid=0#gid=0

The tracker has two tabs:
- **Bugs**: Issues that need fixing (fixed free of charge)
- **Improvements**: Enhancement requests (<1 hour: reasonable rates, major features: scoped separately)

**How to use:**
1. Add new issues to the appropriate tab (Bugs or Improvements)
2. Include title, description, and priority
3. Jack will review, estimate time/cost for improvements, and update status

---

## Key Technical Notes

- **Bilingual**: Content stored with `_locales` JSONB fields (e.g., `title_locales: {en: "...", it: "..."}`)
- **Images**: Uploaded to Supabase Storage buckets, referenced by public URL
- **Filtering**: Client-side filtering for instant response
- **SEO**: Server-side rendering for search engine indexing
- **Mobile-First**: Responsive design with Tailwind CSS
- **Performance**: Core Web Vitals optimized, lazy-loaded images

---

## Developer Contact & Handover Call

**Developer**: Jack Melluish  
**Email**: jackoliverdev@gmail.com  
**Available for**: Ongoing support, bug fixes, improvement estimates

**Handover Call Scheduled**: Wednesday, 1:30 PM (1-hour walkthrough)
- Handover doc walkthrough

---

*Document Version: 1.0*  
*Last Updated: 16/11/2025*  
*Project Status: Production Live on handlineco.com*

