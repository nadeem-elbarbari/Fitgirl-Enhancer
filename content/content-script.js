(() => {
  const MODE_CLASSES = [
    "fg-adult-filter-off",
    "fg-adult-filter-hide",
    "fg-adult-filter-blur",
  ];

  const DEFAULTS = {
    enabled: true,
    mode: "hide",
    centerContent: false,
  };

  const CENTER_CLASS = "fg-center-content";

  const ADULT_INDEX_KEY = "fgAdultUrlIndex";
  const ADULT_INDEX_TTL_MS = 6 * 60 * 60 * 1000;
  const ADULT_TAG_URL = "https://fitgirl-repacks.site/tag/adult/";

  /** @type {Set<string>} */
  let adultUrls = new Set();

  function normalizeUrl(href) {
    try {
      const url = new URL(href, "https://fitgirl-repacks.site/");
      if (url.hostname !== "fitgirl-repacks.site") return null;
      let path = url.pathname;
      if (!path.endsWith("/")) path += "/";
      return `${url.origin}${path}`;
    } catch {
      return null;
    }
  }

  function isAdultArticle(article) {
    if (!(article instanceof HTMLElement)) return false;
    if (article.classList.contains("tag-adult")) return true;
    return Boolean(article.querySelector('a[href*="/tag/adult/"]'));
  }

  function markArticles(root = document) {
    const articles =
      root instanceof Element && root.matches?.("article")
        ? [root, ...root.querySelectorAll("article")]
        : [...(root.querySelectorAll?.("article") ?? [])];

    for (const article of articles) {
      if (isAdultArticle(article)) {
        article.dataset.fgAdult = "1";
      }
    }
  }

  function markGridTiles(root = document) {
    if (adultUrls.size === 0) return;

    const tiles =
      root instanceof Element && root.matches?.(".widget-grid-view-image")
        ? [root, ...root.querySelectorAll(".widget-grid-view-image")]
        : [...(root.querySelectorAll?.(".widget-grid-view-image") ?? [])];

    for (const tile of tiles) {
      const link = tile.querySelector("a[href]");
      if (!link) continue;
      const normalized = normalizeUrl(link.href);
      if (normalized && adultUrls.has(normalized)) {
        tile.dataset.fgAdult = "1";
      }
    }
  }

  function markAll(root = document) {
    markArticles(root);
    markGridTiles(root);
  }

  function applyModeClass({ enabled, mode }) {
    const html = document.documentElement;
    for (const cls of MODE_CLASSES) {
      html.classList.remove(cls);
    }

    if (!enabled) {
      html.classList.add("fg-adult-filter-off");
      return;
    }

    html.classList.add(
      mode === "blur" ? "fg-adult-filter-blur" : "fg-adult-filter-hide",
    );
  }

  function applyCenterClass(centerContent) {
    document.documentElement.classList.toggle(CENTER_CLASS, centerContent);
  }

  async function loadSettings() {
    const stored = await chrome.storage.sync.get(DEFAULTS);
    return {
      enabled: stored.enabled !== false,
      mode: stored.mode === "blur" ? "blur" : "hide",
      centerContent: stored.centerContent === true,
    };
  }

  function extractAdultUrlsFromHtml(html) {
    const urls = new Set();
    const articleRe = /<article\b[^>]*>[\s\S]*?<\/article>/gi;
    let match;
    while ((match = articleRe.exec(html)) !== null) {
      const article = match[0];
      if (!/\btag-adult\b/i.test(article) && !/\/tag\/adult\//i.test(article)) {
        continue;
      }
      const hrefMatch = article.match(
        /<h[12][^>]*>\s*<a[^>]+href=["'](https:\/\/fitgirl-repacks\.site\/[^"'#]+)["']/i,
      );
      if (!hrefMatch) continue;
      const normalized = normalizeUrl(hrefMatch[1]);
      if (normalized) urls.add(normalized);
    }
    return urls;
  }

  function detectMaxAdultPage(html) {
    const titleMatch = html.match(/Page\s+\d+\s+of\s+(\d+)/i);
    if (titleMatch) return Number(titleMatch[1]);

    let max = 1;
    for (const match of html.matchAll(/\/tag\/adult\/page\/(\d+)\//gi)) {
      max = Math.max(max, Number(match[1]));
    }
    return max;
  }

  async function fetchAdultIndex() {
    const first = await fetch(ADULT_TAG_URL, { credentials: "omit" });
    if (!first.ok) throw new Error(`Adult tag fetch failed: ${first.status}`);
    const firstHtml = await first.text();
    const urls = extractAdultUrlsFromHtml(firstHtml);
    const maxPage = detectMaxAdultPage(firstHtml);

    for (let page = 2; page <= maxPage; page += 1) {
      const response = await fetch(`${ADULT_TAG_URL}page/${page}/`, {
        credentials: "omit",
      });
      if (!response.ok) break;
      const html = await response.text();
      for (const url of extractAdultUrlsFromHtml(html)) {
        urls.add(url);
      }
    }

    return [...urls];
  }

  function applyCachedAdultUrls(urls) {
    adultUrls = new Set(urls);
    markGridTiles(document);
  }

  async function loadAdultIndex() {
    const cached = await chrome.storage.local.get(ADULT_INDEX_KEY);
    const entry = cached[ADULT_INDEX_KEY];
    const hasCache =
      entry &&
      Array.isArray(entry.urls) &&
      typeof entry.fetchedAt === "number" &&
      entry.urls.length > 0;

    // Use any cached index immediately so grid tiles hide/blur without waiting.
    if (hasCache) {
      applyCachedAdultUrls(entry.urls);
      if (Date.now() - entry.fetchedAt < ADULT_INDEX_TTL_MS) {
        return;
      }
    }

    const urls = await fetchAdultIndex();
    applyCachedAdultUrls(urls);
    await chrome.storage.local.set({
      [ADULT_INDEX_KEY]: { urls, fetchedAt: Date.now() },
    });
  }

  function observeMutations() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          markAll(node);
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  async function init() {
    /** @type {{ enabled: boolean, mode: string, centerContent: boolean }} */
    let settings = { ...DEFAULTS };

    // Apply default filter class immediately so CSS works before storage resolves.
    applyModeClass(settings);
    applyCenterClass(settings.centerContent);
    observeMutations();
    markAll(document);

    settings = await loadSettings();
    applyModeClass(settings);
    applyCenterClass(settings.centerContent);

    try {
      await loadAdultIndex();
    } catch (err) {
      console.warn("[FitGirl Adult Filter] Adult index failed", err);
    }

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "sync") return;
      if (!changes.enabled && !changes.mode && !changes.centerContent) return;

      if (changes.enabled) {
        settings.enabled = changes.enabled.newValue !== false;
      }
      if (changes.mode) {
        settings.mode = changes.mode.newValue === "blur" ? "blur" : "hide";
      }
      if (changes.centerContent) {
        settings.centerContent = changes.centerContent.newValue === true;
      }
      applyModeClass(settings);
      applyCenterClass(settings.centerContent);
    });
  }

  init();
})();
