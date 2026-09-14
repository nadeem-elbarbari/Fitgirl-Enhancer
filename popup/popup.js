const DEFAULTS = {
  enabled: true,
  mode: "hide",
  centerContent: false,
};

const enableEl = document.getElementById("enable-filter");
const centerEl = document.getElementById("center-content");
const modeHideEl = document.getElementById("mode-hide");
const modeBlurEl = document.getElementById("mode-blur");
const modeFieldset = document.getElementById("mode-fieldset");
const statusEl = document.getElementById("status");
const resetEl = document.getElementById("reset-defaults");

function statusText(enabled, mode, centerContent) {
  const layout = centerContent ? "Centered" : "Left";
  if (!enabled) return `Filtering off · ${layout}`;
  const modeLabel = mode === "blur" ? "Blur" : "Hide";
  return `Filtering on · ${modeLabel} · ${layout}`;
}

function syncUi({ enabled, mode, centerContent }) {
  enableEl.checked = enabled;
  centerEl.checked = centerContent;
  modeHideEl.checked = mode === "hide";
  modeBlurEl.checked = mode === "blur";
  modeFieldset.disabled = !enabled;
  const textEl = statusEl.querySelector(".status-text");
  if (textEl) {
    textEl.textContent = statusText(enabled, mode, centerContent);
  } else {
    statusEl.textContent = statusText(enabled, mode, centerContent);
  }
}

async function loadSettings() {
  const stored = await chrome.storage.sync.get(DEFAULTS);
  return {
    enabled: stored.enabled !== false,
    mode: stored.mode === "blur" ? "blur" : "hide",
    centerContent: stored.centerContent === true,
  };
}

async function saveSettings(partial) {
  await chrome.storage.sync.set(partial);
  const next = await loadSettings();
  syncUi(next);
}

async function init() {
  const settings = await loadSettings();
  syncUi(settings);

  enableEl.addEventListener("change", async () => {
    await saveSettings({ enabled: enableEl.checked });
  });

  centerEl.addEventListener("change", async () => {
    await saveSettings({ centerContent: centerEl.checked });
  });

  modeHideEl.addEventListener("change", async () => {
    if (modeHideEl.checked) {
      await saveSettings({ mode: "hide" });
    }
  });

  modeBlurEl.addEventListener("change", async () => {
    if (modeBlurEl.checked) {
      await saveSettings({ mode: "blur" });
    }
  });

  resetEl.addEventListener("click", async () => {
    await saveSettings({ ...DEFAULTS });
  });
}

init();
