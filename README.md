# FG Enhancer

Chrome Manifest V3 extension that hides or blurs Adult-tagged repacks on [fitgirl-repacks.site](https://fitgirl-repacks.site/), with an optional centered layout.


## Chrome Web Store extension

- https://chromewebstore.google.com/detail/lfepcojmhioimojmfkjkegngdeeldlnn?utm_source=item-share-cb

# Install Manually

## Load unpacked

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this project folder (contains `manifest.json`)
5. Open [fitgirl-repacks.site](https://fitgirl-repacks.site/) and use the popup to enable/hide/blur

## Defaults

- Filter: **on**
- Mode: **Hide completely**
- Layout: **Left-aligned**

## Permissions

- `storage` — save settings (synced) and a short-lived local Adult URL index
- Host: `https://fitgirl-repacks.site/*` — content script only on that site

## Privacy Notice

- https://nadeem-elbarbari.github.io/Fitgirl-Enhancer/privacy.html
