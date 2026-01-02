# Firebase Environment Variables Setup

## Quick Setup Guide

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com/
   - Select your project (or create a new one)

2. **Get Web App Configuration**
   - Click the gear icon (⚙️) → Project Settings
   - Scroll to "Your apps" section
   - Click the web icon (`</>`) or "Add app" if no web app exists
   - Register your app (name it "SAPSA Web")
   - Copy the configuration object

3. **Update .env.local**
   - Open `.env.local` in the project root
   - Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sapsa-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sapsa-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sapsa-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

4. **Restart Dev Server**
   ```bash
   pnpm dev
   ```

## Important Notes

- ⚠️ **Never commit `.env.local`** - it's already in `.gitignore`
- ✅ All variables must start with `NEXT_PUBLIC_` for client-side access
- ✅ No quotes, no spaces, no trailing comments
- ✅ Restart the dev server after changing env vars (they don't hot reload)

## For Vercel Deployment

Add the same environment variables in:
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Add each variable with the same name and value
- Deploy after adding variables
