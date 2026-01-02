# Public Assets Directory

This directory contains static assets that are served directly by Next.js.

## Directory Structure

```
public/
├── logo/           # SAPSA logo files
├── sponsors/       # Sponsor logo files
└── README.md       # This file
```

## How It Works

Files in the `public` directory are served from the root URL path.

- `public/logo/sapsa-logo.png` → accessible at `/logo/sapsa-logo.png`
- `public/sponsors/sponsor-name.png` → accessible at `/sponsors/sponsor-name.png`

## Adding Files

1. Copy your logo/sponsor image files into the appropriate subdirectory
2. Reference them in your code using the root path (starting with `/`)
3. Files are automatically available after saving (no restart needed)

## Best Practices

- Use descriptive filenames (lowercase, hyphens for spaces)
- Optimize images for web (compress, appropriate dimensions)
- Use PNG with transparency for logos when possible
- Consider SVG for scalable logos
