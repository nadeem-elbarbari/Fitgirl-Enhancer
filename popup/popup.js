const DEFAULTS = {
  enabled: true,
  mode: "hide",
};

const enableEl = document.getElementById("enable-filter");
const modeHideEl = document.getElementById("mode-hide");
const modeBlurEl = document.getElementById("mode-blur");
const modeFieldset = document.getElementById("mode-fieldset");
const statusEl = document.getElementById("status");

function statusText(enabled, mode) {
  if (!enabled) return "Filtering off";
  return mode === "blur" ? "Filtering on · Blur covers" : "Filtering on · Hide";
}

function syncUi({ enabled, mode }) {
  enableEl.checked = enabled;
  modeHideEl.checked = mode === "hide";
  modeBlurEl.checked = mode === "blur";
  modeFieldset.disabled = !enabled;
  statusEl.textContent = statusText(enabled, mode);
}

async function loadSettings() {
  const stored = await chrome.storage.sync.get(DEFAULTS);
  return {
    enabled: stored.enabled !== false,
    mode: stored.mode === "blur" ? "blur" : "hide",
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
}

init();
