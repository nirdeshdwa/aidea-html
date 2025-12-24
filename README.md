# AIDEA 2026 - Static HTML Site

A simple, static HTML website for AIDEA 2026 that can be easily deployed to Vercel.

## Structure

```
static-site/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles
├── script.js       # JavaScript for interactions
├── vercel.json     # Vercel configuration
├── public/         # Static assets (images, logos)
└── README.md       # This file
```

## Setup

1. **Update Google Forms Link:**
   - Open `index.html`
   - Find all instances of `https://forms.google.com/your-form-link-here`
   - Replace with your actual Google Forms URL

2. **Update Assets:**
   - Replace logo files in `public/` directory if needed
   - Update partner/sponsor logos in `public/logos/` directory

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import this `static-site` folder
   - Vercel will automatically detect it as a static site
   - Deploy!

## Features

- ✅ Single HTML file - no build process needed
- ✅ Pure CSS - no dependencies
- ✅ Smooth scrolling navigation
- ✅ Scroll animations
- ✅ Responsive design
- ✅ Mentors carousel with auto-scroll
- ✅ All content from the original Next.js site

## Customization

- **Colors:** Edit CSS variables in `styles.css` (lines 5-15)
- **Content:** Edit `index.html` directly
- **Styling:** Modify `styles.css`
- **Interactions:** Update `script.js`

## Notes

- All images are loaded from external URLs (Unsplash) or the `/public` folder
- The site uses vanilla JavaScript - no frameworks required
- Works perfectly on Vercel with the included `vercel.json` configuration
