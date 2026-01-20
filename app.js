/**
 * Social Media Manager Portfolio
 * Contentful Integration & Interactions
 */

// ==========================================================================
// Contentful Configuration
// ==========================================================================

const CONTENTFUL_SPACE_ID = 'ixn67gs6v300';
const CONTENTFUL_ACCESS_TOKEN = 'RaGsjThhuUuJucu8x0RVPseXbtoT8-PmGwK-w5iJk8U';
const CONTENTFUL_ENVIRONMENT = 'master';

let contentfulClient = null;

// ==========================================================================
// Contentful Client Initialization
// ==========================================================================

function initContentful() {
  if (typeof contentful === 'undefined') {
    throw new Error('Contentful SDK not loaded');
  }

  contentfulClient = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
    environment: CONTENTFUL_ENVIRONMENT
  });

  return contentfulClient;
}

// ==========================================================================
// Data Fetching Functions
// ==========================================================================

async function fetchHero() {
  const response = await contentfulClient.getEntries({
    content_type: 'heroSection',
    limit: 1
  });

  if (response.items.length === 0) {
    return null;
  }

  return response.items[0].fields;
}

async function fetchPortfolio() {
  const response = await contentfulClient.getEntries({
    content_type: 'portfolioItem',
    order: 'fields.order'
  });

  return response.items.map(item => ({
    ...item.fields,
    id: item.sys.id
  }));
}

async function fetchBlogPosts() {
  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishedDate'
  });

  return response.items.map(item => ({
    ...item.fields,
    id: item.sys.id
  }));
}

// ==========================================================================
// Social Icons
// ==========================================================================

const socialIcons = {
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  pinterest: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>`,
  website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  gondola: `<img src="assets/gondola.jpg" alt="Gondola" class="social-icon-img">`
};

function getSocialIcon(platform) {
  const key = platform.toLowerCase();
  return socialIcons[key] || socialIcons.website;
}

/**
 * Detect social media platform from URL
 * @param {string} url - The social media post URL
 * @returns {string} - Platform name (instagram, tiktok, youtube, twitter, facebook, or website)
 */
function detectPlatform(url) {
  if (!url) return 'website';
  
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('instagram.com') || urlLower.includes('instagr.am')) {
    return 'instagram';
  }
  if (urlLower.includes('tiktok.com')) {
    return 'tiktok';
  }
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return 'youtube';
  }
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    return 'twitter';
  }
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.com') || urlLower.includes('fb.watch')) {
    return 'facebook';
  }
  if (urlLower.includes('linkedin.com')) {
    return 'linkedin';
  }
  if (urlLower.includes('pinterest.com') || urlLower.includes('pin.it')) {
    return 'pinterest';
  }
  
  return 'website';
}

// ==========================================================================
// Rendering Functions
// ==========================================================================

function renderHero(data) {
  if (!data) return;

  // Name
  const nameEl = document.getElementById('hero-name');
  if (nameEl && data.name) {
    nameEl.textContent = data.name;
  }

  // Title
  const titleEl = document.getElementById('hero-title');
  if (titleEl && data.title) {
    titleEl.textContent = data.title;
  }

  // Tagline
  const taglineEl = document.getElementById('hero-tagline');
  if (taglineEl && data.tagline) {
    taglineEl.textContent = data.tagline;
  }

  // Profile Image
  const imageEl = document.getElementById('hero-image');
  if (imageEl && data.profileImage) {
    // Handle both Contentful format and demo format (simple URL string)
    const imageUrl = typeof data.profileImage === 'string'
      ? data.profileImage
      : data.profileImage.fields?.file?.url;
    if (imageUrl) {
      imageEl.src = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
      imageEl.alt = data.name || 'Profile';
    }
  }

  // Social Links
  if (data.socialLinks && Array.isArray(data.socialLinks)) {
    renderSocialLinks(data.socialLinks, 'hero-social-links');
    renderSocialLinks(data.socialLinks, 'footer-social-links');
  }
}

function renderSocialLinks(links, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = links.map(link => `
    <a href="${link.url}"
       target="_blank"
       rel="noopener noreferrer"
       class="social-link"
       aria-label="${link.platform}">
      ${getSocialIcon(link.platform)}
    </a>
  `).join('');
}

function renderPortfolio(items) {
  const list = document.getElementById('portfolio-list');
  const empty = document.getElementById('portfolio-empty');

  if (!list) return;

  if (!items || items.length === 0) {
    list.classList.add('hidden');
    empty?.classList.remove('hidden');
    return;
  }

  // Store items globally for lightbox access
  window.portfolioItems = items;

  list.innerHTML = items.map((item, index) => {
    // Handle both Contentful format and demo format (simple URL string)
    const imageUrl = typeof item.coverImage === 'string'
      ? item.coverImage
      : item.coverImage?.fields?.file?.url;
    const fullImageUrl = imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : '';

    // Get first two metrics for inline display
    const inlineMetrics = item.metrics && Array.isArray(item.metrics)
      ? item.metrics.slice(0, 2).map(metric => `
          <div class="portfolio-item-metric">
            <span class="portfolio-item-metric-value">${metric.value}</span>
            <span class="portfolio-item-metric-label">${metric.label}</span>
          </div>
        `).join('')
      : '';

    // Full metrics for expanded view
    const fullMetricsHtml = item.metrics && Array.isArray(item.metrics)
      ? `<div class="portfolio-item-full-metrics">
          ${item.metrics.map(metric => `
            <div class="portfolio-item-full-metric">
              <div class="portfolio-item-full-metric-value">${metric.value}</div>
              <div class="portfolio-item-full-metric-label">${metric.label}</div>
            </div>
          `).join('')}
        </div>`
      : '';

    // Social post link
    const socialLinkHtml = item.socialPostUrl
      ? `<a href="${item.socialPostUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="portfolio-social-link"
            onclick="event.stopPropagation()">
          ${getSocialIcon(detectPlatform(item.socialPostUrl))}
          <span>View Original Post</span>
        </a>`
      : '';

    // Metrics updated date
    const metricsDateHtml = item.metricsUpdated
      ? `<p class="portfolio-metrics-date">Metrics as of ${new Date(item.metricsUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}</p>`
      : '';

    // Gallery images for expanded view
    const galleryHtml = renderPortfolioGallery(item.galleryImages, index);

    return `
      <article class="portfolio-item reveal-element" onclick="togglePortfolioItem(${index})" data-index="${index}">
        <div class="portfolio-item-thumbnail">
          ${fullImageUrl ? `<img src="${fullImageUrl}" alt="${item.title}" loading="lazy">` : '<div class="bg-warmgray/20 w-full h-full"></div>'}
        </div>
        <div class="portfolio-item-content">
          <div class="portfolio-item-header">
            <div>
              <h3 class="portfolio-item-title">${item.title}</h3>
              ${item.client ? `<p class="portfolio-item-client">${item.client}</p>` : ''}
            </div>
            <div class="portfolio-item-metrics">
              ${inlineMetrics}
            </div>
          </div>
          <div class="portfolio-item-details">
            ${item.description ? `<p class="portfolio-item-description">${item.description}</p>` : ''}
            ${fullMetricsHtml}
            ${metricsDateHtml}
            ${socialLinkHtml}
            ${galleryHtml}
          </div>
        </div>
        <div class="portfolio-item-expand-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </article>
    `;
  }).join('');
}

function renderPortfolioGallery(galleryImages, portfolioIndex) {
  if (!galleryImages || !Array.isArray(galleryImages) || galleryImages.length === 0) {
    return '';
  }

  // Extract image URLs from Contentful format
  const images = galleryImages
    .map(img => {
      const url = typeof img === 'string' ? img : img?.fields?.file?.url;
      return url ? (url.startsWith('//') ? `https:${url}` : url) : null;
    })
    .filter(Boolean);

  if (images.length === 0) return '';

  const thumbnails = images.map((url, imgIndex) => `
    <button 
      class="portfolio-gallery-thumb" 
      onclick="event.stopPropagation(); openLightbox(${portfolioIndex}, ${imgIndex})"
      aria-label="View image ${imgIndex + 1} of ${images.length}"
    >
      <img src="${url}" alt="Gallery image ${imgIndex + 1}" loading="lazy">
    </button>
  `).join('');

  return `
    <div class="portfolio-gallery-section" style="margin-top: 1rem;">
      <p class="portfolio-gallery-label">Gallery (${images.length})</p>
      <div class="portfolio-gallery">
        ${thumbnails}
      </div>
    </div>
  `;
}

function togglePortfolioItem(index) {
  const items = document.querySelectorAll('.portfolio-item');
  const clickedItem = document.querySelector(`.portfolio-item[data-index="${index}"]`);

  if (clickedItem) {
    // Close other items
    items.forEach(item => {
      if (item !== clickedItem && item.classList.contains('expanded')) {
        item.classList.remove('expanded');
      }
    });

    // Toggle clicked item
    clickedItem.classList.toggle('expanded');
  }
}

function renderBlogPosts(posts) {
  const carousel = document.getElementById('blog-carousel');
  const empty = document.getElementById('blog-empty');

  if (!carousel) return;

  if (!posts || posts.length === 0) {
    carousel.classList.add('hidden');
    empty?.classList.remove('hidden');
    return;
  }

  // Store posts globally for modal access
  window.blogPosts = posts;

  carousel.innerHTML = posts.map((post, index) => {
    // Handle both Contentful format and demo format (simple URL string)
    const imageUrl = typeof post.coverImage === 'string'
      ? post.coverImage
      : post.coverImage?.fields?.file?.url;
    const fullImageUrl = imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : '';

    const date = post.publishedDate
      ? new Date(post.publishedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';

    const tagsHtml = post.tags && Array.isArray(post.tags)
      ? `<div class="blog-card-tags">
          ${post.tags.slice(0, 3).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
        </div>`
      : '';

    return `
      <article class="blog-card reveal-element" onclick="openBlogModal(${index})" role="button" tabindex="0" aria-label="Read ${post.title}">
        <div class="blog-card-image">
          ${fullImageUrl ? `<img src="${fullImageUrl}" alt="${post.title}" loading="lazy">` : '<div class="bg-warmgray/20 w-full h-full"></div>'}
        </div>
        <div class="blog-card-content">
          ${date ? `<p class="blog-card-date">${date}</p>` : ''}
          <h3 class="blog-card-title">${post.title}</h3>
          ${post.excerpt ? `<p class="blog-card-excerpt">${post.excerpt}</p>` : ''}
          ${tagsHtml}
        </div>
      </article>
    `;
  }).join('');

  // Add keyboard support for blog cards
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// ==========================================================================
// Rich Text Renderer
// ==========================================================================

function renderRichText(content) {
  if (!content || !content.content) return '';

  return content.content.map(node => {
    switch (node.nodeType) {
      case 'paragraph':
        return `<p>${renderRichTextContent(node.content)}</p>`;
      case 'heading-1':
        return `<h1>${renderRichTextContent(node.content)}</h1>`;
      case 'heading-2':
        return `<h2>${renderRichTextContent(node.content)}</h2>`;
      case 'heading-3':
        return `<h3>${renderRichTextContent(node.content)}</h3>`;
      case 'heading-4':
        return `<h4>${renderRichTextContent(node.content)}</h4>`;
      case 'unordered-list':
        return `<ul>${node.content.map(item => `<li>${renderRichTextContent(item.content[0]?.content)}</li>`).join('')}</ul>`;
      case 'ordered-list':
        return `<ol>${node.content.map(item => `<li>${renderRichTextContent(item.content[0]?.content)}</li>`).join('')}</ol>`;
      case 'blockquote':
        return `<blockquote>${renderRichTextContent(node.content[0]?.content)}</blockquote>`;
      case 'hr':
        return '<hr>';
      case 'embedded-asset-block':
        const asset = node.data?.target?.fields;
        if (asset?.file?.url) {
          const url = asset.file.url.startsWith('//') ? `https:${asset.file.url}` : asset.file.url;
          return `<img src="${url}" alt="${asset.title || ''}" loading="lazy">`;
        }
        return '';
      default:
        return '';
    }
  }).join('');
}

function renderRichTextContent(content) {
  if (!content) return '';

  return content.map(node => {
    if (node.nodeType === 'text') {
      let text = node.value;

      if (node.marks) {
        node.marks.forEach(mark => {
          switch (mark.type) {
            case 'bold':
              text = `<strong>${text}</strong>`;
              break;
            case 'italic':
              text = `<em>${text}</em>`;
              break;
            case 'underline':
              text = `<u>${text}</u>`;
              break;
            case 'code':
              text = `<code>${text}</code>`;
              break;
          }
        });
      }

      return text;
    }

    if (node.nodeType === 'hyperlink') {
      return `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${renderRichTextContent(node.content)}</a>`;
    }

    return '';
  }).join('');
}

// ==========================================================================
// Modal Functions
// ==========================================================================

function openBlogModal(index) {
  const post = window.blogPosts?.[index];
  if (!post) return;

  const modal = document.getElementById('blog-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalTags = document.getElementById('modal-tags');
  const modalContent = document.getElementById('modal-content');

  // Set image - handle both Contentful format and demo format
  const imageUrl = typeof post.coverImage === 'string'
    ? post.coverImage
    : post.coverImage?.fields?.file?.url;
  if (imageUrl) {
    modalImage.src = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
    modalImage.alt = post.title;
  }

  // Set title
  modalTitle.textContent = post.title;

  // Set date
  if (post.publishedDate) {
    modalDate.textContent = new Date(post.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Set tags
  if (post.tags && Array.isArray(post.tags)) {
    modalTags.innerHTML = post.tags.map(tag =>
      `<span class="blog-tag">${tag}</span>`
    ).join('');
  }

  // Set content - handle both Contentful rich text and demo HTML string
  if (post.content) {
    if (typeof post.content === 'string') {
      modalContent.innerHTML = post.content;
    } else {
      modalContent.innerHTML = renderRichText(post.content);
    }
  } else if (post.excerpt) {
    modalContent.innerHTML = `<p>${post.excerpt}</p>`;
  }

  // Show modal
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  // Trigger animation
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Focus trap
  modal.focus();
}

function closeBlogModal() {
  const modal = document.getElementById('blog-modal');

  modal.classList.remove('active');

  setTimeout(() => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }, 300);
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBlogModal();
    closeLightbox();
  }
});

// ==========================================================================
// Lightbox Functions
// ==========================================================================

let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(portfolioIndex, imageIndex) {
  const item = window.portfolioItems?.[portfolioIndex];
  if (!item || !item.galleryImages) return;

  // Extract image URLs
  currentLightboxImages = item.galleryImages
    .map(img => {
      const url = typeof img === 'string' ? img : img?.fields?.file?.url;
      return url ? (url.startsWith('//') ? `https:${url}` : url) : null;
    })
    .filter(Boolean);

  if (currentLightboxImages.length === 0) return;

  currentLightboxIndex = imageIndex;

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Set single image mode (hides nav buttons)
  lightbox.setAttribute('data-single', currentLightboxImages.length === 1 ? 'true' : 'false');

  // Set initial image
  lightboxImage.src = currentLightboxImages[currentLightboxIndex];
  lightboxImage.alt = `${item.title} - Image ${currentLightboxIndex + 1}`;

  // Update counter
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;

  // Show lightbox
  lightbox.classList.remove('hidden');
  lightbox.setAttribute('aria-hidden', 'false');

  // Trigger animation
  requestAnimationFrame(() => {
    lightbox.classList.add('active');
  });

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Add keyboard navigation
  document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');

  if (lightbox.classList.contains('hidden')) return;

  lightbox.classList.remove('active');

  setTimeout(() => {
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }, 300);

  // Remove keyboard navigation
  document.removeEventListener('keydown', handleLightboxKeydown);

  // Reset state
  currentLightboxImages = [];
  currentLightboxIndex = 0;
}

function navigateLightbox(direction) {
  if (currentLightboxImages.length <= 1) return;

  currentLightboxIndex += direction;

  // Wrap around
  if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxImages.length - 1;
  } else if (currentLightboxIndex >= currentLightboxImages.length) {
    currentLightboxIndex = 0;
  }

  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Fade out, change image, fade in
  lightboxImage.style.opacity = '0';

  setTimeout(() => {
    lightboxImage.src = currentLightboxImages[currentLightboxIndex];
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
    lightboxImage.style.opacity = '1';
  }, 150);
}

function handleLightboxKeydown(e) {
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      navigateLightbox(-1);
      break;
    case 'ArrowRight':
      e.preventDefault();
      navigateLightbox(1);
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.reveal-element').forEach(el => {
    observer.observe(el);
  });
}


// ==========================================================================
// Error Handling
// ==========================================================================

function renderError(message) {
  const loadingState = document.getElementById('loading-state');
  const errorState = document.getElementById('error-state');
  const errorMessage = document.getElementById('error-message');

  loadingState?.classList.add('hidden');
  errorState?.classList.remove('hidden');

  if (errorMessage && message) {
    errorMessage.textContent = message;
  }
}

function hideLoading() {
  const loadingState = document.getElementById('loading-state');
  const mainContent = document.getElementById('main-content');

  loadingState?.classList.add('hidden');

  if (mainContent) {
    mainContent.classList.remove('opacity-0');
    mainContent.classList.add('opacity-100');
  }
}

// ==========================================================================
// Initialization
// ==========================================================================

async function init() {
  try {
    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Initialize Contentful client
    initContentful();

    // Fetch all data in parallel
    const [heroData, portfolioData, blogData] = await Promise.all([
      fetchHero(),
      fetchPortfolio(),
      fetchBlogPosts()
    ]);

    // Render content
    renderHero(heroData);
    renderPortfolio(portfolioData);
    renderBlogPosts(blogData);

    // Hide loading and show content
    hideLoading();

    // Initialize scroll animations after content is rendered
    requestAnimationFrame(() => {
      initScrollAnimations();
    });

  } catch (error) {
    console.error('Failed to initialize:', error);
    renderError(error.message || 'Unable to load content. Please check your Contentful configuration.');
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
