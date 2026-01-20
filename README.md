# Social Media Manager Portfolio

A sophisticated, editorial-style portfolio website for social media managers, powered by Contentful CMS.

## Features

- Editorial/magazine aesthetic with bold, asymmetric layouts
- Organic, flowing blob shapes with subtle animations
- Rich, warm color palette (deep charcoal, cream, coral/terracotta)
- Scroll-triggered reveal animations
- Responsive design for all devices
- Blog modal with rich text support
- Contentful CMS integration

## Setup

### 1. Create a Contentful Account

1. Go to [Contentful](https://www.contentful.com/) and sign up for a free account
2. Create a new space for your portfolio

### 2. Create Content Models

In your Contentful space, create the following content models:

#### Hero Section (`heroSection`)

| Field Name | Field ID | Type | Required |
|------------|----------|------|----------|
| Name | `name` | Short text | Yes |
| Title | `title` | Short text | Yes |
| Tagline | `tagline` | Long text | No |
| Profile Image | `profileImage` | Media | No |
| Social Links | `socialLinks` | JSON object | No |

**Social Links JSON Format:**
```json
[
  { "platform": "instagram", "url": "https://instagram.com/yourhandle" },
  { "platform": "twitter", "url": "https://twitter.com/yourhandle" },
  { "platform": "linkedin", "url": "https://linkedin.com/in/yourprofile" },
  { "platform": "tiktok", "url": "https://tiktok.com/@yourhandle" }
]
```

Supported platforms: `twitter`, `instagram`, `linkedin`, `tiktok`, `youtube`, `facebook`, `pinterest`, `website`, `email`

#### Portfolio Item (`portfolioItem`)

| Field Name | Field ID | Type | Required |
|------------|----------|------|----------|
| Title | `title` | Short text | Yes |
| Client | `client` | Short text | No |
| Description | `description` | Long text | No |
| Cover Image | `coverImage` | Media | No |
| Category | `category` | Short text | No |
| Metrics | `metrics` | JSON object | No |
| Order | `order` | Number | No |

**Metrics JSON Format:**
```json
[
  { "value": "+250%", "label": "Engagement" },
  { "value": "1.2M", "label": "Impressions" },
  { "value": "45K", "label": "New Followers" }
]
```

#### Blog Post (`blogPost`)

| Field Name | Field ID | Type | Required |
|------------|----------|------|----------|
| Title | `title` | Short text | Yes |
| Slug | `slug` | Short text | Yes |
| Excerpt | `excerpt` | Long text | No |
| Content | `content` | Rich text | No |
| Cover Image | `coverImage` | Media | No |
| Published Date | `publishedDate` | Date & time | No |
| Tags | `tags` | Short text (list) | No |

### 3. Get API Credentials

1. In your Contentful space, go to **Settings** → **API keys**
2. Click **Add API key**
3. Copy the **Space ID** and **Content Delivery API - access token**

### 4. Configure the Portfolio

Open `app.js` and update the configuration constants at the top:

```javascript
const CONTENTFUL_SPACE_ID = 'your_space_id_here';
const CONTENTFUL_ACCESS_TOKEN = 'your_access_token_here';
```

### 5. Add Content

1. Create a new entry for **Hero Section** with your info
2. Add **Portfolio Items** for your work
3. Write **Blog Posts** to share your insights

### 6. Deploy

This is a static site that can be deployed anywhere:

- **GitHub Pages**: Push to a repo and enable Pages
- **Netlify**: Drag and drop the folder or connect your repo
- **Vercel**: Import your repo
- **Any static host**: Upload all files

## File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # Custom styles + animations
├── app.js              # Contentful integration
└── README.md           # This file
```

## Customization

### Colors

Edit the CSS custom properties in `styles.css`:

```css
:root {
  --color-charcoal: #2D2926;
  --color-cream: #FDF8F4;
  --color-coral: #E07A5F;
  --color-terracotta: #C4634F;
  --color-warmgray: #8B8178;
}
```

Also update the Tailwind config in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        charcoal: '#2D2926',
        cream: '#FDF8F4',
        coral: '#E07A5F',
        terracotta: '#C4634F',
        warmgray: '#8B8178'
      }
    }
  }
}
```

### Fonts

The portfolio uses:
- **Playfair Display** for headings
- **DM Sans** for body text

To change fonts, update the Google Fonts link in `index.html` and the font-family values in both the Tailwind config and CSS custom properties.

## Troubleshooting

### "Content Not Found" Error

- Verify your Space ID and Access Token are correct
- Ensure content models have the exact field IDs specified above
- Check that you have at least one published entry for each content type
- Open browser console (F12) for detailed error messages

### Images Not Loading

- Ensure images are published in Contentful
- Check that the `profileImage` and `coverImage` fields are properly linked

### Styling Issues

- Clear browser cache and reload
- Check that Tailwind CDN is loading (requires internet connection)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Reduced motion is respected for users who prefer it.

## License

MIT License - feel free to use this template for your own portfolio!
