# FG Enhancer

Chrome Manifest V3 extension that hides or blurs Adult-tagged repacks on [fitgirl-repacks.site](https://fitgirl-repacks.site/), with an optional centered layout.

## Install

You can install from the Chrome Web Store (recommended) or load the extension manually from this repo.

### Option A — Chrome Web Store

1. Open the [FG Enhancer listing](https://chromewebstore.google.com/detail/lfepcojmhioimojmfkjkegngdeeldlnn?utm_source=item-share-cb)
2. Click **Add to Chrome**
3. Confirm **Add extension**
4. Open [fitgirl-repacks.site](https://fitgirl-repacks.site/) and use the toolbar popup to enable/hide/blur

### Option B — Manual install (Load unpacked)

Use this if you prefer installing from source (for example after cloning or downloading this repository).

1. Download or clone this repository, then unzip it if needed
2. Open Chrome and go to `chrome://extensions`
3. Turn on **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the **`extension`** folder inside this repo (the folder that contains `manifest.json`)
6. Open [fitgirl-repacks.site](https://fitgirl-repacks.site/) and use the toolbar popup to enable/hide/blur

After you update files locally: click **Reload** on `chrome://extensions`, then refresh the FitGirl tab.

## Defaults

- Filter: **on**
- Mode: **Hide completely**
- Layout: **Left-aligned**

## Permissions

- `storage` — save settings (synced) and a short-lived local Adult URL index
- Host: `https://fitgirl-repacks.site/*` — content script only on that site

## Privacy Notice

- https://nadeem-elbarbari.github.io/Fitgirl-Enhancer/privacy.html

## Repo layout

| Path | Purpose |
|------|---------|
| `extension/` | Chrome extension source (select this folder for Load unpacked) |
