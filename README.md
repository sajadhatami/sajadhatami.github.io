# Sajad Hatami — Portfolio

A lightweight, responsive personal portfolio for GitHub Pages.

## Design goals

- Fast static delivery with no framework or build step
- Accessible semantic HTML, keyboard focus states, reduced-motion support
- Responsive layout for mobile and desktop
- Dark/light theme with system preference and local persistence
- Automatic public-project feed from the GitHub API
- SEO basics: canonical URL, Open Graph metadata, JSON-LD, sitemap, robots.txt
- No analytics, tracking, external fonts, or client-side secrets

## Deploy on GitHub Pages

1. Create a public repository named `sajadhatami.github.io`.
2. Put these files in the repository root on the default branch.
3. In **Settings → Pages**, choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. The site will be available at `https://sajadhatami.github.io/` after deployment finishes.

## Customize later

Update the text in `index.html`. Public repositories are loaded automatically from `https://api.github.com/users/sajadhatami/repos` by `script.js`.
