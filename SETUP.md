# SAPSA Website Setup Guide

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `sapsa` (or your preferred name)
4. Follow the setup wizard

### 2. Enable Services

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in **production mode** (we'll set up security rules)
4. Choose a location
5. Create database

#### Firebase Authentication
1. Go to Authentication
2. Click "Get started"
3. Enable "Email/Password" provider
4. Save

#### Firebase Storage
1. Go to Storage
2. Click "Get started"
3. Start in **production mode**
4. Choose a location
5. Done

### 3. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Register app (name: "SAPSA Web")
5. Copy the configuration object

### 4. Set Environment Variables

**CRITICAL:** Create `.env.local` in the project root (same level as `package.json`).

1. Go to Firebase Console → Project Settings → General → Your apps → Web app
2. Copy the Web App configuration (NOT Admin SDK)
3. Create `.env.local` with these exact variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important:**
- ⚠️ No quotes, no spaces, no trailing comments
- ⚠️ All variables MUST start with `NEXT_PUBLIC_`
- ⚠️ Use Web App config, NOT Admin SDK
- ⚠️ Restart dev server after creating/updating `.env.local` (env vars don't hot reload)

### 5. Create Firestore Collections

The app will create collections automatically when you add data, but you can pre-create them:

**Collections to create:**
- `events` - for competition events
- `results` - for competition results
- `news` - for news articles
- `documents` - for rules, policies, etc.
- `admins` - for admin user allowlist

### 6. Set Up Admin Users

1. Go to Firestore Database
2. Create collection: `admins`
3. Add documents where the **document ID** is the admin email address
4. The document can be empty `{}` or include:
   ```json
   {
     "email": "admin@example.com",
     "createdAt": [timestamp]
   }
   ```

**Important:** The document ID must be the email address for the allowlist to work.

### 7. Create First Admin User

1. Go to Authentication in Firebase Console
2. Click "Add user"
3. Enter email and password
4. This user can now log in at `/admin/login` if their email is in the `admins` collection

### 8. Security Rules (Optional but Recommended)

#### Firestore Rules
Go to Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /events/{document=**} {
      allow read: if request.resource.data.isPublished == true;
      allow write: if false; // Only via admin dashboard
    }
    match /news/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /results/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /documents/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Admin collection - no public access
    match /admins/{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### Storage Rules
Go to Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only via admin dashboard
    }
  }
}
```

**Note:** These rules prevent public writes. All writes should go through the admin dashboard which uses Firebase Auth.

## First Steps After Setup

1. Start the dev server: `pnpm dev`
2. Visit `http://localhost:3000/admin/login`
3. Log in with your admin credentials
4. Add your first event, news article, or document
5. Visit the public site to see your content

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Authentication > Settings > Authorized domains
- Add your domain (localhost for dev, your domain for production)

### "Permission denied" errors
- Check that your admin email is in the `admins` collection
- Verify the document ID matches your email exactly
- Check Firestore security rules

### Images/PDFs not uploading
- Check Storage rules
- Verify Storage bucket is created
- Check browser console for errors
