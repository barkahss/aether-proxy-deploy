/* Aether Proxy — admin API layer (paths & shapes must stay stable) */
(function () {
  function sessionExpired(r) {
    return r.redirected && /\/login/.test(r.url || '');
  }

  function redirectLoginIfNeeded(r) {
    if (sessionExpired(r)) {
      location.href = '/login';
      throw new Error('session_expired');
    }
  }

  window.AetherAPI = {
    async get(path) {
      const r = await fetch('/admin/' + path + '?_t=' + Date.now(), { cache: 'no-store' });
      redirectLoginIfNeeded(r);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    },
    async post(path, obj, contentType) {
      const headers = contentType
        ? { 'Content-Type': contentType }
        : { 'Content-Type': 'application/json' };
      const body = contentType ? obj : JSON.stringify(obj);
      const r = await fetch('/admin/' + path, { method: 'POST', headers, body, cache: 'no-store' });
      redirectLoginIfNeeded(r);
      return r.ok;
    },
    async probeLive() {
      try {
        await this.get('config.json');
        return true;
      } catch (e) {
        return false;
      }
    },
    async login(password, code) {
      let body = 'password=' + encodeURIComponent(password);
      if (code) body += '&code=' + encodeURIComponent(code);
      const r = await fetch(location.origin + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        credentials: 'same-origin',
      });
      const raw = await r.text();
      try {
        return JSON.parse(raw);
      } catch (e) {
        return { success: false, error: 'parse_error', status: r.status, raw };
      }
    },
    async installStatus() {
      const r = await fetch('/install/status?_t=' + Date.now());
      return r.json();
    },
    async installSet(password) {
      const r = await fetch('/install/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      return r.json();
    },
  };
})();