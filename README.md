# Fitgirl-Bleacher

Chrome Manifest V3 extension (**FitGirl Adult Filter**) that hides or blurs Adult-tagged repacks on [fitgirl-repacks.site](https://fitgirl-repacks.site/).

## Load unpacked

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this `Fitgirl-Bleacher` folder (contains `manifest.json`)
5. Open [fitgirl-repacks.site](https://fitgirl-repacks.site/) and use the popup to enable/hide/blur

After file updates: Reload the extension on `chrome://extensions`, then refresh the FitGirl tab.

## Defaults

- Filter: **on**
- Mode: **Hide completely**

## Permissions

- `storage` — save settings
- Host: `https://fitgirl-repacks.site/*` — content script only on that site
