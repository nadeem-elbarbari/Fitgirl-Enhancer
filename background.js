const DEFAULTS = {
  enabled: true,
  mode: "hide",
  centerContent: false,
};

const ICONS_ON = {
  16: "icons/icon-on-16.png",
  32: "icons/icon-on-32.png",
  48: "icons/icon-on-48.png",
  128: "icons/icon-on-128.png",
};

const ICONS_OFF = {
  16: "icons/icon-off-16.png",
  32: "icons/icon-off-32.png",
  48: "icons/icon-off-48.png",
  128: "icons/icon-off-128.png",
};

async function loadEnabled() {
  const stored = await chrome.storage.sync.get(DEFAULTS);
  return stored.enabled !== false;
}

async function syncActionIcon(enabled) {
  await chrome.action.setIcon({
    path: enabled ? ICONS_ON : ICONS_OFF,
  });
  await chrome.action.setTitle({
    title: enabled ? "FG Bleacher · On" : "FG Bleacher · Off",
  });
}

async function refreshIcon() {
  await syncActionIcon(await loadEnabled());
}

chrome.runtime.onInstalled.addListener(() => {
  refreshIcon();
});

chrome.runtime.onStartup.addListener(() => {
  refreshIcon();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync" || !changes.enabled) return;
  const enabled = changes.enabled.newValue !== false;
  syncActionIcon(enabled);
});

refreshIcon();
