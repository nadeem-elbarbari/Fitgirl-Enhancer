# FG Enhancer

Chrome Manifest V3 extension that hides or blurs Adult-tagged repacks on [fitgirl-repacks.site](https://fitgirl-repacks.site/), with an optional centered layout.

## Load unpacked

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this project folder (contains `manifest.json`)
5. Open [fitgirl-repacks.site](https://fitgirl-repacks.site/) and use the popup to enable/hide/blur

After file updates: Reload the extension on `chrome://extensions`, then refresh the FitGirl tab.

## Defaults

- Filter: **on**
- Mode: **Hide completely**
- Layout: **Left-aligned**

## Permissions

- `storage` — save settings (synced) and a short-lived local Adult URL index
- Host: `https://fitgirl-repacks.site/*` — content script only on that site

## Chrome Web Store package

```powershell
.\package-extension.ps1
```

Creates `dist/fg-enhancer-v1.0.0.zip` for upload. See `CHROMEWEBSTORE.md` for listing copy and submission fields.

## GitHub Pages site

Static site at repo root (not included in the store ZIP):

- Home: `index.html`
- Privacy: `privacy.html` → use as the Chrome Web Store privacy policy URL

Enable Pages: repo **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.

Live URLs after deploy:

- https://nadeem-elbarbari.github.io/Fitgirl-Enhancer/
- https://nadeem-elbarbari.github.io/Fitgirl-Enhancer/privacy.html
