# SAPSA - South African Practical Shooting Association

Official website for the South African Practical Shooting Association.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase** (Firestore, Auth, Storage)
- **Vercel** (Hosting)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env.local` file in the project root with your Firebase Web App configuration:

**Get your config from Firebase Console:**
- Go to Firebase Console → Project Settings → General → Your apps → Web app
- Copy the Web App configuration (NOT Admin SDK)

**Add to `.env.local`:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
```

**⚠️ Important:**
- No quotes, no spaces, no comments
- All variables MUST start with `NEXT_PUBLIC_`
- Use Web App config, NOT Admin SDK
- Restart dev server after creating `.env.local`

3. Set up Firebase:
   - Create a Firestore database
   - Enable Firebase Authentication (Email/Password)
   - Create a Storage bucket
   - Create an `admins` collection in Firestore
   - Add admin emails as document IDs in the `admins` collection

4. Run the development server:
```bash
pnpm dev
```

## Firebase Collections

- `events` - Competition events
- `results` - Competition results (PDFs)
- `news` - News articles
- `documents` - Rules, policies, governance documents
- `admins` - Admin user allowlist (document ID = email)

## Admin Access

Admin login is available at `/admin/login`. Only users with emails in the `admins` Firestore collection can access the admin dashboard.

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Project Structure

```
/app
  /admin          # Admin dashboard (protected)
  /about          # About page
  /events         # Events listing and details
  /results        # Results page
  /clubs          # Club directory
  /documents      # Documents page
  /news           # News listing and articles
  /sponsors       # Sponsors page
  /contact        # Contact page
/components       # React components
/lib/firebase     # Firebase utilities
```
