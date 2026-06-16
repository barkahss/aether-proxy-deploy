/* Aether Proxy — unified UI preferences (lang, theme, cache migration from nova-* keys) */
(function () {
  const KEYS = { lang: 'aether-lang', theme: 'aether-theme', usersCache: 'aether_users_cache' };
  const LEGACY = {
    lang: ['nova-lang', 'nova_lang'],
    theme: ['nova-theme', 'nova_theme'],
    usersCache: ['nova_users_cache'],
  };

  function migrate(key) {
    try {
      const cur = localStorage.getItem(KEYS[key]);
      if (cur) return cur;
      for (const lk of LEGACY[key]) {
        const v = localStorage.getItem(lk);
        if (v) {
          localStorage.setItem(KEYS[key], v);
          return v;
        }
      }
    } catch (e) {}
    return null;
  }

  window.AetherPrefs = {
    KEYS,
    getLang(def) { return migrate('lang') || def || 'id'; },
    setLang(l) { try { localStorage.setItem(KEYS.lang, l); } catch (e) {} },
    getTheme(def) { return migrate('theme') || def || 'light'; },
    setTheme(t) { try { localStorage.setItem(KEYS.theme, t); } catch (e) {} },
    readUsersCache() {
      try {
        return JSON.parse(localStorage.getItem(KEYS.usersCache) || migrate('usersCache') || 'null');
      } catch (e) {
        return null;
      }
    },
    writeUsersCache(mu, users) {
      try {
        localStorage.setItem(KEYS.usersCache, JSON.stringify({ t: Date.now(), mu: !!mu, users: users || [] }));
      } catch (e) {}
    },
  };
})();