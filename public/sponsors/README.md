# Sponsor Logos

Place sponsor logo files in this directory.

## Supported Formats
- PNG (recommended with transparent background)
- SVG (recommended for scalability)
- JPG/JPEG

## File Naming Convention

Use descriptive, lowercase names with hyphens:
- `sponsor-company-name.png`
- `sponsor-brand-name.svg`
- `sponsor-partner-logo.png`

Examples:
- `sponsor-acme-corp.png`
- `sponsor-firearms-supplier.svg`
- `sponsor-range-partner.png`

## Usage in Code

Reference sponsor logos from the root path:

```tsx
// In React components
<img src="/sponsors/sponsor-company-name.png" alt="Company Name" />

// Or using Next.js Image component
import Image from 'next/image';
<Image 
  src="/sponsors/sponsor-company-name.png" 
  alt="Company Name" 
  width={200} 
  height={100} 
/>
```

## Recommended Image Specifications
- **Width**: 200-400px (for display)
- **Height**: 100-200px (maintain aspect ratio)
- **Format**: PNG with transparent background (preferred)
- **File size**: Keep under 500KB for web performance
