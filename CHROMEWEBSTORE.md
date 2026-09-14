# Chrome Web Store Listing — FG Enhancer

> Last Updated: 2026-09-14

## Store Listing

**Extension Name** [REQUIRED]
FG Enhancer

**Short Description** [REQUIRED]
Hide or blur Adult-tagged listings and optionally center the layout on fitgirl-repacks.site.

**Detailed Description** [REQUIRED]
FG Enhancer hides or blurs Adult-tagged listings on fitgirl-repacks.site and can center the site layout on wide screens.

FEATURES
• Adult filter — hide listings completely or soft-blur cover images
• Works on article posts and homepage grid tiles
• Center layout — optionally center the fixed-width theme on wide viewports
• Toolbar icon shows On/Off state
• Settings sync across Chrome browsers signed into the same Google account

HOW TO USE
1. Install the extension and open fitgirl-repacks.site
2. Click the FG Enhancer icon in the toolbar
3. Toggle Filter on/off and choose Hide or Blur
4. Optionally enable Center layout
5. Use Reset to default to restore Hide · Filter on · Left-aligned

PRIVACY
FG Enhancer does not collect personal information or analytics. Your filter preferences sync via Chrome Sync (Google). A short-lived list of Adult-tagged page URLs is cached locally on your device to filter grid tiles. See the privacy policy linked on this listing.

PERMISSIONS
• Storage — saves your filter and layout preferences, and a local Adult URL cache
• Access to fitgirl-repacks.site — required so the content script can mark Adult listings and fetch the Adult tag pages used for grid filtering

SUPPORT
Found a bug or have a suggestion? Open an issue on the project GitHub repository or email the publisher contact on this listing.

Version 1.0.0 — Initial Chrome Web Store release.

**Category** [REQUIRED]
Productivity

**Single Purpose** [REQUIRED]
Hides or blurs Adult-tagged listings on fitgirl-repacks.site and optionally centers the page layout.

**Primary Language** [REQUIRED]
English


## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ✅ Ready | `icons/icon-on-128.png` |
| Screenshot 1 [REQUIRED] | 1280×800 or 640×400 | ⬜ Not created | `store-assets/screenshot-1.png` |
| Screenshot 2 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | `store-assets/screenshot-2.png` |
| Screenshot 3 [RECOMMENDED] | 1280×800 or 640×400 | ⬜ Not created | `store-assets/screenshot-3.png` |
| Screenshot 4 | 1280×800 or 640×400 | ⬜ Not created | |
| Screenshot 5 | 1280×800 or 640×400 | ⬜ Not created | |
| Small Promo Tile [RECOMMENDED] | 440×280 | ⬜ Not created | `store-assets/promo-small.png` |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

### Screenshot Notes
1. Homepage with Adult filter **Hide** active (grid tiles with Adult tags removed) + popup open showing Filter on / Hide.
2. Same page with **Blur** mode so cover images are soft-blurred; popup showing Blur selected.
3. Wide viewport with **Center layout** enabled vs default left alignment (optional third shot).


## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `storage` | permissions | Saves user preferences (filter on/off, hide vs blur, center layout) via `chrome.storage.sync`, and caches a short-lived Adult URL index in `chrome.storage.local` so grid tiles can be filtered without re-fetching every page load. |
| `https://fitgirl-repacks.site/*` | host_permissions | Injects the content script and CSS only on this site to detect Adult-tagged articles/tiles, apply hide/blur/center styles, and fetch `/tag/adult/` pages to build the Adult URL index used for homepage grid filtering. |


## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** Yes (settings + local Adult URL cache only)

| Data Type | Collected? | Transmitted Off-Device? | Purpose | Shared with Third Parties? |
|-----------|-----------|------------------------|---------|---------------------------|
| Personally identifiable info | No | — | — | — |
| Health info | No | — | — | — |
| Financial info | No | — | — | — |
| Authentication info | No | — | — | — |
| Personal communications | No | — | — | — |
| Location | No | — | — | — |
| Web history | No | — | — | — |
| User activity | Yes (filter/layout preferences only) | Yes — via Chrome Sync to Google if the user is signed in | Remember filter mode and layout choice | No (except Chrome Sync / Google) |
| Website content | Yes (Adult-tagged page URLs from fitgirl-repacks.site) | No — stored in `chrome.storage.local` only | Identify which grid tiles to hide/blur | No |

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes


## Privacy Policy

**Privacy Policy URL** [REQUIRED]
https://nadeem-elbarbari.github.io/Fitgirl-Enhancer/privacy.html

(Requires GitHub Pages enabled on branch `main` / root. Site files: `index.html`, `privacy.html`, `site.css`, `site/`.)


## Distribution

**Visibility**: Public
**Regions**: All regions
**Pricing**: Free


## Developer Info

**Publisher Name** [REQUIRED]
<!-- Fill with your Chrome Web Store publisher / legal name -->

**Contact Email** [REQUIRED]
<!-- Public email shown on the listing — must be monitored -->

**Support URL / Email** [RECOMMENDED]
<!-- e.g. GitHub Issues URL for this repo -->

**Homepage URL** [RECOMMENDED]
<!-- Repo or docs URL after publish -->


## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | 2026-09-14 | Initial store package: Adult hide/blur filter, center layout, sync settings, On/Off toolbar icons | Draft |


## Review Notes

### Known Issues / Limitations
- Works only on `https://fitgirl-repacks.site/*` (exact host in the manifest).
- Grid-tile filtering depends on fetching the site’s Adult tag archive; if that fetch fails, article pages still filter via on-page Adult tags, but some grid tiles may remain until the index is available.
- Chrome Web Store may scrutinize extensions that target sites associated with unauthorized game distribution. Emphasize the single purpose (Adult content filtering / layout) and that the extension does not download, crack, or distribute software.
- Screenshots are still required before first submission.

### Rejection History
<!-- If applicable:
| Date | Reason | Fix Applied | Resubmitted |
|------|--------|-------------|-------------|
-->


## Pre-submit checklist (this project)

- [x] Manifest V3
- [x] Icons exist at correct sizes (16/32/48/128)
- [x] Description ≤ 132 characters
- [x] Permissions minimized (`storage` + one host)
- [x] Permission justifications written above
- [x] Privacy policy draft (`privacy.html`)
- [x] Upload ZIP via `package-extension.ps1`
- [ ] Host privacy policy at a public URL
- [ ] Capture ≥1 screenshot (1280×800 or 640×400)
- [ ] Fill publisher name + contact email in Developer Dashboard
- [ ] Paste permission justifications into Dashboard fields
- [ ] Declare Chrome Sync + local Adult URL cache on the data-use form
