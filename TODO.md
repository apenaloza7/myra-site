# Contentful CMS Setup Checklist

This document outlines all the Contentful content models and sample entries required for the portfolio site to function.

---

## Content Models to Create

You need to create **3 content models** in Contentful:

---

### 1. Hero Section

**Content Type ID:** `heroSection`

| Field Name     | Field ID        | Type         | Required | Notes                                      |
|----------------|-----------------|--------------|----------|--------------------------------------------|
| Name           | `name`          | Short text   | ✅ Yes   | Your full name                             |
| Title          | `title`         | Short text   | ✅ Yes   | Your job title/role                        |
| Tagline        | `tagline`       | Long text    | No       | Italicized quote/tagline under your name   |
| Profile Image  | `profileImage`  | Media        | No       | Circular profile photo                     |
| Social Links   | `socialLinks`   | JSON object  | No       | Array of social media links                |

**Social Links JSON Structure:**
```json
[
  { "platform": "instagram", "url": "https://instagram.com/yourhandle" },
  { "platform": "twitter", "url": "https://twitter.com/yourhandle" },
  { "platform": "linkedin", "url": "https://linkedin.com/in/yourprofile" },
  { "platform": "tiktok", "url": "https://tiktok.com/@yourhandle" },
  { "platform": "youtube", "url": "https://youtube.com/@yourhandle" },
  { "platform": "email", "url": "mailto:you@email.com" }
]
```

**Supported Platforms:**
- `twitter`
- `instagram`
- `linkedin`
- `tiktok`
- `youtube`
- `facebook`
- `pinterest`
- `website`
- `email`

---

### 2. Portfolio Item

**Content Type ID:** `portfolioItem`

| Field Name     | Field ID        | Type              | Required | Notes                                    |
|----------------|-----------------|-------------------|----------|------------------------------------------|
| Title          | `title`         | Short text        | ✅ Yes   | Project/campaign title                   |
| Client         | `client`        | Short text        | No       | Client or brand name                     |
| Description    | `description`   | Long text         | No       | Detailed project description             |
| Cover Image    | `coverImage`    | Media             | No       | Project thumbnail/cover image            |
| Gallery Images | `galleryImages` | Media (Many files)| No       | Photo album for the project              |
| Category       | `category`      | Short text        | No       | Category tag (e.g., "Social Campaign")   |
| Metrics        | `metrics`       | JSON object       | No       | Array of performance metrics             |
| Order          | `order`         | Number            | No       | Sort order (lower numbers appear first)  |

**Metrics JSON Structure:**
```json
[
  { "value": "+250%", "label": "Engagement" },
  { "value": "1.2M", "label": "Impressions" },
  { "value": "45K", "label": "New Followers" },
  { "value": "89%", "label": "Click-through Rate" }
]
```

**Gallery Images Field Setup:**
- In Contentful, create a Media field with "Many files" enabled
- Set validation to accept only image file types (jpg, png, gif, webp)
- Images will display as a thumbnail grid when the portfolio item is expanded
- Clicking a thumbnail opens a full-screen lightbox viewer

---

### 3. Blog Post

**Content Type ID:** `blogPost`

| Field Name      | Field ID        | Type              | Required | Notes                                    |
|-----------------|-----------------|-------------------|----------|------------------------------------------|
| Title           | `title`         | Short text        | ✅ Yes   | Blog post title                          |
| Slug            | `slug`          | Short text        | ✅ Yes   | URL-friendly identifier                  |
| Excerpt         | `excerpt`       | Long text         | No       | Short preview text                       |
| Content         | `content`       | Rich text         | No       | Full blog post content (supports formatting) |
| Cover Image     | `coverImage`    | Media             | No       | Header image for the post                |
| Published Date  | `publishedDate` | Date & time       | No       | Publication date (used for sorting)      |
| Tags            | `tags`          | Short text (List) | No       | Array of tag strings                     |

**Tags Field Setup:**
- In Contentful, set this field as "Short text" with the "List" option enabled
- This allows multiple tags per post

---

## Sample Content Entries

Below are example entries to create for testing and as templates:

---

### ☐ Hero Section Entry (Create 1)

```
Name: Myra Solana
Title: Social Media Strategist
Tagline: "Crafting digital narratives that resonate, engage, and convert."
Profile Image: [Upload a professional headshot]
Social Links:
[
  { "platform": "instagram", "url": "https://instagram.com/thesolanahouse" },
  { "platform": "linkedin", "url": "https://linkedin.com/in/myrasolana" },
  { "platform": "twitter", "url": "https://twitter.com/myrasolana" },
  { "platform": "tiktok", "url": "https://tiktok.com/@thesolanahouse" },
  { "platform": "email", "url": "mailto:hello@thesolanahouse.com" }
]
```

---

### ☐ Portfolio Item Entries (Create 3-6)

**Entry 1:**
```
Title: Summer Vibes Campaign
Client: Coastal Boutique
Description: A comprehensive summer campaign across Instagram and TikTok that captured the essence of coastal living, resulting in record-breaking engagement and sales.
Cover Image: [Upload campaign image]
Category: Social Campaign
Metrics:
[
  { "value": "+340%", "label": "Engagement Rate" },
  { "value": "2.1M", "label": "Total Reach" },
  { "value": "18K", "label": "New Followers" }
]
Order: 1
```

**Entry 2:**
```
Title: Brand Refresh Launch
Client: Artisan Coffee Co.
Description: Led the social media rollout for a complete brand refresh, introducing new visual identity across all platforms with strategic content calendars.
Cover Image: [Upload campaign image]
Category: Brand Launch
Metrics:
[
  { "value": "+180%", "label": "Brand Mentions" },
  { "value": "850K", "label": "Impressions" },
  { "value": "23%", "label": "Sales Increase" }
]
Order: 2
```

**Entry 3:**
```
Title: Influencer Partnership Series
Client: Wellness Studio
Description: Orchestrated a multi-influencer campaign featuring micro and macro creators, building authentic community engagement around wellness practices.
Cover Image: [Upload campaign image]
Category: Influencer Marketing
Metrics:
[
  { "value": "12", "label": "Influencers" },
  { "value": "4.5M", "label": "Combined Reach" },
  { "value": "+95%", "label": "Website Traffic" }
]
Order: 3
```

**Entry 4:**
```
Title: Product Launch Strategy
Client: Clean Beauty Brand
Description: Developed and executed a viral product launch strategy utilizing user-generated content, countdowns, and exclusive preview content.
Cover Image: [Upload campaign image]
Category: Product Launch
Metrics:
[
  { "value": "Sold Out", "label": "Launch Day" },
  { "value": "67K", "label": "Waitlist Signups" },
  { "value": "+420%", "label": "Social Mentions" }
]
Order: 4
```

---

### ☐ Blog Post Entries (Create 2-4)

**Entry 1:**
```
Title: The Algorithm Isn't Your Enemy: Working With Platform Changes
Slug: algorithm-isnt-your-enemy
Excerpt: Stop fighting the algorithm and start understanding it. Here's how to adapt your strategy when platforms change the rules.
Content: [Rich text - write 3-5 paragraphs about algorithm changes and strategies]
Cover Image: [Upload blog header image]
Published Date: 2026-01-15
Tags: ["Strategy", "Instagram", "Algorithm", "Growth"]
```

**Entry 2:**
```
Title: Building Authentic Community in a Curated World
Slug: building-authentic-community
Excerpt: In an age of perfect feeds and polished content, how do you create genuine connections with your audience?
Content: [Rich text - write 3-5 paragraphs about community building]
Cover Image: [Upload blog header image]
Published Date: 2026-01-10
Tags: ["Community", "Authenticity", "Engagement"]
```

**Entry 3:**
```
Title: Short-Form Video: Why Your Brand Needs to Start Now
Slug: short-form-video-brand
Excerpt: TikTok, Reels, Shorts - if you're not creating short-form video content, here's why you're leaving engagement on the table.
Content: [Rich text - write 3-5 paragraphs about video content]
Cover Image: [Upload blog header image]
Published Date: 2026-01-05
Tags: ["Video", "TikTok", "Reels", "Content Creation"]
```

**Entry 4:**
```
Title: Metrics That Matter: Beyond Vanity Numbers
Slug: metrics-that-matter
Excerpt: Follower count isn't everything. Learn which metrics actually indicate social media success for your business goals.
Content: [Rich text - write 3-5 paragraphs about meaningful metrics]
Cover Image: [Upload blog header image]
Published Date: 2025-12-28
Tags: ["Analytics", "Strategy", "ROI", "Metrics"]
```

---

## Setup Checklist

### Contentful Space Setup
- [ ] Create Contentful account (or use existing)
- [ ] Create new Space for portfolio

### Content Models
- [ ] Create `heroSection` content model with all fields
- [ ] Create `portfolioItem` content model with all fields
- [ ] Create `blogPost` content model with all fields

### Content Entries
- [ ] Create 1 Hero Section entry (with all social links)
- [ ] Create at least 3 Portfolio Item entries
- [ ] Create at least 2 Blog Post entries
- [ ] Upload all media/images
- [ ] **Publish all entries** (important!)

### API Configuration
- [ ] Go to Settings → API keys
- [ ] Create new API key
- [ ] Copy Space ID
- [ ] Copy Content Delivery API access token
- [ ] Update `app.js` with your credentials:

```javascript
const CONTENTFUL_SPACE_ID = 'your_space_id_here';
const CONTENTFUL_ACCESS_TOKEN = 'your_access_token_here';
```

---

## Testing

After completing setup:

1. Open `index.html` in browser (or serve locally)
2. Check browser console (F12) for any errors
3. Verify:
   - [ ] Hero section shows name, title, tagline, image, and social links
   - [ ] Portfolio section displays all portfolio items with metrics
   - [ ] Blog section shows all blog posts in a carousel
   - [ ] Clicking a blog post opens the modal with full content

---

## Common Issues

| Issue | Solution |
|-------|----------|
| "Content not found" | Verify content type IDs match exactly (`heroSection`, `portfolioItem`, `blogPost`) |
| Empty sections | Make sure entries are **published**, not just saved as drafts |
| Images not showing | Ensure images are uploaded to the Media library and linked to entries |
| Social links not working | Check JSON format is valid and URLs include `https://` |
| Blog content not rendering | Ensure Content field uses Rich Text type, not Long text |
