# SAPSA Logo

Place the SAPSA logo file(s) in this directory.

## Supported Formats
- PNG (recommended)
- SVG (recommended for scalability)
- JPG/JPEG

## Usage in Code

Reference the logo from the root path:

```tsx
// In React components
<img src="/logo/sapsa-logo.png" alt="SAPSA Logo" />

// Or using Next.js Image component
import Image from 'next/image';
<Image src="/logo/sapsa-logo.png" alt="SAPSA Logo" width={200} height={100} />
```

## File Naming
- Main logo: `sapsa-logo.png` or `sapsa-logo.svg`
- Favicon: `favicon.ico` (place in `public/` root)
- Icon variants: `sapsa-icon.png`, `sapsa-logo-white.png`, etc.
