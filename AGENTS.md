# Agent Notes

This is the public website for Jelma, a professional consultancy company with software development as one of its core services. Changes should preserve the impression that the site is technically careful, maintainable, and production-ready.

## Site Standards

- Keep the site static and dependency-free unless there is a strong reason to add tooling.
- Keep source structure maintainable: HTML in `index.html`, main styles in `styles.css`, contact form behavior in `contact.js`, and legal-page styles in `legal.css`.
- Do not reintroduce large inline CSS or JavaScript blocks into `index.html`.
- Preserve semantic HTML, accessible labels, keyboard focus states, responsive layout, and dark-mode support.
- Escape raw ampersands in HTML text and attributes as `&amp;`.
- Keep `robots.txt` and `sitemap.xml` in sync when public pages are added, removed, or renamed.
- Keep `README.md` structure documentation in sync with file changes.

## Professional Polish Checklist

When changing the site, check whether the change affects:

- SEO and sharing metadata in the page head.
- Contact form reliability, validation, and fallback behavior.
- Consistency of public contact addresses and company identity.
- Asset size and quality, especially favicons, logos, and photos.
- Mobile layout and text wrapping.
- Browser caching and clean separation of assets.

## Validation

Before finishing meaningful changes:

- Run `node --check contact.js` when touching JavaScript.
- Run `xmllint --noout sitemap.xml` when touching the sitemap.
- Use a browser or static server for visual checks when layout or styling changes.
- Be aware that the system `tidy` version may not understand modern HTML5 elements, so do not treat those warnings as authoritative without a modern validator.
